using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExamSystem.Models;
using ExamSystem.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;

namespace ExamSystem.Controllers
{
    [Authorize(Roles = "Student")]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ExamSystemDbContext _context;

        public StudentController(ExamSystemDbContext context)
        {
            _context = context;
        }

        private int GetStudentId()
        {
            var studentId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var id = int.Parse(studentId ?? "0");
            Console.WriteLine($"👤 GetStudentId called, returning: {id}");
            return id;
        }

        [HttpGet("debug")]
        public async Task<IActionResult> DebugInfo()
        {
            var studentId = GetStudentId();
            
            Console.WriteLine($"🐛 Debug info for student ID: {studentId}");
            
            // Get all students
            var allStudents = await _context.Users
                .Where(u => u.UserType == "Student")
                .Select(u => new { u.Id, u.FullName, u.Email })
                .ToListAsync();
            
            // Get all enrollments without circular references
            var allEnrollments = await _context.Enrollments
                .Include(e => e.Student)
                .Include(e => e.Course)
                .ToListAsync();
            
            // Get all exams
            var allExams = await _context.Exams
                .Include(e => e.Course)
                .ToListAsync();
            
            // Get student enrollments
            var studentEnrollments = allEnrollments
                .Where(e => e.StudentId == studentId)
                .ToList();
            
            return Ok(new
            {
                CurrentStudentId = studentId,
                AllStudentsCount = allStudents.Count,
                AllEnrollmentsCount = allEnrollments.Count,
                AllExamsCount = allExams.Count,
                StudentEnrollmentsCount = studentEnrollments.Count,
                StudentEnrollments = studentEnrollments.Select(e => new {
                    e.Id,
                    StudentId = e.StudentId,
                    StudentName = e.Student.FullName,
                    CourseId = e.CourseId,
                    CourseName = e.Course.CourseName
                }),
                AllExams = allExams.Select(e => new {
                    e.Id,
                    e.Title,
                    e.CourseId,
                    CourseName = e.Course.CourseName,
                    e.IsPublished,
                    e.StartDate,
                    e.EndDate
                })
            });
        }

        [HttpGet("courses")]
        public async Task<IActionResult> GetEnrolledCourses()
        {
            var studentId = GetStudentId();

            var enrolledCourses = await _context.Enrollments
                .Where(e => e.StudentId == studentId)
                .Include(e => e.Course)
                .Include(e => e.Course.Teacher)
                .Select(e => new
                {
                    e.Course.Id,
                    e.Course.CourseCode,
                    CourseName = e.Course.CourseName,
                    e.Course.Description,
                    e.Course.CreatedDate,
                    Teacher = e.Course.Teacher != null ? new { e.Course.Teacher.Id, e.Course.Teacher.FullName } : null,
                    EnrollmentDate = e.EnrolledDate,
                    ExamCount = e.Course.Exams.Count(exam => exam.IsPublished),
                    CompletedExamCount = e.Course.Exams
                        .Where(exam => exam.IsPublished)
                        .SelectMany(exam => exam.StudentExams)
                        .Count(se => se.StudentId == studentId && se.Status == "Submitted"),
                    AvailableExamCount = e.Course.Exams
                        .Count(exam => exam.IsPublished && 
                                      (!exam.StartDate.HasValue || exam.StartDate <= DateTime.Now) &&
                                      (!exam.EndDate.HasValue || exam.EndDate >= DateTime.Now) &&
                                      !exam.StudentExams.Any(se => se.StudentId == studentId))
                })
                .ToListAsync();

            return Ok(enrolledCourses);
        }

        [HttpGet("exams/available")]
        public async Task<IActionResult> GetAvailableExams()
        {
            var studentId = GetStudentId();
            
            Console.WriteLine($"🔍 Looking for available exams for student ID: {studentId}");

            // Check if student has any enrollments
            var enrollments = await _context.Enrollments
                .Where(e => e.StudentId == studentId)
                .Include(e => e.Course)
                .ThenInclude(c => c.Exams)
                .ToListAsync();
            
            Console.WriteLine($"📚 Found {enrollments.Count} enrollments for student {studentId}");
            
            foreach (var enrollment in enrollments)
            {
                Console.WriteLine($"📖 Course: {enrollment.Course.CourseName}, Exams: {enrollment.Course.Exams.Count}");
                foreach (var exam in enrollment.Course.Exams)
                {
                    Console.WriteLine($"   📝 Exam: {exam.Title}, Published: {exam.IsPublished}, StartDate: {exam.StartDate}, EndDate: {exam.EndDate}");
                }
            }

            var availableExams = await _context.Enrollments
                .Where(e => e.StudentId == studentId)
                .SelectMany(e => e.Course.Exams)
                .Where(exam => exam.IsPublished && 
                              (!exam.StartDate.HasValue || exam.StartDate <= DateTime.Now) &&
                              (!exam.EndDate.HasValue || exam.EndDate >= DateTime.Now))
                .Include(exam => exam.Course)
                .Include(exam => exam.Teacher)
                .Select(exam => new
                {
                    exam.Id,
                    exam.Title,
                    exam.Description,
                    exam.CourseId,
                    CourseName = exam.Course.CourseName,
                    TeacherName = exam.Teacher.FullName,
                    exam.DurationMinutes,
                    exam.TotalMarks,
                    exam.PassingScore,
                    exam.StartDate,
                    exam.EndDate,
                    QuestionCount = exam.Questions.Count,
                    IsTaken = exam.StudentExams.Any(se => se.StudentId == studentId)
                })
                .ToListAsync();

            Console.WriteLine($"✅ Found {availableExams.Count} available exams for student {studentId}");
            
            foreach (var exam in availableExams)
            {
                Console.WriteLine($"   📋 Available Exam: {exam.Title}, Course: {exam.CourseName}, IsTaken: {exam.IsTaken}");
            }

            return Ok(availableExams);
        }

        [HttpGet("exams/started")]
        public async Task<IActionResult> GetStartedExams()
        {
            var studentId = GetStudentId();

            var startedExams = await _context.StudentExams
                .Where(se => se.StudentId == studentId && se.Status == "Started")
                .Include(se => se.Exam)
                .Include(se => se.Exam.Course)
                .Select(se => new
                {
                    se.Id,
                    se.ExamId,
                    ExamTitle = se.Exam.Title,
                    CourseName = se.Exam.Course.CourseName,
                    se.StartTime,
                    se.Exam.DurationMinutes,
                    RemainingMinutes = se.Exam.DurationMinutes - (int)(DateTime.Now - se.StartTime).TotalMinutes,
                    QuestionCount = se.Exam.Questions.Count,
                    AnsweredCount = se.StudentAnswers.Count
                })
                .ToListAsync();

            return Ok(startedExams);
        }

        [HttpPost("exams/{id}/start")]
        public async Task<IActionResult> StartExam(int id)
        {
            var studentId = GetStudentId();

            // Check if student is enrolled in the course
            var exam = await _context.Exams
                .Include(e => e.Course)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (exam == null)
            {
                return NotFound(new { message = "Exam not found" });
            }

            var isEnrolled = await _context.Enrollments
                .AnyAsync(e => e.CourseId == exam.CourseId && e.StudentId == studentId);

            if (!isEnrolled)
            {
                return BadRequest(new { message = "You are not enrolled in this course" });
            }

            // Check if already started
            var existingStudentExam = await _context.StudentExams
                .FirstOrDefaultAsync(se => se.ExamId == id && se.StudentId == studentId);

            if (existingStudentExam != null)
            {
                return BadRequest(new { message = "You have already started this exam" });
            }

            // Check if exam is within time window
            if (exam.StartDate.HasValue && exam.StartDate > DateTime.Now)
            {
                return BadRequest(new { message = "Exam has not started yet" });
            }

            if (exam.EndDate.HasValue && exam.EndDate < DateTime.Now)
            {
                return BadRequest(new { message = "Exam has ended" });
            }

            var studentExam = new StudentExam
            {
                ExamId = id,
                StudentId = studentId,
                StartTime = DateTime.Now,
                Status = "Started"
            };

            _context.StudentExams.Add(studentExam);
            await _context.SaveChangesAsync();

            return Ok(new { studentExam.Id, studentExam.StartTime, exam.DurationMinutes });
        }

        [HttpGet("exams/{id}")]
        public async Task<IActionResult> GetExam(int id)
        {
            var studentId = GetStudentId();

            // Check if student is enrolled in the course
            var exam = await _context.Exams
                .Include(e => e.Course)
                .Include(e => e.Course.Teacher)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (exam == null)
            {
                return NotFound(new { message = "Exam not found" });
            }

            var isEnrolled = await _context.Enrollments
                .AnyAsync(e => e.CourseId == exam.CourseId && e.StudentId == studentId);

            if (!isEnrolled)
            {
                return BadRequest(new { message = "You are not enrolled in this course" });
            }

            // Check if student has started this exam
            var studentExam = await _context.StudentExams
                .FirstOrDefaultAsync(se => se.ExamId == id && se.StudentId == studentId);

            return Ok(new {
                exam.Id,
                exam.Title,
                exam.Description,
                exam.DurationMinutes,
                exam.TotalMarks,
                exam.PassingScore,
                exam.StartDate,
                exam.EndDate,
                exam.IsPublished,
                CourseName = exam.Course.CourseName,
                TeacherName = exam.Course.Teacher.FullName,
                IsStarted = studentExam != null,
                Status = studentExam?.Status,
                StartTime = studentExam?.StartTime
            });
        }

        [HttpGet("exams/{id}/questions")]
        public async Task<IActionResult> GetExamQuestions(int id)
        {
            var studentId = GetStudentId();

            var studentExam = await _context.StudentExams
                .FirstOrDefaultAsync(se => se.ExamId == id && se.StudentId == studentId && se.Status == "Started");

            if (studentExam == null)
            {
                return BadRequest(new { message = "You have not started this exam" });
            }

            // Check if time has expired
            var exam = await _context.Exams.FindAsync(id);
            var timeElapsed = DateTime.Now - studentExam.StartTime;
            if (timeElapsed.TotalMinutes > exam.DurationMinutes)
            {
                studentExam.Status = "Expired";
                studentExam.EndTime = DateTime.Now;
                await _context.SaveChangesAsync();
                return BadRequest(new { message = "Exam time has expired" });
            }

            var questions = await _context.Questions
                .Where(q => q.ExamId == id)
                .OrderBy(q => q.QuestionOrder)
                .Select(q => new
                {
                    q.Id,
                    q.QuestionText,
                    q.OptionA,
                    q.OptionB,
                    q.OptionC,
                    q.OptionD,
                    q.Marks,
                    q.QuestionOrder,
                    q.CorrectAnswer,
                    SelectedAnswer = _context.StudentAnswers
                        .Where(sa => sa.StudentExamId == studentExam.Id && sa.QuestionId == q.Id)
                        .Select(sa => sa.SelectedAnswer)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(new { questions, remainingMinutes = exam.DurationMinutes - (int)timeElapsed.TotalMinutes });
        }

        [HttpPost("exams/{id}/answer")]
        public async Task<IActionResult> SubmitAnswer(int id, [FromBody] SubmitAnswerModel model)
        {
            var studentId = GetStudentId();

            var studentExam = await _context.StudentExams
                .FirstOrDefaultAsync(se => se.ExamId == id && se.StudentId == studentId && se.Status == "Started");

            if (studentExam == null)
            {
                return BadRequest(new { message = "You have not started this exam" });
            }

            // Check if time has expired
            var exam = await _context.Exams.FindAsync(id);
            var timeElapsed = DateTime.Now - studentExam.StartTime;
            if (timeElapsed.TotalMinutes > exam.DurationMinutes)
            {
                return BadRequest(new { message = "Exam time has expired" });
            }

            var question = await _context.Questions.FindAsync(model.QuestionId);
            if (question == null || question.ExamId != id)
            {
                return NotFound(new { message = "Question not found" });
            }

            var existingAnswer = await _context.StudentAnswers
                .FirstOrDefaultAsync(sa => sa.StudentExamId == studentExam.Id && sa.QuestionId == model.QuestionId);

            if (existingAnswer != null)
            {
                existingAnswer.SelectedAnswer = model.SelectedAnswer;
                existingAnswer.IsCorrect = model.SelectedAnswer == question.CorrectAnswer;
                existingAnswer.AnswerTime = DateTime.Now;
            }
            else
            {
                var studentAnswer = new StudentAnswer
                {
                    StudentExamId = studentExam.Id,
                    QuestionId = model.QuestionId,
                    SelectedAnswer = model.SelectedAnswer,
                    IsCorrect = model.SelectedAnswer == question.CorrectAnswer,
                    AnswerTime = DateTime.Now
                };
                _context.StudentAnswers.Add(studentAnswer);
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Answer submitted successfully" });
        }

        [HttpPost("exams/{id}/submit")]
        public async Task<IActionResult> SubmitExam(int id, [FromBody] SubmitExamModel examSubmission)
        {
            var studentId = GetStudentId();

            var studentExam = await _context.StudentExams
                .Include(se => se.StudentAnswers)
                .ThenInclude(sa => sa.Question)
                .Include(se => se.Exam)
                .FirstOrDefaultAsync(se => se.ExamId == id && se.StudentId == studentId && se.Status == "Started");

            if (studentExam == null)
            {
                return BadRequest(new { message = "You have not started this exam" });
            }

            // Save any remaining answers from the submission
            if (examSubmission?.Answers != null)
            {
                foreach (var answer in examSubmission.Answers)
                {
                    var questionId = studentExam.Exam.Questions
                        .OrderBy(q => q.QuestionOrder)
                        .Skip(answer.Key)
                        .FirstOrDefault()?.Id;

                    if (questionId.HasValue)
                    {
                        var question = await _context.Questions.FindAsync(questionId.Value);
                        if (question != null)
                        {
                            var existingAnswer = await _context.StudentAnswers
                                .FirstOrDefaultAsync(sa => sa.StudentExamId == studentExam.Id && sa.QuestionId == questionId.Value);

                            if (existingAnswer != null)
                            {
                                existingAnswer.SelectedAnswer = GetAnswerLetter(answer.Value);
                                existingAnswer.IsCorrect = existingAnswer.SelectedAnswer == question.CorrectAnswer;
                                existingAnswer.AnswerTime = DateTime.Now;
                            }
                            else
                            {
                                var studentAnswer = new StudentAnswer
                                {
                                    StudentExamId = studentExam.Id,
                                    QuestionId = questionId.Value,
                                    SelectedAnswer = GetAnswerLetter(answer.Value),
                                    IsCorrect = GetAnswerLetter(answer.Value) == question.CorrectAnswer,
                                    AnswerTime = DateTime.Now
                                };
                                _context.StudentAnswers.Add(studentAnswer);
                            }
                        }
                    }
                }
                await _context.SaveChangesAsync();
            }

            // Calculate score
            var totalScore = studentExam.StudentAnswers
                .Where(sa => sa.IsCorrect == true)
                .Sum(sa => sa.Question.Marks);

            studentExam.Score = totalScore;
            studentExam.Status = "Submitted";
            studentExam.SubmittedTime = DateTime.Now;
            studentExam.EndTime = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(new { 
                score = totalScore, 
                totalMarks = studentExam.Exam.TotalMarks, 
                passed = totalScore >= studentExam.Exam.PassingScore,
                percentage = studentExam.Exam.TotalMarks > 0 ? (totalScore * 100.0 / studentExam.Exam.TotalMarks) : 0
            });
        }

        private string GetAnswerLetter(int answerIndex)
        {
            return answerIndex switch
            {
                0 => "A",
                1 => "B", 
                2 => "C",
                3 => "D",
                _ => "A"
            };
        }

        [HttpGet("exams/{id}/result")]
        public async Task<IActionResult> GetExamResult(int id)
        {
            var studentId = GetStudentId();

            var studentExam = await _context.StudentExams
                .Include(se => se.Exam)
                .Include(se => se.Exam.Course)
                .Include(se => se.StudentAnswers)
                .ThenInclude(sa => sa.Question)
                .FirstOrDefaultAsync(se => se.ExamId == id && se.StudentId == studentId && se.Status == "Submitted");

            if (studentExam == null)
            {
                return BadRequest(new { message = "Exam result not found" });
            }

            var answers = studentExam.StudentAnswers
                .Select(sa => new
                {
                    QuestionId = sa.Question.Id,
                    QuestionText = sa.Question.QuestionText,
                    OptionA = sa.Question.OptionA,
                    OptionB = sa.Question.OptionB,
                    OptionC = sa.Question.OptionC,
                    OptionD = sa.Question.OptionD,
                    CorrectAnswer = sa.Question.CorrectAnswer,
                    SelectedAnswer = sa.SelectedAnswer,
                    IsCorrect = sa.IsCorrect,
                    Marks = sa.Question.Marks
                })
                .ToList();

            return Ok(new
            {
                studentExam.Id,
                ExamTitle = studentExam.Exam.Title,
                CourseName = studentExam.Exam.Course.CourseName,
                studentExam.StartTime,
                studentExam.SubmittedTime,
                studentExam.Score,
                TotalMarks = studentExam.Exam.TotalMarks,
                PassingScore = studentExam.Exam.PassingScore,
                Percentage = studentExam.Exam.TotalMarks > 0 ? (studentExam.Score * 100.0 / studentExam.Exam.TotalMarks) : 0,
                Passed = studentExam.Score >= studentExam.Exam.PassingScore,
                Answers = answers
            });
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetExamHistory()
        {
            var studentId = GetStudentId();

            var history = await _context.StudentExams
                .Where(se => se.StudentId == studentId && se.Status == "Submitted")
                .Include(se => se.Exam)
                .Include(se => se.Exam.Course)
                .OrderByDescending(se => se.SubmittedTime)
                .Select(se => new
                {
                    se.Id,
                    ExamTitle = se.Exam.Title,
                    CourseName = se.Exam.Course.CourseName,
                    se.StartTime,
                    se.SubmittedTime,
                    se.Score,
                    TotalMarks = se.Exam.TotalMarks,
                    PassingScore = se.Exam.PassingScore,
                    Percentage = se.Exam.TotalMarks > 0 ? (se.Score * 100.0 / se.Exam.TotalMarks) : 0,
                    Passed = se.Score >= se.Exam.PassingScore
                })
                .ToListAsync();

            return Ok(history);
        }
    }

    public class SubmitAnswerModel
    {
        public int QuestionId { get; set; }
        public string SelectedAnswer { get; set; }
    }

    public class SubmitExamModel
    {
        public Dictionary<int, int> Answers { get; set; }
        public int Score { get; set; }
        public int TotalScore { get; set; }
        public double Percentage { get; set; }
        public bool Passed { get; set; }
        public double TimeTaken { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}
