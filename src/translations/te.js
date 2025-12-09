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

  // Common
  common: {
    appName: 'ఎడ్యురిటైన్',
  },
};

export default te;
