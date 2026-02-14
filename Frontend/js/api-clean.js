// ==========================================
// API SERVICE - CONNECTION TO BACKEND
// ==========================================

class ApiService {
    constructor() {
        // 🌐 BACKEND CONNECTION URL
        this.baseURL = 'https://localhost:7121/api';  // ← MATCH ACTUAL WORKING URL
        
        console.log('🔗 API Service initialized with URL:', this.baseURL);
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('🔑 Initial token:', this.token);
        console.log('👤 Initial user:', this.user);
    }

    // 📡 MAIN REQUEST METHOD - CORE CONNECTION
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;  // ← BUILD FULL URL
        console.log('🌐 Making request to:', url);
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers
            },
            mode: 'cors',
            credentials: 'include',
            ...options
        };

        // 🎫 ADD AUTHENTICATION TOKEN
        if (this.token) {
            config.headers.Authorization = `Bearer ${this.token}`;
            console.log('🔐 Added auth token');
        }

        try {
            console.log('📤 Request config:', config);
            const response = await fetch(url, config);
            
            console.log('📥 Response status:', response.status);
            console.log('📋 Response headers:', response.headers);
            
            // 📄 HANDLE RESPONSE
            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.log('📝 Response text:', text);
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    throw new Error(text || `HTTP error! status: ${response.status}`);
                }
            }

            if (!response.ok) {
                throw new Error(data.message || data.title || `HTTP error! status: ${response.status}`);
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
    // 📚 COURSE MANAGEMENT ENDPOINTS
    // ==========================================
    
    async getAllCourses() {
        // 🎯 ENDPOINT: /admin/courses (Admin controller)
        return await this.request('/admin/courses');
    }

    async createCourse(courseData) {
        // 🎯 ENDPOINT: /admin/courses (Admin controller)
        return await this.request('/admin/courses', {
            method: 'POST',
            body: JSON.stringify(courseData)
        });
    }

    async deleteCourse(id) {
        // 🎯 ENDPOINT: /admin/courses/{id} (Admin controller)
        return await this.request(`/admin/courses/${id}`, {
            method: 'DELETE'
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
    // 🔧 UTILITY METHODS
    // ==========================================
    
    isAuthenticated() {
        console.log('🔐 Checking authentication. Token exists:', !!this.token);
        console.log('🔐 localStorage token:', localStorage.getItem('token'));
        
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
        return this.user?.userType || null;
    }

    getUserName() {
        return this.user?.username || 'مستخدم';
    }

    getUserId() {
        return this.user?.userId || null;
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

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insert at the top of the page
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
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
document.addEventListener('DOMContentLoaded', function() {
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
