using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExamSystem.Models;
using ExamSystem.Data;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ExamSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeedDataController : ControllerBase
    {
        private readonly ExamSystemDbContext _context;

        public SeedDataController(ExamSystemDbContext context)
        {
            _context = context;
        }

        [HttpPost("create-student-data")]
        public async Task<IActionResult> CreateStudentData()
        {
            try
            {
                Console.WriteLine("🌱 Creating student test data...");

                // Check if student exists
                var student = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserType == "Student");

                if (student == null)
                {
                    // Create a test student
                    student = new User
                    {
                        Username = "student1",
                        PasswordHash = "password123", // In production, this should be hashed
                        Email = "student1@example.com",
                        FullName = "Test Student",
                        UserType = "Student"
                    };
                    _context.Users.Add(student);
                    await _context.SaveChangesAsync();
                    Console.WriteLine($"✅ Created student: {student.FullName} (ID: {student.Id})");
                }
                else
                {
                    Console.WriteLine($"✅ Found existing student: {student.FullName} (ID: {student.Id})");
                }

                // Get first course
                var course = await _context.Courses.FirstOrDefaultAsync();
                if (course == null)
                {
                    return BadRequest("No courses found. Please create a course first.");
                }

                Console.WriteLine($"📚 Using course: {course.CourseName} (ID: {course.Id})");

                // Check if enrollment exists
                var existingEnrollment = await _context.Enrollments
                    .FirstOrDefaultAsync(e => e.StudentId == student.Id && e.CourseId == course.Id);

                if (existingEnrollment == null)
                {
                    // Create enrollment
                    var enrollment = new Enrollment
                    {
                        StudentId = student.Id,
                        CourseId = course.Id,
                        EnrolledDate = DateTime.Now
                    };
                    _context.Enrollments.Add(enrollment);
                    await _context.SaveChangesAsync();
                    Console.WriteLine($"✅ Created enrollment for student {student.Id} in course {course.Id}");
                }
                else
                {
                    Console.WriteLine($"✅ Enrollment already exists for student {student.Id} in course {course.Id}");
                }

                // Get exams for this course
                var exams = await _context.Exams
                    .Where(e => e.CourseId == course.Id)
                    .ToListAsync();

                Console.WriteLine($"📋 Found {exams.Count} exams for course {course.CourseName}");

                foreach (var exam in exams)
                {
                    Console.WriteLine($"   📝 Exam: {exam.Title}, Published: {exam.IsPublished}, StartDate: {exam.StartDate}, EndDate: {exam.EndDate}");
                }

                return Ok(new
                {
                    Message = "Student data created successfully",
                    StudentId = student.Id,
                    StudentName = student.FullName,
                    CourseId = course.Id,
                    CourseName = course.CourseName,
                    EnrollmentsCount = await _context.Enrollments.CountAsync(),
                    ExamsCount = exams.Count,
                    PublishedExamsCount = exams.Count(e => e.IsPublished)
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error creating student data: {ex.Message}");
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPost("fix-exam-dates")]
        public async Task<IActionResult> FixExamDates()
        {
            try
            {
                Console.WriteLine("🔧 Fixing exam dates...");

                var exams = await _context.Exams.ToListAsync();
                int fixedCount = 0;

                foreach (var exam in exams)
                {
                    bool changed = false;
                    
                    if (!exam.IsPublished)
                    {
                        exam.IsPublished = true;
                        changed = true;
                        Console.WriteLine($"✅ Published exam: {exam.Title}");
                    }

                    if (!exam.StartDate.HasValue)
                    {
                        exam.StartDate = DateTime.Now.AddDays(-1);
                        changed = true;
                        Console.WriteLine($"✅ Set start date for exam: {exam.Title}");
                    }

                    if (!exam.EndDate.HasValue)
                    {
                        exam.EndDate = DateTime.Now.AddDays(30);
                        changed = true;
                        Console.WriteLine($"✅ Set end date for exam: {exam.Title}");
                    }

                    if (changed)
                    {
                        fixedCount++;
                    }
                }

                if (fixedCount > 0)
                {
                    await _context.SaveChangesAsync();
                    Console.WriteLine($"✅ Fixed {fixedCount} exams");
                }
                else
                {
                    Console.WriteLine("ℹ️ All exams already have correct dates and are published");
                }

                return Ok(new
                {
                    Message = "Exam dates fixed successfully",
                    TotalExams = exams.Count,
                    FixedExams = fixedCount
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error fixing exam dates: {ex.Message}");
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}
