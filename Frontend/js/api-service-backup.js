// ==========================================
// API SERVICE - CONNECTION TO BACKEND
// ==========================================
// This is a backup of the original api.js in case we need to restore it

class ApiService {
    constructor() {
        this.baseURL = 'https://localhost:7121/api';
        this.token = localStorage.getItem('token');
        this.user = null;
        
        console.log('🔧 API Service initialized');
        console.log('🌐 Base URL:', this.baseURL);
        console.log('🔑 Token exists:', !!this.token);
    }

    // 📡 MAIN REQUEST METHOD - CORE CONNECTION
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`; // ← BUILD FULL URL
        console.log('🌐 Making request to:', url);
        console.log('📋 Request options:', options);
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        };
        
        // Add authentication token if available
        if (this.token) {
            config.headers.Authorization = `Bearer ${this.token}`;
        }
        
        try {
            console.log('📤 Sending request with config:', config);
            const response = await fetch(url, config);
            
            console.log('📥 Response status:', response.status);
            console.log('📋 Response headers:', response.headers);
            
            // Get response text for better error handling
            const responseText = await response.text();
            console.log('📝 Response text:', responseText);
            
            // Parse JSON if possible
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                data = responseText;
            }
            
            if (!response.ok) {
                const error = new Error(data?.title || data?.message || `HTTP error! status: ${response.status}`);
                error.status = response.status;
                error.data = data;
                throw error;
            }
            
            return data;
        } catch (error) {
            console.error('❌ API Request Error:', error);
            throw error;
        }
    }

    // ==========================================
    // 🔐 AUTHENTICATION METHODS
    // ==========================================
    
    async login(username, password) {
        try {
            console.log('🔑 Login attempt - Username:', username);
            console.log('🌐 API Base URL:', this.baseURL);
            
            // 🎯 LOGIN ENDPOINT: /auth/login
            const data = await this.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password })
            });
            
            console.log('✅ Login response received:', data);
            
            if (!data.token || !data.user) {
                throw new Error('Invalid response from server');
            }
            
            // 💾 SAVE TOKEN AND USER
            this.token = data.token;
            this.user = data.user;
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(this.user));
            
            console.log('💾 Token saved:', this.token);
            console.log('👤 User saved:', this.user);
            
            return data;
        } catch (error) {
            console.error('❌ Login failed:', error);
            throw error;
        }
    }

    async register(userData) {
        try {
            console.log('📝 Registering new user:', userData);
            
            // 🎯 REGISTER ENDPOINT: /auth/register
            const data = await this.request('/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
            
            console.log('✅ Registration successful:', data);
            
            if (!data.token || !data.user) {
                // If API doesn't return token on register, we might need to login
                // But usually it does. If not, just return data.
                return data;
            }
            
            // 💾 SAVE TOKEN AND USER (Auto-login after register)
            this.token = data.token;
            this.user = data.user;
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(this.user));
            
            console.log('💾 Token saved:', this.token);
            console.log('👤 User saved:', this.user);
            
            return data;
        } catch (error) {
            console.error('❌ Registration failed:', error);
            throw error;
        }
    }

    // ==========================================
    // 👥 USER MANAGEMENT ENDPOINTS
    // ==========================================
    
    async getAllUsers() {
        // 🎯 ENDPOINT: /admin/users (Admin controller)
        return await this.request('/admin/users');
    }

    async createUser(userData) {
        // 🎯 ENDPOINT: /admin/users (Admin controller)
        return await this.request('/admin/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async deleteUser(id) {
        // 🎯 ENDPOINT: /admin/users/{id} (Admin controller)
        return await this.request(`/admin/users/${id}`, {
            method: 'DELETE'
        });
    }

    // ==========================================
    // COURSE MANAGEMENT ENDPOINTS
    // ==========================================
    
    async getAllCourses() {
        // 🎯 ENDPOINT: /course (Course controller)
        return await this.request('/course');
    }

    async getExamResults() {
        // 🎯 ENDPOINT: /teacher/results (Teacher controller - Admin has access)
        return await this.request('/teacher/results');
    }

    async getCourseById(id) {
        // 🎯 ENDPOINT: /course/{id} (Course controller)
        return await this.request(`/course/${id}`);
    }

    async createCourse(courseData) {
        // 🎯 ENDPOINT: /course (Course controller)
        return await this.request('/course', {
            method: 'POST',
            body: JSON.stringify(courseData)
        });
    }

    async updateCourse(id, courseData) {
        // 🎯 ENDPOINT: /course/{id} (Course controller)
        return await this.request(`/course/${id}`, {
            method: 'PUT',
            body: JSON.stringify(courseData)
        });
    }

    async deleteCourse(id) {
        // 🎯 ENDPOINT: /course/{id} (Course controller)
        return await this.request(`/course/${id}`, {
            method: 'DELETE'
        });
    }

    // ==========================================
    // 🏫 TEACHER ENDPOINTS
    // ==========================================
    
    async getTeacherCourses() {
        // 🎯 ENDPOINT: /teacher/courses (Teacher controller)
        return await this.request('/teacher/courses');
    }

    async getTeacherExams() {
        // 🎯 ENDPOINT: /teacher/exams (Teacher controller)
        return await this.request('/teacher/exams');
    }

    async getTeacherStatistics() {
        // 🎯 ENDPOINT: /teacher/statistics (Teacher controller)
        return await this.request('/teacher/statistics');
    }

    // ==========================================
    // 🎓 STUDENT ENDPOINTS
    // ==========================================
    
    async getStudentCourses() {
        // 🎯 ENDPOINT: /student/courses (Student controller)
        return await this.request('/student/courses');
    }

    async getStudentDebugInfo() {
        // 🎯 ENDPOINT: /student/debug (Student controller)
        return await this.request('/student/debug');
    }

    async createStudentData() {
        // 🎯 ENDPOINT: /seeddata/create-student-data (SeedData controller)
        return await this.request('/seeddata/create-student-data', {
            method: 'POST'
        });
    }

    async fixExamDates() {
        // 🎯 ENDPOINT: /seeddata/fix-exam-dates (SeedData controller)
        return await this.request('/seeddata/fix-exam-dates', {
            method: 'POST'
        });
    }

    async checkEnrollmentStatus() {
        // 🎯 ENDPOINT: /autoenrollment/check-enrollment-status (AutoEnrollment controller)
        return await this.request('/autoenrollment/check-enrollment-status');
    }

    async enrollInCourse(courseId) {
        // 🎯 ENDPOINT: /courses/{id}/enroll (Course controller)
        return await this.request(`/courses/${courseId}/enroll`, {
            method: 'POST'
        });
    }

    async getAllCourses() {
        // 🎯 ENDPOINT: /courses (Course controller)
        return await this.request('/courses');
    }

    async enrollStudentInAllCourses() {
        // 🎯 ENDPOINT: /autoenrollment/enroll-student-in-all-courses (AutoEnrollment controller)
        return await this.request('/autoenrollment/enroll-student-in-all-courses', {
            method: 'POST'
        });
    }

    async getStudentAvailableExams() {
        // 🎯 ENDPOINT: /student/exams/available (Student controller)
        return await this.request('/student/exams/available');
    }

    async getStudentExamHistory() {
        // 🎯 ENDPOINT: /student/history (Student controller)
        return await this.request('/student/history');
    }

    async startStudentExam(examId) {
        // 🎯 ENDPOINT: /student/exams/{id}/start (Student controller)
        return await this.request(`/student/exams/${examId}/start`, {
            method: 'POST'
        });
    }

    async getStudentExamQuestions(examId) {
        // 🎯 ENDPOINT: /student/exams/{id}/questions (Student controller)
        return await this.request(`/student/exams/${examId}/questions`);
    }

    async submitStudentAnswer(examId, questionId, selectedAnswer) {
        // 🎯 ENDPOINT: /student/exams/{id}/answer (Student controller)
        return await this.request(`/student/exams/${examId}/answer`, {
            method: 'POST',
            body: JSON.stringify({ questionId, selectedAnswer })
        });
    }

    async submitStudentExam(examId) {
        // 🎯 ENDPOINT: /student/exams/{id}/submit (Student controller)
        return await this.request(`/student/exams/${examId}/submit`, {
            method: 'POST'
        });
    }

    async getStudentExamResult(examId) {
        // 🎯 ENDPOINT: /student/exams/{id}/result (Student controller)
        return await this.request(`/student/exams/${examId}/result`);
    }

    // ==========================================
    // 📋 EXAM MANAGEMENT ENDPOINTS
    // ==========================================
    
    async getAllExams() {
        // 🎯 ENDPOINT: /teacher/exams (Teacher controller - Admin has access)
        return await this.request('/teacher/exams');
    }

    async getExamById(id) {
        // 🎯 ENDPOINT: /exam/{id} (Exam controller)
        return await this.request(`/exam/${id}`);
    }

    async createExam(examData) {
        // 🎯 ENDPOINT: /exam (Exam controller)
        return await this.request('/exam', {
            method: 'POST',
            body: JSON.stringify(examData)
        });
    }

    async updateExam(id, examData) {
        // 🎯 ENDPOINT: /exam/{id} (Exam controller)
        return await this.request(`/exam/${id}`, {
            method: 'PUT',
            body: JSON.stringify(examData)
        });
    }

    async deleteExam(id) {
        // 🎯 ENDPOINT: /exam/{id} (Exam controller)
        return await this.request(`/exam/${id}`, {
            method: 'DELETE'
        });
    }

    async publishExam(id) {
        // 🎯 ENDPOINT: /exam/{id}/publish (Exam controller)
        return await this.request(`/exam/${id}/publish`, {
            method: 'PUT'
        });
    }

    // ==========================================
    // 📊 STATISTICS ENDPOINTS
    // ==========================================
    
    async getStatistics() {
        // 🎯 ENDPOINT: /admin/statistics (Admin controller)
        return await this.request('/admin/statistics');
    }

    // ==========================================
    // 🛠️ UTILITY METHODS
    // ==========================================
    
    // Check if user is authenticated
    isAuthenticated() {
        return !!this.token;
    }

    // Get current user
    getUser() {
        return this.user;
    }

    // Get user type
    getUserType() {
        return this.user?.userType || null;
    }

    // Check if user is admin
    isAdmin() {
        return this.getUserType() === 'Admin';
    }

    // Check if user is teacher
    isTeacher() {
        return this.getUserType() === 'Teacher';
    }

    // Check if user is student
    isStudent() {
        return this.getUserType() === 'Student';
    }

    // Get username
    getUserName() {
        return this.user?.fullName || 'Unknown User';
    }

    // Logout user
    logout() {
        console.log('🚪 Logout called');
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
}

// Create global instance
window.api = new ApiService();
