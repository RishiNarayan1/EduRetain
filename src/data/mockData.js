// Mock Data Generator for EduRetain

const SCHOOL_NAMES = [
    "Sri chaitanya School", "Bhashyam School", "Delhi Public School", "Kendriya Vidyalaya",
    "Saraswati Vidya Mandir", "Global International", "Narayana School", "Beacon High",
    "Sunrise Public School", "Heritage School", "Lotus Valley", "Ryan International",
    "Modern School", "Springdales", "Vasant Valley", "Bluebells School", "Apeejay School", 
    "Amity International", "Tagore International", "Mother's International", "Sanskriti School", 
    "Oakridge Academy", "St. Mary's Public School", "DR. KKR Gowtham School", "Sainik School"
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

// Simple seeded random generator
const seededRandom = (seed) => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

export const generateSchools = (count = 15, year = '2023-24') => {
    // Convert year to a number seed
    let seed = year.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    return Array.from({ length: count }, (_, i) => {
        const schoolSeed = seed + i * 100;
        return {
            id: `SCH-${1000 + i}`,
            name: SCHOOL_NAMES[i % SCHOOL_NAMES.length] + (i >= SCHOOL_NAMES.length ? ` ${Math.floor(i / SCHOOL_NAMES.length) + 1}` : ""),
            district: DISTRICTS[Math.floor(seededRandom(schoolSeed) * DISTRICTS.length)],
            students: Math.floor(seededRandom(schoolSeed + 1) * 1000) + 200,
            dropoutRate: parseFloat((seededRandom(schoolSeed + 2) * 15 + 2).toFixed(1)), // 2% to 17%
            riskScore: Math.floor(seededRandom(schoolSeed + 3) * 100), // 0-100
            coordinates: { // Mock coordinates for heatmap
                lat: 28.6 + (seededRandom(schoolSeed + 4) * 0.5 - 0.25),
                lng: 77.2 + (seededRandom(schoolSeed + 5) * 0.5 - 0.25)
            }
        };
    });
};

export const generateDemographics = (year = '2023-24') => {
    let seed = year.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 5000;
    
    return {
        gender: [
            { name: "Boys", value: 52, dropoutRate: parseFloat((seededRandom(seed) * 5 + 2).toFixed(1)) },
            { name: "Girls", value: 48, dropoutRate: parseFloat((seededRandom(seed + 1) * 6 + 3).toFixed(1)) }
        ],
        caste: [
            { name: "General", value: 30, dropoutRate: parseFloat((seededRandom(seed + 2) * 4 + 1).toFixed(1)) },
            { name: "OBC", value: 35, dropoutRate: parseFloat((seededRandom(seed + 3) * 5 + 3).toFixed(1)) },
            { name: "SC", value: 20, dropoutRate: parseFloat((seededRandom(seed + 4) * 6 + 5).toFixed(1)) },
            { name: "ST", value: 15, dropoutRate: parseFloat((seededRandom(seed + 5) * 7 + 6).toFixed(1)) }
        ],
        ageGroup: [
            { age: "6-10", standard: "Primary", dropoutRate: parseFloat((seededRandom(seed + 6) * 2 + 0.5).toFixed(1)) },
            { age: "11-14", standard: "Upper Primary", dropoutRate: parseFloat((seededRandom(seed + 7) * 4 + 1).toFixed(1)) },
            { age: "15-16", standard: "Secondary", dropoutRate: parseFloat((seededRandom(seed + 8) * 10 + 5).toFixed(1)) }, // Critical drop-off
            { age: "17-18", standard: "Higher Secondary", dropoutRate: parseFloat((seededRandom(seed + 9) * 8 + 4).toFixed(1)) }
        ]
    };
};

export const getInterventions = () => INTERVENTIONS;

export const mockSchools = generateSchools(20);
export const mockDemographics = generateDemographics();
