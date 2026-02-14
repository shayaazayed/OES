using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExamSystem.Models;
using ExamSystem.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ExamSystemDbContext _context;

        public CourseController(ExamSystemDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCourses()
        {
            var courses = await _context.Courses
                .Include(c => c.Teacher)
                .Select(c => new
                {
                    c.Id,
                    c.CourseCode,
                    c.CourseName,
                    c.Description,
                    c.CreatedDate,
                    Teacher = c.Teacher != null ? new { c.Teacher.Id, c.Teacher.FullName } : null,
                    StudentCount = 0, // Simplified for now
                    ExamCount = 0    // Simplified for now
                })
                .ToListAsync();

            return Ok(courses);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCourse([FromBody] Course courseData)
        {
            try
            {
                // Validate TeacherId if provided
                if (courseData.TeacherId.HasValue && courseData.TeacherId.Value > 0)
                {
                    var teacherExists = await _context.Users
                        .AnyAsync(u => u.Id == courseData.TeacherId.Value && u.UserType == "Teacher");
                    
                    if (!teacherExists)
                    {
                        return BadRequest(new { message = "Invalid TeacherId. Teacher not found or not a teacher." });
                    }
                }

                var course = new Course
                {
                    CourseCode = courseData.CourseCode ?? "COURSE-" + DateTime.Now.Ticks,
                    CourseName = courseData.CourseName,
                    Description = courseData.Description,
                    TeacherId = courseData.TeacherId, // Can be null
                    CreatedDate = DateTime.Now
                };

                _context.Courses.Add(course);
                await _context.SaveChangesAsync();

                // Load the course with teacher details for response
                var createdCourse = await _context.Courses
                    .Include(c => c.Teacher)
                    .FirstOrDefaultAsync(c => c.Id == course.Id);

                return Ok(new { 
                    createdCourse.Id, 
                    createdCourse.CourseCode, 
                    createdCourse.CourseName, 
                    createdCourse.Description, 
                    createdCourse.CreatedDate,
                    Teacher = createdCourse.Teacher != null ? new { createdCourse.Teacher.Id, createdCourse.Teacher.FullName } : null
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error creating course", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCourse(int id, [FromBody] Course courseData)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound(new { message = "Course not found" });
            }

            course.CourseCode = courseData.CourseCode;
            course.CourseName = courseData.CourseName;
            course.Description = courseData.Description;
            course.TeacherId = courseData.TeacherId;

            await _context.SaveChangesAsync();

            return Ok(new { course.Id, course.CourseCode, course.CourseName, course.Description, course.CreatedDate });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound(new { message = "Course not found" });
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Course deleted successfully" });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourse(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Teacher)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return NotFound(new { message = "Course not found" });
            }

            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

            var courseDetails = new
            {
                course.Id,
                course.CourseCode,
                course.CourseName,
                course.Description,
                course.CreatedDate,
                Teacher = course.Teacher != null ? new { course.Teacher.Id, course.Teacher.FullName } : null,
                StudentCount = 0, // Simplified for now
                Students = new object[0], // Simplified for now
                Exams = new object[0],    // Simplified for now
                IsEnrolled = userType == "Student" ? false : (bool?)null // Simplified for now
            };

            return Ok(courseDetails);
        }

        [HttpPost("{id}/enroll")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> EnrollInCourse(int id)
        {
            var studentId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound(new { message = "Course not found" });
            }

            var existingEnrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.CourseId == id && e.StudentId == studentId);

            if (existingEnrollment != null)
            {
                return BadRequest(new { message = "Already enrolled in this course" });
            }

            var enrollment = new Enrollment
            {
                CourseId = id,
                StudentId = studentId,
                EnrolledDate = DateTime.Now
            };

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Successfully enrolled in course" });
        }

        [HttpDelete("{id}/enroll")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> UnenrollFromCourse(int id)
        {
            var studentId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

            var enrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.CourseId == id && e.StudentId == studentId);

            if (enrollment == null)
            {
                return BadRequest(new { message = "Not enrolled in this course" });
            }

            // Check if student has taken any exams in this course
            // Simplified for now - skip exam check
            // var hasTakenExams = await _context.StudentExams
            //     .AnyAsync(se => se.StudentId == studentId && se.Exam.CourseId == id);

            // if (hasTakenExams)
            // {
            //     return BadRequest(new { message = "Cannot unenroll after taking exams" });
            // }

            _context.Enrollments.Remove(enrollment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Successfully unenrolled from course" });
        }
    }
}
