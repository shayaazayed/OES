// Complete Language System for ExamPro
// This system handles all translations across the entire application

const LanguageSystem = {
    // Current language state
    currentLanguage: 'ar',
    
    // Translation database
    translations: {
        ar: {
            // Navigation & Header
            adminDashboard: 'لوحة تحكم المدير',
            welcomeToAdminDashboard: 'مرحباً بك في لوحة الإدارة',
            logout: 'تسجيل الخروج',
            back: 'رجوع',
            home: 'الرئيسية',
            
            // Dashboard Statistics
            totalUsers: 'إجمالي المستخدمين',
            totalCourses: 'إجمالي الدورات',
            totalExams: 'إجمالي الاختبارات',
            examAttempts: 'محاولات الاختبار',
            quickActions: 'إجراءات سريعة',
            
            // Growth indicators
            thisMonth: 'هذا الشهر',
            thisWeek: 'هذا الأسبوع',
            
            // Quick Actions
            addUser: 'إضافة مستخدم',
            createCourse: 'إنشاء دورة',
            quickReport: 'تقرير سريع',
            settings: 'الإعدادات',
            
            // Common actions
            add: 'إضافة',
            create: 'إنشاء',
            edit: 'تعديل',
            delete: 'حذف',
            save: 'حفظ',
            cancel: 'إلغاء',
            view: 'عرض',
            search: 'بحث',
            filter: 'فلتر',
            export: 'تصدير',
            import: 'استيراد',
            
            // User Management
            users: 'المستخدمون',
            students: 'الطلاب',
            teachers: 'المعلمون',
            admins: 'المديرون',
            userName: 'اسم المستخدم',
            fullName: 'الاسم الكامل',
            email: 'البريد الإلكتروني',
            phone: 'رقم الهاتف',
            role: 'الدور',
            status: 'الحالة',
            active: 'نشط',
            inactive: 'غير نشط',
            suspended: 'معلق',
            
            // Course Management
            courses: 'الدورات',
            courseName: 'اسم الدورة',
            courseCode: 'كود الدورة',
            description: 'الوصف',
            credits: 'الساعات المعتمدة',
            instructor: 'المدرس',
            duration: 'المدة',
            startDate: 'تاريخ البدء',
            endDate: 'تاريخ الانتهاء',
            enrolled: 'المسجلون',
            
            // Exam Management
            exams: 'الاختبارات',
            examName: 'اسم الاختبار',
            examDate: 'تاريخ الاختبار',
            examDuration: 'مدة الاختبار',
            examType: 'نوع الاختبار',
            questions: 'الأسئلة',
            results: 'النتائج',
            score: 'الدرجة',
            grade: 'التقدير',
            passed: 'ناجح',
            failed: 'راسب',
            published: 'منشور',
            draft: 'مسودة',
            
            // Reports
            reports: 'التقارير',
            generateReport: 'إنشاء تقرير',
            reportType: 'نوع التقرير',
            dateRange: 'نطاق التاريخ',
            fromDate: 'من تاريخ',
            toDate: 'إلى تاريخ',
            studentsReport: 'تقرير الطلاب',
            coursesReport: 'تقرير الدورات',
            examsReport: 'تقرير الاختبارات',
            performanceReport: 'تقرير الأداء',
            
            // Settings
            generalSettings: 'الإعدادات العامة',
            securitySettings: 'إعدادات الأمان',
            systemSettings: 'إعدادات النظام',
            userSettings: 'إعدادات المستخدم',
            notificationSettings: 'إعدادات الإشعارات',
            
            // Forms
            firstName: 'الاسم الأول',
            lastName: 'الاسم الأخير',
            password: 'كلمة المرور',
            confirmPassword: 'تأكيد كلمة المرور',
            currentPassword: 'كلمة المرور الحالية',
            newPassword: 'كلمة المرور الجديدة',
            address: 'العنوان',
            city: 'المدينة',
            country: 'البلد',
            gender: 'الجنس',
            male: 'ذكر',
            female: 'أنثى',
            dateOfBirth: 'تاريخ الميلاد',
            
            // Messages
            success: 'نجح',
            error: 'خطأ',
            warning: 'تحذير',
            info: 'معلومات',
            loading: 'جاري التحميل...',
            noDataAvailable: 'لا توجد بيانات متاحة',
            operationCompletedSuccessfully: 'تمت العملية بنجاح',
            operationFailed: 'فشلت العملية',
            confirmDelete: 'هل أنت متأكد من الحذف؟',
            confirmLogout: 'هل أنت متأكد من تسجيل الخروج؟',
            itemDeletedSuccessfully: 'تم حذف العنصر بنجاح',
            itemSavedSuccessfully: 'تم حفظ العنصر بنجاح',
            
            // Table headers
            id: 'الرقم',
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            phone: 'رقم الهاتف',
            actions: 'الإجراءات',
            date: 'التاريخ',
            time: 'الوقت',
            type: 'النوع',
            category: 'الفئة',
            
            // Validation messages
            requiredField: 'هذا الحقل مطلوب',
            invalidEmail: 'البريد الإلكتروني غير صحيح',
            invalidPhone: 'رقم الهاتف غير صحيح',
            passwordMismatch: 'كلمات المرور غير متطابقة',
            weakPassword: 'كلمة المرور ضعيفة جداً',
            
            // Time formats
            today: 'اليوم',
            yesterday: 'أمس',
            lastWeek: 'الأسبوع الماضي',
            lastMonth: 'الشهر الماضي',
            
            // File operations
            uploadFile: 'رفع ملف',
            downloadFile: 'تحميل ملف',
            fileSize: 'حجم الملف',
            fileType: 'نوع الملف',
            
            // Notifications
            notification: 'إشعار',
            notifications: 'الإشعارات',
            markAsRead: 'تعيين كمقروء',
            markAsUnread: 'تعيين كغير مقروء',
            deleteNotification: 'حذف الإشعار',
            
            // Search and Filter
            searchResults: 'نتائج البحث',
            noResultsFound: 'لم يتم العثور على نتائج',
            filters: 'الفلاتر',
            clearFilters: 'مسح الفلاتر',
            applyFilters: 'تطبيق الفلاتر',
            
            // Pagination
            previous: 'السابق',
            next: 'التالي',
            page: 'صفحة',
            of: 'من',
            showing: 'عرض',
            items: 'عناصر',
            
            // Charts and Analytics
            chart: 'مخطط',
            analytics: 'التحليلات',
            statistics: 'الإحصائيات',
            performance: 'الأداء',
            progress: 'التقدم',
            percentage: 'النسبة المئوية',
            
            // System messages
            systemMaintenance: 'النظام تحت الصيانة',
            accessDenied: 'الوصول مرفوض',
            sessionExpired: 'انتهت الجلسة',
            loginRequired: 'مطلوب تسجيل الدخول',
            
            // Help and Support
            help: 'مساعدة',
            support: 'دعم',
            documentation: 'التوثيق',
            FAQ: 'الأسئلة الشائعة',
            contactSupport: 'اتصل بالدعم',
            
            // Date and Time
            january: 'يناير',
            february: 'فبراير',
            march: 'مارس',
            april: 'أبريل',
            may: 'مايو',
            june: 'يونيو',
            july: 'يوليو',
            august: 'أغسطس',
            september: 'سبتمبر',
            october: 'أكتوبر',
            november: 'نوفمبر',
            december: 'ديسمبر',
            
            sunday: 'الأحد',
            monday: 'الاثنين',
            tuesday: 'الثلاثاء',
            wednesday: 'الأربعاء',
            thursday: 'الخميس',
            friday: 'الجمعة',
            saturday: 'السبت',
        },
        
        en: {
            // Navigation & Header
            adminDashboard: 'Admin Dashboard',
            welcomeToAdminDashboard: 'Welcome to Admin Dashboard',
            logout: 'Logout',
            back: 'Back',
            home: 'Home',
            
            // Dashboard Statistics
            totalUsers: 'Total Users',
            totalCourses: 'Total Courses',
            totalExams: 'Total Exams',
            examAttempts: 'Exam Attempts',
            quickActions: 'Quick Actions',
            
            // Growth indicators
            thisMonth: 'This Month',
            thisWeek: 'This Week',
            
            // Quick Actions
            addUser: 'Add User',
            createCourse: 'Create Course',
            quickReport: 'Quick Report',
            settings: 'Settings',
            
            // Common actions
            add: 'Add',
            create: 'Create',
            edit: 'Edit',
            delete: 'Delete',
            save: 'Save',
            cancel: 'Cancel',
            view: 'View',
            search: 'Search',
            filter: 'Filter',
            export: 'Export',
            import: 'Import',
            
            // User Management
            users: 'Users',
            students: 'Students',
            teachers: 'Teachers',
            admins: 'Admins',
            userName: 'Username',
            fullName: 'Full Name',
            email: 'Email',
            phone: 'Phone',
            role: 'Role',
            status: 'Status',
            active: 'Active',
            inactive: 'Inactive',
            suspended: 'Suspended',
            
            // Course Management
            courses: 'Courses',
            courseName: 'Course Name',
            courseCode: 'Course Code',
            description: 'Description',
            credits: 'Credits',
            instructor: 'Instructor',
            duration: 'Duration',
            startDate: 'Start Date',
            endDate: 'End Date',
            enrolled: 'Enrolled',
            
            // Exam Management
            exams: 'Exams',
            examName: 'Exam Name',
            examDate: 'Exam Date',
            examDuration: 'Exam Duration',
            examType: 'Exam Type',
            questions: 'Questions',
            results: 'Results',
            score: 'Score',
            grade: 'Grade',
            passed: 'Passed',
            failed: 'Failed',
            published: 'Published',
            draft: 'Draft',
            
            // Reports
            reports: 'Reports',
            generateReport: 'Generate Report',
            reportType: 'Report Type',
            dateRange: 'Date Range',
            fromDate: 'From Date',
            toDate: 'To Date',
            studentsReport: 'Students Report',
            coursesReport: 'Courses Report',
            examsReport: 'Exams Report',
            performanceReport: 'Performance Report',
            
            // Settings
            generalSettings: 'General Settings',
            securitySettings: 'Security Settings',
            systemSettings: 'System Settings',
            userSettings: 'User Settings',
            notificationSettings: 'Notification Settings',
            
            // Forms
            firstName: 'First Name',
            lastName: 'Last Name',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            currentPassword: 'Current Password',
            newPassword: 'New Password',
            address: 'Address',
            city: 'City',
            country: 'Country',
            gender: 'Gender',
            male: 'Male',
            female: 'Female',
            dateOfBirth: 'Date of Birth',
            
            // Messages
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Info',
            loading: 'Loading...',
            noDataAvailable: 'No Data Available',
            operationCompletedSuccessfully: 'Operation Completed Successfully',
            operationFailed: 'Operation Failed',
            confirmDelete: 'Are you sure you want to delete?',
            confirmLogout: 'Are you sure you want to logout?',
            itemDeletedSuccessfully: 'Item Deleted Successfully',
            itemSavedSuccessfully: 'Item Saved Successfully',
            
            // Table headers
            id: 'ID',
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            actions: 'Actions',
            date: 'Date',
            time: 'Time',
            type: 'Type',
            category: 'Category',
            
            // Validation messages
            requiredField: 'This field is required',
            invalidEmail: 'Invalid email address',
            invalidPhone: 'Invalid phone number',
            passwordMismatch: 'Passwords do not match',
            weakPassword: 'Password is too weak',
            
            // Time formats
            today: 'Today',
            yesterday: 'Yesterday',
            lastWeek: 'Last Week',
            lastMonth: 'Last Month',
            
            // File operations
            uploadFile: 'Upload File',
            downloadFile: 'Download File',
            fileSize: 'File Size',
            fileType: 'File Type',
            
            // Notifications
            notification: 'Notification',
            notifications: 'Notifications',
            markAsRead: 'Mark as Read',
            markAsUnread: 'Mark as Unread',
            deleteNotification: 'Delete Notification',
            
            // Search and Filter
            searchResults: 'Search Results',
            noResultsFound: 'No Results Found',
            filters: 'Filters',
            clearFilters: 'Clear Filters',
            applyFilters: 'Apply Filters',
            
            // Pagination
            previous: 'Previous',
            next: 'Next',
            page: 'Page',
            of: 'of',
            showing: 'Showing',
            items: 'items',
            
            // Charts and Analytics
            chart: 'Chart',
            analytics: 'Analytics',
            statistics: 'Statistics',
            performance: 'Performance',
            progress: 'Progress',
            percentage: 'Percentage',
            
            // System messages
            systemMaintenance: 'System Under Maintenance',
            accessDenied: 'Access Denied',
            sessionExpired: 'Session Expired',
            loginRequired: 'Login Required',
            
            // Help and Support
            help: 'Help',
            support: 'Support',
            documentation: 'Documentation',
            FAQ: 'FAQ',
            contactSupport: 'Contact Support',
            
            // Date and Time
            january: 'January',
            february: 'February',
            march: 'March',
            april: 'April',
            may: 'May',
            june: 'June',
            july: 'July',
            august: 'August',
            september: 'September',
            october: 'October',
            november: 'November',
            december: 'December',
            
            sunday: 'Sunday',
            monday: 'Monday',
            tuesday: 'Tuesday',
            wednesday: 'Wednesday',
            thursday: 'Thursday',
            friday: 'Friday',
            saturday: 'Saturday',
        }
    },
    
    // Initialize the language system
    init: function() {
        // Get saved language or default to Arabic
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'ar';
        
        // Apply initial language
        this.applyLanguage(this.currentLanguage);
        
        // Listen for language changes across tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'selectedLanguage') {
                this.applyLanguage(e.newValue);
            }
        });
    },
    
    // Set language
    setLanguage: function(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);
        this.applyLanguage(lang);
        
        // Notify other components
        this.notifyLanguageChange(lang);
    },
    
    // Get current language
    getCurrentLanguage: function() {
        return this.currentLanguage;
    },
    
    // Get translation
    t: function(key) {
        return this.translations[this.currentLanguage][key] || key;
    },
    
    // Apply language to the entire page
    applyLanguage: function(lang) {
        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update page title
        this.updatePageTitle();
        
        // Update all elements with data-translate attribute
        this.updateDataTranslateElements();
        
        // Update common elements
        this.updateCommonElements();
        
        // Update navigation
        this.updateNavigation();
        
        // Update dashboard elements
        this.updateDashboardElements();
        
        // Update forms
        this.updateForms();
        
        // Update tables
        this.updateTables();
        
        // Update buttons
        this.updateButtons();
        
        // Update cards and sections
        this.updateCards();
        
        // Update alerts and messages
        this.updateAlerts();
        
        // Update modals
        this.updateModals();
        
        // Update charts (if any)
        this.updateCharts();
    },
    
    // Update page title
    updatePageTitle: function() {
        const title = document.querySelector('title');
        if (title) {
            const titleText = title.textContent;
            if (titleText.includes('إعدادات النظام') || titleText.includes('System Settings')) {
                title.textContent = this.t('systemSettings') + ' - ExamPro';
            } else if (titleText.includes('لوحة التحكم') || titleText.includes('Dashboard')) {
                title.textContent = this.t('adminDashboard') + ' - ExamPro';
            }
        }
    },
    
    // Update elements with data-translate attribute
    updateDataTranslateElements: function() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = this.t(key);
        });
    },
    
    // Update common elements
    updateCommonElements: function() {
        // Update common text patterns
        this.updateTextPatterns();
        
        // Update placeholders
        this.updatePlaceholders();
        
        // Update select options
        this.updateSelectOptions();
    },
    
    // Update text patterns throughout the page
    updateTextPatterns: function() {
        const patterns = [
            // Dashboard patterns
            { ar: 'مرحباً بك في لوحة الإدارة', en: 'Welcome to Admin Dashboard', key: 'welcomeToAdminDashboard' },
            { ar: 'إجمالي المستخدمين', en: 'Total Users', key: 'totalUsers' },
            { ar: 'إجمالي الدورات', en: 'Total Courses', key: 'totalCourses' },
            { ar: 'إجمالي الاختبارات', en: 'Total Exams', key: 'totalExams' },
            { ar: 'محاولات الاختبار', en: 'Exam Attempts', key: 'examAttempts' },
            { ar: 'إجراءات سريعة', en: 'Quick Actions', key: 'quickActions' },
            { ar: 'هذا الشهر', en: 'This Month', key: 'thisMonth' },
            { ar: 'هذا الأسبوع', en: 'This Week', key: 'thisWeek' },
            { ar: 'النشاطات الأخيرة', en: 'Recent Activities', key: 'recentActivities' },
            
            // Action patterns
            { ar: 'إضافة مستخدم', en: 'Add User', key: 'addUser' },
            { ar: 'إنشاء دورة', en: 'Create Course', key: 'createCourse' },
            { ar: 'تقرير سريع', en: 'Quick Report', key: 'quickReport' },
            { ar: 'الإعدادات', en: 'Settings', key: 'settings' },
            { ar: 'تسجيل الخروج', en: 'Logout', key: 'logout' },
            
            // Common patterns
            { ar: 'حفظ', en: 'Save', key: 'save' },
            { ar: 'إلغاء', en: 'Cancel', key: 'cancel' },
            { ar: 'حذف', en: 'Delete', key: 'delete' },
            { ar: 'تعديل', en: 'Edit', key: 'edit' },
            { ar: 'بحث', en: 'Search', key: 'search' },
            { ar: 'عرض', en: 'View', key: 'view' },
        ];
        
        patterns.forEach(pattern => {
            this.replaceText(pattern.ar, pattern.en);
        });
    },
    
    // Replace text throughout the page
    replaceText: function(arText, enText) {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            const text = node.textContent.trim();
            if (this.currentLanguage === 'ar' && text === enText) {
                node.textContent = arText;
            } else if (this.currentLanguage === 'en' && text === arText) {
                node.textContent = enText;
            }
        }
    },
    
    // Update navigation elements
    updateNavigation: function() {
        document.querySelectorAll('nav a, .nav-link, .menu-item').forEach(link => {
            const text = link.textContent.trim();
            if (text.includes('لوحة التحكم') || text.includes('Dashboard')) {
                link.textContent = this.t('adminDashboard');
            } else if (text.includes('المستخدمون') || text.includes('Users')) {
                link.textContent = this.t('users');
            } else if (text.includes('الدورات') || text.includes('Courses')) {
                link.textContent = this.t('courses');
            } else if (text.includes('الاختبارات') || text.includes('Exams')) {
                link.textContent = this.t('exams');
            } else if (text.includes('التقارير') || text.includes('Reports')) {
                link.textContent = this.t('reports');
            } else if (text.includes('الإعدادات') || text.includes('Settings')) {
                link.textContent = this.t('settings');
            }
        });
    },
    
    // Update dashboard elements
    updateDashboardElements: function() {
        // Update stat cards
        document.querySelectorAll('.stat-card, .metric-card, .info-card').forEach(card => {
            const title = card.querySelector('.stat-title, .metric-title, .card-title');
            const value = card.querySelector('.stat-value, .metric-value, .card-value');
            
            if (title) {
                const titleText = title.textContent.trim();
                if (titleText.includes('إجمالي المستخدمين') || titleText.includes('Total Users')) {
                    title.textContent = this.t('totalUsers');
                } else if (titleText.includes('إجمالي الدورات') || titleText.includes('Total Courses')) {
                    title.textContent = this.t('totalCourses');
                } else if (titleText.includes('إجمالي الاختبارات') || titleText.includes('Total Exams')) {
                    title.textContent = this.t('totalExams');
                } else if (titleText.includes('محاولات الاختبار') || titleText.includes('Exam Attempts')) {
                    title.textContent = this.t('examAttempts');
                }
            }
        });
        
        // Update growth indicators
        document.querySelectorAll('.growth-indicator, .trend-indicator').forEach(indicator => {
            const text = indicator.textContent.trim();
            if (text.includes('هذا الشهر') || text.includes('This Month')) {
                indicator.textContent = this.t('thisMonth');
            } else if (text.includes('هذا الأسبوع') || text.includes('This Week')) {
                indicator.textContent = this.t('thisWeek');
            }
        });
    },
    
    // Update forms
    updateForms: function() {
        document.querySelectorAll('label').forEach(label => {
            const text = label.textContent.trim();
            const forAttr = label.getAttribute('for');
            
            // Update by text content
            if (text.includes('الاسم الأول') || text.includes('First Name')) {
                label.textContent = this.t('firstName');
            } else if (text.includes('الاسم الأخير') || text.includes('Last Name')) {
                label.textContent = this.t('lastName');
            } else if (text.includes('البريد الإلكتروني') || text.includes('Email')) {
                label.textContent = this.t('email');
            } else if (text.includes('كلمة المرور') || text.includes('Password')) {
                label.textContent = this.t('password');
            } else if (text.includes('رقم الهاتف') || text.includes('Phone')) {
                label.textContent = this.t('phone');
            }
        });
    },
    
    // Update tables
    updateTables: function() {
        document.querySelectorAll('th').forEach(header => {
            const text = header.textContent.trim();
            if (text.includes('الرقم') || text.includes('ID')) {
                header.textContent = this.t('id');
            } else if (text.includes('الاسم') || text.includes('Name')) {
                header.textContent = this.t('name');
            } else if (text.includes('البريد') || text.includes('Email')) {
                header.textContent = this.t('email');
            } else if (text.includes('الهاتف') || text.includes('Phone')) {
                header.textContent = this.t('phone');
            } else if (text.includes('الحالة') || text.includes('Status')) {
                header.textContent = this.t('status');
            } else if (text.includes('الإجراءات') || text.includes('Actions')) {
                header.textContent = this.t('actions');
            } else if (text.includes('التاريخ') || text.includes('Date')) {
                header.textContent = this.t('date');
            }
        });
    },
    
    // Update buttons
    updateButtons: function() {
        document.querySelectorAll('button, .btn').forEach(btn => {
            const text = btn.textContent.trim();
            if (text.includes('إضافة') || text.includes('Add')) {
                btn.textContent = this.t('add');
            } else if (text.includes('إنشاء') || text.includes('Create')) {
                btn.textContent = this.t('create');
            } else if (text.includes('تعديل') || text.includes('Edit')) {
                btn.textContent = this.t('edit');
            } else if (text.includes('حذف') || text.includes('Delete')) {
                btn.textContent = this.t('delete');
            } else if (text.includes('حفظ') || text.includes('Save')) {
                btn.textContent = this.t('save');
            } else if (text.includes('إلغاء') || text.includes('Cancel')) {
                btn.textContent = this.t('cancel');
            } else if (text.includes('بحث') || text.includes('Search')) {
                btn.textContent = this.t('search');
            } else if (text.includes('عرض') || text.includes('View')) {
                btn.textContent = this.t('view');
            } else if (text.includes('تصدير') || text.includes('Export')) {
                btn.textContent = this.t('export');
            }
        });
    },
    
    // Update cards and sections
    updateCards: function() {
        document.querySelectorAll('.card-title, .section-title, h2, h3').forEach(title => {
            const text = title.textContent.trim();
            if (text.includes('المستخدمون') || text.includes('Users')) {
                title.textContent = this.t('users');
            } else if (text.includes('الدورات') || text.includes('Courses')) {
                title.textContent = this.t('courses');
            } else if (text.includes('الاختبارات') || text.includes('Exams')) {
                title.textContent = this.t('exams');
            } else if (text.includes('التقارير') || text.includes('Reports')) {
                title.textContent = this.t('reports');
            } else if (text.includes('الإعدادات العامة') || text.includes('General Settings')) {
                title.textContent = this.t('generalSettings');
            } else if (text.includes('إعدادات الأمان') || text.includes('Security Settings')) {
                title.textContent = this.t('securitySettings');
            }
        });
    },
    
    // Update alerts and messages
    updateAlerts: function() {
        document.querySelectorAll('.alert, .message, .notification').forEach(alert => {
            const text = alert.textContent.trim();
            if (text.includes('نجح') || text.includes('Success')) {
                alert.textContent = this.t('success');
            } else if (text.includes('خطأ') || text.includes('Error')) {
                alert.textContent = this.t('error');
            } else if (text.includes('تحذير') || text.includes('Warning')) {
                alert.textContent = this.t('warning');
            } else if (text.includes('معلومات') || text.includes('Info')) {
                alert.textContent = this.t('info');
            }
        });
    },
    
    // Update modals
    updateModals: function() {
        document.querySelectorAll('.modal-title, .modal-header h3').forEach(title => {
            const text = title.textContent.trim();
            if (text.includes('تأكيد الحذف') || text.includes('Confirm Delete')) {
                title.textContent = this.t('confirmDelete');
            } else if (text.includes('تأكيد تسجيل الخروج') || text.includes('Confirm Logout')) {
                title.textContent = this.t('confirmLogout');
            }
        });
    },
    
    // Update charts
    updateCharts: function() {
        document.querySelectorAll('.chart-title, .chart-label').forEach(label => {
            const text = label.textContent.trim();
            if (text.includes('الإحصائيات') || text.includes('Statistics')) {
                label.textContent = this.t('statistics');
            } else if (text.includes('الأداء') || text.includes('Performance')) {
                label.textContent = this.t('performance');
            }
        });
    },
    
    // Update placeholders
    updatePlaceholders: function() {
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            if (placeholder.includes('أدخل') || placeholder.includes('Enter')) {
                input.setAttribute('placeholder', this.t('search'));
            }
        });
    },
    
    // Update select options
    updateSelectOptions: function() {
        document.querySelectorAll('select option').forEach(option => {
            const text = option.textContent.trim();
            if (text.includes('نشط') || text.includes('Active')) {
                option.textContent = this.t('active');
            } else if (text.includes('غير نشط') || text.includes('Inactive')) {
                option.textContent = this.t('inactive');
            }
        });
    },
    
    // Notify other components about language change
    notifyLanguageChange: function(lang) {
        // Dispatch custom event
        const event = new CustomEvent('languageChanged', {
            detail: { language: lang }
        });
        document.dispatchEvent(event);
        
        // Update any language-specific CSS
        this.updateLanguageCSS(lang);
    },
    
    // Update language-specific CSS
    updateLanguageCSS: function(lang) {
        // Update font family for Arabic
        if (lang === 'ar') {
            document.body.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        } else {
            document.body.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        }
    }
};

// Initialize the language system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    LanguageSystem.init();
});

// Make it globally available
window.LanguageSystem = LanguageSystem;
window.t = function(key) { return LanguageSystem.t(key); };
window.setLanguage = function(lang) { LanguageSystem.setLanguage(lang); };
window.getCurrentLanguage = function() { return LanguageSystem.getCurrentLanguage(); };
