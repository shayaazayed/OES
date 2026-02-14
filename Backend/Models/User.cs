using System;
using System.Collections.Generic;

namespace ExamSystem.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string UserType { get; set; } // Admin, Teacher, Student
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }

        // Navigation properties
        public virtual ICollection<Course> CoursesTaught { get; set; }
        public virtual ICollection<Enrollment> Enrollments { get; set; }
        public virtual ICollection<Exam> CreatedExams { get; set; }
        public virtual ICollection<StudentExam> TakenExams { get; set; }
    }
}
