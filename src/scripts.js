// src/scripts.js - Main JavaScript file for "The Road to AIIMS" Dashboard

// Global data stores (will be loaded from localStorage and updated)
let dailyLogs = JSON.parse(localStorage.getItem('dailyLogs')) || [];
let testResults = JSON.parse(localStorage.getItem('testResults')) || [];
let upcomingPlans = JSON.parse(localStorage.getItem('upcomingPlans')) || [];
let backlogs = JSON.parse(localStorage.getItem('backlogs')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
// chapterGoals is now mostly replaced by completedTopics for detailed tracking
let chapterGoals = JSON.parse(localStorage.getItem('chapterGoals')) || []; 
let mcqQuotas = JSON.parse(localStorage.getItem('mcqQuotas')) || { physics: 100, chemistry: 100, biology: 150 }; // Default quotas
let overallGoal = JSON.parse(localStorage.getItem('overallGoal')) || null;
let completedTopics = JSON.parse(localStorage.getItem('completedTopics')) || {}; // { "subject": { "chapter": ["topic1", "topic2"] } }

// --- DOM Elements ---
const authSection = document.getElementById('authSection');
const mainContainer = document.getElementById('mainContainer');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginToggleBtn = document.getElementById('loginToggleBtn');
const signupToggleBtn = document.getElementById('signupToggleBtn');
const authMessage = document.getElementById('authMessage');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const logoutBtn = document.getElementById('logoutBtn');

const countdownElement = document.getElementById('countdown');
const motivationalQuoteElement = document.getElementById('motivationalQuote');

// Daily Routine Elements
const dailyRoutineSection = document.getElementById('dailyRoutineContent');
const todayTabBtn = document.getElementById('todayTabBtn');
const upcomingPlansTabBtn = document.getElementById('upcomingPlansTabBtn');
const backlogsTabBtn = document.getElementById('backlogsTabBtn');
const completedTabBtn = document.getElementById('completedTabBtn');

const todayTabContent = document.getElementById('todayTabContent');
const upcomingPlansTabContent = document.getElementById('upcomingPlansTabContent');
const backlogsTabContent = document.getElementById('backlogsTabContent');
const completedTabContent = document.getElementById('completedTabContent');

const logDateInput = document.getElementById('logDate');
const logSubjectSelect = document.getElementById('logSubject');
const logBookSelect = document.getElementById('logBook');
const logChapterSelect = document.getElementById('logChapter');
const logTopicsContainer = document.getElementById('logTopicsContainer');
const logTopicsChecklist = document.getElementById('logTopicsChecklist');
const logMCQsPracticedInput = document.getElementById('logMCQsPracticed');
const logMCQSourceSelect = document.getElementById('logMCQSourceSelect');
const logCustomMCQSourceInput = document.getElementById('logCustomMCQSource');
const logCustomMCQsCountInput = document.getElementById('logCustomMCQsCount');
const logTimeSpentInput = document.getElementById('logTimeSpent');
const logCommentsInput = document.getElementById('logComments');
const addLogEntryBtn = document.getElementById('addLogEntryBtn');
const dailyLogTableBody = document.getElementById('dailyLogTableBody');
const chaptersDoneTodayElem = document.getElementById('chaptersDoneToday');
const timeSpentTodayElem = document.getElementById('timeSpentToday');
const mcqsPracticedTodayElem = document.getElementById('mcqsPracticedToday');
const backlogsCountElem = document.getElementById('backlogsCount');

// My Tests Elements
const myTestsSection = document.getElementById('myTestsContent');
const utDateInput = document.getElementById('utDate'); // Unit Test Date Input
const bbctsDateInput = document.getElementById('bbctsDate'); // BBCTS Date Input
const qtDateInput = document.getElementById('qtDate'); // Quarterly Test Date Input
const mnDateInput = document.getElementById('mnDate'); // Mission NEET Date Input

const testTypeSelect = document.getElementById('testType');
const testDateInput = document.getElementById('testDate');
const physicsScoreInput = document.getElementById('physicsScore');
const chemistryScoreInput = document.getElementById('chemistryScore');
const biologyScoreInput = document.getElementById('biologyScore');
const totalScoreDisplay = document.getElementById('totalScore');
const testCommentsInput = document.getElementById('testComments');
const addTestResultBtn = document.getElementById('addTestResultBtn');
const testResultsTableBody = document.getElementById('testResultsTableBody');

// Upcoming Plans Elements
const planDateInput = document.getElementById('planDate');
const planSubjectSelect = document.getElementById('planSubject');
const planChapterNameInput = document.getElementById('planChapterName');
const planTopicsInput = document.getElementById('planTopics');
const addPlanBtn = document.getElementById('addPlanBtn');
const upcomingPlansTableBody = document.getElementById('upcomingPlansTableBody');

// Backlogs Elements
const backlogSubjectSelect = document.getElementById('backlogSubject');
const backlogChapterNameInput = document.getElementById('backlogChapterName');
const backlogReasonInput = document.getElementById('backlogReason');
const addBacklogBtn = document.getElementById('addBacklogBtn');
const backlogsTableBody = document.getElementById('backlogsTableBody');

// Goals Elements (UPDATED)
const goalSubjectFilter = document.getElementById('goalSubjectFilter'); // New filter
const chapterGoalsTableBody = document.getElementById('chapterGoalsTableBody'); // Existing table body

const mcqGoalPhysicsInput = document.getElementById('mcqGoalPhysics');
const mcqGoalChemistryInput = document.getElementById('mcqGoalChemistry');
const mcqGoalBiologyInput = document.getElementById('mcqGoalBiology');
const setMCQGoalsBtn = document.getElementById('setMCQGoalsBtn');
const displayPhysicsQuota = document.getElementById('displayPhysicsQuota');
const displayChemistryQuota = document.getElementById('displayChemistryQuota');
const displayBiologyQuota = document.getElementById('displayBiologyQuota');

const overallGoalScoreInput = document.getElementById('overallGoalScore');
const overallGoalDueDateInput = document.getElementById('overallGoalDueDate');
const setOverallGoalBtn = document.getElementById('setOverallGoalBtn');
const displayOverallTargetScore = document.getElementById('displayOverallTargetScore');
const displayOverallTargetDate = document.getElementById('displayOverallTargetDate');


// Analytics & Graphs Elements
const analyticsGraphsSection = document.getElementById('analyticsGraphsContent');
const syllabusProgressionSubTabBtn = document.getElementById('syllabusProgressionSubTab');
const studyLogTrendsSubTabBtn = document.getElementById('studyLogTrendsSubTab');
const performanceInsightsSubTabBtn = document.getElementById('performanceInsightsSubTab');
const analyticsSubTabContents = {
    syllabusProgression: document.getElementById('syllabusProgressionContent'),
    studyLogTrends: document.getElementById('studyLogTrendsContent'),
    performanceInsights: document.getElementById('performanceInsightsContent')
};

// Chart Instances (global to manage destruction/creation)
let testScoreChartInstance, subjectAverageChartInstance, timeSpentChartInstance, mcqsPracticedChartInstance;
let goalCompletionChartInstance, topicCompletionChartInstance;
let physicsMCQQuotaChartInstance, chemistryMCQQuotaChartInstance, biologyMCQQuotaChartInstance;


// --- Firebase Authentication ---
let app, auth, db;
const initializeFirebase = () => {
    try {
        const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // Use default-app-id if __app_id is not defined

        if (!firebaseConfig.apiKey) {
            console.error("Firebase config is missing API key. Cannot initialize Firebase.");
            displayMessage("Firebase configuration error. Please contact support.", 'error');
            return;
        }

        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();

        // Listen for authentication state changes
        auth.onAuthStateChanged(user => {
            if (user) {
                mainContainer.classList.remove('hidden-section');
                authSection.classList.add('hidden-section');
                console.log("User logged in:", user.email);
                // Load user-specific data after login
                loadUserData(user.uid);
            } else {
                mainContainer.classList.add('hidden-section');
                authSection.classList.remove('hidden-section');
                console.log("User logged out or not logged in.");
                // Clear all local data on logout
                clearAllLocalData();
                displayRandomLoginQuote();
            }
            hideLoadingOverlay(); // Hide overlay once auth state is determined
        });
    } catch (error) {
        console.error("Error initializing Firebase:", error);
        displayMessage("Failed to initialize Firebase. Check console for details.", 'error');
        hideLoadingOverlay();
    }
};

const signInWithGoogle = async () => {
    showLoadingOverlay();
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
        displayMessage("Successfully signed in with Google!", 'success');
    } catch (error) {
        console.error("Error signing in with Google:", error);
        displayMessage(`Google Sign-In Failed: ${error.message}`, 'error');
    } finally {
        hideLoadingOverlay();
    }
};

const signOutUser = async () => {
    showLoadingOverlay();
    try {
        await auth.signOut();
        displayMessage("Successfully signed out.", 'success');
    } catch (error) {
        console.error("Error signing out:", error);
        displayMessage(`Sign Out Failed: ${error.message}`, 'error');
    } finally {
        hideLoadingOverlay();
    }
};


// --- Data Loading and Saving ---
const loadUserData = async (uid) => {
    showLoadingOverlay();
    try {
        const userDocRef = db.collection('users').doc(uid);
        const doc = await userDocRef.get();

        if (doc.exists) {
            const data = doc.data();
            dailyLogs = data.dailyLogs || [];
            testResults = data.testResults || [];
            upcomingPlans = data.upcomingPlans || [];
            backlogs = data.backlogs || [];
            completedTasks = data.completedTasks || [];
            chapterGoals = data.chapterGoals || [];
            mcqQuotas = data.mcqQuotas || { physics: 100, chemistry: 100, biology: 150 };
            overallGoal = data.overallGoal || null;
            completedTopics = data.completedTopics || {}; // Load completedTopics
            console.log("User data loaded from Firestore.");
        } else {
            console.log("No user data found in Firestore for this user. Initializing with defaults.");
        }
        loadData(); // Render loaded data
    } catch (error) {
        console.error("Error loading user data from Firestore:", error);
        displayMessage("Failed to load user data. Using local defaults.", 'error');
    } finally {
        hideLoadingOverlay();
    }
};

const saveUserData = async () => {
    if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        try {
            await db.collection('users').doc(uid).set({
                dailyLogs: dailyLogs,
                testResults: testResults,
                upcomingPlans: upcomingPlans,
                backlogs: backlogs,
                completedTasks: completedTasks,
                chapterGoals: chapterGoals, // Still save, but main topic tracking is completedTopics
                mcqQuotas: mcqQuotas,
                overallGoal: overallGoal,
                completedTopics: completedTopics // Save completedTopics
            }, { merge: true }); // Use merge to avoid overwriting other fields if they exist
            console.log("User data saved to Firestore.");
        } catch (error) {
            console.error("Error saving user data to Firestore:", error);
            displayMessage("Failed to save data to cloud.", 'error');
        }
    } else {
        console.warn("Not logged in, data not saved to Firestore.");
    }
};

function saveData() {
    localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));
    localStorage.setItem('testResults', JSON.stringify(testResults));
    localStorage.setItem('upcomingPlans', JSON.stringify(upcomingPlans));
    localStorage.setItem('backlogs', JSON.stringify(backlogs));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    localStorage.setItem('chapterGoals', JSON.stringify(chapterGoals));
    localStorage.setItem('mcqQuotas', JSON.stringify(mcqQuotas));
    localStorage.setItem('overallGoal', JSON.stringify(overallGoal));
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics)); // Save completedTopics
    saveUserData(); // Also save to Firestore
}

function clearAllLocalData() {
    localStorage.clear();
    dailyLogs = [];
    testResults = [];
    upcomingPlans = [];
    backlogs = [];
    completedTasks = [];
    chapterGoals = [];
    mcqQuotas = { physics: 100, chemistry: 100, biology: 150 };
    overallGoal = null;
    completedTopics = {};
    loadData(); // Re-render with empty data
}


// --- Utility Functions ---
function displayMessage(message, type = 'info') {
    const messageElement = document.getElementById('authMessage');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `p-3 rounded-lg mt-4 text-center ${
            type === 'success' ? 'bg-green-100 text-green-700' :
            type === 'error' ? 'bg-red-100 text-red-700' :
            'bg-blue-100 text-blue-700'
        }`;
        messageElement.classList.remove('hidden');
        setTimeout(() => messageElement.classList.add('hidden'), 5000);
    } else {
        console.warn("Auth message element not found.");
    }
}

function showLoadingOverlay() {
    document.getElementById('loadingOverlay').classList.add('active');
}

function hideLoadingOverlay() {
    document.getElementById('loadingOverlay').classList.remove('active');
}


// --- Main Dashboard Navigation ---
const tabButtons = {
    dailyRoutine: document.getElementById('dailyRoutineTabBtn'),
    myTests: document.getElementById('myTestsTabBtn'),
    analytics: document.getElementById('analyticsTabBtn'),
    goals: document.getElementById('goalsTabBtn')
};

const tabContents = {
    dailyRoutine: document.getElementById('dailyRoutineContent'),
    myTests: document.getElementById('myTestsContent'),
    analytics: document.getElementById('analyticsGraphsContent'),
    goals: document.getElementById('goalsContent')
};

// Function to activate a main dashboard tab
function activateMainTab(tabName) {
    // Deactivate all tab buttons and hide all tab contents
    for (const key in tabButtons) {
        tabButtons[key].classList.remove('active');
        tabContents[key].classList.remove('active');
        tabContents[key].classList.add('hidden');
    }

    // Activate the selected tab button and show its content
    if (tabButtons[tabName] && tabContents[tabName]) {
        tabButtons[tabName].classList.add('active');
        tabContents[tabName].classList.remove('hidden');
        tabContents[tabName].classList.add('active');

        // Special handling for Analytics tab to draw charts when it becomes active
        if (tabName === 'analytics') {
            // By default show Syllabus Progression if no sub-tab is active
            if (!analyticsSubTabContents.syllabusProgression.classList.contains('active') &&
                !analyticsSubTabContents.studyLogTrends.classList.contains('active') &&
                !analyticsSubTabContents.performanceInsights.classList.contains('active')) {
                activateAnalyticsSubTab('syllabusProgression');
            } else {
                // Redraw charts if a sub-tab was already active and analytics tab is reactivated
                if (analyticsSubTabContents.syllabusProgression.classList.contains('active')) {
                    drawSyllabusProgressionChart();
                } else {
                    drawAllCharts(); // This might need to be more specific per sub-tab
                }
            }
        }
    }
}

// Attach event listeners to main tab buttons
if (tabButtons.dailyRoutine) tabButtons.dailyRoutine.addEventListener('click', () => activateMainTab('dailyRoutine'));
if (tabButtons.myTests) tabButtons.myTests.addEventListener('click', () => activateMainTab('myTests'));
if (tabButtons.analytics) tabButtons.analytics.addEventListener('click', () => activateMainTab('analytics'));
if (tabButtons.goals) tabButtons.goals.addEventListener('click', () => activateMainTab('goals'));


// --- Daily Routine Sub-Tabs ---
const dailyRoutineSubTabButtons = {
    today: document.getElementById('todayTabBtn'),
    upcomingPlans: document.getElementById('upcomingPlansTabBtn'),
    backlogs: document.getElementById('backlogsTabBtn'),
    completed: document.getElementById('completedTabBtn')
};

const dailyRoutineSubTabContents = {
    today: document.getElementById('todayTabContent'),
    upcomingPlans: document.getElementById('upcomingPlansTabContent'),
    backlogs: document.getElementById('backlogsTabContent'),
    completed: document.getElementById('completedTabContent')
};

function activateDailyRoutineSubTab(tabName) {
    for (const key in dailyRoutineSubTabButtons) {
        dailyRoutineSubTabButtons[key].classList.remove('active');
        dailyRoutineSubTabContents[key].classList.add('hidden');
    }
    if (dailyRoutineSubTabButtons[tabName]) dailyRoutineSubTabButtons[tabName].classList.add('active');
    if (dailyRoutineSubTabContents[tabName]) dailyRoutineSubTabContents[tabName].classList.remove('hidden');

    // Re-render relevant data when a tab is activated
    if (tabName === 'today') renderDailyLogEntries();
    else if (tabName === 'upcomingPlans') renderUpcomingPlans();
    else if (tabName === 'backlogs') renderBacklogs();
    else if (tabName === 'completed') renderCompletedTasks();
}

// Attach event listeners to daily routine sub-tab buttons
if (dailyRoutineSubTabButtons.today) dailyRoutineSubTabButtons.today.addEventListener('click', () => activateDailyRoutineSubTab('today'));
if (dailyRoutineSubTabButtons.upcomingPlans) dailyRoutineSubTabButtons.upcomingPlans.addEventListener('click', () => activateDailyRoutineSubTab('upcomingPlans'));
if (dailyRoutineSubTabButtons.backlogs) dailyRoutineSubTabButtons.backlogs.addEventListener('click', () => activateDailyRoutineSubTab('backlogs'));
if (dailyRoutineSubTabButtons.completed) dailyRoutineSubTabButtons.completed.addEventListener('click', () => activateDailyRoutineSubTab('completed'));


// --- Countdown and Motivational Quotes ---
const NEET_UG_DATE = new Date('2026-05-03T09:00:00'); // Example: May 3, 2026, 9:00 AM (adjust as needed)

function updateCountdown() {
    const now = new Date();
    const timeLeft = NEET_UG_DATE - now;

    if (timeLeft <= 0) {
        countdownElement.textContent = "NEET UG has begun!";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const loginMotivationalQuotes = [
    "\"The future belongs to those who believe in the beauty of their dreams.\" - Eleanor Roosevelt",
    "\"Success is not final, failure is not fatal: it is the courage to continue that counts.\" - Winston Churchill",
    "\"Believe you can and you're halfway there.\" - Theodore Roosevelt",
    "\"The only way to do great work is to love what you do.\" - Steve Jobs",
    "\"Your time is limited, don't waste it living someone else's life.\" - Steve Jobs"
];

function displayRandomLoginQuote() {
    const randomIndex = Math.floor(Math.random() * loginMotivationalQuotes.length);
    if (motivationalQuoteElement) {
        motivationalQuoteElement.textContent = loginMotivationalQuotes[randomIndex];
    }
}

const dashboardMotivationalQuotes = [
    "\"The road to success is always under construction. Keep building!\"",
    "\"Every chapter you conquer is a step closer to your dream college.\"",
    "\"Discipline is the bridge between goals and accomplishment.\"",
    "\"You don't have to be great to start, but you have to start to be great.\"",
    "\"Study hard, dream big, and never give up.\""
];

function displayRandomMotivationalQuote() {
    const randomIndex = Math.floor(Math.random() * dashboardMotivationalQuotes.length);
    if (motivationalQuoteElement) { // Use the same element as login for consistency
        motivationalQuoteElement.textContent = dashboardMotivationalQuotes[randomIndex];
    }
}


// --- Daily Log Functions ---
function populateSubjectDropdowns() {
    // Only populate if logSubjectSelect exists (it might not be on all pages)
    if (logSubjectSelect) {
        const subjects = ['physics', 'chemistry', 'biology'];
        subjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
            logSubjectSelect.appendChild(option);

            // Also populate for plans, backlogs, etc. if they use a similar dropdown
            if (planSubjectSelect && !Array.from(planSubjectSelect.options).some(opt => opt.value === subject)) {
                const planOption = document.createElement('option');
                planOption.value = subject;
                planOption.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
                planSubjectSelect.appendChild(planOption);
            }
            if (backlogSubjectSelect && !Array.from(backlogSubjectSelect.options).some(opt => opt.value === subject)) {
                const backlogOption = document.createElement('option');
                backlogOption.value = subject;
                backlogOption.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
                backlogSubjectSelect.appendChild(backlogOption);
            }
        });
    }
}

function populateBooksAndChapters() {
    const selectedSubject = logSubjectSelect.value;
    logBookSelect.innerHTML = '<option value="">Select Book/Module</option>';
    logChapterSelect.innerHTML = '<option value="">Select Chapter</option>';
    logTopicsChecklist.innerHTML = '';
    logTopicsContainer.classList.add('hidden'); // Hide topics until chapter is selected

    if (!selectedSubject || !ALL_SUBJECT_DATA[selectedSubject]) return;

    const booksAndChapters = ALL_SUBJECT_DATA[selectedSubject];

    // Assuming ALL_SUBJECT_DATA structure implies books are not directly separated but chapters are within subjects.
    // If you have a 'book' level in your data, this logic needs adjustment.
    // For now, let's treat the chapter names as the primary selection after subject.
    
    // Populate chapter select directly from subject's chapters
    for (const chapterName in booksAndChapters) {
        const option = document.createElement('option');
        option.value = chapterName;
        option.textContent = chapterName;
        logChapterSelect.appendChild(option);
    }
}

function populateTopicsChecklist() {
    const selectedSubject = logSubjectSelect.value;
    const selectedChapter = logChapterSelect.value;
    logTopicsChecklist.innerHTML = '';
    logTopicsContainer.classList.remove('hidden'); // Show topics container

    if (!selectedSubject || !selectedChapter || !ALL_SUBJECT_DATA[selectedSubject] || !ALL_SUBJECT_DATA[selectedSubject][selectedChapter]) {
        logTopicsContainer.classList.add('hidden');
        return;
    }

    const topics = ALL_SUBJECT_DATA[selectedSubject][selectedChapter];
    if (topics.length === 0) {
        logTopicsChecklist.innerHTML = '<p class="text-gray-500">No specific topics listed for this chapter.</p>';
        return;
    }

    topics.forEach((topic, index) => {
        const div = document.createElement('div');
        div.className = 'flex items-center space-x-2';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `topic-${index}`;
        checkbox.value = topic;
        checkbox.className = 'form-checkbox h-4 w-4 text-blue-600 rounded';
        const label = document.createElement('label');
        label.htmlFor = `topic-${index}`;
        label.textContent = topic;

        div.appendChild(checkbox);
        div.appendChild(label);
        logTopicsChecklist.appendChild(div);
    });
}

function populateMCQSourceDropdown() {
    if (logMCQSourceSelect) {
        // Clear existing options except the first one (Select Source)
        logMCQSourceSelect.innerHTML = '<option value="">Select Source</option>';
        logMCQSourceSelect.innerHTML += '<option value="custom">Add New Source</option>';

        const uniqueCategoryNames = new Set();
        // Assuming ALL_MCQ_SOURCES is defined in data.js or elsewhere
        if (typeof ALL_MCQ_SOURCES !== 'undefined' && ALL_MCQ_SOURCES.length > 0) {
             ALL_MCQ_SOURCES.forEach(cat => uniqueCategoryNames.add(cat.name));
        }


        Array.from(uniqueCategoryNames).sort().forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            logMCQSourceSelect.appendChild(option);
        });
    }
}

function handleMCQSourceChange() {
    if (logMCQSourceSelect.value === 'custom') {
        logCustomMCQSourceInput.classList.remove('hidden');
        logCustomMCQsCountInput.classList.remove('hidden');
    } else {
        logCustomMCQSourceInput.classList.add('hidden');
        logCustomMCQsCountInput.classList.add('hidden');
    }
}


function addLogEntry() {
    const date = logDateInput.value;
    const subject = logSubjectSelect.value;
    const book = logBookSelect.value; // Still captured, but less critical for overall topic tracking
    const chapter = logChapterSelect.value;
    const selectedTopics = Array.from(logTopicsChecklist.querySelectorAll('input[type="checkbox"]:checked'))
                                .map(checkbox => checkbox.value);
    const mcqsPracticed = parseInt(logMCQsPracticedInput.value) || 0;
    const timeSpent = logTimeSpentInput.value;
    const comments = logCommentsInput.value.trim();
    let mcqSource = logMCQSourceSelect.value;
    let customMcqsCount = 0;

    if (mcqSource === 'custom') {
        mcqSource = logCustomMCQSourceInput.value.trim();
        customMcqsCount = parseInt(logCustomMCQsCountInput.value) || 0;
        if (!mcqSource) {
            displayMessage('Please enter a custom MCQ source name.', 'error');
            return;
        }
    }

    if (!date || !subject || !chapter || selectedTopics.length === 0) {
        displayMessage('Please fill in Date, Subject, Chapter, and select at least one Topic.', 'error');
        return;
    }

    const newLogEntry = {
        id: Date.now(),
        date,
        subject,
        book,
        chapter,
        topics: selectedTopics,
        mcqsPracticed: mcqsPracticed + customMcqsCount, // Add custom MCQs to total
        mcqSource: mcqSource !== 'custom' ? mcqSource : (mcqSource || 'N/A'),
        timeSpent,
        comments
    };

    dailyLogs.push(newLogEntry);
    saveData();
    displayMessage('Daily log entry added!', 'success');
    renderDailyLogEntries(); // Re-render table
    updateDailyRoutineSummary();
    updateMCQQuotaCharts(); // Update MCQ quota chart

    // Mark topics as completed in the completedTopics structure
    if (!completedTopics[subject]) {
        completedTopics[subject] = {};
    }
    if (!completedTopics[subject][chapter]) {
        completedTopics[subject][chapter] = [];
    }
    selectedTopics.forEach(topic => {
        if (!completedTopics[subject][chapter].includes(topic)) {
            completedTopics[subject][chapter].push(topic);
        }
    });
    saveData(); // Save updated completed topics
    renderAllChaptersAndTopics(); // Re-render goals table to reflect completion

    // Clear form
    logBookSelect.value = '';
    logChapterSelect.value = '';
    logTopicsChecklist.innerHTML = '';
    logTopicsContainer.classList.add('hidden');
    logMCQsPracticedInput.value = '';
    logMCQSourceSelect.value = '';
    logCustomMCQSourceInput.value = '';
    logCustomMCQSourceInput.classList.add('hidden');
    logCustomMCQsCountInput.value = '';
    logCustomMCQsCountInput.classList.add('hidden');
    logTimeSpentInput.value = '';
    logCommentsInput.value = '';
}


function renderDailyLogEntries() {
    dailyLogTableBody.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    const filteredLogs = dailyLogs.filter(log => log.date === today);

    if (filteredLogs.length === 0) {
        dailyLogTableBody.innerHTML = '<tr><td colspan="7" class="py-3 px-6 text-center">No logs for today.</td></tr>';
        return;
    }

    filteredLogs.forEach(entry => {
        const row = dailyLogTableBody.insertRow();
        row.className = 'border-b border-gray-200 hover:bg-gray-100';
        row.innerHTML = `
            <td class="py-3 px-6 text-left whitespace-nowrap">${entry.date}</td>
            <td class="py-3 px-6 text-left whitespace-nowrap">${entry.subject.charAt(0).toUpperCase() + entry.subject.slice(1)}</td>
            <td class="py-3 px-6 text-left">${entry.chapter} (${entry.topics.join(', ')})</td>
            <td class="py-3 px-6 text-left">${entry.mcqsPracticed}</td>
            <td class="py-3 px-6 text-left">${entry.timeSpent}</td>
            <td class="py-3 px-6 text-center">
                <button onclick="deleteLogEntry(${entry.id})" class="text-red-600 hover:text-red-800 focus:outline-none">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
    });
}

function deleteLogEntry(id) {
    dailyLogs = dailyLogs.filter(entry => entry.id !== id);
    saveData();
    displayMessage('Log entry deleted.', 'info');
    renderDailyLogEntries();
    updateDailyRoutineSummary();
    updateMCQQuotaCharts(); // Update MCQ quota chart
}


// --- My Tests Functions ---
function calculateTotalScore() {
    const physics = parseInt(physicsScoreInput.value) || 0;
    const chemistry = parseInt(chemistryScoreInput.value) || 0;
    const biology = parseInt(biologyScoreInput.value) || 0;
    totalScoreDisplay.textContent = physics + chemistry + biology;
}

function addTestResult() {
    const type = testTypeSelect.value;
    const date = testDateInput.value;
    const physicsScore = parseInt(physicsScoreInput.value);
    const chemistryScore = parseInt(chemistryScoreInput.value);
    const biologyScore = parseInt(biologyScoreInput.value);
    const totalScore = parseInt(totalScoreDisplay.textContent);
    const comments = testCommentsInput.value.trim();

    if (!type || !date || isNaN(physicsScore) || isNaN(chemistryScore) || isNaN(biologyScore)) {
        displayMessage('Please fill in all test details.', 'error');
        return;
    }

    const newTestResult = {
        id: Date.now(),
        type,
        date,
        physicsScore,
        chemistryScore,
        biologyScore,
        totalScore,
        comments
    };

    testResults.push(newTestResult);
    saveData();
    displayMessage('Test result added!', 'success');
    renderTestResults();
    // Clear form
    testTypeSelect.value = '';
    testDateInput.value = '';
    physicsScoreInput.value = '';
    chemistryScoreInput.value = '';
    biologyScoreInput.value = '';
    totalScoreDisplay.textContent = '0';
    testCommentsInput.value = '';
}

function renderTestResults() {
    testResultsTableBody.innerHTML = '';
    if (testResults.length === 0) {
        testResultsTableBody.innerHTML = '<tr><td colspan="8" class="py-3 px-6 text-center">No test results added yet.</td></tr>';
        return;
    }

    testResults.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

    testResults.forEach(result => {
        const row = testResultsTableBody.insertRow();
        row.className = 'border-b border-gray-200 hover:bg-gray-100';
        row.innerHTML = `
            <td class="py-3 px-6 text-left whitespace-nowrap">${result.date}</td>
            <td class="py-3 px-6 text-left whitespace-nowrap">${result.type.toUpperCase()}</td>
            <td class="py-3 px-6 text-left">${result.physicsScore}</td>
            <td class="py-3 px-6 text-left">${result.chemistryScore}</td>
            <td class="py-3 px-6 text-left">${result.biologyScore}</td>
            <td class="py-3 px-6 text-left font-bold">${result.totalScore}</td>
            <td class="py-3 px-6 text-left">${result.comments}</td>
            <td class="py-3 px-6 text-center">
                <button onclick="deleteTestResult(${result.id})" class="text-red-600 hover:text-red-800 focus:outline-none">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
    });
}

function deleteTestResult(id) {
    testResults = testResults.filter(result => result.id !== id);
    saveData();
    displayMessage('Test result deleted.', 'info');
    renderTestResults();
}


// --- Upcoming Plans Functions ---
function addPlan() {
    const date = planDateInput.value;
    const subject = planSubjectSelect.value;
    const chapter = planChapterNameInput.value.trim();
    const topics = planTopicsInput.value.trim().split(',').map(t => t.trim()).filter(t => t !== '');

    if (!date || !subject || !chapter) {
        displayMessage('Please fill in Date, Subject, and Chapter for the plan.', 'error');
        return;
    }

    const newPlan = {
        id: Date.now(),
        date,
        subject,
        chapter,
        topics
    };

    upcomingPlans.push(newPlan);
    saveData();
    displayMessage('Plan added!', 'success');
    renderUpcomingPlans();
    // Clear form
    planDateInput.value = '';
    planSubjectSelect.value = '';
    planChapterNameInput.value = '';
    planTopicsInput.value = '';
}

function renderUpcomingPlans() {
    upcomingPlansTableBody.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];

    // Filter out past plans and sort by date
    upcomingPlans = upcomingPlans.filter(plan => plan.date >= today);
    upcomingPlans.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (upcomingPlans.length === 0) {
        upcomingPlansTableBody.innerHTML = '<tr><td colspan="5" class="py-3 px-6 text-center">No upcoming plans.</td></tr>';
        return;
    }

    upcomingPlans.forEach(plan => {
        const row = upcomingPlansTableBody.insertRow();
        row.className = 'border-b border-gray-200 hover:bg-gray-100';
        row.innerHTML = `
            <td class="py-3 px-6 text-left whitespace-nowrap">${plan.date}</td>
            <td class="py-3 px-6 text-left whitespace-nowrap">${plan.subject.charAt(0).toUpperCase() + plan.subject.slice(1)}</td>
            <td class="py-3 px-6 text-left">${plan.chapter}</td>
            <td class="py-3 px-6 text-left">${plan.topics.join(', ')}</td>
            <td class="py-3 px-6 text-center">
                <button onclick="deletePlan(${plan.id})" class="text-red-600 hover:text-red-800 focus:outline-none">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
    });
}

function deletePlan(id) {
    upcomingPlans = upcomingPlans.filter(plan => plan.id !== id);
    saveData();
    displayMessage('Plan deleted.', 'info');
    renderUpcomingPlans();
}


// --- Backlogs Functions ---
function addBacklog() {
    const subject = backlogSubjectSelect.value;
    const chapter = backlogChapterNameInput.value.trim();
    const reason = backlogReasonInput.value.trim();

    if (!subject || !chapter || !reason) {
        displayMessage('Please fill in Subject, Chapter, and Reason for the backlog.', 'error');
        return;
    }

    const newBacklog = {
        id: Date.now(),
        subject,
        chapter,
        reason
    };

    backlogs.push(newBacklog);
    saveData();
    displayMessage('Backlog added!', 'success');
    renderBacklogs();
    // Clear form
    backlogSubjectSelect.value = '';
    backlogChapterNameInput.value = '';
    backlogReasonInput.value = '';
}

function renderBacklogs() {
    backlogsTableBody.innerHTML = '';
    if (backlogs.length === 0) {
        backlogsTableBody.innerHTML = '<tr><td colspan="4" class="py-3 px-6 text-center">No backlogs. Keep up the great work!</td></tr>';
        return;
    }

    backlogs.forEach(backlog => {
        const row = backlogsTableBody.insertRow();
        row.className = 'border-b border-gray-200 hover:bg-gray-100';
        row.innerHTML = `
            <td class="py-3 px-6 text-left whitespace-nowrap">${backlog.subject.charAt(0).toUpperCase() + backlog.subject.slice(1)}</td>
            <td class="py-3 px-6 text-left whitespace-nowrap">${backlog.chapter}</td>
            <td class="py-3 px-6 text-left">${backlog.reason}</td>
            <td class="py-3 px-6 text-center">
                <button onclick="deleteBacklog(${backlog.id})" class="text-red-600 hover:text-red-800 focus:outline-none">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
    });
}

function deleteBacklog(id) {
    backlogs = backlogs.filter(backlog => backlog.id !== id);
    saveData();
    displayMessage('Backlog deleted.', 'info');
    renderBacklogs();
}


// --- Completed Tasks Functions (for Daily Routine tab) ---
function renderCompletedTasks() {
    completedTableBody.innerHTML = '';
    if (completedTasks.length === 0) {
        completedTableBody.innerHTML = '<tr><td colspan="6" class="py-3 px-6 text-center">No completed tasks yet.</td></tr>';
        return;
    }

    completedTasks.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

    completedTasks.forEach(task => {
        const row = completedTableBody.insertRow();
        row.className = 'border-b border-gray-200 hover:bg-gray-100';
        row.innerHTML = `
            <td class="py-3 px-6 text-left whitespace-nowrap">${task.date}</td>
            <td class="py-3 px-6 text-left whitespace-nowrap">${task.subject.charAt(0).toUpperCase() + task.subject.slice(1)}</td>
            <td class="py-3 px-6 text-left">${task.chapter} (${task.topics.join(', ')})</td>
            <td class="py-3 px-6 text-left">${task.type}</td>
            <td class="py-3 px-6 text-left">${task.mcqs}</td>
            <td class="py-3 px-6 text-left">${task.time}</td>
        `;
    });
}


// --- Goals Functions (UPDATED FOR ALL TOPICS) ---
function renderAllChaptersAndTopics() {
    chapterGoalsTableBody.innerHTML = ''; // Clear existing rows
    const selectedSubject = goalSubjectFilter.value;

    if (typeof ALL_SUBJECT_DATA === 'undefined') {
        console.error("ALL_SUBJECT_DATA is not defined. Make sure data.js is loaded correctly.");
        chapterGoalsTableBody.innerHTML = '<tr><td colspan="5" class="py-3 px-6 text-center text-red-500">Error: Syllabus data not loaded.</td></tr>';
        return;
    }

    let hasContent = false;
    for (const subject in ALL_SUBJECT_DATA) {
        if (selectedSubject !== 'all' && subject !== selectedSubject) {
            continue; // Skip if subject doesn't match filter
        }

        const chapters = ALL_SUBJECT_DATA[subject];
        for (const chapterName in chapters) {
            const topics = chapters[chapterName];
            topics.forEach(topic => {
                hasContent = true;
                const isCompleted = completedTopics[subject] &&
                                    completedTopics[subject][chapterName] &&
                                    completedTopics[subject][chapterName].includes(topic);

                const row = chapterGoalsTableBody.insertRow();
                row.className = 'border-b border-gray-200 hover:bg-gray-100';

                const subjectCell = row.insertCell();
                subjectCell.className = 'py-3 px-6 text-left whitespace-nowrap';
                subjectCell.textContent = subject.charAt(0).toUpperCase() + subject.slice(1); // Capitalize subject

                const chapterCell = row.insertCell();
                chapterCell.className = 'py-3 px-6 text-left whitespace-nowrap';
                chapterCell.textContent = chapterName;

                const topicCell = row.insertCell();
                topicCell.className = 'py-3 px-6 text-left';
                topicCell.textContent = topic;

                const statusCell = row.insertCell();
                statusCell.className = 'py-3 px-6 text-left';
                statusCell.innerHTML = `<span class="px-2 py-1 font-semibold leading-tight ${isCompleted ? 'text-green-700 bg-green-100' : 'text-yellow-700 bg-yellow-100'} rounded-full">
                                            ${isCompleted ? 'Completed' : 'Pending'}
                                        </span>`;

                const actionsCell = row.insertCell();
                actionsCell.className = 'py-3 px-6 text-center';
                const button = document.createElement('button');
                button.className = `font-bold py-1 px-3 rounded-full text-xs transition duration-300
                                    ${isCompleted ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`;
                button.textContent = isCompleted ? 'Revert' : 'Mark Done';
                // Use a data attribute to store the topic path for easy retrieval
                button.dataset.subject = subject;
                button.dataset.chapter = chapterName;
                button.dataset.topic = topic;
                button.onclick = (event) => {
                    const btn = event.target;
                    toggleTopicCompletion(btn.dataset.subject, btn.dataset.chapter, btn.dataset.topic);
                };
                actionsCell.appendChild(button);
            });
        }
    }

    if (!hasContent) {
        chapterGoalsTableBody.innerHTML = '<tr><td colspan="5" class="py-3 px-6 text-center">No topics to display for the selected filter.</td></tr>';
    }
}

// Function to toggle topic completion status
function toggleTopicCompletion(subject, chapter, topic) {
    if (!completedTopics[subject]) {
        completedTopics[subject] = {};
    }
    if (!completedTopics[subject][chapter]) {
        completedTopics[subject][chapter] = [];
    }

    const topicIndex = completedTopics[subject][chapter].indexOf(topic);
    if (topicIndex > -1) {
        // Topic is completed, mark as pending
        completedTopics[subject][chapter].splice(topicIndex, 1);
        if (completedTopics[subject][chapter].length === 0) {
            delete completedTopics[subject][chapter]; // Clean up empty chapter arrays
        }
        if (Object.keys(completedTopics[subject]).length === 0) {
            delete completedTopics[subject]; // Clean up empty subject objects
        }
    } else {
        // Topic is pending, mark as completed
        completedTopics[subject][chapter].push(topic);
    }

    saveData(); // Save updated data to localStorage and Firestore
    renderAllChaptersAndTopics(); // Re-render the table to reflect status change
    updateGoalsCharts(); // Update charts related to goals
}


function setMCQGoals() {
    const physicsQuota = parseInt(mcqGoalPhysicsInput.value);
    const chemistryQuota = parseInt(mcqGoalChemistryInput.value);
    const biologyQuota = parseInt(mcqGoalBiologyInput.value);

    if (isNaN(physicsQuota) || isNaN(chemistryQuota) || isNaN(biologyQuota) ||
        physicsQuota < 0 || chemistryQuota < 0 || biologyQuota < 0) {
        displayMessage('Please enter valid positive numbers for MCQ quotas.', 'error');
        return;
    }

    mcqQuotas = {
        physics: physicsQuota,
        chemistry: chemistryQuota,
        biology: biologyQuota
    };
    saveData();
    displayMessage('Daily MCQ goals set!', 'success');
    updateMCQQuotaDisplays();
    updateMCQQuotaCharts();
}

function updateMCQQuotaDisplays() {
    displayPhysicsQuota.textContent = mcqQuotas.physics;
    displayChemistryQuota.textContent = mcqQuotas.chemistry;
    displayBiologyQuota.textContent = mcqQuotas.biology;
}

function setOverallGoal() {
    const score = parseInt(overallGoalScoreInput.value);
    const dueDate = overallGoalDueDateInput.value;

    if (isNaN(score) || score < 0 || score > 720 || !dueDate) {
        displayMessage('Please enter a valid target score (0-720) and due date.', 'error');
        return;
    }

    overallGoal = { score, dueDate };
    saveData();
    displayMessage('Overall study goal set!', 'success');
    updateOverallGoalDisplay();
}

function updateOverallGoalDisplay() {
    if (overallGoal) {
        displayOverallTargetScore.textContent = overallGoal.score;
        displayOverallTargetDate.textContent = overallGoal.dueDate;
    } else {
        displayOverallTargetScore.textContent = 'N/A';
        displayOverallTargetDate.textContent = 'N/A';
    }
}


// --- Analytics & Graphs Functions ---
function initCharts() {
    // Destroy existing chart instances before re-initializing
    if (testScoreChartInstance) testScoreChartInstance.destroy();
    if (subjectAverageChartInstance) subjectAverageChartInstance.destroy();
    if (timeSpentChartInstance) timeSpentChartInstance.destroy();
    if (mcqsPracticedChartInstance) mcqsPracticedChartInstance.destroy();
    if (goalCompletionChartInstance) goalCompletionChartInstance.destroy();
    if (topicCompletionChartInstance) topicCompletionChartInstance.destroy();
    // MCQ Quota Charts are handled separately with updateMCQQuotaCharts

    // Test Score Chart
    const testScoreCtx = document.getElementById('testScoreChart')?.getContext('2d');
    if (testScoreCtx) {
        testScoreChartInstance = new Chart(testScoreCtx, {
            type: 'line',
            data: {
                labels: [], // Populated by drawTestScoreChart()
                datasets: [] // Populated by drawTestScoreChart()
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 720 }
                }
            }
        });
    }

    // Subject-wise Average Chart
    const subjectAverageCtx = document.getElementById('subjectAverageChart')?.getContext('2d');
    if (subjectAverageCtx) {
        subjectAverageChartInstance = new Chart(subjectAverageCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 180 }
                }
            }
        });
    }

    // Time Spent Chart
    const timeSpentCtx = document.getElementById('timeSpentChart')?.getContext('2d');
    if (timeSpentCtx) {
        timeSpentChartInstance = new Chart(timeSpentCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // MCQs Practiced Chart
    const mcqsPracticedCtx = document.getElementById('mcqsPracticedChart')?.getContext('2d');
    if (mcqsPracticedCtx) {
        mcqsPracticedChartInstance = new Chart(mcqsPracticedCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Goal Completion Chart (Syllabus Progression)
    const goalCompletionCtx = document.getElementById('goalCompletionChart')?.getContext('2d');
    if (goalCompletionCtx) {
        goalCompletionChartInstance = new Chart(goalCompletionCtx, {
            type: 'bar', // Or 'pie', 'doughnut'
            data: {
                labels: ['Physics', 'Chemistry', 'Biology'],
                datasets: [{
                    label: 'Chapters Completed',
                    data: [0, 0, 0], // Will be updated by drawSyllabusProgressionChart
                    backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Topic Completion Rate Chart
    const topicCompletionCtx = document.getElementById('topicCompletionChart')?.getContext('2d');
    if (topicCompletionCtx) {
        topicCompletionChartInstance = new Chart(topicCompletionCtx, {
            type: 'pie', // Pie chart for overall completion rate
            data: {
                labels: ['Completed Topics', 'Pending Topics'],
                datasets: [{
                    data: [0, 0], // Will be updated by drawSyllabusProgressionChart
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }
}


function drawTestScoreChart() {
    if (!testScoreChartInstance) return;

    const labels = testResults.map(result => result.date).reverse();
    const physicsScores = testResults.map(result => result.physicsScore).reverse();
    const chemistryScores = testResults.map(result => result.chemistryScore).reverse();
    const biologyScores = testResults.map(result => result.biologyScore).reverse();
    const totalScores = testResults.map(result => result.totalScore).reverse();

    testScoreChartInstance.data.labels = labels;
    testScoreChartInstance.data.datasets = [
        {
            label: 'Physics Score',
            data: physicsScores,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            tension: 0.1
        },
        {
            label: 'Chemistry Score',
            data: chemistryScores,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: false,
            tension: 0.1
        },
        {
            label: 'Biology Score',
            data: biologyScores,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.1
        },
        {
            label: 'Total Score',
            data: totalScores,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: false,
            tension: 0.1,
            borderWidth: 2
        }
    ];
    testScoreChartInstance.update();
}

function drawSubjectAverageChart() {
    if (!subjectAverageChartInstance) return;

    const subjects = ['physics', 'chemistry', 'biology'];
    const averageScores = subjects.map(subject => {
        const scores = testResults.map(result => result[`${subject}Score`]);
        const sum = scores.reduce((a, b) => a + b, 0);
        return scores.length > 0 ? sum / scores.length : 0;
    });

    subjectAverageChartInstance.data.labels = subjects.map(s => s.charAt(0).toUpperCase() + s.slice(1));
    subjectAverageChartInstance.data.datasets = [
        {
            label: 'Average Score',
            data: averageScores,
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
        }
    ];
    subjectAverageChartInstance.update();
}

function drawTimeSpentChart() {
    if (!timeSpentChartInstance) return;

    const dailyTimeSpent = {}; // { 'YYYY-MM-DD': totalMinutes }
    dailyLogs.forEach(log => {
        const date = log.date;
        const timeParts = log.timeSpent.match(/(\d+)h\s*(\d+)m/);
        let totalMinutes = 0;
        if (timeParts) {
            totalMinutes = (parseInt(timeParts[1]) || 0) * 60 + (parseInt(timeParts[2]) || 0);
        }
        dailyTimeSpent[date] = (dailyTimeSpent[date] || 0) + totalMinutes;
    });

    const dates = Object.keys(dailyTimeSpent).sort();
    const times = dates.map(date => dailyTimeSpent[date] / 60); // Convert to hours

    timeSpentChartInstance.data.labels = dates;
    timeSpentChartInstance.data.datasets = [
        {
            label: 'Time Spent (hours)',
            data: times,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: true,
            tension: 0.1
        }
    ];
    timeSpentChartInstance.update();
}

function drawMCQsPracticedChart() {
    if (!mcqsPracticedChartInstance) return;

    const dailyMCQs = {}; // { 'YYYY-MM-DD': totalMCQs }
    dailyLogs.forEach(log => {
        const date = log.date;
        dailyMCQs[date] = (dailyMCQs[date] || 0) + log.mcqsPracticed;
    });

    const dates = Object.keys(dailyMCQs).sort();
    const mcqs = dates.map(date => dailyMCQs[date]);

    mcqsPracticedChartInstance.data.labels = dates;
    mcqsPracticedChartInstance.data.datasets = [
        {
            label: 'MCQs Practiced',
            data: mcqs,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.1
        }
    ];
    mcqsPracticedChartInstance.update();
}

function drawSyllabusProgressionChart() {
    if (!goalCompletionChartInstance || !topicCompletionChartInstance) return;

    // Calculate completed vs total chapters and topics for each subject
    const subjectProgress = {
        physics: { totalChapters: 0, completedChapters: 0, totalTopics: 0, completedTopics: 0 },
        chemistry: { totalChapters: 0, completedChapters: 0, totalTopics: 0, completedTopics: 0 },
        biology: { totalChapters: 0, completedChapters: 0, totalTopics: 0, completedTopics: 0 }
    };

    let overallTotalTopics = 0;
    let overallCompletedTopics = 0;

    for (const subject in ALL_SUBJECT_DATA) {
        const chaptersInSubject = ALL_SUBJECT_DATA[subject];
        subjectProgress[subject].totalChapters = Object.keys(chaptersInSubject).length;

        for (const chapterName in chaptersInSubject) {
            const topicsInChapter = chaptersInSubject[chapterName];
            subjectProgress[subject].totalTopics += topicsInChapter.length;
            overallTotalTopics += topicsInChapter.length;

            if (completedTopics[subject] && completedTopics[subject][chapterName]) {
                const completedCount = topicsInChapter.filter(topic =>
                    completedTopics[subject][chapterName].includes(topic)
                ).length;
                subjectProgress[subject].completedTopics += completedCount;
                overallCompletedTopics += completedCount;

                if (completedCount === topicsInChapter.length && topicsInChapter.length > 0) {
                    subjectProgress[subject].completedChapters++;
                }
            }
        }
    }

    // Update Subject-wise Goal Completion Chart (bar chart)
    const completedChapterData = ['physics', 'chemistry', 'biology'].map(s => subjectProgress[s].completedChapters);
    goalCompletionChartInstance.data.datasets[0].data = completedChapterData;
    goalCompletionChartInstance.update();

    // Update Topic Completion Rate Chart (pie chart)
    const pendingTopics = overallTotalTopics - overallCompletedTopics;
    topicCompletionChartInstance.data.datasets[0].data = [overallCompletedTopics, pendingTopics];
    topicCompletionChartInstance.update();
}


function drawAllCharts() {
    // This function will draw charts relevant to performance and study log trends
    drawTestScoreChart();
    drawSubjectAverageChart();
    drawTimeSpentChart();
    drawMCQsPracticedChart();
    // drawSyllabusProgressionChart is called when syllabusProgression sub-tab is active
}

function updateGoalsCharts() {
    // This function will be called whenever topic completion data changes
    drawSyllabusProgressionChart();
}

// Function to handle analytics sub-tab activation
function activateAnalyticsSubTab(tabName) {
    for (const key in analyticsSubTabContents) {
        analyticsSubTabContents[key].classList.add('hidden');
        if (document.getElementById(`${key}SubTab`)) {
            document.getElementById(`${key}SubTab`).classList.remove('active');
        }
    }

    if (analyticsSubTabContents[tabName]) {
        analyticsSubTabContents[tabName].classList.remove('hidden');
        if (document.getElementById(`${tabName}SubTab`)) {
            document.getElementById(`${tabName}SubTab`).classList.add('active');
        }

        // Draw specific charts for the activated sub-tab
        if (tabName === 'syllabusProgression') {
            drawSyllabusProgressionChart();
        } else {
            drawAllCharts(); // Draw performance and study log charts
        }
    }
}

// Attach event listeners for analytics sub-tabs
if (syllabusProgressionSubTabBtn) syllabusProgressionSubTabBtn.addEventListener('click', () => activateAnalyticsSubTab('syllabusProgression'));
if (studyLogTrendsSubTabBtn) studyLogTrendsSubTabBtn.addEventListener('click', () => activateAnalyticsSubTab('studyLogTrends'));
if (performanceInsightsSubTabBtn) performanceInsightsSubTabBtn.addEventListener('click', () => activateAnalyticsSubTab('performanceInsights'));


// --- Daily Routine Summary ---
function updateDailyRoutineSummary() {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = dailyLogs.filter(log => log.date === today);

    const chaptersDone = new Set(todayLogs.map(log => log.chapter));
    chaptersDoneTodayElem.textContent = chaptersDone.size;

    let totalTimeMinutes = 0;
    let totalMCQs = 0;

    todayLogs.forEach(log => {
        const timeParts = log.timeSpent.match(/(\d+)h\s*(\d+)m/);
        if (timeParts) {
            totalTimeMinutes += (parseInt(timeParts[1]) || 0) * 60 + (parseInt(timeParts[2]) || 0);
        }
        totalMCQs += log.mcqsPracticed;
    });

    const hours = Math.floor(totalTimeMinutes / 60);
    const minutes = totalTimeMinutes % 60;
    timeSpentTodayElem.textContent = `${hours}h ${minutes}m`;
    mcqsPracticedTodayElem.textContent = totalMCQs;

    backlogsCountElem.textContent = backlogs.length;
}


// --- MCQ Quota Charts (Mini Charts) ---
const physicsMCQQuotaChartCanvas = document.getElementById('physicsMCQQuotaChart')?.getContext('2d');
const chemistryMCQQuotaChartCanvas = document.getElementById('chemistryMCQQuotaChart')?.getContext('2d');
const biologyMCQQuotaChartCanvas = document.getElementById('biologyMCQQuotaChart')?.getContext('2d');

function updateMCQQuotaCharts() {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = dailyLogs.filter(log => log.date === today);

    let physicsDone = 0;
    let chemistryDone = 0;
    let biologyDone = 0;

    todayLogs.forEach(log => {
        if (log.subject === 'physics') physicsDone += log.mcqsPracticed;
        if (log.subject === 'chemistry') chemistryDone += log.mcqsPracticed;
        if (log.subject === 'biology') biologyDone += log.mcqsPracticed;
    });

    // Destroy existing instances if they exist
    if (physicsMCQQuotaChartInstance) physicsMCQQuotaChartInstance.destroy();
    if (chemistryMCQQuotaChartInstance) chemistryMCQQuotaChartInstance.destroy();
    if (biologyMCQQuotaChartInstance) biologyMCQQuotaChartInstance.destroy();

    // Physics MCQ Quota Chart
    if (physicsMCQQuotaChartCanvas) {
        physicsMCQQuotaChartInstance = new Chart(physicsMCQQuotaChartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Done', 'Remaining'],
                datasets: [{
                    data: [physicsDone, Math.max(0, mcqQuotas.physics - physicsDone)],
                    backgroundColor: ['#4CAF50', '#FFC107'], // Green for done, Amber for remaining
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                }
            }
        });
    }

    // Chemistry MCQ Quota Chart
    if (chemistryMCQQuotaChartCanvas) {
        chemistryMCQQuotaChartInstance = new Chart(chemistryMCQQuotaChartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Done', 'Remaining'],
                datasets: [{
                    data: [chemistryDone, Math.max(0, mcqQuotas.chemistry - chemistryDone)],
                    backgroundColor: ['#2196F3', '#FFC107'], // Blue for done, Amber for remaining
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                }
            }
        });
    }

    // Biology MCQ Quota Chart
    if (biologyMCQQuotaChartCanvas) {
        biologyMCQQuotaChartInstance = new Chart(biologyMCQQuotaChartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Done', 'Remaining'],
                datasets: [{
                    data: [biologyDone, Math.max(0, mcqQuotas.biology - biologyDone)],
                    backgroundColor: ['#9C27B0', '#FFC107'], // Purple for done, Amber for remaining
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                }
            }
        });
    }
}


// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Auth
    const signInWithGoogleBtn = document.getElementById('signInWithGoogleBtn');
    if (signInWithGoogleBtn) signInWithGoogleBtn.addEventListener('click', signInWithGoogle);
    if (logoutBtn) logoutBtn.addEventListener('click', signOutUser);

    // Daily Log
    if (logSubjectSelect) logSubjectSelect.addEventListener('change', populateBooksAndChapters);
    if (logChapterSelect) logChapterSelect.addEventListener('change', populateTopicsChecklist);
    if (logMCQSourceSelect) logMCQSourceSelect.addEventListener('change', handleMCQSourceChange);
    if (addLogEntryBtn) addLogEntryBtn.addEventListener('click', addLogEntry);

    // My Tests
    if (physicsScoreInput) physicsScoreInput.addEventListener('input', calculateTotalScore);
    if (chemistryScoreInput) chemistryScoreInput.addEventListener('input', calculateTotalScore);
    if (biologyScoreInput) biologyScoreInput.addEventListener('input', calculateTotalScore);
    if (addTestResultBtn) addTestResultBtn.addEventListener('click', addTestResult);

    // Upcoming Plans
    if (addPlanBtn) addPlanBtn.addEventListener('click', addPlan);

    // Backlogs
    if (addBacklogBtn) addBacklogBtn.addEventListener('click', addBacklog);

    // Goals (UPDATED)
    if (setMCQGoalsBtn) setMCQGoalsBtn.addEventListener('click', setMCQGoals);
    if (setOverallGoalBtn) setOverallGoalBtn.addEventListener('click', setOverallGoal);
    if (goalSubjectFilter) goalSubjectFilter.addEventListener('change', renderAllChaptersAndTopics); // New event listener


    // Initialize Firebase and set default tab when the window loads
    // Moved initializeFirebase and loadData into DOMContentLoaded for better timing if scripts.js is deferred
    initializeFirebase();
    // loadData() will be called after user logs in in loadUserData()
    // For initial load before login, ensure localStorage data is still processed.
    loadData(); // Initial load to process local storage data (e.g., if user refreshes page while logged in)

    // Initial countdown update
    updateCountdown();
    displayRandomLoginQuote(); // Set initial quote for login page
});


// Initial render when the script first runs (for users already logged in via localStorage)
// These functions are now called within loadData() after data is retrieved
// populateSubjectDropdowns();
// populateMCQSourceDropdown();
// renderDailyLogEntries();
// renderTestResults();
// renderUpcomingPlans();
// renderBacklogs();
// renderCompletedTasks();
// renderAllChaptersAndTopics(); // This is now called inside loadData
// updateMCQQuotaDisplays();
// updateOverallGoalDisplay();
// updateDailyRoutineSummary();
// initCharts(); // Call initCharts here so instances are ready
// updateMCQQuotaCharts(); // Initialize MCQ charts

// Set countdown and quote refresh
setInterval(updateCountdown, 1000);
setInterval(displayRandomMotivationalQuote, 15000); // Change quote every 15 seconds

// Adjust canvas size on window resize to make it responsive
window.addEventListener('resize', () => {
    if (tabContents.analytics && tabContents.analytics.classList.contains('active')) {
        if (analyticsSubTabContents.syllabusProgression && analyticsSubTabContents.syllabusProgression.classList.contains('active')) {
            drawSyllabusProgressionChart();
        } else {
            drawAllCharts();
        }
    }
});