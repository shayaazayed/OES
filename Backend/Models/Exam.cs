using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace ExamSystem.Models
{
    public class Exam
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; }
        
        [StringLength(500)]
        public string Description { get; set; }
        
        public int CourseId { get; set; }
        public int TeacherId { get; set; }
        public int DurationMinutes { get; set; }
        public int TotalMarks { get; set; }
        public int PassingScore { get; set; }
        public bool IsPublished { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        // Navigation properties - ignored for validation and JSON serialization
        [JsonIgnore]
        [ValidateNever]
        public virtual Course Course { get; set; }
        
        [JsonIgnore]
        [ValidateNever]
        public virtual User Teacher { get; set; }
        
        [JsonIgnore]
        [ValidateNever]
        public virtual ICollection<Question> Questions { get; set; }
        
        [JsonIgnore]
        [ValidateNever]
        public virtual ICollection<StudentExam> StudentExams { get; set; }
    }
}
