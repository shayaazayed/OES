# Simple Online Exam System

A web-based examination platform where teachers can create multiple-choice tests and students can take them online.

## Features

### Core Features
- Teacher exam creation and management
- Student exam taking with automatic grading
- Instant results and feedback
- Course enrollment system
- Grade tracking

### User Roles
- **Admin**: User management, course management, system statistics
- **Teacher**: Create/manage exams, view student results, manage course students
- **Student**: Take exams, view results, track progress, enroll in courses

## Technology Stack

### Backend
- **ASP.NET Core 8.0** - Web API framework
- **Entity Framework Core 8.0** - ORM for database operations
- **MySQL** - Database (compatible with XAMPP)
- **JWT Authentication** - Secure token-based authentication
- **Swagger/OpenAPI** - API documentation

### Frontend (HTML/CSS/JavaScript)
- Plain HTML, CSS, and JavaScript
- Responsive design
- Real-time exam timer
- Interactive exam interface

## Database Setup

### Prerequisites
- XAMPP with MySQL installed
- MySQL server running

### Steps
1. Start XAMPP and ensure MySQL is running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Execute the SQL script from `Scripts/Database.sql`
4. Verify that the `exam_system` database is created with all tables

### Default Users
- **Admin**: Username: `admin`, Password: `Admin123`
- **Teacher**: Username: `teacher1`, Password: `Teacher123`
- **Student**: Username: `student1`, Password: `Student123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/change-password` - Change password
- `GET /api/auth/profile` - Get user profile

### Admin
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Delete user
- `GET /api/admin/courses` - All courses
- `GET /api/admin/statistics` - System statistics
- `GET /api/admin/logs` - View system logs

### Teacher
- `GET /api/teacher/exams` - My exams
- `POST /api/teacher/exams` - Create exam
- `PUT /api/teacher/exams/{id}` - Update exam
- `DELETE /api/teacher/exams/{id}` - Delete exam
- `GET /api/teacher/exams/{id}/results` - Exam results
- `GET /api/teacher/courses/{id}/students` - Course students
- `POST /api/teacher/exams/{id}/publish` - Publish exam

### Student
- `GET /api/student/exams/available` - Available exams
- `GET /api/student/exams/started` - My started exams
- `POST /api/student/exams/{id}/start` - Start exam
- `GET /api/student/exams/{id}/questions` - Get exam questions
- `POST /api/student/exams/{id}/answer` - Submit answer
- `POST /api/student/exams/{id}/submit` - Submit exam
- `GET /api/student/exams/{id}/result` - View result
- `GET /api/student/history` - Exam history

### Courses (Shared)
- `GET /api/courses` - List courses
- `GET /api/courses/{id}` - Course details
- `POST /api/courses/{id}/enroll` - Enroll in course (Students only)
- `DELETE /api/courses/{id}/enroll` - Unenroll from course (Students only)

## Project Structure

```
ExamSystem/
├── Controllers/          # API Controllers
│   ├── AuthController.cs
│   ├── AdminController.cs
│   ├── TeacherController.cs
│   ├── StudentController.cs
│   └── CourseController.cs
├── Models/              # Entity Models
│   ├── User.cs
│   ├── Course.cs
│   ├── Enrollment.cs
│   ├── Exam.cs
│   ├── Question.cs
│   ├── StudentExam.cs
│   ├── StudentAnswer.cs
│   └── ExamSystemDbContext.cs
├── Scripts/             # Database Scripts
│   └── Database.sql
├── appsettings.json     # Configuration
├── Program.cs           # Application entry point
└── ExamSystem.csproj    # Project file
```

## Installation & Setup

### Backend Setup
1. Open Visual Studio 2022
2. Create new ASP.NET Core Web API project
3. Copy all files from this project to your new project
4. Update connection string in `appsettings.json` if needed
5. Install required NuGet packages (listed in .csproj file)
6. Run the project

### Database Setup
1. Ensure XAMPP MySQL is running
2. Execute `Scripts/Database.sql` in phpMyAdmin
3. Verify database creation

### Testing
1. Run the backend application
2. Open Swagger UI at `https://localhost:XXXX` (where XXXX is your port)
3. Test the API endpoints using Swagger interface

## Security Notes

- In production, implement proper password hashing (BCrypt)
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Add input validation and sanitization
- Use environment variables for sensitive configuration

## Features Implementation Status

- ✅ User authentication and authorization
- ✅ User management (Admin)
- ✅ Course management
- ✅ Exam creation and management (Teacher)
- ✅ Student exam taking
- ✅ Automatic grading
- ✅ Result viewing
- ✅ Course enrollment
- ✅ API documentation with Swagger

## Future Enhancements

- File upload for exam materials
- Email notifications
- Advanced reporting and analytics
- Question bank management
- Timer synchronization across multiple devices
- Exam proctoring features
- Mobile app support
