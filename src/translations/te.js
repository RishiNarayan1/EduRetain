// Telugu translations (తెలుగు)
const te = {
  // Navigation
  nav: {
    dashboard: 'డ్యాష్‌బోర్డ్',
    analytics: 'విశ్లేషణ',
    simulator: 'సిమ్యులేటర్',
    settings: 'సెట్టింగ్‌లు',
    logout: 'లాగ్ అవుట్',
  },

  // Language selector
  language: {
    label: 'భాష',
    english: 'English',
    hindi: 'हिन्दी',
    telugu: 'తెలుగు',
  },

  // Dashboard
  dashboard: {
    title: 'డ్యాష్‌బోర్డ్ అవలోకనం',
    subtitle: 'విద్యార్థి నిలుపుదల మరియు ప్రమాద కారకాల యొక్క నిజ-సమయ అంతర్దృష్టులు.',
    totalStudents: 'మొత్తం ట్రాక్ చేసిన విద్యార్థులు',
    avgDropoutRate: 'సగటు డ్రాపౌట్ రేటు',
    highRiskZones: 'అధిక ప్రమాద జోన్లు',
    criticalAlertZones: 'తీవ్రమైన అలర్ట్ జోన్లు',
    recentRiskAlerts: 'ఇటీవలి ప్రమాద హెచ్చరికలు',
    dropoutRate: 'డ్రాపౌట్ రేటు',
    filters: 'ఫిల్టర్లు',
    tabs: {
      overview: 'అవలోకనం',
      stateComparison: 'రాష్ట్ర పోలిక',
      trends: 'పోకడలు',
      genderAnalysis: 'లింగ విశ్లేషణ',
    },
    topHighDropoutStates: 'అత్యధిక డ్రాపౌట్ ఉన్న టాప్ 10 రాష్ట్రాలు',
    topBestPerformingStates: 'ఉత్తమ పనితీరు కనబరుస్తున్న టాప్ 10 రాష్ట్రాలు',
  },

  // Analytics
  analytics: {
    title: 'లోతైన విశ్లేషణ',
    subtitle: 'బహుళ కోణాలలో సమగ్ర విశ్లేషణ.',
    tabs: {
      schoolPerformance: 'పాఠశాల పనితీరు',
      geographicAnalysis: 'భౌగోళిక విశ్లేషణ',
      genderDisparity: 'లింగ అసమానత',
      socialTrends: 'సామాజిక పోకడలు',
      studentJourney: 'విద్యార్థి ప్రయాణం',
    },
    schoolWiseDropout: 'పాఠశాల వారీగా డ్రాపౌట్ రేట్లు',
    enrollmentDistribution: 'నమోదు పంపిణీ',
    dropoutByGender: 'లింగం ప్రకారం డ్రాపౌట్ రేటు',
    geoRiskHeatmap: 'భౌగోళిక ప్రమాద హీట్‌మ్యాప్',
    lowRisk: 'తక్కువ ప్రమాదం',
    mediumRisk: 'మధ్యస్థ ప్రమాదం',
    highRisk: 'అధిక ప్రమాదం',
    mapFootnote: '* పాఠశాల స్థానాల ఇంటరాక్టివ్ విజువలైజేషన్. పరిమాణం డ్రాపౌట్ తీవ్రతను సూచిస్తుంది. రంగు ప్రమాద స్థాయిని సూచిస్తుంది.',
    socialVulnerability: 'సామాజిక వర్గం హానికరత విశ్లేషణ',
    socialFootnote: '* రాడార్ చార్ట్ ఏ సామాజిక సమూహాలు డ్రాపౌట్‌కు అత్యంత హానికరమైనవో హైలైట్ చేస్తుంది.',
    studentTimeline: 'విద్యార్థి ప్రయాణ టైమ్‌లైన్: క్లిష్టమైన డ్రాప్-ఆఫ్ పాయింట్లు',
    age: 'వయస్సు',
    drop: 'డ్రాప్',
    stable: 'స్థిరం',
  },

  // Simulator
  simulator: {
    title: 'జోక్య సిమ్యులేటర్',
    subtitle: '"ఏమి-అయితే" విశ్లేషణ: విధాన మార్పుల ప్రభావాన్ని అంచనా వేయండి.',
    policyAdjustments: 'విధాన సర్దుబాట్లు',
    impact: 'ప్రభావం',
    cost: 'ఖర్చు',
    predictedDropoutRate: 'అంచనా వేసిన డ్రాపౌట్ రేటు',
    reduction: 'తగ్గింపు',
    estimatedBudget: 'అంచనా బడ్జెట్ అవసరం',
    currentRate: 'ప్రస్తుత రేటు',
    predictedRate: 'అంచనా రేటు',
  },

  // AI Assistant
  ai: {
    title: 'AI సహాయకుడు',
    generateReport: 'పూర్తి నివేదిక రూపొందించండి',
    recommendation: 'సిఫార్సు',
    suggestions: {
      critical1: {
        title: '9వ తరగతిలో అధిక డ్రాపౌట్ (బాలికలు)',
        message: 'మాధ్యమిక పాఠశాలకు మారుతున్న బాలికల డ్రాపౌట్‌లో 12% పెరుగుదల గుర్తించబడింది.',
        recommendation: 'ప్రభావిత జిల్లాలలో శానిటరీ వెండింగ్ మెషీన్లు ఏర్పాటు చేసి మెంటార్‌షిప్ ప్రోగ్రామ్‌లు ప్రారంభించండి.',
      },
      warning1: {
        title: 'ఉత్తర జిల్లాలో పెరుగుతున్న పోకడలు',
        message: 'ఈ త్రైమాసికంలో ఉత్తర జిల్లాలో డ్రాపౌట్ రేట్లు 2% పెరిగాయి.',
        recommendation: 'ఈ ప్రాంతంలో రవాణా సౌకర్యాలు మరియు స్కాలర్‌షిప్ పంపిణీ ఆలస్యాలను సమీక్షించండి.',
      },
      info1: {
        title: 'సానుకూల ప్రభావం గుర్తించబడింది',
        message: 'మధ్యాహ్న భోజన మెరుగుదల ప్రాథమిక పాఠశాలల్లో 5% మెరుగైన నిలుపుదలతో సంబంధం కలిగి ఉంది.',
        recommendation: 'ఈ కార్యక్రమాన్ని ఉన్నత ప్రాథమిక పాఠశాలలకు విస్తరించడాన్ని పరిగణించండి.',
      },
    },
  },

  // Settings
  settings: {
    title: 'సెట్టింగ్‌లు',
    subtitle: 'మీ ప్రాధాన్యతలు మరియు ఖాతా సెట్టింగ్‌లను నిర్వహించండి',
    language: 'భాష',
    languageDescription: 'ఇంటర్‌ఫేస్ కోసం మీ ఇష్టమైన భాషను ఎంచుకోండి',
    appearance: 'రూపం',
    themeDescription: 'అప్లికేషన్ రూపాన్ని అనుకూలీకరించండి',
    darkMode: 'డార్క్ మోడ్',
    lightMode: 'లైట్ మోడ్',
    notifications: 'నోటిఫికేషన్లు',
    notificationsDescription: 'అలర్ట్‌లు మరియు అప్‌డేట్‌లను ఎలా స్వీకరించాలో కాన్ఫిగర్ చేయండి',
    emailAlerts: 'ఇమెయిల్ అలర్ట్‌లు',
    pushNotifications: 'పుష్ నోటిఫికేషన్లు',
    weeklyReports: 'వారపు నివేదికలు',
    criticalAlerts: 'క్లిష్టమైన అలర్ట్‌లు',
    alertThresholds: 'అలర్ట్ పరిమితులు',
    alertThresholdsDescription: 'డ్రాపౌట్ ప్రమాద అలర్ట్‌లను ఎప్పుడు స్వీకరించాలో కాన్ఫిగర్ చేయండి',
    dropoutRateThreshold: 'డ్రాపౌట్ రేటు అలర్ట్ పరిమితి',
    alertNote: 'ఏదైనా ప్రాంతం డ్రాపౌట్ రేటు పరిమితిని మించినప్పుడు మీకు అలర్ట్‌లు వస్తాయి',
    dataExport: 'డేటా ఎగుమతి',
    dataExportDescription: 'వివిధ ఫార్మాట్‌లలో మీ విశ్లేషణ డేటాను డౌన్‌లోడ్ చేయండి',
    account: 'ఖాతా',
    profile: 'ప్రొఫైల్ సెట్టింగ్‌లు',
    security: 'భద్రత',
  },

  // Authentication
  auth: {
    welcomeBack: 'స్వాగతం',
    loginSubtitle: 'మీ డ్యాష్‌బోర్డ్‌ని యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి',
    createAccount: 'ఖాతాను సృష్టించండి',
    registerSubtitle: 'ట్రాకింగ్ ప్రారంభించడానికి ఎడ్యురిటైన్‌లో చేరండి',
    email: 'ఇమెయిల్ చిరునామా',
    password: 'పాస్‌వర్డ్',
    confirmPassword: 'పాస్‌వర్డ్‌ను నిర్ధారించండి',
    fullName: 'పూర్తి పేరు',
    forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    loginButton: 'సైన్ ఇన్ చేయండి',
    registerButton: 'ఖాతాను సృష్టించండి',
    noAccount: 'ఖాతా లేదా?',
    hasAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    registerLink: 'ఖాతాను సృష్టించండి',
    loginLink: 'సైన్ ఇన్ చేయండి',
  },

  // Common
  common: {
    appName: 'ఎడ్యురిటైన్',
    user: 'వినియోగదారు',
  },
};

export default te;

