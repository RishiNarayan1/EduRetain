// Mock Data Generator for EduRetain

const SCHOOL_NAMES = [
    "Greenwood High", "St. Mary's Public School", "Delhi Public School", "Kendriya Vidyalaya",
    "Saraswati Vidya Mandir", "Global International", "Oakridge Academy", "Beacon High",
    "Sunrise Public School", "Heritage School", "Lotus Valley", "Ryan International",
    "Modern School", "Springdales", "Vasant Valley"
];

const DISTRICTS = ["North District", "South District", "East District", "West District", "Central District"];

const INTERVENTIONS = [
    { id: 1, name: "Increase Scholarship Budget", type: "financial", impactFactor: 0.4, cost: "High" },
    { id: 2, name: "Mid-day Meal Enhancement", type: "nutrition", impactFactor: 0.6, cost: "Medium" },
    { id: 3, name: "Sanitary Vending Machines", type: "health", impactFactor: 0.3, cost: "Low" },
    { id: 4, name: "After-school Mentorship", type: "academic", impactFactor: 0.5, cost: "Medium" },
    { id: 5, name: "Transport Facility", type: "infrastructure", impactFactor: 0.35, cost: "High" },
    { id: 6, name: "Teacher Training Program", type: "academic", impactFactor: 0.25, cost: "Medium" }
];

export const generateSchools = (count = 15) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `SCH-${1000 + i}`,
        name: SCHOOL_NAMES[i % SCHOOL_NAMES.length] + (i >= SCHOOL_NAMES.length ? ` ${Math.floor(i / SCHOOL_NAMES.length) + 1}` : ""),
        district: DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)],
        students: Math.floor(Math.random() * 1000) + 200,
        dropoutRate: parseFloat((Math.random() * 15 + 2).toFixed(1)), // 2% to 17%
        riskScore: Math.floor(Math.random() * 100), // 0-100
        coordinates: { // Mock coordinates for heatmap
            lat: 28.6 + (Math.random() * 0.5 - 0.25),
            lng: 77.2 + (Math.random() * 0.5 - 0.25)
        }
    }));
};

export const generateDemographics = () => {
    return {
        gender: [
            { name: "Boys", value: 52, dropoutRate: 4.5 },
            { name: "Girls", value: 48, dropoutRate: 6.2 }
        ],
        caste: [
            { name: "General", value: 30, dropoutRate: 3.1 },
            { name: "OBC", value: 35, dropoutRate: 5.4 },
            { name: "SC", value: 20, dropoutRate: 8.2 },
            { name: "ST", value: 15, dropoutRate: 9.5 }
        ],
        ageGroup: [
            { age: "6-10", standard: "Primary", dropoutRate: 1.2 },
            { age: "11-14", standard: "Upper Primary", dropoutRate: 3.5 },
            { age: "15-16", standard: "Secondary", dropoutRate: 12.4 }, // Critical drop-off
            { age: "17-18", standard: "Higher Secondary", dropoutRate: 8.1 }
        ]
    };
};

export const getInterventions = () => INTERVENTIONS;

export const mockSchools = generateSchools(20);
export const mockDemographics = generateDemographics();
