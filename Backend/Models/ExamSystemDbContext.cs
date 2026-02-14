using Microsoft.EntityFrameworkCore;
using ExamSystem.Models;

namespace ExamSystem.Data
{
    public class ExamSystemDbContext : DbContext
    {
        public ExamSystemDbContext(DbContextOptions<ExamSystemDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Models.Exam> Exams { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<StudentExam> StudentExams { get; set; }
        public DbSet<StudentAnswer> StudentAnswers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.FullName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.UserType).IsRequired().HasMaxLength(20);
                entity.Property(e => e.PasswordHash).IsRequired().HasMaxLength(255);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(e => e.IsActive).HasDefaultValue(true);
            });

            // Course configuration
            modelBuilder.Entity<Course>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CourseCode).IsRequired().HasMaxLength(20);
                entity.Property(e => e.CourseName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(e => e.TeacherId).IsRequired(false); // Made optional
                // Removed navigation properties to avoid conflicts
            });

            // Enrollment configuration
            modelBuilder.Entity<Enrollment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.EnrolledDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.HasOne(e => e.Course).WithMany(c => c.Enrollments).HasForeignKey(e => e.CourseId);
                entity.HasOne(e => e.Student).WithMany(u => u.Enrollments).HasForeignKey(e => e.StudentId);
                entity.HasIndex(e => new { e.CourseId, e.StudentId }).IsUnique();
            });

            // Exam configuration
            modelBuilder.Entity<Models.Exam>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.DurationMinutes).HasDefaultValue(60);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(e => e.IsPublished).HasDefaultValue(false);
                // Removed navigation properties to avoid conflicts
            });

            // Question configuration
            modelBuilder.Entity<Question>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.QuestionText).IsRequired();
                entity.Property(e => e.OptionA).IsRequired().HasMaxLength(500);
                entity.Property(e => e.OptionB).IsRequired().HasMaxLength(500);
                entity.Property(e => e.OptionC).IsRequired().HasMaxLength(500);
                entity.Property(e => e.OptionD).IsRequired().HasMaxLength(500);
                entity.Property(e => e.CorrectAnswer).IsRequired().HasMaxLength(1);
                entity.Property(e => e.Marks).HasDefaultValue(1);
                entity.HasOne(e => e.Exam).WithMany(e => e.Questions).HasForeignKey(e => e.ExamId);
            });

            // StudentExam configuration
            modelBuilder.Entity<StudentExam>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Status).HasDefaultValue("Started");
                entity.HasOne(e => e.Exam).WithMany(e => e.StudentExams).HasForeignKey(e => e.ExamId);
                entity.HasOne(e => e.Student).WithMany(u => u.TakenExams).HasForeignKey(e => e.StudentId);
            });

            // StudentAnswer configuration
            modelBuilder.Entity<StudentAnswer>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.SelectedAnswer).HasMaxLength(1);
                entity.Property(e => e.AnswerTime).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.HasOne(e => e.StudentExam).WithMany(se => se.StudentAnswers).HasForeignKey(e => e.StudentExamId);
                entity.HasOne(e => e.Question).WithMany(q => q.StudentAnswers).HasForeignKey(e => e.QuestionId);
            });
        }
    }
}
