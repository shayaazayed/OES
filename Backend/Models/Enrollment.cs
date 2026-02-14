using System;

namespace ExamSystem.Models
{
    public class Enrollment
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int StudentId { get; set; }
        public DateTime EnrolledDate { get; set; }

        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual User Student { get; set; }
    }
}
