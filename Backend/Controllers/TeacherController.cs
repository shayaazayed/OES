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
    [Authorize(Roles = "Teacher,Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ExamSystemDbContext _context;

        public TeacherController(ExamSystemDbContext context)
        {
            _context = context;
        }

        [HttpGet("exams")]
        public async Task<IActionResult> GetMyExams()
        {
            try
            {
                var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
                var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

                Console.WriteLine($"📋 Getting exams for user: {userId}, type: {userType}");

                var exams = await _context.Exams
                    .Where(e => userType == "Admin" || e.TeacherId == userId)
                    .Include(e => e.Course)
                    .Include(e => e.StudentExams)
                    .OrderByDescending(e => e.CreatedDate)
                    .Select(e => new
                    {
                        e.Id,
                        e.Title,
                        e.Description,
                        e.CourseId,
                        CourseName = e.Course.CourseName,
                        e.DurationMinutes,
                        e.TotalMarks,
                        e.PassingScore,
                        e.IsPublished,
                        e.CreatedDate,
                        e.StartDate,
                        e.EndDate,
                        StudentCount = e.StudentExams.Count,
                        CompletedCount = e.StudentExams.Count(se => se.Status == "Submitted")
                    })
                    .ToListAsync();

                Console.WriteLine($"📋 Found {exams.Count} exams for user {userId}");

                return Ok(exams);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"💥 Error in GetMyExams: {ex.Message}");
                Console.WriteLine($"💥 Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpGet("courses")]
        public async Task<IActionResult> GetMyCourses()
        {
            try
            {
                var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
                var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

                Console.WriteLine($"📚 Getting courses for user: {userId}, type: {userType}");

                // Get only courses taught by this teacher
                var courses = await _context.Courses
                    .Where(c => c.TeacherId == userId)
                    .Include(c => c.Teacher)
                    .Select(c => new
                    {
                        c.Id,
                        c.CourseCode,
                        c.CourseName,
                        c.Description,
                        c.CreatedDate,
                        Teacher = c.Teacher != null ? new { c.Teacher.Id, c.Teacher.FullName } : null,
                        StudentCount = _context.Enrollments.Count(e => e.CourseId == c.Id),
                        ExamCount = _context.Exams.Count(e => e.CourseId == c.Id)
                    })
                    .ToListAsync();

                Console.WriteLine($"📚 Found {courses.Count} courses for teacher {userId}");
                return Ok(courses);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"💥 Error in GetMyCourses: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpPost("exams")]
        public async Task<IActionResult> CreateExam([FromBody] CreateExamModel model)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

                Console.WriteLine($"📝 Creating exam for user: {userId}");

                var exam = new Exam
                {
                    Title = model.Title,
                    Description = model.Description,
                    CourseId = model.CourseId,
                    TeacherId = userId,
                    DurationMinutes = model.DurationMinutes,
                    TotalMarks = model.TotalMarks,
                    PassingScore = model.PassingScore,
                    IsPublished = false,
                    CreatedDate = DateTime.Now,
                    StartDate = model.StartDate,
                    EndDate = model.EndDate
                };

                _context.Exams.Add(exam);
                await _context.SaveChangesAsync();

                Console.WriteLine($"✅ Exam created successfully with ID: {exam.Id}");

                return Ok(new { exam.Id, exam.Title, exam.Description, exam.CourseId, exam.DurationMinutes, exam.TotalMarks, exam.PassingScore, exam.IsPublished, exam.CreatedDate });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"💥 Error in CreateExam: {ex.Message}");
                Console.WriteLine($"💥 Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("exams/{id}")]
        public async Task<IActionResult> UpdateExam(int id, [FromBody] UpdateExamModel model)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

            var exam = await _context.Exams.FindAsync(id);
            if (exam == null)
            {
                return NotFound(new { message = "Exam not found" });
            }

            if (userType != "Admin" && exam.TeacherId != userId)
            {
                return Forbid();
            }

            // Check if students have taken the exam
            var hasTakenStudents = await _context.StudentExams.AnyAsync(se => se.ExamId == id && se.Status == "Submitted");
            if (hasTakenStudents)
            {
                return BadRequest(new { message = "Cannot edit exam after students have taken it" });
            }

            exam.Title = model.Title;
            exam.Description = model.Description;
            exam.DurationMinutes = model.DurationMinutes;
            exam.TotalMarks = model.TotalMarks;
            exam.PassingScore = model.PassingScore;
            exam.StartDate = model.StartDate;
            exam.EndDate = model.EndDate;

            await _context.SaveChangesAsync();

            return Ok(new { exam.Id, exam.Title, exam.Description, exam.CourseId, exam.DurationMinutes, exam.TotalMarks, exam.PassingScore, exam.IsPublished, exam.CreatedDate });
        }

        [HttpDelete("exams/{id}")]
        public async Task<IActionResult> DeleteExam(int id)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

            var exam = await _context.Exams.FindAsync(id);
            if (exam == null)
            {
                return NotFound(new { message = "Exam not found" });
            }

            if (userType != "Admin" && exam.TeacherId != userId)
            {
                return Forbid();
            }

            // Check if students have taken the exam
            var hasTakenStudents = await _context.StudentExams.AnyAsync(se => se.ExamId == id);
            if (hasTakenStudents)
            {
                return BadRequest(new { message = "Cannot delete exam after students have taken it" });
            }

            _context.Exams.Remove(exam);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Exam deleted successfully" });
        }

        [HttpGet("exams/{id}/results")]
        public async Task<IActionResult> GetExamResults(int id)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

            var exam = await _context.Exams.FindAsync(id);
            if (exam == null)
            {
                return NotFound(new { message = "Exam not found" });
            }

            if (userType != "Admin" && exam.TeacherId != userId)
            {
                return Forbid();
            }

            var results = await _context.StudentExams
                .Where(se => se.ExamId == id)
                .Include(se => se.Student)
                .OrderByDescending(se => se.SubmittedTime)
                .Select(se => new
                {
                    se.Id,
                    StudentName = se.Student.FullName,
                    StudentUsername = se.Student.Username,
                    se.StartTime,
                    se.EndTime,
                    se.SubmittedTime,
                    se.Score,
                    se.Status,
                    Percentage = se.Exam.TotalMarks > 0 ? (se.Score * 100.0 / se.Exam.TotalMarks) : 0,
                    Passed = se.Score >= se.Exam.PassingScore
                })
                .ToListAsync();

            return Ok(results);
        }

        [HttpGet("courses/{id}/students")]
        public async Task<IActionResult> GetCourseStudents(int id)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound(new { message = "Course not found" });
            }

            if (userType != "Admin" && course.TeacherId != userId)
            {
                return Forbid();
            }

            var students = await _context.Enrollments
                .Where(e => e.CourseId == id)
                .Include(e => e.Student)
                .Select(e => new
                {
                    e.Student.Id,
                    e.Student.Username,
                    e.Student.FullName,
                    e.Student.Email,
                    e.EnrolledDate
                })
                .ToListAsync();

            return Ok(students);
        }

        [HttpPost("exams/{id}/publish")]
        public async Task<IActionResult> PublishExam(int id)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

            var exam = await _context.Exams.FindAsync(id);
            if (exam == null)
            {
                return NotFound(new { message = "Exam not found" });
            }

            if (userType != "Admin" && exam.TeacherId != userId)
            {
                return Forbid();
            }

            // Check if exam has questions
            var hasQuestions = await _context.Questions.AnyAsync(q => q.ExamId == id);
            if (!hasQuestions)
            {
                return BadRequest(new { message = "Cannot publish exam without questions" });
            }

            exam.IsPublished = true;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Exam published successfully" });
        }

        [HttpGet("statistics")]
        public async Task<IActionResult> GetMyStatistics()
        {
            try
            {
                var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
                var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

                Console.WriteLine($"📊 Getting statistics for user: {userId}, type: {userType}");

                // Get teacher's courses
                var courses = await _context.Courses
                    .Where(c => userType == "Admin" || c.TeacherId == userId)
                    .ToListAsync();

                Console.WriteLine($"📊 Found {courses.Count} courses for user {userId}");

                // Get teacher's exams
                var exams = await _context.Exams
                    .Where(e => userType == "Admin" || e.TeacherId == userId)
                    .Include(e => e.StudentExams)
                    .ToListAsync();

                Console.WriteLine($"📊 Found {exams.Count} exams for user {userId}");

                // Get unique students count
                var courseIds = courses.Select(c => c.Id).ToList();
                var students = await _context.Enrollments
                    .Where(e => courseIds.Contains(e.CourseId))
                    .Select(e => e.StudentId)
                    .Distinct()
                    .CountAsync();

                Console.WriteLine($"📊 Found {students} unique students for user {userId}");

                return Ok(new
                {
                    courses = courses.Count,
                    exams = exams.Count,
                    students = students,
                    publishedExams = exams.Count(e => e.IsPublished),
                    draftExams = exams.Count(e => !e.IsPublished)
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"💥 Error in GetMyStatistics: {ex.Message}");
                Console.WriteLine($"💥 Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
    }

    public class CreateExamModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CourseId { get; set; }
        public int DurationMinutes { get; set; }
        public int TotalMarks { get; set; }
        public int PassingScore { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class UpdateExamModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int DurationMinutes { get; set; }
        public int TotalMarks { get; set; }
        public int PassingScore { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
