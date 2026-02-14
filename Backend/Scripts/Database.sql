-- Simple Online Exam System Database Schema
-- MySQL/XAMPP Compatible Script

-- Create Database (if not exists)
CREATE DATABASE IF NOT EXISTS exam_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE exam_system;

-- Users Table
CREATE TABLE Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    FullName VARCHAR(100) NOT NULL,
    UserType ENUM('Admin', 'Teacher', 'Student') NOT NULL,
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IsActive BOOLEAN DEFAULT TRUE
);

-- Courses Table
CREATE TABLE Courses (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CourseCode VARCHAR(20) UNIQUE NOT NULL,
    CourseName VARCHAR(100) NOT NULL,
    Description TEXT,
    TeacherId INT,
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (TeacherId) REFERENCES Users(Id) ON DELETE SET NULL
);

-- Enrollments Table
CREATE TABLE Enrollments (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CourseId INT NOT NULL,
    StudentId INT NOT NULL,
    EnrolledDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CourseId) REFERENCES Courses(Id) ON DELETE CASCADE,
    FOREIGN KEY (StudentId) REFERENCES Users(Id) ON DELETE CASCADE,
    UNIQUE KEY (CourseId, StudentId)
);

-- Exams Table
CREATE TABLE Exams (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(200) NOT NULL,
    Description TEXT,
    CourseId INT NOT NULL,
    TeacherId INT NOT NULL,
    DurationMinutes INT NOT NULL DEFAULT 60,
    TotalMarks INT NOT NULL,
    PassingScore INT NOT NULL,
    IsPublished BOOLEAN DEFAULT FALSE,
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    StartDate TIMESTAMP NULL,
    EndDate TIMESTAMP NULL,
    FOREIGN KEY (CourseId) REFERENCES Courses(Id) ON DELETE CASCADE,
    FOREIGN KEY (TeacherId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- Questions Table
CREATE TABLE Questions (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ExamId INT NOT NULL,
    QuestionText TEXT NOT NULL,
    OptionA VARCHAR(500) NOT NULL,
    OptionB VARCHAR(500) NOT NULL,
    OptionC VARCHAR(500) NOT NULL,
    OptionD VARCHAR(500) NOT NULL,
    CorrectAnswer ENUM('A', 'B', 'C', 'D') NOT NULL,
    Marks INT NOT NULL DEFAULT 1,
    QuestionOrder INT NOT NULL,
    FOREIGN KEY (ExamId) REFERENCES Exams(Id) ON DELETE CASCADE
);

-- StudentExams Table
CREATE TABLE StudentExams (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ExamId INT NOT NULL,
    StudentId INT NOT NULL,
    StartTime TIMESTAMP NOT NULL,
    EndTime TIMESTAMP NULL,
    SubmittedTime TIMESTAMP NULL,
    Score INT NULL,
    Status ENUM('Started', 'Submitted', 'Graded', 'Expired') DEFAULT 'Started',
    FOREIGN KEY (ExamId) REFERENCES Exams(Id) ON DELETE CASCADE,
    FOREIGN KEY (StudentId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- StudentAnswers Table
CREATE TABLE StudentAnswers (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    StudentExamId INT NOT NULL,
    QuestionId INT NOT NULL,
    SelectedAnswer ENUM('A', 'B', 'C', 'D') NULL,
    IsCorrect BOOLEAN NULL,
    AnswerTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (StudentExamId) REFERENCES StudentExams(Id) ON DELETE CASCADE,
    FOREIGN KEY (QuestionId) REFERENCES Questions(Id) ON DELETE CASCADE
);

-- Insert Default Admin User (Password: Admin123)
INSERT INTO Users (Username, PasswordHash, Email, FullName, UserType) VALUES 
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@exam.com', 'System Administrator', 'Admin');

-- Insert Sample Teacher User (Password: Teacher123)
INSERT INTO Users (Username, PasswordHash, Email, FullName, UserType) VALUES 
('teacher1', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher1@exam.com', 'John Teacher', 'Teacher');

-- Insert Sample Student User (Password: Student123)
INSERT INTO Users (Username, PasswordHash, Email, FullName, UserType) VALUES 
('student1', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student1@exam.com', 'Alice Student', 'Student');

-- Insert Sample Course
INSERT INTO Courses (CourseCode, CourseName, Description, TeacherId) VALUES 
('CS101', 'Introduction to Computer Science', 'Basic concepts of computer science and programming', 2);

-- Insert Sample Student Enrollment
INSERT INTO Enrollments (CourseId, StudentId) VALUES (1, 3);

-- Insert Sample Exam
INSERT INTO Exams (Title, Description, CourseId, TeacherId, DurationMinutes, TotalMarks, PassingScore, IsPublished) VALUES 
('Introduction to Programming', 'Basic programming concepts test', 1, 2, 60, 10, 6, TRUE);

-- Insert Sample Questions
INSERT INTO Questions (ExamId, QuestionText, OptionA, OptionB, OptionC, OptionD, CorrectAnswer, Marks, QuestionOrder) VALUES 
(1, 'What is the correct syntax to output "Hello World" in C#?', 'Console.WriteLine("Hello World");', 'print("Hello World");', 'echo "Hello World";', 'System.out.println("Hello World");', 'A', 2, 1),
(1, 'Which of the following is not a programming language?', 'Python', 'HTML', 'Java', 'C++', 'B', 2, 2),
(1, 'What does CPU stand for?', 'Central Processing Unit', 'Computer Personal Unit', 'Central Program Unit', 'Computer Processing Unit', 'A', 2, 3),
(1, 'Which data type is used to store whole numbers in C#?', 'int', 'float', 'string', 'bool', 'A', 2, 4),
(1, 'What is the purpose of a loop in programming?', 'To repeat code', 'To store data', 'To connect to database', 'To create functions', 'A', 2, 5);

-- Create Indexes for Better Performance
CREATE INDEX idx_users_username ON Users(Username);
CREATE INDEX idx_users_email ON Users(Email);
CREATE INDEX idx_users_type ON Users(UserType);
CREATE INDEX idx_courses_teacher ON Courses(TeacherId);
CREATE INDEX idx_enrollments_course ON Enrollments(CourseId);
CREATE INDEX idx_enrollments_student ON Enrollments(StudentId);
CREATE INDEX idx_exams_course ON Exams(CourseId);
CREATE INDEX idx_exams_teacher ON Exams(TeacherId);
CREATE INDEX idx_exams_published ON Exams(IsPublished);
CREATE INDEX idx_questions_exam ON Questions(ExamId);
CREATE INDEX idx_studentexams_exam ON StudentExams(ExamId);
CREATE INDEX idx_studentexams_student ON StudentExams(StudentId);
CREATE INDEX idx_studentanswers_studentexam ON StudentAnswers(StudentExamId);
CREATE INDEX idx_studentanswers_question ON StudentAnswers(QuestionId);
