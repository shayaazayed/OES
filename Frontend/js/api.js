// ==========================================
// API SERVICE - CONNECTION TO BACKEND
// ==========================================

class ApiService {
    constructor() {
        // Check if we're in development or production
        this.isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        // Set base URL based on environment
        this.baseURL = 'http://localhost:5000/api';
        
        this.token = localStorage.getItem('token');
        this.user = null;
        
        console.log('🔧 API Service initialized');
        console.log('🌐 Base URL:', this.baseURL);
        console.log('� Token exists:', !!this.token);
    }

    // 📡 MAIN REQUEST METHOD - CORE CONNECTION
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;  // ← BUILD FULL URL
        console.log('🌐 Making request to:', url);
        console.log('📋 Request options:', options);

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
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

            return data;
        } catch (error) {
            console.error('❌ Registration failed:', error);
            throw error;
        }
    }

    // ==========================================
    // 👥 USER MANAGEMENT ENDPOINTS
    // ==========================================

    async getProfile() {
        // 🎯 ENDPOINT: /auth/profile
        return await this.request('/auth/profile');
    }

    async updateProfile(profileData) {
        // 🎯 ENDPOINT: /auth/profile (PUT)
        return await this.request('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
    }

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
        // ENDPOINT: /teacher/results (Teacher controller - Admin has access)
        return await this.request('/teacher/results');
    }

    async getCourseById(id) {
        // ENDPOINT: /course/{id} (Course controller)
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
    // �‍🏫 TEACHER ENDPOINTS
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

    // ==========================================
    // 🎓 STUDENT ENDPOINTS
    // ==========================================
    
    async getStudentCourses() {
        // 🎯 ENDPOINT: /student/courses (Student controller)
        return await this.request('/student/courses');
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
    // 🎓 ENROLLMENT ENDPOINTS
    // ==========================================

    async enrollInCourse(courseId) {
        // 🎯 ENDPOINT: /course/{courseId}/enroll (Course controller)
        return await this.request(`/course/${courseId}/enroll`, {
            method: 'POST'
        });
    }

    async enrollStudentInAllCourses() {
        // 🎯 ENDPOINT: /autoenrollment/enroll-student-in-all-courses (AutoEnrollment controller)
        return await this.request('/autoenrollment/enroll-student-in-all-courses', {
            method: 'POST'
        });
    }

    async checkEnrollmentStatus() {
        // 🎯 ENDPOINT: /autoenrollment/check-enrollment-status (AutoEnrollment controller)
        return await this.request('/autoenrollment/check-enrollment-status');
    }

    async unenrollFromCourse(courseId) {
        // 🎯 ENDPOINT: /course/{courseId}/unenroll (Course controller)
        return await this.request(`/course/${courseId}/unenroll`, {
            method: 'POST'
        });
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

    async getCourseExams(courseId) {
        // 🎯 ENDPOINT: /exam/course/{courseId} (Exam controller)
        return await this.request(`/exam/course/${courseId}`);
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
    // STATISTICS ENDPOINTS
    // ==========================================

    async getStatistics() {
        // ENDPOINT: /admin/statistics (Admin controller)
        return await this.request('/admin/statistics');
    }

    // ==========================================
    // UTILITY METHODS
    // ==========================================

    isAuthenticated() {
        console.log(' Checking authentication. Token exists:', !!this.token);
        console.log(' localStorage token:', localStorage.getItem('token'));

        // Check if token exists in memory or localStorage
        const hasToken = this.token || localStorage.getItem('token');
        console.log('🔐 Final authentication result:', !!hasToken);
        return !!hasToken;
    }

    getUserType() {
        console.log('👤 Getting user type from:', this.user);
        if (!this.user) {
            console.log('🔍 No user found, trying localStorage...');
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                this.user = JSON.parse(storedUser);
                console.log('👤 User from localStorage:', this.user);
            }
        }
        return this.user?.UserType || this.user?.userType || null;
    }

    getUserName() {
        return this.user?.Username || this.user?.username || 'مستخدم';
    }

    getUserId() {
        return this.user?.Id || this.user?.id || this.user?.userId || null;
    }

    isAdmin() {
        return this.getUserType() === 'Admin';
    }

    isTeacher() {
        return this.getUserType() === 'Teacher';
    }

    isStudent() {
        return this.getUserType() === 'Student';
    }

    logout() {
        console.log('🚪 Logging out...');
        console.log('🔐 Token before logout:', this.token);
        console.log('💾 localStorage token before logout:', localStorage.getItem('token'));

        // Clear all authentication data
        this.token = null;
        this.user = {};
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        console.log('🔐 Token after logout:', this.token);
        console.log('💾 localStorage token after logout:', localStorage.getItem('token'));

        // Redirect to login page
        window.location.href = '../login.html';
    }
}

// ==========================================
// 🌐 CREATE GLOBAL API INSTANCE
// ==========================================
const api = new ApiService();

// ==========================================
// 🛠️ UTILITY FUNCTIONS
// ==========================================

// Show alert function (enhanced)
function showAlert(message, type = 'info', duration = 5000) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert-custom');
    existingAlerts.forEach(alert => alert.remove());

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-custom alert-${type}`;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;

    // Set background color based on type
    switch (type) {
        case 'success':
            alertDiv.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            break;
        case 'danger':
            alertDiv.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            break;
        case 'warning':
            alertDiv.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
            break;
        case 'info':
            alertDiv.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
            break;
        default:
            alertDiv.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
    }

    // Add icon based on type
    const icons = {
        success: 'fa-check-circle',
        danger: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    alertDiv.innerHTML = `
        <i class="fas ${icons[type] || 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(alertDiv);

    // Animate in
    setTimeout(() => {
        alertDiv.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after duration
    setTimeout(() => {
        alertDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 300);
    }, duration);
}

// Show loading spinner
function showLoading(message = 'جاري التحميل...') {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-spinner';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        flex-direction: column;
        gap: 1rem;
    `;

    loadingDiv.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <div style="color: white; font-size: 1.1rem; font-weight: 600;">${message}</div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;

    document.body.appendChild(loadingDiv);
    return loadingDiv;
}

// Hide loading spinner
function hideLoading() {
    const loadingDiv = document.getElementById('loading-spinner');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function redirectToDashboard() {
    console.log('🎯 Getting user type...');
    const userType = api.getUserType();
    console.log('👤 User type:', userType);
    console.log('👤 Full user object:', api.user);

    let targetUrl = '';
    switch (userType) {
        case 'Admin':
            targetUrl = './admin/dashboard.html';
            break;
        case 'Teacher':
            targetUrl = './teacher/dashboard.html';
            break;
        case 'Student':
            targetUrl = './student/dashboard.html';
            break;
        default:
            console.log('❌ Unknown user type, staying on login');
            targetUrl = 'login.html';
    }

    console.log('🔄 Redirecting to:', targetUrl);

    // Add delay to show success message
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 1000);
}

function checkAuth() {
    if (!api.isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// ==========================================
// 🚀 INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Page loaded, checking authentication...');
    console.log('🌐 API Service loaded:', typeof api !== 'undefined');
    console.log('🔧 API instance:', api);

    if (api.isAuthenticated()) {
        console.log('✅ User is authenticated');
    } else {
        console.log('❌ User is not authenticated');
    }
});

// ==========================================
// 📍 BACKEND CONNECTION SUMMARY
// ==========================================
console.log('📍 === BACKEND CONNECTION POINTS ===');
console.log('🌐 Base URL:', 'https://localhost:7121/api');
console.log('🔐 Auth Endpoint:', '/auth/login');
console.log('👥 Users Endpoint:', '/admin/users');
console.log('📚 Courses Endpoint:', '/admin/courses');
console.log('📊 Statistics Endpoint:', '/admin/statistics');
console.log('====================================');
