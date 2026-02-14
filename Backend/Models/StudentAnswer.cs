using System;

namespace ExamSystem.Models
{
    public class StudentAnswer
    {
        public int Id { get; set; }
        public int StudentExamId { get; set; }
        public int QuestionId { get; set; }
        public string SelectedAnswer { get; set; } // A, B, C, D, null
        public bool? IsCorrect { get; set; }
        public DateTime AnswerTime { get; set; }

        // Navigation properties
        public virtual StudentExam StudentExam { get; set; }
        public virtual Question Question { get; set; }
    }
}
