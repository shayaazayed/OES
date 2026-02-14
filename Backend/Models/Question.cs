using System.Collections.Generic;

namespace ExamSystem.Models
{
    public class Question
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public string QuestionText { get; set; }
        public string OptionA { get; set; }
        public string OptionB { get; set; }
        public string OptionC { get; set; }
        public string OptionD { get; set; }
        public string CorrectAnswer { get; set; } // A, B, C, D
        public int Marks { get; set; }
        public int QuestionOrder { get; set; }

        // Navigation properties
        public virtual Exam Exam { get; set; }
        public virtual ICollection<StudentAnswer> StudentAnswers { get; set; }
    }
}
