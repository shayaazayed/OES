using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace ExamSystem.Models
{
    public class Course
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(20)]
        public string CourseCode { get; set; }
        
        [Required]
        [StringLength(100)]
        public string CourseName { get; set; }
        
        [StringLength(500)]
        public string Description { get; set; }
        
        public int? TeacherId { get; set; } // Made nullable
        
        public DateTime CreatedDate { get; set; }

        // Navigation properties - ignored for validation and JSON serialization
        [JsonIgnore]
        [ValidateNever]
        public virtual User Teacher { get; set; }
        
        [JsonIgnore]
        [ValidateNever]
        public virtual ICollection<Enrollment> Enrollments { get; set; }
        
        [JsonIgnore]
        [ValidateNever]
        public virtual ICollection<Exam> Exams { get; set; }
    }
}
