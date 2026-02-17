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
    public class ExamController : ControllerBase
    {
        private readonly ExamSystemDbContext _context;

        public ExamController(ExamSystemDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Teacher")]
        public async Task<IActionResult> GetAllExams()
        {
            try
            {
                var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
                var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

                var exams = await _context.Exams
                    .Where(e => userType == "Admin" || e.TeacherId == userId)
                    .Include(e => e.Course)
                    .Include(e => e.Course.Teacher)
                    .Include(e => e.StudentExams)
                    .OrderByDescending(e => e.CreatedDate)
                    .Select(e => new
                    {
                        e.Id,
                        e.Title,
                        e.Description,
                        e.CourseId,
                        CourseName = e.Course.CourseName,
                        TeacherName = e.Course.Teacher.FullName,
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

                return Ok(exams);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error fetching exams", error = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Teacher")]
        public async Task<IActionResult> CreateExam([FromBody] CreateExamModel model)
        {
            try
            {
                var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
                var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

                // Verify course exists and user has permission
                var course = await _context.Courses.FindAsync(model.CourseId);
                if (course == null)
                {
                    return BadRequest(new { message = "Course not found" });
                }

                if (userType == "Teacher" && course.TeacherId != userId)
                {
                    return Forbid();
                }

                var exam = new Exam
                {
                    Title = model.Title,
                    Description = model.Description,
                    CourseId = model.CourseId,
                    TeacherId = userType == "Teacher" ? userId : (model.TeacherId ?? userId),
                    DurationMinutes = model.DurationMinutes,
                    PassingScore = model.PassingScore,
                    TotalMarks = model.Questions?.Sum(q => q.Marks) ?? 0,
                    IsPublished = false,
                    CreatedDate = DateTime.Now,
                    StartDate = model.StartDate,
                    EndDate = model.EndDate
                };

                _context.Exams.Add(exam);
                await _context.SaveChangesAsync();

                // Add questions if provided
                if (model.Questions != null && model.Questions.Any())
                {
                    for (int i = 0; i < model.Questions.Count; i++)
                    {
                        var questionModel = model.Questions[i];
                        var question = new Question
                        {
                            ExamId = exam.Id,
                            QuestionText = questionModel.QuestionText,
                            OptionA = questionModel.OptionA,
                            OptionB = questionModel.OptionB,
                            OptionC = questionModel.OptionC,
                            OptionD = questionModel.OptionD,
                            CorrectAnswer = questionModel.CorrectAnswer.ToUpper(),
                            Marks = questionModel.Marks,
                            QuestionOrder = i + 1
                        };
                        _context.Questions.Add(question);
                    }
                    await _context.SaveChangesAsync();
                }

                // Load the complete exam with questions for response
                var createdExam = await _context.Exams
                    .Include(e => e.Questions)
                    .Include(e => e.Course)
                    .FirstOrDefaultAsync(e => e.Id == exam.Id);

                return Ok(new
                {
                    createdExam.Id,
                    createdExam.Title,
                    createdExam.Description,
                    createdExam.DurationMinutes,
                    createdExam.PassingScore,
                    createdExam.TotalMarks,
                    createdExam.IsPublished,
                    createdExam.CreatedDate,
                    createdExam.StartDate,
                    createdExam.EndDate,
                    Course = new { createdExam.Course.Id, createdExam.Course.CourseName },
                    QuestionsCount = createdExam.Questions?.Count ?? 0,
                    Questions = createdExam.Questions?.Select(q => new
                    {
                        q.Id,
                        q.QuestionText,
                        q.OptionA,
                        q.OptionB,
                        q.OptionC,
                        q.OptionD,
                        q.Marks,
                        q.QuestionOrder
                    }).ToList()
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error creating exam", error = ex.Message });
            }
        }

        [HttpGet("course/{courseId}")]
        [Authorize(Roles = "Admin,Teacher")]
        public async Task<IActionResult> GetCourseExams(int courseId)
        {
            try
            {
                var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
                var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

                // Verify course exists and user has permission
                var course = await _context.Courses.FindAsync(courseId);
                if (course == null)
                {
                    return BadRequest(new { message = "Course not found" });
                }

                if (userType == "Teacher" && course.TeacherId != userId)
                {
                    return Forbid();
                }

                var exams = await _context.Exams
                    .Where(e => e.CourseId == courseId)
                    .Include(e => e.Questions)
                    .OrderByDescending(e => e.CreatedDate)
                    .Select(e => new
                    {
                        e.Id,
                        e.Title,
                        e.Description,
                        e.DurationMinutes,
                        e.PassingScore,
                        e.TotalMarks,
                        e.IsPublished,
                        e.CreatedDate,
                        e.StartDate,
                        e.EndDate,
                        QuestionsCount = e.Questions.Count,
                        Status = e.IsPublished ? "Published" : "Draft"
                    })
                    .ToListAsync();

                return Ok(exams);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error fetching exams", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Teacher")]
        public async Task<IActionResult> GetExam(int id)
        {
            try
            {
                var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
                var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

                var exam = await _context.Exams
                    .Include(e => e.Questions)
                    .Include(e => e.Course)
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (exam == null)
                {
                    return NotFound(new { message = "Exam not found" });
                }

                if (userType == "Teacher" && exam.TeacherId != userId)
                {
                    return Forbid();
                }

                var examDetails = new
                {
                    exam.Id,
                    exam.Title,
                    exam.Description,
                    exam.DurationMinutes,
                    exam.PassingScore,
                    exam.TotalMarks,
                    exam.IsPublished,
                    exam.CreatedDate,
                    exam.StartDate,
                    exam.EndDate,
                    Course = new { exam.Course.Id, exam.Course.CourseName },
                    Questions = exam.Questions.OrderBy(q => q.QuestionOrder).Select(q => new
                    {
                        q.Id,
                        q.QuestionText,
                        q.OptionA,
                        q.OptionB,
                        q.OptionC,
                        q.OptionD,
                        q.CorrectAnswer,
                        q.Marks,
                        q.QuestionOrder
                    }).ToList()
                };

                return Ok(examDetails);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error fetching exam", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Teacher")]
        public async Task<IActionResult> UpdateExam(int id, [FromBody] CreateExamModel model)
        {
            try
            {
                var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
                var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

                var exam = await _context.Exams.FindAsync(id);
                if (exam == null)
                {
                    return NotFound(new { message = "Exam not found" });
                }

                if (userType == "Teacher" && exam.TeacherId != userId)
                {
                    return Forbid();
                }

                // Update exam properties
                exam.Title = model.Title;
                exam.Description = model.Description;
                exam.CourseId = model.CourseId;
                exam.DurationMinutes = model.DurationMinutes;
                exam.PassingScore = model.PassingScore;
                exam.StartDate = model.StartDate;
                exam.EndDate = model.EndDate;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Exam updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error updating exam", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Teacher")]
        public async Task<IActionResult> DeleteExam(int id)
        {
            try
            {
                var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
                var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

                var exam = await _context.Exams.FindAsync(id);
                if (exam == null)
                {
                    return NotFound(new { message = "Exam not found" });
                }

                if (userType == "Teacher" && exam.TeacherId != userId)
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
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error deleting exam", error = ex.Message });
            }
        }

        [HttpPut("{id}/publish")]
        [Authorize(Roles = "Admin,Teacher")]
        public async Task<IActionResult> PublishExam(int id)
        {
            try
            {
                var userType = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
                var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

                var exam = await _context.Exams.FindAsync(id);
                if (exam == null)
                {
                    return NotFound(new { message = "Exam not found" });
                }

                if (userType == "Teacher" && exam.TeacherId != userId)
                {
                    return Forbid();
                }

                // Check if exam has questions
                var questionCount = await _context.Questions.CountAsync(q => q.ExamId == id);
                if (questionCount == 0)
                {
                    return BadRequest(new { message = "Cannot publish exam without questions" });
                }

                exam.IsPublished = true;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Exam published successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error publishing exam", error = ex.Message });
            }
        }
    }

    public class CreateExamModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CourseId { get; set; }
        public int? TeacherId { get; set; } // Only used by Admin
        public int DurationMinutes { get; set; }
        public int PassingScore { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public List<CreateQuestionModel> Questions { get; set; }
    }

    public class CreateQuestionModel
    {
        public string QuestionText { get; set; }
        public string OptionA { get; set; }
        public string OptionB { get; set; }
        public string OptionC { get; set; }
        public string OptionD { get; set; }
        public string CorrectAnswer { get; set; } // A, B, C, D
        public int Marks { get; set; } = 1;
    }
}
