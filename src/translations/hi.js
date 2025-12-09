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

  // Common
  common: {
    appName: 'एडुरिटेन',
  },
};

export default hi;
