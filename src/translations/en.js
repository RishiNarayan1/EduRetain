// English translations (Default)
const en = {
  // Navigation
  nav: {
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    simulator: 'Simulator',
    settings: 'Settings',
    logout: 'Logout',
    logoutConfirm: 'Are you sure to log out?',
  },

  // Language selector
  language: {
    label: 'Language',
    english: 'English',
    hindi: 'हिन्दी',
    telugu: 'తెలుగు',
  },

  // Dashboard
  dashboard: {
    title: 'Dashboard Overview',
    subtitle: 'Real-time insights into student retention and risk factors.',
    totalStudents: 'Total Students Tracked',
    avgDropoutRate: 'Avg. Dropout Rate',
    highRiskZones: 'High Risk Zones',
    criticalAlertZones: 'Critical Alert Zones',
    recentRiskAlerts: 'Recent Risk Alerts',
    dropoutRate: 'Dropout Rate',
    filters: 'Filters',
    tabs: {
      overview: 'Overview',
      stateComparison: 'State Comparison',
      trends: 'Trends',
      genderAnalysis: 'Gender Analysis',
    },
    topHighDropoutStates: 'Top 10 High Dropout States',
    topBestPerformingStates: 'Top 10 Best Performing States',
  },

  // Analytics
  analytics: {
    title: 'Deep Dive Analytics',
    subtitle: 'Comprehensive analysis across multiple dimensions.',
    tabs: {
      schoolPerformance: 'School Performance',
      geographicAnalysis: 'Geographic Analysis',
      genderDisparity: 'Gender Disparity',
      socialTrends: 'Social Trends',
      studentJourney: 'Student Journey',
    },
    schoolWiseDropout: 'School-wise Dropout Rates',
    enrollmentDistribution: 'Enrollment Distribution',
    dropoutByGender: 'Dropout Rate by Gender',
    geoRiskHeatmap: 'Geographic Risk Heatmap',
    lowRisk: 'Low Risk',
    mediumRisk: 'Medium Risk',
    highRisk: 'High Risk',
    mapFootnote: '* Interactive visualization of school locations. Size indicates dropout magnitude. Color indicates risk level.',
    socialVulnerability: 'Social Category Vulnerability Analysis',
    socialFootnote: '* Radar chart highlights which social groups are most vulnerable to dropping out.',
    studentTimeline: 'Student Journey Timeline: Critical Drop-off Points',
    age: 'Age',
    drop: 'Drop',
    stable: 'Stable',
  },

  // Simulator
  simulator: {
    title: 'Intervention Simulator',
    subtitle: '"What-If" Analysis: Predict the impact of policy changes.',
    policyAdjustments: 'Policy Adjustments',
    impact: 'Impact',
    cost: 'Cost',
    predictedDropoutRate: 'Predicted Dropout Rate',
    reduction: 'Reduction',
    estimatedBudget: 'Estimated Budget Required',
    currentRate: 'Current Rate',
    predictedRate: 'Predicted Rate',
  },

  // AI Assistant
  ai: {
    title: 'AI Assistant',
    generateReport: 'Generate Full Report',
    recommendation: 'Recommendation',
    suggestions: {
      critical1: {
        title: 'High Dropout in Grade 9 (Girls)',
        message: 'Detected a 12% spike in dropouts for girls transitioning to Secondary school.',
        recommendation: 'Install sanitary vending machines and initiate mentorship programs in affected districts.',
      },
      warning1: {
        title: 'Rising Trends in North District',
        message: 'Dropout rates in North District have increased by 2% this quarter.',
        recommendation: 'Review transport facilities and scholarship disbursement delays in this region.',
      },
      info1: {
        title: 'Positive Impact Detected',
        message: 'Mid-day meal enhancement has correlated with 5% better retention in Primary schools.',
        recommendation: 'Consider expanding this program to Upper Primary schools.',
      },
    },
  },

  // Settings
  settings: {
    title: 'Settings',
    subtitle: 'Manage your preferences and account settings',
    language: 'Language',
    languageDescription: 'Select your preferred language for the interface',
    appearance: 'Appearance',
    themeDescription: 'Customize the look and feel of the application',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    notifications: 'Notifications',
    notificationsDescription: 'Configure how you receive alerts and updates',
    emailAlerts: 'Email Alerts',
    pushNotifications: 'Push Notifications',
    weeklyReports: 'Weekly Reports',
    criticalAlerts: 'Critical Alerts',
    alertThresholds: 'Alert Thresholds',
    alertThresholdsDescription: 'Configure when to receive dropout risk alerts',
    dropoutRateThreshold: 'Dropout Rate Alert Threshold',
    alertNote: "You'll receive alerts when any region's dropout rate exceeds the threshold",
    dataExport: 'Data Export',
    dataExportDescription: 'Download your analytics data in various formats',
    account: 'Account',
    profile: 'Profile Settings',
    security: 'Security',
  },

  // Authentication
  auth: {
    welcomeBack: 'Welcome Back',
    loginSubtitle: 'Sign in to access your dashboard',
    createAccount: 'Create Account',
    registerSubtitle: 'Join EduRetain to start tracking',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    forgotPassword: 'Forgot password?',
    loginButton: 'Sign In',
    registerButton: 'Create Account',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    registerLink: 'Create account',
    loginLink: 'Sign In',
  },

  // Common
  common: {
    appName: 'EduRetain',
    user: 'User',
  },
};

export default en;

