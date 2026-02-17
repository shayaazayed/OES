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
    public class AutoEnrollmentController : ControllerBase
    {
        private readonly ExamSystemDbContext _context;

        public AutoEnrollmentController(ExamSystemDbContext context)
        {
            _context = context;
        }

        [HttpPost("enroll-student-in-all-courses")]
        public async Task<IActionResult> EnrollStudentInAllCourses()
        {
            try
            {
                var studentId = GetCurrentStudentId();
                
                if (studentId == 0)
                {
                    return BadRequest("Student not found or not authenticated");
                }

                Console.WriteLine($"🎓 Auto-enrolling student {studentId} in all available courses...");

                // Get all available courses
                var allCourses = await _context.Courses
                    .Include(c => c.Enrollments)
                    .ToListAsync();

                Console.WriteLine($"📚 Found {allCourses.Count} courses");

                int enrollmentsCreated = 0;
                int alreadyEnrolled = 0;

                foreach (var course in allCourses)
                {
                    // Check if student is already enrolled
                    var existingEnrollment = course.Enrollments
                        .FirstOrDefault(e => e.StudentId == studentId);

                    if (existingEnrollment == null)
                    {
                        // Create new enrollment
                        var enrollment = new Enrollment
                        {
                            StudentId = studentId,
                            CourseId = course.Id,
                            EnrolledDate = DateTime.Now
                        };
                        
                        _context.Enrollments.Add(enrollment);
                        enrollmentsCreated++;
                        
                        Console.WriteLine($"✅ Enrolled student {studentId} in course {course.CourseName} (ID: {course.Id})");
                    }
                    else
                    {
                        alreadyEnrolled++;
                        Console.WriteLine($"ℹ️ Student {studentId} already enrolled in course {course.CourseName}");
                    }
                }

                // Save all enrollments
                await _context.SaveChangesAsync();

                Console.WriteLine($"🎯 Auto-enrollment complete: {enrollmentsCreated} new enrollments, {alreadyEnrolled} already enrolled");

                return Ok(new
                {
                    Message = "Student enrolled in all courses successfully",
                    StudentId = studentId,
                    TotalCourses = allCourses.Count,
                    NewEnrollments = enrollmentsCreated,
                    AlreadyEnrolled = alreadyEnrolled
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error in auto-enrollment: {ex.Message}");
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("check-enrollment-status")]
        public async Task<IActionResult> CheckEnrollmentStatus()
        {
            try
            {
                var studentId = GetCurrentStudentId();
                
                if (studentId == 0)
                {
                    return BadRequest("Student not found or not authenticated");
                }

                // Get student's current enrollments
                var studentEnrollments = await _context.Enrollments
                    .Include(e => e.Course)
                    .Where(e => e.StudentId == studentId)
                    .ToListAsync();

                // Get all available courses
                var allCourses = await _context.Courses.ToListAsync();

                return Ok(new
                {
                    StudentId = studentId,
                    EnrolledCoursesCount = studentEnrollments.Count,
                    TotalCoursesCount = allCourses.Count,
                    EnrolledCourses = studentEnrollments.Select(e => new
                    {
                        e.Id,
                        e.CourseId,
                        CourseName = e.Course.CourseName,
                        e.EnrolledDate
                    }),
                    AvailableCoursesForEnrollment = allCourses.Count - studentEnrollments.Count
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error checking enrollment status: {ex.Message}");
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        private int GetCurrentStudentId()
        {
            var studentId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(studentId ?? "0");
        }
    }
}
