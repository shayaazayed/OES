// Translation system for ExamPro
const translations = {
    ar: {
        // Common
        save: 'حفظ',
        cancel: 'إلغاء',
        delete: 'حذف',
        edit: 'تعديل',
        add: 'إضافة',
        search: 'بحث',
        loading: 'جاري التحميل...',
        error: 'خطأ',
        success: 'نجح',
        warning: 'تحذير',
        info: 'معلومات',
        back: 'رجوع',
        logout: 'تسجيل الخروج',
        login: 'تسجيل الدخول',
        register: 'تسجيل جديد',
        yes: 'نعم',
        no: 'لا',
        ok: 'موافق',
        confirm: 'تأكيد',
        
        // Navigation
        dashboard: 'لوحة التحكم',
        exams: 'الاختبارات',
        students: 'الطلاب',
        courses: 'الدورات',
        reports: 'التقارير',
        settings: 'الإعدادات',
        home: 'الرئيسية',
        profile: 'الملف الشخصي',
        
        // Settings Page
        systemSettings: 'إعدادات النظام',
        generalSettings: 'الإعدادات العامة',
        securitySettings: 'إعدادات الأمان',
        authenticationSettings: 'إعدادات المصادقة',
        systemSettingsTab: 'إعدادات النظام',
        
        siteName: 'اسم الموقع',
        defaultLanguage: 'اللغة الافتراضية',
        systemEmail: 'البريد الإلكتروني للنظام',
        systemPhone: 'رقم هاتف النظام',
        timezone: 'المنطقة الزمنية',
        maintenanceMode: 'وضع الصيانة',
        
        passwordPolicy: 'سياسة كلمات المرور',
        minPasswordLength: 'الحد الأدنى لطول كلمة المرور',
        passwordExpiryDays: 'انتهاء صلاحية كلمة المرور (بالأيام)',
        requireUppercase: 'يتطلب أحرف كبيرة',
        requireLowercase: 'يتطلب أحرف صغيرة',
        requireNumbers: 'يتطلب أرقام',
        requireSpecialChars: 'يتطلب أحرف خاصة',
        sessionTimeout: 'انتهاء صلاحية الجلسة (بالدقائق)',
        maxLoginAttempts: 'الحد الأقصى للمحاولات الفاشلة',
        lockoutDuration: 'مدة قفل الحساب (بالدقائق)',
        rememberMeEnabled: 'تفعيل "تذكرني"',
        
        emailVerification: 'التحقق من البريد الإلكتروني',
        twoFactorAuth: 'المصادقة الثنائية',
        enableCaptcha: 'تفعيل CAPTCHA',
        captchaType: 'نوع CAPTCHA',
        socialLogin: 'تسجيل الدخول الاجتماعي',
        googleLogin: 'تسجيل الدخول بحساب Google',
        microsoftLogin: 'تسجيل الدخول بحساب Microsoft',
        
        backup: 'النسخ الاحتياطي',
        autoBackup: 'تفعيل النسخ الاحتياطي التلقائي',
        backupFrequency: 'تكرار النسخ الاحتياطي',
        backupRetention: 'الاحتفاظ بالنسخ الاحتياطية (بالأيام)',
        notifications: 'الإشعارات',
        emailNotifications: 'تفعيل الإشعارات البريدية',
        smsNotifications: 'تفعيل الإشعارات عبر الرسائل',
        pushNotifications: 'تفعيل الإشعارات الفورية',
        logging: 'تسجيل الأحداث',
        enableLogging: 'تفعيل تسجيل الأحداث',
        logLevel: 'مستوى التسجيل',
        logRetention: 'الاحتفاظ بالسجلات (بالأيام)',
        
        saveSettings: 'حفظ الإعدادات',
        resetDefaults: 'استعادة الافتراضيات',
        languageChanged: 'تم تغيير اللغة بنجاح',
        settingsSaved: 'تم حفظ الإعدادات بنجاح',
        
        // Dashboard
        welcomeMessage: 'مرحباً بك في لوحة التحكم',
        totalStudents: 'إجمالي الطلاب',
        totalCourses: 'إجمالي الدورات',
        totalExams: 'إجمالي الاختبارات',
        recentActivity: 'النشاط الحديث',
        statistics: 'الإحصائيات',
        quickActions: 'إجراءات سريعة',
        
        // Exams
        createExam: 'إنشاء اختبار جديد',
        examTitle: 'عنوان الاختبار',
        examDescription: 'وصف الاختبار',
        examDuration: 'مدة الاختبار (بالدقائق)',
        examDate: 'تاريخ الاختبار',
        examTime: 'وقت الاختبار',
        examStatus: 'حالة الاختبار',
        published: 'منشور',
        draft: 'مسودة',
        questions: 'الأسئلة',
        results: 'النتائج',
        viewResults: 'عرض النتائج',
        editExam: 'تعديل الاختبار',
        deleteExam: 'حذف الاختبار',
        
        // Students
        studentName: 'اسم الطالب',
        studentEmail: 'بريد الطالب الإلكتروني',
        studentPhone: 'رقم هاتف الطالب',
        studentId: 'رقم الطالب',
        studentStatus: 'حالة الطالب',
        active: 'نشط',
        inactive: 'غير نشط',
        enrolledCourses: 'الدورات المسجل فيها',
        addStudent: 'إضافة طالب',
        editStudent: 'تعديل الطالب',
        deleteStudent: 'حذف الطالب',
        
        // Courses
        courseName: 'اسم الدورة',
        courseDescription: 'وصف الدورة',
        courseCode: 'كود الدورة',
        credits: 'الساعات المعتمدة',
        instructor: 'المدرس',
        addCourse: 'إضافة دورة',
        editCourse: 'تعديل الدورة',
        deleteCourse: 'حذف الدورة',
        
        // Reports
        generateReport: 'إنشاء تقرير',
        reportType: 'نوع التقرير',
        dateRange: 'نطاق التاريخ',
        fromDate: 'من تاريخ',
        toDate: 'إلى تاريخ',
        exportPDF: 'تصدير كـ PDF',
        noDataAvailable: 'لا توجد بيانات متاحة',
        studentsReport: 'تقرير الطلاب',
        examsReport: 'تقرير الاختبارات',
        coursesReport: 'تقرير الدورات',
        
        // Login Page
        username: 'اسم المستخدم',
        password: 'كلمة المرور',
        forgotPassword: 'نسيت كلمة المرور؟',
        rememberMe: 'تذكرني',
        loginButton: 'تسجيل الدخول',
        invalidCredentials: 'اسم المستخدم أو كلمة المرور غير صحيحة',
        
        // Forms
        firstName: 'الاسم الأول',
        lastName: 'الاسم الأخير',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        address: 'العنوان',
        dateOfBirth: 'تاريخ الميلاد',
        gender: 'الجنس',
        male: 'ذكر',
        female: 'أنثى',
        
        // Messages
        confirmDelete: 'هل أنت متأكد من الحذف؟',
        confirmLogout: 'هل أنت متأكد من تسجيل الخروج؟',
        operationSuccess: 'تمت العملية بنجاح',
        operationFailed: 'فشلت العملية',
        dataLoaded: 'تم تحميل البيانات',
        noResultsFound: 'لم يتم العثور على نتائج',
        selectOption: 'يرجى الاختيار',
        requiredField: 'هذا الحقل مطلوب',
        invalidEmail: 'البريد الإلكتروني غير صحيح',
        invalidPhone: 'رقم الهاتف غير صحيح',
        minimumCharactersRequired: 'عدد الأحرف الأدنى المطلوب',
        afterThisPeriodUserMustChangePassword: 'بعد هذه المدة يجب على المستخدم تغيير كلمة المرور',
        afterThisPeriodUserWillBeLoggedOutAutomatically: 'بعد هذه المدة يتم تسجيل الخروج تلقائياً',
        afterTheseAttemptsAccountWillBeLocked: 'بعد هذه المحاولات يتم قفل الحساب',
        accountLockoutDurationAfterFailedAttempts: 'مدة قفل الحساب بعد المحاولات الفاشلة',
        systemNameThatWillAppearInAllPages: 'اسم النظام الذي سيظهر في جميع الصفحات',
        defaultLanguageForNewUsers: 'اللغة الافتراضية للمستخدمين الجدد',
        emailUsedForNotificationsAndContact: 'البريد المستخدم للإشعارات والاتصال',
        phoneForTechnicalSupport: 'رقم الهاتف للدعم الفني',
        defaultTimezoneForTheSystem: 'المنطقة الزمنية الافتراضية للنظام',
        ifEnabledUsersCannotAccessTheSystem: 'إذا تم تفعيله، لن يتمكن المستخدمون من الوصول للنظام',
        enableMaintenanceMode: 'تفعيل وضع الصيانة',
        
        // Table
        id: 'الرقم',
        name: 'الاسم',
        actions: 'الإجراءات',
        status: 'الحالة',
        date: 'التاريخ',
        time: 'الوقت',
        grade: 'الدرجة',
        score: 'النتيجة',
        percentage: 'النسبة المئوية',
        
        // Timezones
        asiaRiyadh: 'الرياض (GMT+3)',
        asiaDubai: 'دبي (GMT+4)',
        asiaCairo: 'القاهرة (GMT+2)',
        utc: 'UTC (GMT+0)',
        
        // CAPTCHA Types
        recaptcha: 'reCAPTCHA',
        hcaptcha: 'hCaptcha',
        simple: 'بسيط (رياضيات)',
        
        // Log Levels
        errorOnly: 'الأخطاء فقط',
        warningAndAbove: 'تحذير وأعلى',
        infoAndAbove: 'معلومات وأعلى',
        all: 'الكل',
        
        // Backup Frequency
        daily: 'يومياً',
        weekly: 'أسبوعياً',
        monthly: 'شهرياً',
        
        // Additional descriptions
        backupRetentionDays: 'الاحتفاظ بالنسخ الاحتياطية (بالأيام)',
        logRetentionDays: 'الاحتفاظ بالسجلات (بالأيام)',
        enableAutoBackup: 'تفعيل النسخ الاحتياطي التلقائي',
        enableEmailNotifications: 'تفعيل الإشعارات البريدية',
        enableSmsNotifications: 'تفعيل الإشعارات عبر الرسائل',
        enablePushNotifications: 'تفعيل الإشعارات الفورية',
        enableLogging: 'تفعيل تسجيل الأحداث',
        logLevelSetting: 'مستوى التسجيل'
    },
    en: {
        // Common
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        search: 'Search',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        info: 'Info',
        back: 'Back',
        logout: 'Logout',
        login: 'Login',
        register: 'Register',
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        confirm: 'Confirm',
        
        // Navigation
        dashboard: 'Dashboard',
        exams: 'Exams',
        students: 'Students',
        courses: 'Courses',
        reports: 'Reports',
        settings: 'Settings',
        home: 'Home',
        profile: 'Profile',
        
        // Settings Page
        systemSettings: 'System Settings',
        generalSettings: 'General Settings',
        securitySettings: 'Security Settings',
        authenticationSettings: 'Authentication Settings',
        systemSettingsTab: 'System Settings',
        
        siteName: 'Site Name',
        defaultLanguage: 'Default Language',
        systemEmail: 'System Email',
        systemPhone: 'System Phone',
        timezone: 'Timezone',
        maintenanceMode: 'Maintenance Mode',
        
        passwordPolicy: 'Password Policy',
        minPasswordLength: 'Minimum Password Length',
        passwordExpiryDays: 'Password Expiry (Days)',
        requireUppercase: 'Require Uppercase',
        requireLowercase: 'Require Lowercase',
        requireNumbers: 'Require Numbers',
        requireSpecialChars: 'Require Special Characters',
        sessionTimeout: 'Session Timeout (Minutes)',
        maxLoginAttempts: 'Max Login Attempts',
        lockoutDuration: 'Lockout Duration (Minutes)',
        rememberMeEnabled: 'Enable Remember Me',
        
        emailVerification: 'Email Verification',
        twoFactorAuth: 'Two-Factor Authentication',
        enableCaptcha: 'Enable CAPTCHA',
        captchaType: 'CAPTCHA Type',
        socialLogin: 'Social Login',
        googleLogin: 'Google Login',
        microsoftLogin: 'Microsoft Login',
        
        backup: 'Backup',
        autoBackup: 'Enable Auto Backup',
        backupFrequency: 'Backup Frequency',
        backupRetention: 'Backup Retention (Days)',
        notifications: 'Notifications',
        emailNotifications: 'Enable Email Notifications',
        smsNotifications: 'Enable SMS Notifications',
        pushNotifications: 'Enable Push Notifications',
        logging: 'Logging',
        enableLogging: 'Enable Logging',
        logLevel: 'Log Level',
        logRetention: 'Log Retention (Days)',
        
        saveSettings: 'Save Settings',
        resetDefaults: 'Reset Defaults',
        languageChanged: 'Language changed successfully',
        settingsSaved: 'Settings saved successfully',
        
        // Dashboard
        welcomeMessage: 'Welcome to Dashboard',
        totalStudents: 'Total Students',
        totalCourses: 'Total Courses',
        totalExams: 'Total Exams',
        recentActivity: 'Recent Activity',
        statistics: 'Statistics',
        quickActions: 'Quick Actions',
        
        // Exams
        createExam: 'Create New Exam',
        examTitle: 'Exam Title',
        examDescription: 'Exam Description',
        examDuration: 'Exam Duration (Minutes)',
        examDate: 'Exam Date',
        examTime: 'Exam Time',
        examStatus: 'Exam Status',
        published: 'Published',
        draft: 'Draft',
        questions: 'Questions',
        results: 'Results',
        viewResults: 'View Results',
        editExam: 'Edit Exam',
        deleteExam: 'Delete Exam',
        
        // Students
        studentName: 'Student Name',
        studentEmail: 'Student Email',
        studentPhone: 'Student Phone',
        studentId: 'Student ID',
        studentStatus: 'Student Status',
        active: 'Active',
        inactive: 'Inactive',
        enrolledCourses: 'Enrolled Courses',
        addStudent: 'Add Student',
        editStudent: 'Edit Student',
        deleteStudent: 'Delete Student',
        
        // Courses
        courseName: 'Course Name',
        courseDescription: 'Course Description',
        courseCode: 'Course Code',
        credits: 'Credits',
        instructor: 'Instructor',
        addCourse: 'Add Course',
        editCourse: 'Edit Course',
        deleteCourse: 'Delete Course',
        
        // Reports
        generateReport: 'Generate Report',
        reportType: 'Report Type',
        dateRange: 'Date Range',
        fromDate: 'From Date',
        toDate: 'To Date',
        exportPDF: 'Export as PDF',
        noDataAvailable: 'No Data Available',
        studentsReport: 'Students Report',
        examsReport: 'Exams Report',
        coursesReport: 'Courses Report',
        
        // Login Page
        username: 'Username',
        password: 'Password',
        forgotPassword: 'Forgot Password?',
        rememberMe: 'Remember Me',
        loginButton: 'Login',
        invalidCredentials: 'Invalid username or password',
        
        // Forms
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        dateOfBirth: 'Date of Birth',
        gender: 'Gender',
        male: 'Male',
        female: 'Female',
        
        // Messages
        confirmDelete: 'Are you sure you want to delete?',
        confirmLogout: 'Are you sure you want to logout?',
        operationSuccess: 'Operation completed successfully',
        operationFailed: 'Operation failed',
        dataLoaded: 'Data loaded',
        noResultsFound: 'No results found',
        selectOption: 'Please select',
        requiredField: 'This field is required',
        invalidEmail: 'Invalid email address',
        invalidPhone: 'Invalid phone number',
        minimumCharactersRequired: 'Minimum characters required',
        afterThisPeriodUserMustChangePassword: 'After this period user must change password',
        afterThisPeriodUserWillBeLoggedOutAutomatically: 'After this period user will be logged out automatically',
        afterTheseAttemptsAccountWillBeLocked: 'After these attempts account will be locked',
        accountLockoutDurationAfterFailedAttempts: 'Account lockout duration after failed attempts',
        systemNameThatWillAppearInAllPages: 'System name that will appear in all pages',
        defaultLanguageForNewUsers: 'Default language for new users',
        emailUsedForNotificationsAndContact: 'Email used for notifications and contact',
        phoneForTechnicalSupport: 'Phone for technical support',
        defaultTimezoneForTheSystem: 'Default timezone for the system',
        ifEnabledUsersCannotAccessTheSystem: 'If enabled, users cannot access the system',
        enableMaintenanceMode: 'Enable Maintenance Mode',
        
        // Table
        id: 'ID',
        name: 'Name',
        actions: 'Actions',
        status: 'Status',
        date: 'Date',
        time: 'Time',
        grade: 'Grade',
        score: 'Score',
        percentage: 'Percentage',
        
        // Timezones
        asiaRiyadh: 'Riyadh (GMT+3)',
        asiaDubai: 'Dubai (GMT+4)',
        asiaCairo: 'Cairo (GMT+2)',
        utc: 'UTC (GMT+0)',
        
        // CAPTCHA Types
        recaptcha: 'reCAPTCHA',
        hcaptcha: 'hCaptcha',
        simple: 'Simple (Math)',
        
        // Log Levels
        errorOnly: 'Errors Only',
        warningAndAbove: 'Warning and Above',
        infoAndAbove: 'Info and Above',
        all: 'All',
        
        // Backup Frequency
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        
        // Additional descriptions
        backupRetentionDays: 'Backup Retention (Days)',
        logRetentionDays: 'Log Retention (Days)',
        enableAutoBackup: 'Enable Auto Backup',
        enableEmailNotifications: 'Enable Email Notifications',
        enableSmsNotifications: 'Enable SMS Notifications',
        enablePushNotifications: 'Enable Push Notifications',
        enableLogging: 'Enable Logging',
        logLevelSetting: 'Log Level'
    }
};

// Language switching functions
function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'ar';
}

function setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    updatePageLanguage(lang);
}

function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang][key] || key;
}

function updatePageLanguage(lang) {
    // Update page title based on current page
    updatePageTitle();
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = t(key);
    });
    
    // Update labels by their for attribute
    document.querySelectorAll('label').forEach(label => {
        const forAttr = label.getAttribute('for');
        if (forAttr) {
            updateLabel(label, forAttr);
        }
    });
    
    // Update input placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
        updatePlaceholder(input);
    });
    
    // Update select options
    document.querySelectorAll('select option').forEach(option => {
        updateSelectOption(option);
    });
    
    // Update buttons and common elements
    updateCommonElements(lang);
    
    // Update table headers
    updateTableHeaders();
    
    // Update card titles and sections
    updateCardTitles();
    
    // Update form fields (most comprehensive update)
    updateFormFields();
    
    // Update navigation buttons specifically
    updateNavigationButtons();
    
    // Update header elements
    updateHeaderElements();
}

function updatePageTitle() {
    const currentPath = window.location.pathname;
    let titleKey = '';
    
    if (currentPath.includes('settings')) titleKey = 'systemSettings';
    else if (currentPath.includes('dashboard')) titleKey = 'dashboard';
    else if (currentPath.includes('exams')) titleKey = 'exams';
    else if (currentPath.includes('students')) titleKey = 'students';
    else if (currentPath.includes('courses')) titleKey = 'courses';
    else if (currentPath.includes('reports')) titleKey = 'reports';
    
    if (titleKey) {
        document.title = t(titleKey) + ' - ExamPro';
    }
}

function updateLabel(label, forAttr) {
    const labelMap = {
        'siteName': t('siteName'),
        'defaultLanguage': t('defaultLanguage'),
        'systemEmail': t('systemEmail'),
        'systemPhone': t('systemPhone'),
        'timezone': t('timezone'),
        'minPasswordLength': t('minPasswordLength'),
        'passwordExpiryDays': t('passwordExpiryDays'),
        'sessionTimeout': t('sessionTimeout'),
        'maxLoginAttempts': t('maxLoginAttempts'),
        'lockoutDuration': t('lockoutDuration'),
        'backupFrequency': t('backupFrequency'),
        'backupRetention': t('backupRetention'),
        'logLevel': t('logLevel'),
        'logRetention': t('logRetention'),
        'captchaType': t('captchaType')
    };
    
    if (labelMap[forAttr]) {
        label.textContent = labelMap[forAttr];
    }
}

function updatePlaceholder(input) {
    const placeholderMap = {
        'admin@exampro.com': t('systemEmail'),
        '+966500000000': t('systemPhone'),
        'ExamPro': t('siteName')
    };
    
    const currentPlaceholder = input.getAttribute('placeholder');
    if (placeholderMap[currentPlaceholder]) {
        input.setAttribute('placeholder', placeholderMap[currentPlaceholder]);
    }
}

function updateSelectOption(option) {
    const optionMap = {
        'Asia/Riyadh': t('asiaRiyadh'),
        'Asia/Dubai': t('asiaDubai'),
        'Asia/Cairo': t('asiaCairo'),
        'UTC': t('utc'),
        'recaptcha': t('recaptcha'),
        'hcaptcha': t('hcaptcha'),
        'simple': t('simple'),
        'daily': t('daily'),
        'weekly': t('weekly'),
        'monthly': t('monthly'),
        'error': t('errorOnly'),
        'warning': t('warningAndAbove'),
        'info': t('infoAndAbove'),
        'debug': t('all')
    };
    
    if (optionMap[option.value]) {
        option.textContent = optionMap[option.value];
    }
}

function updateCommonElements(lang) {
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item, .menu-item');
    navItems.forEach(item => {
        const text = item.textContent.trim();
        if (text.includes('لوحة التحكم') || text.includes('Dashboard')) item.textContent = t('dashboard');
        if (text.includes('الاختبارات') || text.includes('Exams')) item.textContent = t('exams');
        if (text.includes('الطلاب') || text.includes('Students')) item.textContent = t('students');
        if (text.includes('الدورات') || text.includes('Courses')) item.textContent = t('courses');
        if (text.includes('التقارير') || text.includes('Reports')) item.textContent = t('reports');
        if (text.includes('الإعدادات') || text.includes('Settings')) item.textContent = t('settings');
    });
    
    // Update buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        const text = btn.textContent.trim();
        if (text.includes('حفظ') || text.includes('Save')) btn.textContent = t('save');
        if (text.includes('إلغاء') || text.includes('Cancel')) btn.textContent = t('cancel');
        if (text.includes('حذف') || text.includes('Delete')) btn.textContent = t('delete');
        if (text.includes('تعديل') || text.includes('Edit')) btn.textContent = t('edit');
        if (text.includes('إضافة') || text.includes('Add')) btn.textContent = t('add');
        if (text.includes('بحث') || text.includes('Search')) btn.textContent = t('search');
        if (text.includes('رجوع') || text.includes('Back')) btn.textContent = t('back');
        if (text.includes('تسجيل الخروج') || text.includes('Logout')) btn.textContent = t('logout');
        if (text.includes('حفظ الإعدادات') || text.includes('Save Settings')) btn.textContent = t('saveSettings');
        if (text.includes('استعادة الافتراضيات') || text.includes('Reset Defaults')) btn.textContent = t('resetDefaults');
    });
    
    // Update headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        const text = heading.textContent.trim();
        if (text.includes('إعدادات النظام') || text.includes('System Settings')) heading.textContent = t('systemSettings');
        if (text.includes('الإعدادات العامة') || text.includes('General Settings')) heading.textContent = t('generalSettings');
        if (text.includes('إعدادات الأمان') || text.includes('Security Settings')) heading.textContent = t('securitySettings');
        if (text.includes('إعدادات المصادقة') || text.includes('Authentication Settings')) heading.textContent = t('authenticationSettings');
    });
}

function updateTableHeaders() {
    const headers = document.querySelectorAll('th');
    headers.forEach(header => {
        const text = header.textContent.trim();
        if (text.includes('الرقم') || text.includes('ID')) header.textContent = t('id');
        if (text.includes('الاسم') || text.includes('Name')) header.textContent = t('name');
        if (text.includes('الإجراءات') || text.includes('Actions')) header.textContent = t('actions');
        if (text.includes('الحالة') || text.includes('Status')) header.textContent = t('status');
        if (text.includes('التاريخ') || text.includes('Date')) header.textContent = t('date');
        if (text.includes('الوقت') || text.includes('Time')) header.textContent = t('time');
    });
}

function updateCardTitles() {
    document.querySelectorAll('.card-title, .section-title').forEach(title => {
        const text = title.textContent.trim();
        if (text.includes('إعدادات النظام') || text.includes('System Settings')) title.textContent = t('systemSettings');
        if (text.includes('سياسة كلمات المرور') || text.includes('Password Policy')) title.textContent = t('passwordPolicy');
        if (text.includes('إعدادات الجلسة') || text.includes('Session Settings')) title.textContent = t('sessionTimeout');
    });
}

function updateFormFields() {
    // Update all labels by their text content
    document.querySelectorAll('label').forEach(label => {
        const text = label.textContent.trim();
        
        // Settings labels
        if (text.includes('اسم الموقع') || text.includes('Site Name')) label.textContent = t('siteName');
        if (text.includes('اللغة الافتراضية') || text.includes('Default Language')) label.textContent = t('defaultLanguage');
        if (text.includes('البريد الإلكتروني للنظام') || text.includes('System Email')) label.textContent = t('systemEmail');
        if (text.includes('رقم هاتف النظام') || text.includes('System Phone')) label.textContent = t('systemPhone');
        if (text.includes('المنطقة الزمنية') || text.includes('Timezone')) label.textContent = t('timezone');
        if (text.includes('وضع الصيانة') || text.includes('Maintenance Mode')) label.textContent = t('maintenanceMode');
        
        // Security labels
        if (text.includes('الحد الأدنى لطول كلمة المرور') || text.includes('Minimum Password Length')) label.textContent = t('minPasswordLength');
        if (text.includes('انتهاء صلاحية كلمة المرور') || text.includes('Password Expiry')) label.textContent = t('passwordExpiryDays');
        if (text.includes('انتهاء صلاحية الجلسة') || text.includes('Session Timeout')) label.textContent = t('sessionTimeout');
        if (text.includes('الحد الأقصى للمحاولات الفاشلة') || text.includes('Max Login Attempts')) label.textContent = t('maxLoginAttempts');
        if (text.includes('مدة قفل الحساب') || text.includes('Lockout Duration')) label.textContent = t('lockoutDuration');
        
        // System labels
        if (text.includes('تكرار النسخ الاحتياطي') || text.includes('Backup Frequency')) label.textContent = t('backupFrequency');
        if (text.includes('الاحتفاظ بالنسخ الاحتياطية') || text.includes('Backup Retention')) label.textContent = t('backupRetentionDays');
        if (text.includes('الاحتفاظ بالسجلات') || text.includes('Log Retention')) label.textContent = t('logRetentionDays');
        if (text.includes('مستوى التسجيل') || text.includes('Log Level')) label.textContent = t('logLevelSetting');
        
        // Checkbox labels
        if (text.includes('تفعيل النسخ الاحتياطي التلقائي') || text.includes('Enable Auto Backup')) label.textContent = t('enableAutoBackup');
        if (text.includes('تفعيل الإشعارات البريدية') || text.includes('Enable Email Notifications')) label.textContent = t('enableEmailNotifications');
        if (text.includes('تفعيل الإشعارات عبر الرسائل') || text.includes('Enable SMS Notifications')) label.textContent = t('enableSmsNotifications');
        if (text.includes('تفعيل الإشعارات الفورية') || text.includes('Enable Push Notifications')) label.textContent = t('enablePushNotifications');
        if (text.includes('تفعيل تسجيل الأحداث') || text.includes('Enable Logging')) label.textContent = t('enableLogging');
        
        // Update small text descriptions
        const smallText = label.nextElementSibling;
        if (smallText && smallText.tagName === 'SMALL') {
            const smallTextContent = smallText.textContent.trim();
            if (smallTextContent.includes('عدد الأحرف الأدنى المطلوب') || smallTextContent.includes('Minimum characters required')) {
                smallText.textContent = t('minimumCharactersRequired');
            }
            if (smallTextContent.includes('بعد هذه المدة يجب على المستخدم تغيير كلمة المرور') || smallTextContent.includes('After this period user must change password')) {
                smallText.textContent = t('afterThisPeriodUserMustChangePassword');
            }
            if (smallTextContent.includes('بعد هذه المدة يتم تسجيل الخروج تلقائياً') || smallTextContent.includes('After this period user will be logged out automatically')) {
                smallText.textContent = t('afterThisPeriodUserWillBeLoggedOutAutomatically');
            }
            if (smallTextContent.includes('بعد هذه المحاولات يتم قفل الحساب') || smallTextContent.includes('After these attempts account will be locked')) {
                smallText.textContent = t('afterTheseAttemptsAccountWillBeLocked');
            }
            if (smallTextContent.includes('مدة قفل الحساب بعد المحاولات الفاشلة') || smallTextContent.includes('Account lockout duration after failed attempts')) {
                smallText.textContent = t('accountLockoutDurationAfterFailedAttempts');
            }
            if (smallTextContent.includes('اسم النظام الذي سيظهر في جميع الصفحات') || smallTextContent.includes('System name that will appear in all pages')) {
                smallText.textContent = t('systemNameThatWillAppearInAllPages');
            }
            if (smallTextContent.includes('اللغة الافتراضية للمستخدمين الجدد') || smallTextContent.includes('Default language for new users')) {
                smallText.textContent = t('defaultLanguageForNewUsers');
            }
            if (smallTextContent.includes('البريد المستخدم للإشعارات والاتصال') || smallTextContent.includes('Email used for notifications and contact')) {
                smallText.textContent = t('emailUsedForNotificationsAndContact');
            }
            if (smallTextContent.includes('رقم الهاتف للدعم الفني') || smallTextContent.includes('Phone for technical support')) {
                smallText.textContent = t('phoneForTechnicalSupport');
            }
            if (smallTextContent.includes('المنطقة الزمنية الافتراضية للنظام') || smallTextContent.includes('Default timezone for the system')) {
                smallText.textContent = t('defaultTimezoneForTheSystem');
            }
            if (smallTextContent.includes('إذا تم تفعيله، لن يتمكن المستخدمون من الوصول للنظام') || smallTextContent.includes('If enabled, users cannot access the system')) {
                smallText.textContent = t('ifEnabledUsersCannotAccessTheSystem');
            }
        }
    });
    
    // Update checkboxes labels (including those next to checkboxes)
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        // Find label by "for" attribute or next sibling
        let label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (!label) {
            // Look for label that contains this checkbox
            const parent = checkbox.parentElement;
            if (parent.tagName === 'LABEL') {
                label = parent;
            } else {
                // Look for next element that might be a label
                let nextElement = checkbox.nextElementSibling;
                while (nextElement) {
                    if (nextElement.tagName === 'LABEL') {
                        label = nextElement;
                        break;
                    }
                    nextElement = nextElement.nextElementSibling;
                }
            }
        }
        
        if (label) {
            const text = label.textContent.trim();
            if (text.includes('يتطلب أحرف كبيرة') || text.includes('Require Uppercase')) label.textContent = t('requireUppercase');
            if (text.includes('يتطلب أحرف صغيرة') || text.includes('Require Lowercase')) label.textContent = t('requireLowercase');
            if (text.includes('يتطلب أرقام') || text.includes('Require Numbers')) label.textContent = t('requireNumbers');
            if (text.includes('يتطلب أحرف خاصة') || text.includes('Require Special Characters')) label.textContent = t('requireSpecialChars');
            if (text.includes('تفعيل "تذكرني"') || text.includes('Enable Remember Me')) label.textContent = t('rememberMeEnabled');
            if (text.includes('تفعيل وضع الصيانة') || text.includes('Enable Maintenance Mode')) label.textContent = t('maintenanceMode');
            if (text.includes('تفعيل النسخ الاحتياطي التلقائي') || text.includes('Enable Auto Backup')) label.textContent = t('enableAutoBackup');
            if (text.includes('تفعيل الإشعارات البريدية') || text.includes('Enable Email Notifications')) label.textContent = t('enableEmailNotifications');
            if (text.includes('تفعيل الإشعارات عبر الرسائل') || text.includes('Enable SMS Notifications')) label.textContent = t('enableSmsNotifications');
            if (text.includes('تفعيل الإشعارات الفورية') || text.includes('Enable Push Notifications')) label.textContent = t('enablePushNotifications');
            if (text.includes('تفعيل تسجيل الأحداث') || text.includes('Enable Logging')) label.textContent = t('enableLogging');
        }
    });
    
    // Update all h3 headings
    document.querySelectorAll('h3').forEach(heading => {
        const text = heading.textContent.trim();
        if (text.includes('سياسة كلمات المرور') || text.includes('Password Policy')) heading.textContent = t('passwordPolicy');
        if (text.includes('إعدادات الجلسة') || text.includes('Session Settings')) heading.textContent = t('sessionTimeout');
        if (text.includes('إعدادات تسجيل الدخول') || text.includes('Login Settings')) heading.textContent = t('authenticationSettings');
        if (text.includes('التحقق من البريد الإلكتروني') || text.includes('Email Verification')) heading.textContent = t('emailVerification');
        if (text.includes('المصادقة الثنائية') || text.includes('Two-Factor Authentication')) heading.textContent = t('twoFactorAuth');
        if (text.includes('الحماية من الروبوتات') || text.includes('Bot Protection')) heading.textContent = t('enableCaptcha');
        if (text.includes('تسجيل الدخول الاجتماعي') || text.includes('Social Login')) heading.textContent = t('socialLogin');
        if (text.includes('النسخ الاحتياطي') || text.includes('Backup')) heading.textContent = t('backup');
        if (text.includes('الإشعارات') || text.includes('Notifications')) heading.textContent = t('notifications');
        if (text.includes('تسجيل الأحداث') || text.includes('Logging')) heading.textContent = t('logging');
    });
    
    // Update all h2 headings
    document.querySelectorAll('h2').forEach(heading => {
        const text = heading.textContent.trim();
        if (text.includes('الإعدادات العامة') || text.includes('General Settings')) heading.textContent = t('generalSettings');
        if (text.includes('إعدادات الأمان') || text.includes('Security Settings')) heading.textContent = t('securitySettings');
        if (text.includes('إعدادات تسجيل الدخول') || text.includes('Authentication Settings')) heading.textContent = t('authenticationSettings');
        if (text.includes('إعدادات النظام') || text.includes('System Settings')) heading.textContent = t('systemSettings');
    });
}

// Update navigation buttons specifically
function updateNavigationButtons() {
    // Update navigation tab buttons
    document.querySelectorAll('.btn').forEach(btn => {
        const text = btn.textContent.trim();
        
        // Navigation tabs
        if (text.includes('الإعدادات العامة') || text.includes('General Settings')) btn.textContent = t('generalSettings');
        if (text.includes('الأمان') || text.includes('Security')) btn.textContent = t('securitySettings');
        if (text.includes('المصادقة') || text.includes('Authentication')) btn.textContent = t('authenticationSettings');
        if (text.includes('النظام') || text.includes('System')) btn.textContent = t('systemSettings');
        
        // Action buttons
        if (text.includes('حفظ الإعدادات') || text.includes('Save Settings')) btn.textContent = t('saveSettings');
        if (text.includes('استعادة الافتراضيات') || text.includes('Reset Defaults')) btn.textContent = t('resetDefaults');
        if (text.includes('حفظ') || text.includes('Save')) btn.textContent = t('save');
        if (text.includes('إلغاء') || text.includes('Cancel')) btn.textContent = t('cancel');
        if (text.includes('حذف') || text.includes('Delete')) btn.textContent = t('delete');
        if (text.includes('تعديل') || text.includes('Edit')) btn.textContent = t('edit');
        if (text.includes('إضافة') || text.includes('Add')) btn.textContent = t('add');
        if (text.includes('بحث') || text.includes('Search')) btn.textContent = t('search');
        if (text.includes('رجوع') || text.includes('Back')) btn.textContent = t('back');
        if (text.includes('تسجيل الخروج') || text.includes('Logout')) btn.textContent = t('logout');
    });
}

// Update header elements specifically
function updateHeaderElements() {
    // Update main header h1
    const mainHeader = document.querySelector('h1');
    if (mainHeader) {
        const text = mainHeader.textContent.trim();
        if (text.includes('إعدادات النظام') || text.includes('System Settings')) mainHeader.textContent = t('systemSettings');
    }
    
    // Update header subtitle p
    const headerSubtitle = document.querySelector('header p, .header-subtitle');
    if (headerSubtitle) {
        const text = headerSubtitle.textContent.trim();
        if (text.includes('إدارة إعدادات النظام والتطبيق') || text.includes('Manage system and application settings')) {
            headerSubtitle.textContent = t('systemSettings') === 'إعدادات النظام' ? 'إدارة إعدادات النظام والتطبيق' : 'Manage system and application settings';
        }
    }
}

// Apply language to all pages
function applyLanguageToAllPages() {
    const lang = getCurrentLanguage();
    updatePageLanguage(lang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = getCurrentLanguage();
    setLanguage(currentLang);
    
    // Listen for language changes
    window.addEventListener('storage', function(e) {
        if (e.key === 'selectedLanguage') {
            updatePageLanguage(e.newValue);
        }
    });
});

// Export functions for global use
window.t = t;
window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.updatePageLanguage = updatePageLanguage;
