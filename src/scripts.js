// src/scripts.js - Main JavaScript file for "The Road to AIIMS" Dashboard

// Firebase Imports (Ensure these match your Firebase SDK version)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";


// Global data stores (will be loaded from localStorage or Firestore and updated)
let dailyLogs = [];
let testResults = [];
let upcomingPlans = [];
let backlogs = [];
let completedTasks = [];
let chapterGoals = [];
let mcqQuotas = { physics: 100, chemistry: 100, biology: 150 }; // Default quotas
let overallGoal = null;
let completedTopics = {}; // { "subject": { "book": { "chapter": ["topic1", "topic2"] } } }

// Firebase instances
let app;
let db;
let auth;
let userId; // Will store the current user's ID

// --- DOM Elements ---
const authSection = document.getElementById('authSection');
const mainContainer = document.getElementById('mainContainer');
const signInWithGoogleBtn = document.getElementById('signInWithGoogleBtn'); // Only Google Sign-In button
const logoutBtn = document.getElementById('logoutBtn');
const authMessage = document.getElementById('authMessage'); // For displaying messages on auth page
const loadingOverlay = document.getElementById('loadingOverlay'); // Loading overlay element

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
const logBookSelect = document.getElementById('logBook'); // New Book/Module Select
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
const totalMCQsTodayElem = document.getElementById('totalMCQsToday');
const pendingBacklogsElem = document.getElementById('pendingBacklogs');

// MCQ Quota Charts
const physicsMCQQuotaChartCanvas = document.getElementById('physicsMCQQuotaChart');
const chemistryMCQQuotaChartCanvas = document.getElementById('chemistryMCQQuotaChart');
const biologyMCQQuotaChartCanvas = document.getElementById('biologyMCQQuotaChart');
let physicsMCQChart, chemistryMCQChart, biologyMCQChart;

// My Tests Elements
const testTypeSelect = document.getElementById('testType');
const testDateInput = document.getElementById('testDate');
const physicsScoreInput = document.getElementById('physicsScore');
const chemistryScoreInput = document.getElementById('chemistryScore');
const biologyScoreInput = document.getElementById('biologyScore');
const totalScoreInput = document.getElementById('totalScore');
const testCommentsInput = document.getElementById('testComments');
const addTestResultBtn = document.getElementById('addTestResultBtn');
const testResultsTableBody = document.getElementById('testResultsTableBody');

// Upcoming Plans Elements
const planDateInput = document.getElementById('planDate');
const planSubjectSelect = document.getElementById('planSubject');
const planBookSelect = document.getElementById('planBook'); // New Book/Module Select
const planChapterSelect = document.getElementById('planChapter'); // Changed to select for consistency
const planStudyTypeSelect = document.getElementById('planStudyType');
const planEstimatedTimeInput = document.getElementById('planEstimatedTime');
const addPlanBtn = document.getElementById('addPlanBtn');
const upcomingPlansTableBody = document.getElementById('upcomingPlansTableBody');

// Backlogs Elements
const backlogsTableBody = document.getElementById('backlogsTableBody');

// Completed Tasks Elements
const completedTableBody = document.getElementById('completedTableBody');

// Analytics & Graphs Elements (Canvases)
const testScoreChartCanvas = document.getElementById('testScoreChart');
const subjectAverageChartCanvas = document.getElementById('subjectAverageChart');
const timeSpentChartCanvas = document.getElementById('timeSpentChart');
const mcqsPracticedChartCanvas = document.getElementById('mcqsPracticedChart');
const goalCompletionChartCanvas = document.getElementById('goalCompletionChart');
const topicCompletionChartCanvas = document.getElementById('topicCompletionChart');

let testScoreChart, subjectAverageChart, timeSpentChart, mcqsPracticedChart, goalCompletionChart, topicCompletionChart;

// Goals Elements
const goalSubjectSelect = document.getElementById('goalSubject');
const goalBookSelect = document.getElementById('goalBook'); // Changed to select for consistency
const goalChapterSelect = document.getElementById('goalChapterName'); // Changed to select for consistency
const goalTopicsContainer = document.getElementById('goalTopicsContainer'); // New container for topics checklist
const goalTopicsChecklist = document.getElementById('goalTopicsChecklist'); // New topics checklist
const goalDueDateInput = document.getElementById('goalDueDate');
const addChapterGoalBtn = document.getElementById('addChapterGoalBtn');
const chapterGoalsTableBody = document.getElementById('chapterGoalsTableBody');

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


// --- Utility Functions ---
function showLoadingOverlay() {
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
    }
}

function hideLoadingOverlay() {
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }
}

function showAuthSection() {
    if (authSection) {
        authSection.classList.remove('hidden');
    }
    if (mainContainer) {
        mainContainer.classList.add('hidden');
    }
    if (authMessage) {
        authMessage.textContent = ''; // Clear previous messages
    }
}

function showMainDashboard() {
    if (authSection) {
        authSection.classList.add('hidden');
    }
    if (mainContainer) {
        mainContainer.classList.remove('hidden');
    }
    // Set today's date for relevant inputs
    const today = new Date().toISOString().split('T')[0];
    if (logDateInput) logDateInput.value = today;
    if (testDateInput) testDateInput.value = today;
    if (planDateInput) planDateInput.value = today; // Also set for upcoming plans

    // Render all data and charts
    renderDailyLogEntries();
    renderTestResults();
    renderUpcomingPlans();
    renderBacklogs();
    renderCompletedTasks();
    renderChapterGoals();
    updateMCQQuotaDisplays();
    updateOverallGoalDisplay();
    updateDailyRoutineSummary();
    drawAllCharts(); // Draw charts when dashboard is shown
}

function displayMessage(message, type = 'info') {
    if (authMessage) {
        authMessage.textContent = message;
        authMessage.className = 'mt-4 text-center text-sm'; // Reset classes
        if (type === 'success') {
            authMessage.classList.add('text-green-600');
        } else if (type === 'error') {
            authMessage.classList.add('text-red-600');
        } else {
            authMessage.classList.add('text-blue-600');
        }
        authMessage.classList.remove('hidden'); // Ensure message is visible
    }
}

function displayUserName() {
    // This function can be expanded to display the user's name on the dashboard
    // For example, if you have a span with id="userNameDisplay"
    // const userNameDisplay = document.getElementById('userNameDisplay');
    // if (userNameDisplay && auth.currentUser) {
    //     userNameDisplay.textContent = auth.currentUser.displayName || auth.currentUser.email;
    // }
    console.log("User logged in:", auth.currentUser?.displayName || auth.currentUser?.email);
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

// Function to calculate total score for tests
function calculateTotalScore() {
    const physics = parseInt(physicsScoreInput.value) || 0;
    const chemistry = parseInt(chemistryScoreInput.value) || 0;
    const biology = parseInt(biologyScoreInput.value) || 0;
    totalScoreInput.value = physics + chemistry + biology;
}

// --- Firebase Initialization and Authentication ---
async function initializeFirebase() {
    try {
        const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

        if (!firebaseConfig.apiKey) {
            console.error("Firebase config is missing API key. Cannot initialize Firebase.");
            displayMessage("Firebase configuration error. Please contact support.", 'error');
            return;
        }

        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);

        // Listen for auth state changes
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                userId = user.uid;
                console.log("User authenticated:", userId);
                await loadUserData(userId); // Load user-specific data
                showMainDashboard();
                displayUserName();
            } else {
                userId = null;
                console.log("User not authenticated, showing auth section.");
                showAuthSection();
            }
            hideLoadingOverlay(); // Hide loading overlay once auth state is determined
        });

        // Attempt to sign in with custom token if available (Canvas environment)
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
        } else {
            // If no custom token, sign in anonymously for basic functionality
            await signInAnonymously(auth);
        }

    } catch (error) {
        console.error("Error initializing Firebase or signing in:", error);
        displayMessage("Failed to initialize app. Check console for details.", 'error');
        hideLoadingOverlay();
    }
}

async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        showLoadingOverlay();
        await signInWithPopup(auth, provider);
        // onAuthStateChanged listener will handle showing the dashboard
        // No need to call hideAuthSection/showMainContainer here directly
    } catch (error) {
        hideLoadingOverlay();
        console.error("Google Sign-In Error:", error);
        // Check for specific errors to provide better user feedback
        if (error.code === 'auth/popup-closed-by-user') {
            displayMessage("Google Sign-In popup was closed. Please try again.", 'info');
        } else if (error.code === 'auth/cancelled-popup-request') {
            displayMessage("Another sign-in request was already in progress. Please try again.", 'info');
        } else {
            displayMessage("Google Sign-In failed. Please try again.", 'error');
        }
    }
}

async function handleLogout() {
    try {
        showLoadingOverlay();
        await signOut(auth);
        // onAuthStateChanged listener will handle showing auth section
        // Clear local data on logout for a clean slate
        clearLocalData();
        hideLoadingOverlay();
    } catch (error) {
        console.error("Logout Error:", error);
        displayMessage("Logout failed. Please try again.", 'error');
        hideLoadingOverlay();
    }
}

// --- Data Persistence (Firestore) ---
async function saveUserData() {
    if (!userId) {
        console.warn("No user ID available to save data.");
        return;
    }
    showLoadingOverlay();
    try {
        const userDocRef = doc(db, `artifacts/${__app_id}/users/${userId}/data/user_data`);
        await setDoc(userDocRef, {
            dailyLogs: JSON.stringify(dailyLogs),
            testResults: JSON.stringify(testResults),
            upcomingPlans: JSON.stringify(upcomingPlans),
            backlogs: JSON.stringify(backlogs),
            completedTasks: JSON.stringify(completedTasks),
            chapterGoals: JSON.stringify(chapterGoals),
            mcqQuotas: JSON.stringify(mcqQuotas),
            overallGoal: JSON.stringify(overallGoal),
            completedTopics: JSON.stringify(completedTopics)
        }, { merge: true }); // Use merge to avoid overwriting other fields if they exist
        console.log("User data saved to Firestore.");
    } catch (e) {
        console.error("Error saving user data: ", e);
        displayMessage("Failed to save data. Please check your connection.", 'error');
    } finally {
        hideLoadingOverlay();
    }
}

async function loadUserData() {
    if (!userId) {
        console.warn("No user ID available to load data.");
        return;
    }
    showLoadingOverlay();
    try {
        const userDocRef = doc(db, `artifacts/${__app_id}/users/${userId}/data/user_data`);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            dailyLogs = JSON.parse(data.dailyLogs || '[]') || [];
            testResults = JSON.parse(data.testResults || '[]') || [];
            upcomingPlans = JSON.parse(data.upcomingPlans || '[]') || [];
            backlogs = JSON.parse(data.backlogs || '[]') || [];
            completedTasks = JSON.parse(data.completedTasks || '[]') || [];
            chapterGoals = JSON.parse(data.chapterGoals || '[]') || [];
            mcqQuotas = JSON.parse(data.mcqQuotas || '{"physics": 100, "chemistry": 100, "biology": 150}') || { physics: 100, chemistry: 100, biology: 150 };
            overallGoal = JSON.parse(data.overallGoal || 'null');
            completedTopics = JSON.parse(data.completedTopics || '{}') || {};
            console.log("User data loaded from Firestore.");
        } else {
            console.log("No user data found in Firestore, initializing with defaults.");
            // Save initial default data if none exists
            await saveUserData();
        }
    } catch (e) {
        console.error("Error loading user data: ", e);
        displayMessage("Failed to load data. Please check your connection.", 'error');
    } finally {
        hideLoadingOverlay();
    }
}

function clearLocalData() {
    // This function is for clearing local state, typically after logout
    dailyLogs = [];
    testResults = [];
    upcomingPlans = [];
    backlogs = [];
    completedTasks = [];
    chapterGoals = [];
    mcqQuotas = { physics: 100, chemistry: 100, biology: 150 };
    overallGoal = null;
    completedTopics = {};
    // No need to clear localStorage if using Firestore as primary persistence
    // localStorage.clear(); // Only if you want to completely wipe local cache
}

// --- Accordion Functionality ---
document.querySelectorAll('.section-header').forEach(header => {
    header.addEventListener('click', () => {
        const targetId = header.dataset.target;
        const targetContent = document.getElementById(targetId);
        const icon = header.querySelector('i');

        // Close other open sections
        document.querySelectorAll('.section-content').forEach(content => {
            if (content.id !== targetId && !content.classList.contains('hidden')) {
                content.classList.add('hidden');
                const otherHeader = content.previousElementSibling;
                if (otherHeader) {
                    otherHeader.querySelector('i').classList.remove('fa-chevron-up');
                    otherHeader.querySelector('i').classList.add('fa-chevron-down');
                }
            }
        });

        // Toggle clicked section
        targetContent.classList.toggle('hidden');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');

        // If Analytics & Graphs is opened, draw charts
        if (targetId === 'analyticsGraphsContent' && !targetContent.classList.contains('hidden')) {
            drawAllCharts();
        }
    });
});


// --- Daily Routine Tab Switching ---
const dailyRoutineTabs = document.querySelectorAll('.daily-routine-section .tab-button');
const dailyRoutineTabContents = document.querySelectorAll('.daily-routine-section .tab-content');

dailyRoutineTabs.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;

        dailyRoutineTabs.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        dailyRoutineTabContents.forEach(content => content.classList.add('hidden'));
        document.getElementById(`${tabId}TabContent`).classList.remove('hidden');

        // Re-render content based on active tab
        if (tabId === 'today') renderDailyLogEntries();
        if (tabId === 'upcoming-plans') renderUpcomingPlans();
        if (tabId === 'backlogs') renderBacklogs();
        if (tabId === 'completed') renderCompletedTasks();
    });
});


// --- Dynamic Dropdowns (Subject, Book, Chapter, Topics) ---

/**
 * Populates the Subject dropdowns across Daily Log, Goals, and Upcoming Plans sections.
 * This function remains largely the same as the top-level keys in ALL_SUBJECT_DATA are subjects.
 */
function populateSubjectDropdowns() {
    const subjects = Object.keys(ALL_SUBJECT_DATA);

    // For Daily Log
    logSubjectSelect.innerHTML = '<option value="">Select Subject</option>';
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
        logSubjectSelect.appendChild(option);
    });

    // For Goals
    goalSubjectSelect.innerHTML = '<option value="">Select Subject</option>';
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
        goalSubjectSelect.appendChild(option);
    });

    // For Upcoming Plans
    planSubjectSelect.innerHTML = '<option value="">Select Subject</option>';
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
        planSubjectSelect.appendChild(option);
    });
}

/**
 * Populates the Book/Module dropdown for the Daily Log section based on the selected subject.
 */
function populateLogBookDropdown() {
    const selectedSubject = logSubjectSelect.value;
    logBookSelect.innerHTML = '<option value="">Select Book/Module</option>';
    logChapterSelect.innerHTML = '<option value="">Select Chapter</option>'; // Reset chapter dropdown
    logTopicsContainer.classList.add('hidden'); // Hide topics

    if (selectedSubject && ALL_SUBJECT_DATA[selectedSubject]) {
        const books = ALL_SUBJECT_DATA[selectedSubject];
        books.forEach(book => {
            const option = document.createElement('option');
            option.value = book.name;
            option.textContent = book.name;
            logBookSelect.appendChild(option);
        });
    }
}

/**
 * Populates the Chapter dropdown for the Daily Log section based on the selected subject and book.
 */
function populateLogChapterDropdown() {
    const selectedSubject = logSubjectSelect.value;
    const selectedBookName = logBookSelect.value;
    logChapterSelect.innerHTML = '<option value="">Select Chapter</option>';
    logTopicsContainer.classList.add('hidden'); // Hide topics

    if (selectedSubject && selectedBookName && ALL_SUBJECT_DATA[selectedSubject]) {
        const selectedBook = ALL_SUBJECT_DATA[selectedSubject].find(book => book.name === selectedBookName);
        if (selectedBook && selectedBook.chapters) {
            selectedBook.chapters.forEach(chapter => {
                const option = document.createElement('option');
                option.value = chapter.name;
                option.textContent = chapter.name;
                logChapterSelect.appendChild(option);
            });
        }
    }
}

/**
 * Populates the Topics checklist for the Daily Log section based on the selected subject, book, and chapter.
 */
function populateLogTopicsChecklist() {
    const selectedSubject = logSubjectSelect.value;
    const selectedBookName = logBookSelect.value;
    const selectedChapterName = logChapterSelect.value;
    logTopicsChecklist.innerHTML = ''; // Clear previous topics
    logTopicsContainer.classList.add('hidden'); // Hide by default

    if (selectedSubject && selectedBookName && selectedChapterName && ALL_SUBJECT_DATA[selectedSubject]) {
        const selectedBook = ALL_SUBJECT_DATA[selectedSubject].find(book => book.name === selectedBookName);
        if (selectedBook && selectedBook.chapters) {
            const selectedChapter = selectedBook.chapters.find(chapter => chapter.name === selectedChapterName);
            if (selectedChapter && selectedChapter.topics) {
                const topics = selectedChapter.topics;
                if (topics.length > 0 && topics[0] !== "General Topics") { // Don't show for placeholders
                    logTopicsContainer.classList.remove('hidden');
                    topics.forEach(topic => {
                        const label = document.createElement('label');
                        label.className = 'inline-flex items-center';
                        label.innerHTML = `
                            <input type="checkbox" name="logTopic" value="${topic}" class="form-checkbox text-indigo-600 rounded">
                            <span class="ml-2 text-gray-700">${topic}</span>
                        `;
                        logTopicsChecklist.appendChild(label);
                    });
                }
            }
        }
    }
}

/**
 * Populates the Book/Module dropdown for the Goals section.
 */
function populateGoalBookDropdown() {
    const selectedSubject = goalSubjectSelect.value;
    goalBookSelect.innerHTML = '<option value="">Select Book/Module</option>';
    goalChapterSelect.innerHTML = '<option value="">Select Chapter</option>'; // Reset chapter dropdown
    goalTopicsChecklist.innerHTML = ''; // Reset topics
    goalTopicsContainer.classList.add('hidden'); // Hide topics

    if (selectedSubject && ALL_SUBJECT_DATA[selectedSubject]) {
        const books = ALL_SUBJECT_DATA[selectedSubject];
        books.forEach(book => {
            const option = document.createElement('option');
            option.value = book.name;
            option.textContent = book.name;
            goalBookSelect.appendChild(option);
        });
    }
}

/**
 * Populates the Chapter dropdown for the Goals section based on the selected subject and book.
 */
function populateGoalChapterDropdown() {
    const selectedSubject = goalSubjectSelect.value;
    const selectedBookName = goalBookSelect.value;
    goalChapterSelect.innerHTML = '<option value="">Select Chapter</option>';
    goalTopicsChecklist.innerHTML = ''; // Reset topics
    goalTopicsContainer.classList.add('hidden'); // Hide topics

    if (selectedSubject && selectedBookName && ALL_SUBJECT_DATA[selectedSubject]) {
        const selectedBook = ALL_SUBJECT_DATA[selectedSubject].find(book => book.name === selectedBookName);
        if (selectedBook && selectedBook.chapters) {
            selectedBook.chapters.forEach(chapter => {
                const option = document.createElement('option');
                option.value = chapter.name;
                option.textContent = chapter.name;
                goalChapterSelect.appendChild(option);
            });
        }
    }
}

/**
 * Populates the Topics checklist for the Goals section based on the selected subject, book, and chapter.
 */
function populateGoalTopicsChecklist() {
    const selectedSubject = goalSubjectSelect.value;
    const selectedBookName = goalBookSelect.value;
    const selectedChapterName = goalChapterSelect.value;
    goalTopicsChecklist.innerHTML = ''; // Clear previous topics
    goalTopicsContainer.classList.add('hidden'); // Hide by default

    if (selectedSubject && selectedBookName && selectedChapterName && ALL_SUBJECT_DATA[selectedSubject]) {
        const selectedBook = ALL_SUBJECT_DATA[selectedSubject].find(book => book.name === selectedBookName);
        if (selectedBook && selectedBook.chapters) {
            const selectedChapter = selectedBook.chapters.find(chapter => chapter.name === selectedChapterName);
            if (selectedChapter && selectedChapter.topics) {
                const topics = selectedChapter.topics;
                if (topics.length > 0 && topics[0] !== "General Topics") { // Don't show for placeholders
                    goalTopicsContainer.classList.remove('hidden');
                    topics.forEach(topic => {
                        const label = document.createElement('label');
                        label.className = 'inline-flex items-center';
                        label.innerHTML = `
                            <input type="checkbox" name="goalTopic" value="${topic}" class="form-checkbox text-indigo-600 rounded">
                            <span class="ml-2 text-gray-700">${topic}</span>
                        `;
                        goalTopicsChecklist.appendChild(label);
                    });
                }
            }
        }
    }
}


/**
 * Populates the Book/Module dropdown for the Upcoming Plans section.
 */
function populatePlanBookDropdown() {
    const selectedSubject = planSubjectSelect.value;
    planBookSelect.innerHTML = '<option value="">Select Book/Module</option>';
    planChapterSelect.innerHTML = '<option value="">Select Chapter</option>'; // Reset chapter dropdown

    if (selectedSubject && ALL_SUBJECT_DATA[selectedSubject]) {
        const books = ALL_SUBJECT_DATA[selectedSubject];
        books.forEach(book => {
            const option = document.createElement('option');
            option.value = book.name;
            option.textContent = book.name;
            planBookSelect.appendChild(option);
        });
    }
}

/**
 * Populates the Chapter dropdown for the Upcoming Plans section based on the selected subject and book.
 */
function populatePlanChapterDropdown() {
    const selectedSubject = planSubjectSelect.value;
    const selectedBookName = planBookSelect.value;
    planChapterSelect.innerHTML = '<option value="">Select Chapter</option>';

    if (selectedSubject && selectedBookName && ALL_SUBJECT_DATA[selectedSubject]) {
        const selectedBook = ALL_SUBJECT_DATA[selectedSubject].find(book => book.name === selectedBookName);
        if (selectedBook && selectedBook.chapters) {
            selectedBook.chapters.forEach(chapter => {
                const option = document.createElement('option');
                option.value = chapter.name;
                option.textContent = chapter.name;
                planChapterSelect.appendChild(option);
            });
        }
    }
}


// --- Event Listeners for Dynamic Dropdowns ---
if (logSubjectSelect) logSubjectSelect.addEventListener('change', populateLogBookDropdown);
if (logBookSelect) logBookSelect.addEventListener('change', populateLogChapterDropdown);
if (logChapterSelect) logChapterSelect.addEventListener('change', populateLogTopicsChecklist); // New listener for topics

if (goalSubjectSelect) goalSubjectSelect.addEventListener('change', populateGoalBookDropdown);
if (goalBookSelect) goalBookSelect.addEventListener('change', populateGoalChapterDropdown);
if (goalChapterSelect) goalChapterSelect.addEventListener('change', populateGoalTopicsChecklist); // New listener for topics

if (planSubjectSelect) planSubjectSelect.addEventListener('change', populatePlanBookDropdown);
if (planBookSelect) planBookSelect.addEventListener('change', populatePlanChapterDropdown);


// --- Daily Log Functions ---
function addLogEntry() {
    const date = logDateInput.value;
    const subject = logSubjectSelect.value;
    const book = logBookSelect.value; // Get book value
    const chapter = logChapterSelect.value;
    const selectedTopics = Array.from(logTopicsChecklist.querySelectorAll('input[name="logTopic"]:checked'))
                               .map(checkbox => checkbox.value);
    const studyTypes = Array.from(document.querySelectorAll('input[name="studyType"]:checked'))
                             .map(checkbox => checkbox.value);
    const mcqsPracticed = parseInt(logMCQsPracticedInput.value) || 0;
    const mcqSource = logMCQSourceSelect.value;
    const customMCQSource = logCustomMCQSourceInput.value;
    const customMCQsCount = parseInt(logCustomMCQsCountInput.value) || 0;
    const timeSpent = logTimeSpentInput.value;
    const comments = logCommentsInput.value;

    if (!date || !subject || !book || !chapter || studyTypes.length === 0 || (selectedTopics.length === 0 && mcqsPracticed === 0 && timeSpent === '')) {
        displayMessage('Please fill in all required fields (Date, Subject, Book, Chapter, at least one Study Type, and at least one of Topics, MCQs, or Time Spent).', 'error');
        return;
    }

    const totalMCQs = mcqsPracticed + customMCQsCount;

    const newLog = {
        id: generateId(),
        date,
        subject,
        book, // Store book
        chapter,
        topics: selectedTopics,
        studyTypes, // Store study types
        mcqsPracticed: totalMCQs,
        mcqSource: mcqSource === 'Other' ? customMCQSource : mcqSource,
        timeSpent,
        comments,
        type: 'chapter_study' // Default type for now, can be expanded
    };
    dailyLogs.push(newLog);
    saveUserData(); // Save to Firestore
    renderDailyLogEntries();
    updateDailyRoutineSummary();
    drawAllCharts(); // Update charts after new data
    updateMCQQuotaCharts(); // Update MCQ charts

    // Mark topics as completed
    trackCompletedTopics(subject, book, chapter, selectedTopics);


    // Clear form
    logSubjectSelect.value = '';
    logBookSelect.value = ''; // Clear book
    logChapterSelect.value = '';
    logTopicsChecklist.innerHTML = '';
    logTopicsContainer.classList.add('hidden');
    document.querySelectorAll('input[name="studyType"]').forEach(cb => cb.checked = false); // Clear study types
    logMCQsPracticedInput.value = '';
    logMCQSourceSelect.value = '';
    logCustomMCQSourceInput.value = '';
    logCustomMCQsCountInput.value = '';
    logTimeSpentInput.value = '';
    logCommentsInput.value = '';
    displayMessage('Log entry added successfully!', 'success');
}


function renderDailyLogEntries() {
    dailyLogTableBody.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = dailyLogs.filter(log => log.date === today);

    if (todayLogs.length === 0) {
        dailyLogTableBody.innerHTML = '<tr><td colspan="8" class="text-center py-4 text-gray-500">No log entries for today.</td></tr>';
        return;
    }

    todayLogs.forEach(log => {
        const row = dailyLogTableBody.insertRow();
        row.className = 'border-b border-gray-200 hover:bg-gray-100';
        row.innerHTML = `
            <td class="py-3 px-6 text-left whitespace-nowrap">${log.date}</td>
            <td class="py-3 px-6 text-left">${log.subject.charAt(0).toUpperCase() + log.subject.slice(1)}</td>
            <td class="py-3 px-6 text-left">${log.book}</td>
            <td class="py-3 px-6 text-left">${log.chapter}</td>
            <td class="py-3 px-6 text-left">${log.topics.join(', ') || 'N/A'}</td>
            <td class="py-3 px-6 text-center">${log.mcqsPracticed || 0}</td>
            <td class="py-3 px-6 text-center">${log.timeSpent || '0h 0m'}</td>
            <td class="py-3 px-6 text-center">
                <button onclick="editLogEntry('${log.id}')" class="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                <button onclick="deleteLogEntry('${log.id}')" class="text-red-600 hover:text-red-800">Delete</button>
            </td>
        `;
    });
}

function editLogEntry(id) {
    const log = dailyLogs.find(entry => entry.id === id);
    if (log) {
        logDateInput.value = log.date;
        logSubjectSelect.value = log.subject;
        populateLogBookDropdown(); // Populate book dropdown first
        setTimeout(() => { // Use timeout to ensure options are rendered
            logBookSelect.value = log.book;
            populateLogChapterDropdown(); // Populate chapter dropdown
            setTimeout(() => {
                logChapterSelect.value = log.chapter;
                populateLogTopicsChecklist(); // Populate topics checklist
                setTimeout(() => {
                    log.topics.forEach(topic => {
                        const checkbox = logTopicsChecklist.querySelector(`input[value="${topic}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                }, 50);
            }, 50);
        }, 50);

        document.querySelectorAll('input[name="studyType"]').forEach(cb => {
            cb.checked = log.studyTypes.includes(cb.value);
        });

        logMCQsPracticedInput.value = log.mcqsPracticed;
        logMCQSourceSelect.value = log.mcqSource; // This might need adjustment if custom source was used
        logCustomMCQSourceInput.value = log.mcqSource === 'Other' ? log.mcqSource : ''; // Set custom source if 'Other' was chosen
        logCustomMCQsCountInput.value = log.customMCQsCount;
        logTimeSpentInput.value = log.timeSpent;
        logCommentsInput.value = log.comments;

        // Change button to update
        addLogEntryBtn.textContent = 'Update Log Entry';
        addLogEntryBtn.onclick = () => updateLogEntry(id);

        displayMessage('Log entry loaded for editing.', 'info');
    }
}

function updateLogEntry(id) {
    const index = dailyLogs.findIndex(e => e.id === id);
    if (index === -1) return;

    const date = logDateInput.value;
    const subject = logSubjectSelect.value;
    const book = logBookSelect.value;
    const chapter = logChapterSelect.value;
    const selectedTopics = Array.from(logTopicsChecklist.querySelectorAll('input[name="logTopic"]:checked'))
                               .map(checkbox => checkbox.value);
    const studyTypes = Array.from(document.querySelectorAll('input[name="studyType"]:checked'))
                             .map(checkbox => checkbox.value);
    const mcqsPracticed = parseInt(logMCQsPracticedInput.value) || 0;
    const mcqSource = logMCQSourceSelect.value;
    const customMCQSource = logCustomMCQSourceInput.value;
    const customMCQsCount = parseInt(logCustomMCQsCountInput.value) || 0;
    const timeSpent = logTimeSpentInput.value;
    const comments = logCommentsInput.value;

    if (!date || !subject || !book || !chapter || studyTypes.length === 0 || (selectedTopics.length === 0 && mcqsPracticed === 0 && timeSpent === '')) {
        displayMessage('Please fill in all required fields (Date, Subject, Book, Chapter, at least one Study Type, and at least one of Topics, MCQs, or Time Spent).', 'error');
        return;
    }

    const totalMCQs = mcqsPracticed + customMCQsCount;

    dailyLogs[index] = {
        id: id,
        date,
        subject,
        book,
        chapter,
        topics: selectedTopics,
        studyTypes,
        mcqsPracticed: totalMCQs,
        mcqSource: mcqSource === 'Other' ? customMCQSource : mcqSource,
        customMCQsCount, // Store custom count separately
        timeSpent,
        comments
    };

    saveUserData();
    renderDailyLogEntries();
    updateDailyRoutineSummary();
    drawAllCharts();
    updateMCQQuotaCharts();
    trackCompletedTopics(subject, book, chapter, selectedTopics);

    // Reset form and button
    addLogEntryBtn.textContent = 'Add Log Entry';
    addLogEntryBtn.onclick = addLogEntry; // Reset to original add function
    // Clear form
    logSubjectSelect.value = '';
    logBookSelect.value = '';
    logChapterSelect.value = '';
    logTopicsChecklist.innerHTML = '';
    logTopicsContainer.classList.add('hidden');
    document.querySelectorAll('input[name="studyType"]').forEach(cb => cb.checked = false);
    logMCQsPracticedInput.value = '';
    logMCQSourceSelect.value = '';
    logCustomMCQSourceInput.value = '';
    logCustomMCQsCountInput.value = '';
    logTimeSpentInput.value = '';
    logCommentsInput.value = '';
    displayMessage('Log entry updated successfully!', 'success');
}


function deleteLogEntry(id) {
    // Use a custom modal or confirmation for better UX than `confirm()`
    const confirmDelete = window.confirm('Are you sure you want to delete this log entry?');
    if (confirmDelete) {
        dailyLogs = dailyLogs.filter(entry => entry.id !== id);
        saveUserData();
        renderDailyLogEntries();
        updateDailyRoutineSummary();
        drawAllCharts();
        updateMCQQuotaCharts();
        displayMessage('Log entry deleted successfully!', 'success');
    }
}

function updateDailyRoutineSummary() {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = dailyLogs.filter(log => log.date === today);

    const chaptersDone = new Set();
    let totalTimeSpentMinutes = 0;
    let totalMCQsToday = 0;

    todayLogs.forEach(log => {
        chaptersDone.add(`${log.subject}-${log.book}-${log.chapter}`); // Include book in unique chapter tracking
        const [hours, minutes] = (log.timeSpent || '00:00').split(':').map(Number); // Ensure format HH:MM
        totalTimeSpentMinutes += (hours * 60) + minutes;
        totalMCQsToday += log.mcqsPracticed || 0;
    });

    chaptersDoneTodayElem.textContent = chaptersDone.size;
    const displayHours = Math.floor(totalTimeSpentMinutes / 60);
    const displayMinutes = totalTimeSpentMinutes % 60;
    timeSpentTodayElem.textContent = `${displayHours}h ${displayMinutes}m`;
    totalMCQsTodayElem.textContent = totalMCQsToday;
    pendingBacklogsElem.textContent = backlogs.length;
}


// --- My Tests Functions ---
function addTestResult() {
    const type = testTypeSelect.value;
    const date = testDateInput.value;
    const physics = parseInt(physicsScoreInput.value);
    const chemistry = parseInt(chemistryScoreInput.value);
    const biology = parseInt(biologyScoreInput.value);
    const total = parseInt(totalScoreInput.value);
    const comments = testCommentsInput.value;

    if (!type || !date || isNaN(physics) || isNaN(chemistry) || isNaN(biology) || isNaN(total)) {
        displayMessage('Please fill in all test result fields.', 'error');
        return;
    }

    const newTest = {
        id: generateId(),
        type,
        date,
        physics,
        chemistry,
        biology,
        total,
        comments
    };
    testResults.push(newTest);
    saveUserData();
    renderTestResults();
    drawAllCharts(); // Update charts after new data
    displayMessage('Test result added successfully!', 'success');

    // Clear form
    testTypeSelect.value = '';
    // testDateInput.value = ''; // Keep today's date
    physicsScoreInput.value = '';
    chemistryScoreInput.value = '';
    biologyScoreInput.value = '';
    totalScoreInput.value = '';
    testCommentsInput.value = '';
}

function renderTestResults() {
    testResultsTableBody.innerHTML = '';
    if (testResults.length === 0) {
        testResultsTableBody.innerHTML = '<tr><td colspan="8" class="text-center py-4 text-gray-500">No test results added yet.</td></tr>';
        return;
    }

    testResults.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(test => {
        const row = testResultsTableBody.insertRow();
        row.className = 'border-b border-gray-200 hover:bg-gray-100';
        row.innerHTML = `
            <td class="py-3 px-6 text-left whitespace-nowrap">${test.date}</td>
            <td class="py-3 px-6 text-left">${test.type.charAt(0).toUpperCase() + test.type.slice(1).replace(/_/g, ' ')}</td>
            <td class="py-3 px-6 text-center">${test.physics}</td>
            <td class="py-3 px-6 text-center">${test.chemistry}</td>
            <td class="py-3 px-6 text-center">${test.biology}</td>
            <td class="py-3 px-6 text-center font-bold">${test.total}</td>
            <td class="py-3 px-6 text-left text-sm">${test.comments || 'N/A'}</td>
            <td class="py-3 px-6 text-center">
                <button onclick="deleteTestResult('${test.id}')" class="text-red-600 hover:text-red-800">Delete</button>
            </td>
        `;
    });
}

function deleteTestResult(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this test result?');
    if (confirmDelete) {
        testResults = testResults.filter(test => test.id !== id);
        saveUserData();
        renderTestResults();
        drawAllCharts();
        displayMessage('Test result deleted successfully!', 'success');
    }
}


// --- Upcoming Plans Functions ---
function addPlan() {
    const date = planDateInput.value;
    const subject = planSubjectSelect.value;
    const book = planBookSelect.value; // Get book
    const chapter = planChapterSelect.value; // Get chapter from select
    const studyType = planStudyTypeSelect.value;
    const estimatedTime = planEstimatedTimeInput.value;

    if (!date || !subject || !book || !chapter || !studyType || !estimatedTime) {
        displayMessage('Please fill in all upcoming plan fields.', 'error');
        return;
    }

    const newPlan = {
        id: generateId(),
        date,
        subject,
        book, // Store book
        chapter,
        studyType,
        estimatedTime,
        isCompleted: false,
        isBacklog: false
    };
    upcomingPlans.push(newPlan);
    saveUserData();
    renderUpcomingPlans();
    displayMessage('Plan added successfully!', 'success');

    // Clear form
    // planDateInput.value = ''; // Keep today's date
    planSubjectSelect.value = '';
    planBookSelect.value = ''; // Clear book
    planChapterSelect.value = '';
    planStudyTypeSelect.value = '';
    planEstimatedTimeInput.value = '';
}

function renderUpcomingPlans() {
    upcomingPlansTableBody.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    const filteredPlans = upcomingPlans.filter(plan => !plan.isCompleted && !plan.isBacklog);

    if (filteredPlans.length === 0) {
        upcomingPlansTableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-gray-500">No upcoming plans.</td></tr>';
        return;
    }

    filteredPlans.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(plan => {
        const row = upcomingPlansTableBody.insertRow();
        row.className = 'border-b border-gray-200 hover:bg-gray-100';
        // Add a class for past due plans
        if (plan.date < today) {
            row.classList.add('bg-red-50', 'text-red-700');
        }
        row.innerHTML = `
            <td class="py-3 px-6 text-left whitespace-nowrap">${plan.date}</td>
            <td class="py-3 px-6 text-left">${plan.subject.charAt(0).toUpperCase() + plan.subject.slice(1)}</td>
            <td class="py-3 px-6 text-left">${plan.book}</td>
            <td class="py-3 px-6 text-left">${plan.chapter}</td>
            <td class="py-3 px-6 text-left">${plan.studyType}</td>
            <td class="py-3 px-6 text-center">${plan.estimatedTime}</td>
            <td class="py-3 px-6 text-center">
                <button onclick="markPlanCompleted('${plan.id}')" class="text-green-600 hover:text-green-800 mr-2">Complete</button>
                <button onclick="markPlanBacklog('${plan.id}')" class="text-yellow-600 hover:text-yellow-800 mr-2">Backlog</button>
                <button onclick="deletePlan('${plan.id}')" class="text-red-600 hover:text-red-800">Delete</button>
            </td>
        `;
    });
}

function markPlanCompleted(id) {
    const planIndex = upcomingPlans.findIndex(p => p.id === id);
    if (planIndex > -1) {
        const plan = upcomingPlans[planIndex];
        plan.isCompleted = true;
        plan.completionDate = new Date().toISOString().split('T')[0];
        completedTasks.push({ // Add to completed tasks for history
            id: generateId(),
            date: plan.completionDate,
            subject: plan.subject,
            book: plan.book, // Store book
            chapter: plan.chapter,
            topics: [], // No specific topics captured here, assume chapter done
            type: plan.studyType,
            mcqs: 0, // Not tracked via plans completion
            time: plan.estimatedTime,
            originalPlanId: plan.id
        });
        upcomingPlans.splice(planIndex, 1); // Remove from upcoming plans
        saveUserData();
        renderUpcomingPlans();
        renderCompletedTasks();
        displayMessage('Plan marked as completed!', 'success');
    }
}

function markPlanBacklog(id) {
    const planIndex = upcomingPlans.findIndex(p => p.id === id);
    if (planIndex > -1) {
        const plan = upcomingPlans[planIndex];
        const reason = window.prompt('Reason for backlog (optional):'); // Use prompt for reason
        if (reason !== null) { // If user didn't cancel prompt
            plan.isBacklog = true;
            plan.backlogDate = new Date().toISOString().split('T')[0];
            backlogs.push({ // Add to backlogs
                id: generateId(),
                date: plan.backlogDate,
                subject: plan.subject,
                book: plan.book, // Store book
                chapter: plan.chapter,
                reason: reason || 'No reason specified', // Default reason
                originalPlanId: plan.id
            });
            upcomingPlans.splice(planIndex, 1); // Remove from upcoming plans
            saveUserData();
            renderUpcomingPlans();
            renderBacklogs();
            updateDailyRoutineSummary();
            displayMessage('Plan moved to backlogs!', 'info');
        }
    }
}

function deletePlan(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this plan?');
    if (confirmDelete) {
        upcomingPlans = upcomingPlans.filter(plan => plan.id !== id);
        saveUserData();
        renderUpcomingPlans();
        displayMessage('Plan deleted successfully!', 'success');
    }
}

// --- Backlogs Functions ---
function renderBacklogs() {
    backlogsTableBody.innerHTML = '';
    if (backlogs.length === 0) {
        backlogsTableBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-gray-500">No backlogs.</td></tr>';
        return;
    }

    backlogs.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(item => {
        const row = backlogsTableBody.insertRow();
        row.className = 'border-b border-gray-200 hover:bg-gray-100 bg-red-50 text-red-700';
        row.innerHTML = `
            <td class="py-3 px-6 text-left whitespace-nowrap">${item.date}</td>
            <td class="py-3 px-6 text-left">${item.subject.charAt(0).toUpperCase() + item.subject.slice(1)}</td>
            <td class="py-3 px-6 text-left">${item.book}</td>
            <td class="py-3 px-6 text-left">${item.chapter}</td>
            <td class="py-3 px-6 text-left">${item.reason || 'N/A'}</td>
            <td class="py-3 px-6 text-center">
                <button onclick="resolveBacklog('${item.id}')" class="text-green-600 hover:text-green-800 mr-2">Resolve</button>
                <button onclick="deleteBacklog('${item.id}')" class="text-red-600 hover:text-red-800">Delete</button>
            </td>
        `;
    });
}

function resolveBacklog(id) {
    const backlogIndex = backlogs.findIndex(b => b.id === id);
    if (backlogIndex > -1) {
        const resolvedBacklog = backlogs[backlogIndex];
        // Optionally, add to completed tasks or a 'resolved' list
        completedTasks.push({
            id: generateId(),
            date: new Date().toISOString().split('T')[0],
            subject: resolvedBacklog.subject,
            book: resolvedBacklog.book, // Store book
            chapter: resolvedBacklog.chapter,
            topics: [], // Not tracked here
            type: 'Backlog Resolution',
            mcqs: 0,
            time: 'N/A',
            originalBacklogId: resolvedBacklog.id
        });
        backlogs.splice(backlogIndex, 1);
        saveUserData();
        renderBacklogs();
        renderCompletedTasks();
        updateDailyRoutineSummary();
        displayMessage('Backlog resolved!', 'success');
    }
}

function deleteBacklog(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this backlog?');
    if (confirmDelete) {
        backlogs = backlogs.filter(item => item.id !== id);
        saveUserData();
        renderBacklogs();
        updateDailyRoutineSummary();
        displayMessage('Backlog deleted successfully!', 'success');
    }
}


// --- Completed Tasks Functions ---
function renderCompletedTasks() {
    completedTableBody.innerHTML = '';
    if (completedTasks.length === 0) {
        completedTableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-gray-500">No completed tasks yet.</td></tr>';
        return;
    }

    completedTasks.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(task => {
        const row = completedTableBody.insertRow();
        row.className = 'border-b border-gray-200 hover:bg-gray-100 bg-green-50 text-green-700';
        row.innerHTML = `
            <td class="py-3 px-6 text-left whitespace-nowrap">${task.date}</td>
            <td class="py-3 px-6 text-left">${task.subject.charAt(0).toUpperCase() + task.subject.slice(1)}</td>
            <td class="py-3 px-6 text-left">${task.book}</td>
            <td class="py-3 px-6 text-left">${task.chapter} ${task.topics && task.topics.length > 0 ? `(${task.topics.join(', ')})` : ''}</td>
            <td class="py-3 px-6 text-left">${task.type || (task.studyType ? task.studyType : 'N/A')}</td>
            <td class="py-3 px-6 text-center">${task.mcqs || 'N/A'}</td>
            <td class="py-3 px-6 text-center">${task.time || task.estimatedTime || 'N/A'}</td>
            <td class="py-3 px-6 text-center">
                <button onclick="deleteCompletedTask('${task.id}')" class="text-red-600 hover:text-red-800">Delete</button>
            </td>
        `;
    });
}

function deleteCompletedTask(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this completed task?');
    if (confirmDelete) {
        completedTasks = completedTasks.filter(task => task.id !== id);
        saveUserData();
        renderCompletedTasks();
        displayMessage('Completed task deleted successfully!', 'success');
    }
}


// --- Goals Functions ---
function addChapterGoal() {
    const subject = goalSubjectSelect.value;
    const book = goalBookSelect.value; // Get book value from select
    const chapter = goalChapterSelect.value; // Get chapter value from select
    const selectedTopics = Array.from(goalTopicsChecklist.querySelectorAll('input[name="goalTopic"]:checked'))
                               .map(checkbox => checkbox.value);
    const dueDate = goalDueDateInput.value;

    if (!subject || !book || !chapter || !dueDate) {
        displayMessage('Please select Subject, Book, Chapter, and Due Date for chapter goals.', 'error');
        return;
    }

    // Check if a goal for this specific chapter (and book) already exists
    const existingGoal = chapterGoals.find(g =>
        g.subject === subject &&
        g.book === book &&
        g.chapter === chapter
    );

    if (existingGoal) {
        displayMessage('Goal for this Chapter in this Book already exists. You can edit it from the table.', 'error');
        return;
    }

    const newGoal = {
        id: generateId(),
        subject,
        book,
        chapter,
        topics: selectedTopics, // Store selected topics for this goal
        dueDate,
        completionStatus: {
            topics: {}, // To track individual topic completion
            chapter: 'Not Started' // Not Started, In Progress, Completed
        }
    };
    chapterGoals.push(newGoal);
    saveUserData();
    renderChapterGoals();
    drawAllCharts(); // Update goal completion chart
    displayMessage('Chapter goal added successfully!', 'success');

    // Clear form
    goalSubjectSelect.value = '';
    goalBookSelect.value = '';
    goalChapterSelect.value = '';
    goalTopicsChecklist.innerHTML = '';
    goalTopicsContainer.classList.add('hidden');
    goalDueDateInput.value = '';
}

function renderChapterGoals() {
    chapterGoalsTableBody.innerHTML = '';
    if (chapterGoals.length === 0) {
        chapterGoalsTableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-gray-500">No chapter goals set yet.</td></tr>';
        return;
    }

    chapterGoals.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).forEach(goal => {
        const totalTopics = getTopicsForChapter(goal.subject, goal.book, goal.chapter).length;
        // Ensure completedTopics structure matches: completedTopics[subject][book][chapter]
        const completedCount = (completedTopics[goal.subject] && completedTopics[goal.subject][goal.book] && completedTopics[goal.subject][goal.book][goal.chapter]) ?
                               Object.values(completedTopics[goal.subject][goal.book][goal.chapter]).filter(status => status).length : 0;
        const completionPercentage = totalTopics > 0 ? ((completedCount / totalTopics) * 100).toFixed(0) : 0;

        let statusClass = '';
        if (completionPercentage === 100) {
            statusClass = 'bg-green-100 text-green-800';
        } else if (completionPercentage > 0) {
            statusClass = 'bg-yellow-100 text-yellow-800';
        } else if (new Date(goal.dueDate) < new Date().setHours(0,0,0,0)) { // Past due date
            statusClass = 'bg-red-100 text-red-800';
        } else {
            statusClass = 'bg-blue-100 text-blue-800';
        }

        const row = chapterGoalsTableBody.insertRow();
        row.className = `border-b border-gray-200 hover:bg-gray-100 ${statusClass}`;
        row.innerHTML = `
            <td class="py-3 px-6 text-left whitespace-nowrap">${goal.subject.charAt(0).toUpperCase() + goal.subject.slice(1)}</td>
            <td class="py-3 px-6 text-left">${goal.book}</td>
            <td class="py-3 px-6 text-left">${goal.chapter}</td>
            <td class="py-3 px-6 text-left">${goal.topics.join(', ') || 'All Topics'}</td>
            <td class="py-3 px-6 text-left whitespace-nowrap">${goal.dueDate}</td>
            <td class="py-3 px-6 text-center font-semibold">${completionPercentage}%</td>
            <td class="py-3 px-6 text-center">
                <button onclick="editChapterGoal('${goal.id}')" class="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                <button onclick="deleteChapterGoal('${goal.id}')" class="text-red-600 hover:text-red-800">Delete</button>
            </td>
        `;
    });
}

// Helper to get topics from ALL_SUBJECT_DATA based on new structure
function getTopicsForChapter(subject, bookName, chapterName) {
    if (ALL_SUBJECT_DATA[subject]) {
        const book = ALL_SUBJECT_DATA[subject].find(b => b.name === bookName);
        if (book && book.chapters) {
            const chapter = book.chapters.find(c => c.name === chapterName);
            if (chapter && chapter.topics && chapter.topics.length > 0 && chapter.topics[0] !== "General Topics") {
                return chapter.topics;
            }
        }
    }
    return [];
}


function editChapterGoal(id) {
    const goal = chapterGoals.find(g => g.id === id);
    if (goal) {
        goalSubjectSelect.value = goal.subject;
        populateGoalBookDropdown();
        setTimeout(() => {
            goalBookSelect.value = goal.book;
            populateGoalChapterDropdown();
            setTimeout(() => {
                goalChapterSelect.value = goal.chapter;
                populateGoalTopicsChecklist();
                setTimeout(() => {
                    goal.topics.forEach(topic => {
                        const checkbox = goalTopicsChecklist.querySelector(`input[value="${topic}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                }, 50);
            }, 50);
        }, 50);
        goalDueDateInput.value = goal.dueDate;

        // Change button to update
        addChapterGoalBtn.textContent = 'Update Chapter Goal';
        addChapterGoalBtn.onclick = () => updateChapterGoal(id);

        displayMessage('Goal loaded for editing.', 'info');
    }
}

function updateChapterGoal(id) {
    const index = chapterGoals.findIndex(g => g.id === id);
    if (index === -1) return;

    const subject = goalSubjectSelect.value;
    const book = goalBookSelect.value;
    const chapter = goalChapterSelect.value;
    const selectedTopics = Array.from(goalTopicsChecklist.querySelectorAll('input[name="goalTopic"]:checked'))
                               .map(checkbox => checkbox.value);
    const dueDate = goalDueDateInput.value;

    if (!subject || !book || !chapter || !dueDate) {
        displayMessage('Please select Subject, Book, Chapter, and Due Date for chapter goals.', 'error');
        return;
    }

    chapterGoals[index] = {
        id: id,
        subject,
        book,
        chapter,
        topics: selectedTopics,
        dueDate,
        // Keep existing completionStatus or recalculate based on updated topics
        completionStatus: chapterGoals[index].completionStatus
    };

    saveUserData();
    renderChapterGoals();
    drawAllCharts(); // Update chart

    // Reset form and button
    addChapterGoalBtn.textContent = 'Add Chapter Goal';
    addChapterGoalBtn.onclick = addChapterGoal; // Reset to original add function
    // Clear form
    goalSubjectSelect.value = '';
    goalBookSelect.value = '';
    goalChapterSelect.value = '';
    goalTopicsChecklist.innerHTML = '';
    goalTopicsContainer.classList.add('hidden');
    goalDueDateInput.value = '';
    displayMessage('Chapter goal updated successfully!', 'success');
}

function deleteChapterGoal(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this chapter goal?');
    if (confirmDelete) {
        chapterGoals = chapterGoals.filter(goal => goal.id !== id);
        saveUserData();
        renderChapterGoals();
        drawAllCharts(); // Update chart
        displayMessage('Chapter goal deleted successfully!', 'success');
    }
}

function setMCQGoals() {
    const physicsQuota = parseInt(mcqGoalPhysicsInput.value);
    const chemistryQuota = parseInt(mcqGoalChemistryInput.value);
    const biologyQuota = parseInt(mcqGoalBiologyInput.value);

    if (isNaN(physicsQuota) || isNaN(chemistryQuota) || isNaN(biologyQuota)) {
        displayMessage('Please enter valid numbers for all MCQ quotas.', 'error');
        return;
    }

    mcqQuotas = { physics: physicsQuota, chemistry: chemistryQuota, biology: biologyQuota };
    saveUserData();
    updateMCQQuotaDisplays();
    updateMCQQuotaCharts();
    displayMessage('Daily MCQ quotas set successfully!', 'success');
}

function updateMCQQuotaDisplays() {
    displayPhysicsQuota.textContent = mcqQuotas.physics;
    displayChemistryQuota.textContent = mcqQuotas.chemistry;
    displayBiologyQuota.textContent = mcqQuotas.biology;

    mcqGoalPhysicsInput.value = mcqQuotas.physics;
    mcqGoalChemistryInput.value = mcqQuotas.chemistry;
    mcqGoalBiologyInput.value = mcqQuotas.biology;
}

function setOverallGoal() {
    const targetScore = parseInt(overallGoalScoreInput.value);
    const targetDate = overallGoalDueDateInput.value;

    if (isNaN(targetScore) || !targetDate) {
        displayMessage('Please enter a valid target score and date.', 'error');
        return;
    }

    overallGoal = { score: targetScore, dueDate: targetDate };
    saveUserData();
    updateOverallGoalDisplay();
    displayMessage('Overall goal set successfully!', 'success');
}

function updateOverallGoalDisplay() {
    if (overallGoal) {
        displayOverallTargetScore.textContent = overallGoal.score;
        displayOverallTargetDate.textContent = overallGoal.dueDate;
        overallGoalScoreInput.value = overallGoal.score;
        overallGoalDueDateInput.value = overallGoal.dueDate;
    } else {
        displayOverallTargetScore.textContent = 'N/A';
        displayOverallTargetDate.textContent = 'N/A';
        overallGoalScoreInput.value = '';
        overallGoalDueDateInput.value = '';
    }
}

function trackCompletedTopics(subject, book, chapter, topicsCompleted) {
    if (!completedTopics[subject]) {
        completedTopics[subject] = {};
    }
    if (!completedTopics[subject][book]) { // New book level
        completedTopics[subject][book] = {};
    }
    if (!completedTopics[subject][book][chapter]) {
        completedTopics[subject][book][chapter] = [];
    }

    topicsCompleted.forEach(topic => {
        if (!completedTopics[subject][book][chapter].includes(topic)) {
            completedTopics[subject][book][chapter].push(topic);
        }
    });
    saveUserData();
    renderChapterGoals(); // Re-render goals to update progress bars
    drawGoalCompletionChart();
    drawTopicCompletionChart();
}


// --- Charting Functions (using Chart.js) ---
let chartInstances = {}; // Store chart instances to destroy them before re-drawing

function initCharts() {
    // Destroy existing charts if they exist to prevent duplicates
    if (chartInstances.testScoreChart) chartInstances.testScoreChart.destroy();
    if (chartInstances.subjectAverageChart) chartInstances.subjectAverageChart.destroy();
    if (chartInstances.timeSpentChart) chartInstances.timeSpentChart.destroy();
    if (chartInstances.mcqsPracticedChart) chartInstances.mcqsPracticedChart.destroy();
    if (chartInstances.goalCompletionChart) chartInstances.goalCompletionChart.destroy();
    if (chartInstances.topicCompletionChart) chartInstances.topicCompletionChart.destroy();

    // Ensure canvas elements exist and are ready before initializing charts
    // These checks prevent errors if analyticsGraphsContent is hidden/not loaded
    if (testScoreChartCanvas) {
        chartInstances.testScoreChart = new Chart(testScoreChartCanvas.getContext('2d'), {
            type: 'line', data: { labels: [], datasets: [] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 720 } }, plugins: { legend: { display: true } } }
        });
    }
    if (subjectAverageChartCanvas) {
        chartInstances.subjectAverageChart = new Chart(subjectAverageChartCanvas.getContext('2d'), {
            type: 'bar', data: { labels: ['Physics', 'Chemistry', 'Biology'], datasets: [] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 180 } }, plugins: { legend: { display: false } } }
        });
    }
    if (timeSpentChartCanvas) {
        chartInstances.timeSpentChart = new Chart(timeSpentChartCanvas.getContext('2d'), {
            type: 'bar', data: { labels: [], datasets: [] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
        });
    }
    if (mcqsPracticedChartCanvas) {
        chartInstances.mcqsPracticedChart = new Chart(mcqsPracticedChartCanvas.getContext('2d'), {
            type: 'bar', data: { labels: [], datasets: [] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
        });
    }
    if (goalCompletionChartCanvas) {
        chartInstances.goalCompletionChart = new Chart(goalCompletionChartCanvas.getContext('2d'), {
            type: 'doughnut', data: { labels: ['Completed', 'In Progress', 'Not Started', 'Overdue'], datasets: [] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' }, title: { display: true, text: 'Overall Chapter Goal Completion' } } }
        });
    }
    if (topicCompletionChartCanvas) {
        chartInstances.topicCompletionChart = new Chart(topicCompletionChartCanvas.getContext('2d'), {
            type: 'bar', data: { labels: [], datasets: [] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, max: 100, title: { display: true, text: 'Completion %' } }, y: { title: { display: true, text: 'Chapter' } } }, plugins: { legend: { display: false } } }
        });
    }
}

function drawAllCharts() {
    // Only draw if the analytics section is visible
    const analyticsSection = document.getElementById('analyticsGraphsContent');
    if (analyticsSection && !analyticsSection.classList.contains('hidden')) {
        initCharts(); // Ensure charts are initialized/re-initialized
        drawTestScoreChart();
        drawSubjectAverageChart();
        drawTimeSpentChart();
        drawMCQsPracticedChart();
        drawGoalCompletionChart();
        drawTopicCompletionChart();
    }
}

function drawTestScoreChart() {
    if (!chartInstances.testScoreChart) return;
    const dates = [...new Set(testResults.map(t => t.date))].sort();
    const totalScores = dates.map(date => {
        const testsOnDate = testResults.filter(t => t.date === date);
        const sumScores = testsOnDate.reduce((sum, t) => sum + t.total, 0);
        return sumScores / testsOnDate.length; // Average if multiple tests on same day
    });

    chartInstances.testScoreChart.data.labels = dates;
    chartInstances.testScoreChart.data.datasets = [{
        label: 'Average Score',
        data: totalScores,
        borderColor: '#4c51bf',
        backgroundColor: '#667eea',
        fill: false,
        tension: 0.1
    }];
    chartInstances.testScoreChart.update();
}

function drawSubjectAverageChart() {
    if (!chartInstances.subjectAverageChart) return;
    const physicsScores = testResults.map(t => t.physics);
    const chemistryScores = testResults.map(t => t.chemistry);
    const biologyScores = testResults.map(t => t.biology);

    const average = (arr) => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : 0;

    const avgPhysics = average(physicsScores);
    const avgChemistry = average(chemistryScores);
    const avgBiology = average(biologyScores);

    chartInstances.subjectAverageChart.data.datasets = [{
        label: 'Average Score',
        data: [avgPhysics, avgChemistry, avgBiology],
        backgroundColor: ['#667eea', '#81e6d9', '#a78bfa'],
        borderColor: ['#4c51bf', '#38b2ac', '#8b5cf6'],
        borderWidth: 1
    }];
    chartInstances.subjectAverageChart.update();
}

function drawTimeSpentChart() {
    if (!chartInstances.timeSpentChart) return;
    const dailyTime = {};
    dailyLogs.forEach(log => {
        const date = log.date;
        const [hours, minutes] = (log.timeSpent || '00:00').split(':').map(Number); // Ensure format HH:MM
        const totalMinutes = (hours * 60) + minutes;
        dailyTime[date] = (dailyTime[date] || 0) + totalMinutes;
    });

    const dates = Object.keys(dailyTime).sort();
    const timeInHours = dates.map(date => (dailyTime[date] / 60).toFixed(2));

    chartInstances.timeSpentChart.data.labels = dates;
    chartInstances.timeSpentChart.data.datasets = [{
        label: 'Time Spent (Hours)',
        data: timeInHours,
        backgroundColor: '#4299e1',
        borderColor: '#3182ce',
        borderWidth: 1
    }];
    chartInstances.timeSpentChart.update();
}

function drawMCQsPracticedChart() {
    if (!chartInstances.mcqsPracticedChart) return;
    const dailyMCQs = {};
    dailyLogs.forEach(log => {
        const date = log.date;
        dailyMCQs[date] = (dailyMCQs[date] || 0) + (log.mcqsPracticed || 0);
    });

    const dates = Object.keys(dailyMCQs).sort();
    const mcqCounts = dates.map(date => dailyMCQs[date]);

    chartInstances.mcqsPracticedChart.data.labels = dates;
    chartInstances.mcqsPracticedChart.data.datasets = [{
        label: 'MCQs Practiced',
        data: mcqCounts,
        backgroundColor: '#48bb78',
        borderColor: '#38a169',
        borderWidth: 1
    }];
    chartInstances.mcqsPracticedChart.update();
}

function drawGoalCompletionChart() {
    if (!chartInstances.goalCompletionChart) return;
    let completedGoals = 0;
    let inProgressGoals = 0;
    let notStartedGoals = 0;
    let overdueGoals = 0;

    chapterGoals.forEach(goal => {
        const totalTopics = getTopicsForChapter(goal.subject, goal.book, goal.chapter).length;
        const completedCount = (completedTopics[goal.subject] && completedTopics[goal.subject][goal.book] && completedTopics[goal.subject][goal.book][goal.chapter]) ?
                               Object.values(completedTopics[goal.subject][goal.book][goal.chapter]).filter(status => status).length : 0;

        if (totalTopics === 0) { // If no topics defined, consider chapter completion status (fallback)
             if (goal.completionStatus && goal.completionStatus.chapter === 'Completed') {
                completedGoals++;
            } else if (goal.completionStatus && goal.completionStatus.chapter === 'In Progress') {
                inProgressGoals++;
            } else if (new Date(goal.dueDate) < new Date().setHours(0,0,0,0)) {
                overdueGoals++;
            }
            else {
                notStartedGoals++;
            }
        } else { // If topics are defined
            if (completedCount === totalTopics && totalTopics > 0) {
                completedGoals++;
            } else if (completedCount > 0 && completedCount < totalTopics) {
                inProgressGoals++;
            } else if (new Date(goal.dueDate) < new Date().setHours(0,0,0,0)) {
                 overdueGoals++;
            }
            else {
                notStartedGoals++;
            }
        }
    });

    const data = [completedGoals, inProgressGoals, notStartedGoals, overdueGoals].filter(count => count > 0);
    const labels = ['Completed', 'In Progress', 'Not Started', 'Overdue'].filter((_, i) => [completedGoals, inProgressGoals, notStartedGoals, overdueGoals][i] > 0);
    const colors = ['#48bb78', '#ecc94b', '#a0aec0', '#f56565'].filter((_, i) => [completedGoals, inProgressGoals, notStartedGoals, overdueGoals][i] > 0);

    chartInstances.goalCompletionChart.data.labels = labels;
    chartInstances.goalCompletionChart.data.datasets = [{
        data: data,
        backgroundColor: colors,
        hoverOffset: 4
    }];
    chartInstances.goalCompletionChart.update();
}


function drawTopicCompletionChart() {
    if (!chartInstances.topicCompletionChart) return;
    const chapterLabels = [];
    const completionPercentages = [];

    chapterGoals.forEach(goal => {
        const totalTopics = getTopicsForChapter(goal.subject, goal.book, goal.chapter).length;
        const completedCount = (completedTopics[goal.subject] && completedTopics[goal.subject][goal.book] && completedTopics[goal.subject][goal.book][goal.chapter]) ?
                               Object.values(completedTopics[goal.subject][goal.book][goal.chapter]).filter(status => status).length : 0;
        const completionPercentage = totalTopics > 0 ? ((completedCount / totalTopics) * 100) : 0;

        // Only include if there are topics defined or if it's a chapter goal without explicit topics
        if (totalTopics > 0 && getTopicsForChapter(goal.subject, goal.book, goal.chapter)[0] !== "General Topics") {
            chapterLabels.push(`${goal.chapter} (${goal.book})`); // Include book in label
            completionPercentages.push(completionPercentage);
        } else if (totalTopics === 0 && goal.topics.length === 0) { // Chapter goal without explicit topics
            // You might want a different way to represent this, or skip it
            // For now, let's just show it as 0% or based on chapter completion status if available
            // This needs to align with how `completionStatus.chapter` is updated
            chapterLabels.push(`${goal.chapter} (${goal.book})`);
            // If chapter completion status is tracked, use that. Otherwise, 0.
            const chapterCompletion = (goal.completionStatus && goal.completionStatus.chapter === 'Completed') ? 100 : 0;
            completionPercentages.push(chapterCompletion);
        }
    });

    chartInstances.topicCompletionChart.data.labels = chapterLabels;
    chartInstances.topicCompletionChart.data.datasets = [{
        label: 'Topic Completion %',
        data: completionPercentages,
        backgroundColor: completionPercentages.map(p => {
            if (p === 100) return '#48bb78'; // Green
            if (p > 0) return '#ecc94b';    // Yellow
            return '#a0aec0';               // Gray
        }),
        borderColor: completionPercentages.map(p => {
            if (p === 100) return '#38a169';
            if (p > 0) return '#d69e2e';
            return '#718096';
        }),
        borderWidth: 1
    }];
    chartInstances.topicCompletionChart.update();
}


function updateMCQQuotaCharts() {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = dailyLogs.filter(log => log.date === today);

    let physicsMCQsDone = 0;
    let chemistryMCQsDone = 0;
    let biologyMCQsDone = 0;

    todayLogs.forEach(log => {
        if (log.studyTypes && log.studyTypes.includes('MCQs')) { // Check if studyTypes exists and includes MCQs
            const totalMCQs = log.mcqsPracticed || 0;
            if (log.subject === 'physics') physicsMCQsDone += totalMCQs;
            else if (log.subject === 'chemistry') chemistryMCQsDone += totalMCQs;
            else if (log.subject === 'biology') biologyMCQsDone += totalMCQs;
        }
    });

    const renderChart = (canvasElement, chartInstance, subject, quota, doneCount) => {
        if (!canvasElement) return; // Ensure canvas element exists

        const ctx = canvasElement.getContext('2d');
        if (chartInstance) chartInstance.destroy(); // Destroy existing chart

        const remaining = Math.max(0, quota - doneCount);
        const data = [doneCount, remaining];
        const labels = ['Done', 'Remaining'];
        const colors = ['#48bb78', '#a0aec0']; // Green for done, Gray for remaining

        const chartColor = subject === 'physics' ? '#2563eb' :
                           subject === 'chemistry' ? '#10b981' :
                           subject === 'biology' ? '#8b5cf6' : '#a0aec0';

        chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [chartColor, '#e0e0e0'], // Use subject-specific color
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '80%',
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: `${subject.charAt(0).toUpperCase() + subject.slice(1)} Daily Quota (${doneCount}/${quota})` }
                }
            }
        });
        return chartInstance; // Return the new chart instance
    };

    physicsMCQChart = renderChart(physicsMCQQuotaChartCanvas, physicsMCQChart, 'physics', mcqQuotas.physics, physicsMCQsDone);
    chemistryMCQChart = renderChart(chemistryMCQQuotaChartCanvas, chemistryMCQChart, 'chemistry', mcqQuotas.chemistry, chemistryMCQsDone);
    biologyMCQChart = renderChart(biologyMCQQuotaChartCanvas, biologyMCQChart, 'biology', mcqQuotas.biology, biologyMCQsDone);

    // Update messages below charts
    document.getElementById('physicsMCQMessage').textContent = `${physicsMCQsDone}/${mcqQuotas.physics}`;
    document.getElementById('chemistryMCQMessage').textContent = `${chemistryMCQsDone}/${mcqQuotas.chemistry}`;
    document.getElementById('biologyMCQMessage').textContent = `${biologyMCQsDone}/${mcqQuotas.biology}`;
}


// --- Countdown and Motivational Quote ---
function updateCountdown() {
    const neetDate = new Date('2026-05-04T09:00:00'); // Assuming NEET UG 2026 on May 4th
    const now = new Date();
    const timeLeft = neetDate - now;

    if (timeLeft <= 0) {
        if (countdownElement) countdownElement.textContent = "NEET UG 2026 Has Arrived!";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (countdownElement) countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const motivationalQuotes = [
    "\"Success is the sum of small efforts, repeated day in and day out.\"",
    "\"The only way to do great work is to love what you do.\"",
    "\"Believe you can and you're halfway there.\"",
    "\"The future belongs to those who believe in the beauty of their dreams.\"",
    "\"Don't watch the clock; do what it does. Keep going.\"",
    "\"The harder you work for something, the greater you'll feel when you achieve it.\"",
    "\"Strive for progress, not perfection.\"",
    "\"Your time is limited, don't waste it living someone else's life.\"",
    "\"The best way to predict the future is to create it.\"",
    "\"The journey of a thousand miles begins with a single step.\""
];

function displayRandomMotivationalQuote() {
    if (motivationalQuoteElement) {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        motivationalQuoteElement.textContent = motivationalQuotes[randomIndex];
    }
}

// --- MCQ Source Dropdown Logic ---
function populateMCQSourceDropdown() {
    if (!logMCQSourceSelect) return; // Guard against null element

    const uniqueSources = new Set();
    // Add default options
    ['Aakash Module', 'Allen Module', 'FIITJEE Module', 'Online Test Series', 'Previous Year Questions (PYQs)', 'NCERT Exemplar'].forEach(source => uniqueSources.add(source));

    // Add books from ALL_SUBJECT_DATA
    for (const subject in ALL_SUBJECT_DATA) {
        ALL_SUBJECT_DATA[subject].forEach(book => {
            uniqueSources.add(book.name);
        });
    }

    // Add any custom sources from existing logs
    dailyLogs.filter(log => log.mcqSource && log.mcqSource !== 'Other').forEach(log => uniqueSources.add(log.mcqSource));


    logMCQSourceSelect.innerHTML = '<option value="">Select Source</option>';
    Array.from(uniqueSources).sort().forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        logMCQSourceSelect.appendChild(option);
    });
    // Add 'Other' at the end
    const otherOption = document.createElement('option');
    otherOption.value = 'Other';
    otherOption.textContent = 'Other (Specify)';
    logMCQSourceSelect.appendChild(otherOption);
}

if (logMCQSourceSelect) {
    logMCQSourceSelect.addEventListener('change', () => {
        if (logMCQSourceSelect.value === 'Other') {
            if (logCustomMCQSourceInput) logCustomMCQSourceInput.classList.remove('hidden');
            if (logCustomMCQsCountInput) logCustomMCQsCountInput.classList.remove('hidden');
        } else {
            if (logCustomMCQSourceInput) {
                logCustomMCQSourceInput.classList.add('hidden');
                logCustomMCQSourceInput.value = ''; // Clear custom input when 'Other' is not selected
            }
            if (logCustomMCQsCountInput) {
                logCustomMCQsCountInput.classList.add('hidden');
                logCustomMCQsCountInput.value = '';
            }
        }
    });
}


// --- Initial Load and Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    showLoadingOverlay(); // Show loading overlay immediately

    initializeFirebase(); // Initialize Firebase and handle auth state

    // Attach Google Sign-In event listener
    if (signInWithGoogleBtn) {
        signInWithGoogleBtn.addEventListener('click', signInWithGoogle);
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Daily Log
    if (addLogEntryBtn) addLogEntryBtn.addEventListener('click', addLogEntry);

    // My Tests
    if (physicsScoreInput) physicsScoreInput.addEventListener('input', calculateTotalScore);
    if (chemistryScoreInput) chemistryScoreInput.addEventListener('input', calculateTotalScore);
    if (biologyScoreInput) biologyScoreInput.addEventListener('input', calculateTotalScore);
    if (addTestResultBtn) addTestResultBtn.addEventListener('click', addTestResult);

    // Upcoming Plans
    if (addPlanBtn) addPlanBtn.addEventListener('click', addPlan);

    // Goals
    if (addChapterGoalBtn) addChapterGoalBtn.addEventListener('click', addChapterGoal);
    if (setMCQGoalsBtn) setMCQGoalsBtn.addEventListener('click', setMCQGoals);
    if (setOverallGoalBtn) setOverallGoalBtn.addEventListener('click', setOverallGoal);

    // Initial population of dropdowns (will be re-rendered after data load)
    populateSubjectDropdowns();
    populateMCQSourceDropdown();

    // Set countdown and quote refresh
    setInterval(updateCountdown, 1000);
    setInterval(displayRandomMotivationalQuote, 15000); // Change quote every 15 seconds

    // Initial call to set quote
    displayRandomMotivationalQuote();
});
