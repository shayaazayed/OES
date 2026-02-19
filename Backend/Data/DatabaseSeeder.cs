using ExamSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamSystem.Data
{
    public class DatabaseSeeder
    {
        private readonly ExamSystemDbContext _context;

        public DatabaseSeeder(ExamSystemDbContext context)
        {
            _context = context;
        }

        public async Task SeedAllData()
        {
            try
            {
                Console.WriteLine("🌱 Starting database seeding...");

                await SeedCourses();
                await SeedExams();
                await SeedQuestions();
                await SeedStudentExams();

                Console.WriteLine("✅ Database seeding completed successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error during seeding: {ex.Message}");
                throw;
            }
        }

        private async Task SeedCourses()
        {
            Console.WriteLine("📚 Seeding courses...");

            if (await _context.Courses.AnyAsync())
            {
                Console.WriteLine("Courses already exist, skipping...");
                return;
            }

            // Get existing teachers or create default teachers
            var teachers = await _context.Users.Where(u => u.UserType == "Teacher").ToListAsync();
            
            if (!teachers.Any())
            {
                Console.WriteLine("No teachers found, creating default teachers...");
                
                // Create default teachers
                var defaultTeachers = new List<User>
                {
                    new User
                    {
                        Username = "teacher1",
                        PasswordHash = "password123",
                        Email = "teacher1@exam.com",
                        FullName = "معلم первый",
                        UserType = "Teacher"
                    },
                    new User
                    {
                        Username = "teacher2",
                        PasswordHash = "password123",
                        Email = "teacher2@exam.com",
                        FullName = "معلم الثاني",
                        UserType = "Teacher"
                    }
                };
                
                await _context.Users.AddRangeAsync(defaultTeachers);
                await _context.SaveChangesAsync();
                teachers = await _context.Users.Where(u => u.UserType == "Teacher").ToListAsync();
                Console.WriteLine($"✅ Created {teachers.Count} teachers");
            }

            var courses = new List<Course>
            {
                new Course
                {
                    CourseName = "برمجة تطبيقات الويب",
                    Description = "تطوير تطبيقات الويب باستخدام HTML, CSS, JavaScript",
                    TeacherId = teachers[0].Id,
                    CreatedDate = DateTime.Now.AddDays(-30)
                },
                new Course
                {
                    CourseName = "قواعد البيانات",
                    Description = "تصميم وإدارة قواعد البيانات العلائقية",
                    TeacherId = teachers[0].Id,
                    CreatedDate = DateTime.Now.AddDays(-25)
                },
                new Course
                {
                    CourseName = "Flutter لتطوير تطبيقات الموبايل",
                    Description = "تطوير تطبيقات الهواتف الذكية باستخدام Flutter",
                    TeacherId = teachers[0].Id,
                    CreatedDate = DateTime.Now.AddDays(-20)
                },
                new Course
                {
                    CourseName = "الأمن السيبراني",
                    Description = "مبادئ الأمن السيبراني وحماية الأنظمة",
                    TeacherId = teachers[0].Id,
                    CreatedDate = DateTime.Now.AddDays(-15)
                },
                new Course
                {
                    CourseName = "الذكاء الاصطناعي",
                    Description = "مقدمة في الذكاء الاصطناعي وتعلم الآلة",
                    TeacherId = teachers[0].Id,
                    CreatedDate = DateTime.Now.AddDays(-10)
                }
            };

            await _context.Courses.AddRangeAsync(courses);
            await _context.SaveChangesAsync();
            Console.WriteLine($"✅ Added {courses.Count} courses");
        }

        private async Task SeedExams()
        {
            Console.WriteLine("📝 Seeding exams...");

            if (await _context.Exams.AnyAsync())
            {
                Console.WriteLine("Exams already exist, skipping...");
                return;
            }

            var courses = await _context.Courses.ToListAsync();
            if (!courses.Any())
            {
                Console.WriteLine("No courses found, skipping exam seeding...");
                return;
            }

            var exams = new List<Exam>
            {
                new Exam
                {
                    Title = "اختبار HTML و CSS الأساسي",
                    Description = "اختبار في أساسيات HTML و CSS",
                    CourseId = courses[0].Id,
                    TeacherId = courses[0].TeacherId ?? 0,
                    DurationMinutes = 60,
                    TotalMarks = 100,
                    PassingScore = 60,
                    StartDate = DateTime.Now.AddDays(-5),
                    EndDate = DateTime.Now.AddDays(5),
                    IsPublished = true,
                    CreatedDate = DateTime.Now.AddDays(-7)
                },
                new Exam
                {
                    Title = "اختبار JavaScript المتقدم",
                    Description = "اختبار في مفاهيم JavaScript المتقدمة",
                    CourseId = courses[0].Id,
                    TeacherId = courses[0].TeacherId ?? 0,
                    DurationMinutes = 90,
                    TotalMarks = 150,
                    PassingScore = 90,
                    StartDate = DateTime.Now.AddDays(-3),
                    EndDate = DateTime.Now.AddDays(7),
                    IsPublished = true,
                    CreatedDate = DateTime.Now.AddDays(-5)
                },
                new Exam
                {
                    Title = "اختبار تصميم قواعد البيانات",
                    Description = "اختبار في تصميم وتطوير قواعد البيانات",
                    CourseId = courses[1].Id,
                    TeacherId = courses[1].TeacherId ?? 0,
                    DurationMinutes = 75,
                    TotalMarks = 120,
                    PassingScore = 72,
                    StartDate = DateTime.Now.AddDays(-2),
                    EndDate = DateTime.Now.AddDays(8),
                    IsPublished = true,
                    CreatedDate = DateTime.Now.AddDays(-4)
                },
                new Exam
                {
                    Title = "اختبار Flutter الأساسي",
                    Description = "اختبار في أساسيات تطوير تطبيقات Flutter",
                    CourseId = courses[2].Id,
                    TeacherId = courses[2].TeacherId ?? 0,
                    DurationMinutes = 80,
                    TotalMarks = 100,
                    PassingScore = 60,
                    StartDate = DateTime.Now.AddDays(-1),
                    EndDate = DateTime.Now.AddDays(9),
                    IsPublished = true,
                    CreatedDate = DateTime.Now.AddDays(-3)
                },
                new Exam
                {
                    Title = "اختبار مبادئ الأمن السيبراني",
                    Description = "اختبار في المفاهيم الأساسية للأمن السيبراني",
                    CourseId = courses[3].Id,
                    TeacherId = courses[3].TeacherId ?? 0,
                    DurationMinutes = 60,
                    TotalMarks = 80,
                    PassingScore = 50,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(10),
                    IsPublished = true,
                    CreatedDate = DateTime.Now.AddDays(-2)
                },
                new Exam
                {
                    Title = "اختبار تعلم الآلة الأساسي",
                    Description = "اختبار في مفاهيم تعلم الآلة الأساسية",
                    CourseId = courses[4].Id,
                    TeacherId = courses[4].TeacherId ?? 0,
                    DurationMinutes = 120,
                    TotalMarks = 200,
                    PassingScore = 120,
                    StartDate = DateTime.Now.AddDays(1),
                    EndDate = DateTime.Now.AddDays(11),
                    IsPublished = true,
                    CreatedDate = DateTime.Now.AddDays(-1)
                }
            };

            await _context.Exams.AddRangeAsync(exams);
            await _context.SaveChangesAsync();
            Console.WriteLine($"✅ Added {exams.Count} exams");
        }

        private async Task SeedQuestions()
        {
            Console.WriteLine("❓ Seeding questions...");

            if (await _context.Questions.AnyAsync())
            {
                Console.WriteLine("Questions already exist, skipping...");
                return;
            }

            var exams = await _context.Exams.ToListAsync();
            if (!exams.Any())
            {
                Console.WriteLine("No exams found, skipping question seeding...");
                return;
            }

            var questions = new List<Question>();

            // Questions for HTML/CSS Exam
            questions.AddRange(new List<Question>
            {
                new Question
                {
                    ExamId = exams[0].Id,
                    QuestionText = "ما هو الوسم المستخدم لإنشاء رابط تشعبي في HTML؟",
                    OptionA = "<link>",
                    OptionB = "<a>",
                    OptionC = "<href>",
                    OptionD = "<url>",
                    CorrectAnswer = "B",
                    Marks = 10,
                    QuestionOrder = 1
                },
                new Question
                {
                    ExamId = exams[0].Id,
                    QuestionText = "أي خاصية CSS تستخدم لتغيير لون النص؟",
                    OptionA = "text-color",
                    OptionB = "font-color",
                    OptionC = "color",
                    OptionD = "text-style",
                    CorrectAnswer = "C",
                    Marks = 10,
                    QuestionOrder = 2
                },
                new Question
                {
                    ExamId = exams[0].Id,
                    QuestionText = "ما هو الوسم المستخدم لإنشاء قائمة غير مرقمة في HTML؟",
                    OptionA = "<ol>",
                    OptionB = "<list>",
                    OptionC = "<ul>",
                    OptionD = "<dl>",
                    CorrectAnswer = "C",
                    Marks = 10,
                    QuestionOrder = 3
                },
                new Question
                {
                    ExamId = exams[0].Id,
                    QuestionText = "أي من التالية ليست لغة برمجة؟",
                    OptionA = "HTML",
                    OptionB = "JavaScript",
                    OptionC = "Python",
                    OptionD = "Java",
                    CorrectAnswer = "A",
                    Marks = 10,
                    QuestionOrder = 4
                },
                new Question
                {
                    ExamId = exams[0].Id,
                    QuestionText = "ما هو اختصار CSS؟",
                    OptionA = "Computer Style Sheets",
                    OptionB = "Creative Style Sheets",
                    OptionC = "Cascading Style Sheets",
                    OptionD = "Colorful Style Sheets",
                    CorrectAnswer = "C",
                    Marks = 10,
                    QuestionOrder = 5
                }
            });

            // Questions for JavaScript Exam
            questions.AddRange(new List<Question>
            {
                new Question
                {
                    ExamId = exams[1].Id,
                    QuestionText = "ما هي الكلمة المفتاحية المستخدمة للإعلان عن متغير في JavaScript؟",
                    OptionA = "var",
                    OptionB = "variable",
                    OptionC = "v",
                    OptionD = "declare",
                    CorrectAnswer = "A",
                    Marks = 15,
                    QuestionOrder = 1
                },
                new Question
                {
                    ExamId = exams[1].Id,
                    QuestionText = "كيف تتم كتابة تعليق من سطر واحد في JavaScript؟",
                    OptionA = "// This is a comment",
                    OptionB = "# This is a comment",
                    OptionC = "/* This is a comment */",
                    OptionD = "' This is a comment",
                    CorrectAnswer = "A",
                    Marks = 15,
                    QuestionOrder = 2
                },
                new Question
                {
                    ExamId = exams[1].Id,
                    QuestionText = "ما هي الدالة المستخدمة لطباعة رسالة في الكونسول؟",
                    OptionA = "print()",
                    OptionB = "console.log()",
                    OptionC = "log()",
                    OptionD = "echo()",
                    CorrectAnswer = "B",
                    Marks = 15,
                    QuestionOrder = 3
                },
                new Question
                {
                    ExamId = exams[1].Id,
                    QuestionText = "أي من التالية ليست نوع بيانات أساسي في JavaScript؟",
                    OptionA = "String",
                    OptionB = "Boolean",
                    OptionC = "Array",
                    OptionD = "Number",
                    CorrectAnswer = "C",
                    Marks = 15,
                    QuestionOrder = 4
                },
                new Question
                {
                    ExamId = exams[1].Id,
                    QuestionText = "ما هي الطريقة الصحيحة للإعلان عن دالة في JavaScript؟",
                    OptionA = "function myFunction() {}",
                    OptionB = "def myFunction():",
                    OptionC = "func myFunction() {}",
                    OptionD = "function = myFunction() {}",
                    CorrectAnswer = "A",
                    Marks = 15,
                    QuestionOrder = 5
                }
            });

            // Questions for Database Exam
            questions.AddRange(new List<Question>
            {
                new Question
                {
                    ExamId = exams[2].Id,
                    QuestionText = "ما هو المفتاح الأساسي في قاعدة البيانات؟",
                    OptionA = "المفتاح الذي يسمح بالتكرار",
                    OptionB = "المفتاح الذي يربط بين الجداول",
                    OptionC = "المفتاح الذي يحدد كل صف بشكل فريد",
                    OptionD = "المفتاح الذي يسمح بالقيم الفارغة",
                    CorrectAnswer = "C",
                    Marks = 12,
                    QuestionOrder = 1
                },
                new Question
                {
                    ExamId = exams[2].Id,
                    QuestionText = "ما هي لغة SQL المستخدمة لاسترجاع البيانات؟",
                    OptionA = "INSERT",
                    OptionB = "SELECT",
                    OptionC = "UPDATE",
                    OptionD = "DELETE",
                    CorrectAnswer = "B",
                    Marks = 12,
                    QuestionOrder = 2
                },
                new Question
                {
                    ExamId = exams[2].Id,
                    QuestionText = "ما هو الـ Foreign Key؟",
                    OptionA = "مفتاح أساسي في جدول آخر",
                    OptionB = "مفتاح فريد في نفس الجدول",
                    OptionC = "مفتاح مؤقت",
                    OptionD = "مفتاح مشفر",
                    CorrectAnswer = "A",
                    Marks = 12,
                    QuestionOrder = 3
                }
            });

            // Questions for Flutter Exam
            questions.AddRange(new List<Question>
            {
                new Question
                {
                    ExamId = exams[3].Id,
                    QuestionText = "ما هي لغة البرمجة المستخدمة في Flutter؟",
                    OptionA = "Java",
                    OptionB = "Kotlin",
                    OptionC = "Dart",
                    OptionD = "Swift",
                    CorrectAnswer = "C",
                    Marks = 10,
                    QuestionOrder = 1
                },
                new Question
                {
                    ExamId = exams[3].Id,
                    QuestionText = "ما هو الـ Widget المستخدم لإنشاء واجهة مستخدم في Flutter؟",
                    OptionA = "View",
                    OptionB = "Widget",
                    OptionC = "Component",
                    OptionD = "Element",
                    CorrectAnswer = "B",
                    Marks = 10,
                    QuestionOrder = 2
                },
                new Question
                {
                    ExamId = exams[3].Id,
                    QuestionText = "ما هي الدالة الرئيسية لتشغيل تطبيق Flutter؟",
                    OptionA = "main()",
                    OptionB = "run()",
                    OptionC = "start()",
                    OptionD = "init()",
                    CorrectAnswer = "A",
                    Marks = 10,
                    QuestionOrder = 3
                }
            });

            await _context.Questions.AddRangeAsync(questions);
            await _context.SaveChangesAsync();
            Console.WriteLine($"✅ Added {questions.Count} questions");
        }

        private int CalculateRandomScore(int totalMarks, int passingScore)
        {
            var random = new Random();
            // Generate scores between 40% and 95% of total marks
            var percentage = random.Next(40, 96);
            return (int)(totalMarks * percentage / 100.0);
        }

        private string GetRandomAnswer()
        {
            var random = new Random();
            var answers = new[] { "A", "B", "C", "D" };
            return answers[random.Next(answers.Length)];
        }

        private async Task SeedStudentExams()
        {
            Console.WriteLine("👥 Seeding student exams and results...");

            var students = await _context.Users.Where(u => u.UserType == "Student").ToListAsync();
            
            // Create default students if none exist
            if (!students.Any())
            {
                Console.WriteLine("No students found, creating default students...");
                
                var defaultStudents = new List<User>
                {
                    new User
                    {
                        Username = "student1",
                        PasswordHash = "password123",
                        Email = "student1@exam.com",
                        FullName = "طالب اول",
                        UserType = "Student"
                    },
                    new User
                    {
                        Username = "student2",
                        PasswordHash = "password123",
                        Email = "student2@exam.com",
                        FullName = "طالب ثاني",
                        UserType = "Student"
                    },
                    new User
                    {
                        Username = "student3",
                        PasswordHash = "password123",
                        Email = "student3@exam.com",
                        FullName = "طالب ثالث",
                        UserType = "Student"
                    }
                };
                
                await _context.Users.AddRangeAsync(defaultStudents);
                await _context.SaveChangesAsync();
                students = await _context.Users.Where(u => u.UserType == "Student").ToListAsync();
                Console.WriteLine($"✅ Created {students.Count} students");
            }
            
            var exams = await _context.Exams.Include(e => e.Questions).ToListAsync();

            if (!students.Any() || !exams.Any())
            {
                Console.WriteLine("No students or exams found, skipping student exam seeding...");
                return;
            }

            var studentExams = new List<StudentExam>();
            var studentAnswers = new List<StudentAnswer>();

            foreach (var exam in exams.Take(3)) // Create results for first 3 exams
            {
                foreach (var student in students.Take(2)) // Create results for first 2 students
                {
                    // Create student exam record
                    var percentage = new Random().Next(40, 96);
                    var studentExam = new StudentExam
                    {
                        ExamId = exam.Id,
                        StudentId = student.Id,
                        StartTime = DateTime.Now.AddHours(-2),
                        EndTime = DateTime.Now.AddHours(-1),
                        SubmittedTime = DateTime.Now.AddHours(-1),
                        Status = "Submitted",
                        Score = (int)(exam.TotalMarks * percentage / 100.0)
                    };
                    studentExams.Add(studentExam);

                    // Create student answers for each question
                    foreach (var question in exam.Questions)
                    {
                        var studentAnswer = new StudentAnswer
                        {
                            StudentExamId = studentExam.Id,
                            QuestionId = question.Id,
                            SelectedAnswer = GetRandomAnswer(),
                            IsCorrect = GetRandomAnswer() == question.CorrectAnswer
                        };
                        studentAnswers.Add(studentAnswer);
                    }
                }
            }

            await _context.StudentExams.AddRangeAsync(studentExams);
            await _context.SaveChangesAsync();

            // Update student exam IDs in answers
            for (int i = 0; i < studentAnswers.Count; i++)
            {
                var studentExamIndex = i / 5; // Assuming 5 questions per exam
                if (studentExamIndex < studentExams.Count)
                {
                    studentAnswers[i].StudentExamId = studentExams[studentExamIndex].Id;
                }
            }

            await _context.StudentAnswers.AddRangeAsync(studentAnswers);
            await _context.SaveChangesAsync();

            Console.WriteLine($"✅ Added {studentExams.Count} student exams");
            Console.WriteLine($"✅ Added {studentAnswers.Count} student answers");
        }
    }
}
