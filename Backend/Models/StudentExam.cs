using System;
using System.Collections.Generic;

namespace ExamSystem.Models
{
    public class StudentExam
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public int StudentId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public DateTime? SubmittedTime { get; set; }
        public int? Score { get; set; }
        public string Status { get; set; } // Started, Submitted, Graded, Expired

        // Navigation properties
        public virtual Exam Exam { get; set; }
        public virtual User Student { get; set; }
        public virtual ICollection<StudentAnswer> StudentAnswers { get; set; }
    }
}
