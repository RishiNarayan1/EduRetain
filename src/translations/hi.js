// Hindi translations (हिन्दी)
const hi = {
  // Navigation
  nav: {
    dashboard: 'डैशबोर्ड',
    analytics: 'विश्लेषण',
    simulator: 'सिम्युलेटर',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
  },

  // Language selector
  language: {
    label: 'भाषा',
    english: 'English',
    hindi: 'हिन्दी',
    telugu: 'తెలుగు',
  },

  // Dashboard
  dashboard: {
    title: 'डैशबोर्ड अवलोकन',
    subtitle: 'छात्र प्रतिधारण और जोखिम कारकों की वास्तविक समय जानकारी।',
    totalStudents: 'कुल ट्रैक किए गए छात्र',
    avgDropoutRate: 'औसत ड्रॉपआउट दर',
    highRiskZones: 'उच्च जोखिम क्षेत्र',
    criticalAlertZones: 'गंभीर अलर्ट क्षेत्र',
    recentRiskAlerts: 'हाल के जोखिम अलर्ट',
    dropoutRate: 'ड्रॉपआउट दर',
    filters: 'फिल्टर',
    tabs: {
      overview: 'अवलोकन',
      stateComparison: 'राज्य तुलना',
      trends: 'रुझान',
      genderAnalysis: 'लिंग विश्लेषण',
    },
    topHighDropoutStates: 'शीर्ष 10 उच्च ड्रॉपआउट राज्य',
    topBestPerformingStates: 'शीर्ष 10 सर्वश्रेष्ठ प्रदर्शन करने वाले राज्य',
  },

  // Analytics
  analytics: {
    title: 'गहन विश्लेषण',
    subtitle: 'कई आयामों में व्यापक विश्लेषण।',
    tabs: {
      schoolPerformance: 'स्कूल प्रदर्शन',
      geographicAnalysis: 'भौगोलिक विश्लेषण',
      genderDisparity: 'लिंग असमानता',
      socialTrends: 'सामाजिक रुझान',
      studentJourney: 'छात्र यात्रा',
    },
    schoolWiseDropout: 'स्कूल-वार ड्रॉपआउट दरें',
    enrollmentDistribution: 'नामांकन वितरण',
    dropoutByGender: 'लिंग के अनुसार ड्रॉपआउट दर',
    geoRiskHeatmap: 'भौगोलिक जोखिम हीटमैप',
    lowRisk: 'कम जोखिम',
    mediumRisk: 'मध्यम जोखिम',
    highRisk: 'उच्च जोखिम',
    mapFootnote: '* स्कूल स्थानों का इंटरैक्टिव विज़ुअलाइज़ेशन। आकार ड्रॉपआउट परिमाण दर्शाता है। रंग जोखिम स्तर दर्शाता है।',
    socialVulnerability: 'सामाजिक श्रेणी भेद्यता विश्लेषण',
    socialFootnote: '* रडार चार्ट दर्शाता है कि कौन से सामाजिक समूह ड्रॉपआउट के लिए सबसे अधिक संवेदनशील हैं।',
    studentTimeline: 'छात्र यात्रा समयरेखा: महत्वपूर्ण ड्रॉप-ऑफ बिंदु',
    age: 'आयु',
    drop: 'ड्रॉप',
    stable: 'स्थिर',
  },

  // Simulator
  simulator: {
    title: 'हस्तक्षेप सिम्युलेटर',
    subtitle: '"क्या-अगर" विश्लेषण: नीति परिवर्तनों के प्रभाव का अनुमान लगाएं।',
    policyAdjustments: 'नीति समायोजन',
    impact: 'प्रभाव',
    cost: 'लागत',
    predictedDropoutRate: 'अनुमानित ड्रॉपआउट दर',
    reduction: 'कमी',
    estimatedBudget: 'अनुमानित बजट आवश्यक',
    currentRate: 'वर्तमान दर',
    predictedRate: 'अनुमानित दर',
  },

  // AI Assistant
  ai: {
    title: 'AI सहायक',
    generateReport: 'पूर्ण रिपोर्ट जनरेट करें',
    recommendation: 'सिफारिश',
    suggestions: {
      critical1: {
        title: 'कक्षा 9 में उच्च ड्रॉपआउट (लड़कियां)',
        message: 'माध्यमिक विद्यालय में संक्रमण करने वाली लड़कियों के ड्रॉपआउट में 12% की वृद्धि पाई गई।',
        recommendation: 'प्रभावित जिलों में सैनिटरी वेंडिंग मशीनें लगाएं और मेंटरशिप कार्यक्रम शुरू करें।',
      },
      warning1: {
        title: 'उत्तर जिले में बढ़ते रुझान',
        message: 'इस तिमाही में उत्तर जिले में ड्रॉपआउट दर 2% बढ़ी है।',
        recommendation: 'इस क्षेत्र में परिवहन सुविधाओं और छात्रवृत्ति वितरण में देरी की समीक्षा करें।',
      },
      info1: {
        title: 'सकारात्मक प्रभाव पाया गया',
        message: 'मध्याह्न भोजन संवर्धन प्राथमिक विद्यालयों में 5% बेहतर प्रतिधारण से संबंधित है।',
        recommendation: 'इस कार्यक्रम को उच्च प्राथमिक विद्यालयों में विस्तारित करने पर विचार करें।',
      },
    },
  },

  // Settings
  settings: {
    title: 'सेटिंग्स',
    subtitle: 'अपनी प्राथमिकताएं और खाता सेटिंग्स प्रबंधित करें',
    language: 'भाषा',
    languageDescription: 'इंटरफ़ेस के लिए अपनी पसंदीदा भाषा चुनें',
    appearance: 'दिखावट',
    themeDescription: 'एप्लिकेशन के रूप और अनुभव को अनुकूलित करें',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड',
    notifications: 'सूचनाएं',
    notificationsDescription: 'अलर्ट और अपडेट प्राप्त करने का तरीका कॉन्फ़िगर करें',
    emailAlerts: 'ईमेल अलर्ट',
    pushNotifications: 'पुश नोटिफिकेशन',
    weeklyReports: 'साप्ताहिक रिपोर्ट',
    criticalAlerts: 'गंभीर अलर्ट',
    alertThresholds: 'अलर्ट सीमाएं',
    alertThresholdsDescription: 'ड्रॉपआउट जोखिम अलर्ट कब प्राप्त करें कॉन्फ़िगर करें',
    dropoutRateThreshold: 'ड्रॉपआउट दर अलर्ट सीमा',
    alertNote: 'जब किसी क्षेत्र की ड्रॉपआउट दर सीमा से अधिक हो जाएगी तो आपको अलर्ट प्राप्त होंगे',
    dataExport: 'डेटा निर्यात',
    dataExportDescription: 'विभिन्न प्रारूपों में अपना विश्लेषण डेटा डाउनलोड करें',
    account: 'खाता',
    profile: 'प्रोफ़ाइल सेटिंग्स',
    security: 'सुरक्षा',
  },

  // Authentication
  auth: {
    welcomeBack: 'वापसी पर स्वागत है',
    loginSubtitle: 'अपने डैशबोर्ड तक पहुंचने के लिए साइन इन करें',
    createAccount: 'खाता बनाएं',
    registerSubtitle: 'ट्रैकिंग शुरू करने के लिए एडुरिटेन से जुड़ें',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    fullName: 'पूरा नाम',
    forgotPassword: 'पासवर्ड भूल गए?',
    loginButton: 'साइन इन करें',
    registerButton: 'खाता बनाएं',
    noAccount: 'क्या कोई खाता नहीं है?',
    hasAccount: 'क्या पहले से ही खाता है?',
    registerLink: 'खाता बनाएं',
    loginLink: 'साइन इन करें',
  },

  // Common
  common: {
    appName: 'एडुरिटेन',
    user: 'उपयोगकर्ता',
  },
};

export default hi;

