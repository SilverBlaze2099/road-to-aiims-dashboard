// src/scripts.js - Main JavaScript file for "The Road to AIIMS" Dashboard

// Global data stores (will be loaded from localStorage and updated)
let dailyLogs = JSON.parse(localStorage.getItem('dailyLogs')) || [];
let testResults = JSON.parse(localStorage.getItem('testResults')) || [];
let upcomingPlans = JSON.parse(localStorage.getItem('upcomingPlans')) || [];
let backlogs = JSON.parse(localStorage.getItem('backlogs')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
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
const planChapterInput = document.getElementById('planChapter');
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
const goalBookInput = document.getElementById('goalBook');
const goalChapterNameInput = document.getElementById('goalChapterName');
const goalTopicsInput = document.getElementById('goalTopics');
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
function showAuthSection(isLogin = true) {
    authSection.classList.remove('hidden');
    mainContainer.classList.add('hidden');
    loginForm.classList.toggle('hidden', !isLogin);
    signupForm.classList.toggle('hidden', isLogin);
    authMessage.textContent = ''; // Clear previous messages
}

function showMainDashboard() {
    authSection.classList.add('hidden');
    mainContainer.classList.remove('hidden');
    // Set today's date for relevant inputs
    const today = new Date().toISOString().split('T')[0];
    if (logDateInput) logDateInput.value = today;
    if (testDateInput) testDateInput.value = today;
    if (planDateInput) planDateInput.value = today; // Also set for upcoming plans
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

function displayMessage(element, message, type = 'info') {
    element.textContent = message;
    element.className = ''; // Clear existing classes
    if (type === 'success') {
        element.classList.add('text-green-600');
    } else if (type === 'error') {
        element.classList.add('text-red-600');
    } else {
        element.classList.add('text-blue-600');
    }
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

// --- Data Persistence (using localStorage for now) ---
function saveData() {
    localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));
    localStorage.setItem('testResults', JSON.stringify(testResults));
    localStorage.setItem('upcomingPlans', JSON.stringify(upcomingPlans));
    localStorage.setItem('backlogs', JSON.stringify(backlogs));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    localStorage.setItem('chapterGoals', JSON.stringify(chapterGoals));
    localStorage.setItem('mcqQuotas', JSON.stringify(mcqQuotas));
    localStorage.setItem('overallGoal', JSON.stringify(overallGoal));
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
}

function loadData() {
    dailyLogs = JSON.parse(localStorage.getItem('dailyLogs')) || [];
    testResults = JSON.parse(localStorage.getItem('testResults')) || [];
    upcomingPlans = JSON.parse(localStorage.getItem('upcomingPlans')) || [];
    backlogs = JSON.parse(localStorage.getItem('backlogs')) || [];
    completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    chapterGoals = JSON.parse(localStorage.getItem('chapterGoals')) || [];
    mcqQuotas = JSON.parse(localStorage.getItem('mcqQuotas')) || { physics: 100, chemistry: 100, biology: 150 };
    overallGoal = JSON.parse(localStorage.getItem('overallGoal')) || null;
    completedTopics = JSON.parse(localStorage.getItem('completedTopics')) || {};
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

function populateLogBookDropdown() {
    const selectedSubject = logSubjectSelect.value;
    logBookSelect.innerHTML = '<option value="">Select Book/Module</option>';
    if (selectedSubject) {
        // For simplicity, assuming each chapter in ALL_SUBJECT_DATA implies a "book" for now.
        // In a real app, you'd likely have a separate 'books' structure.
        // For now, let's just use a generic 'Main Book' or 'NCERT' for each subject.
        const defaultBook = selectedSubject === 'physics' ? 'NCERT Physics' :
                             selectedSubject === 'chemistry' ? 'NCERT Chemistry' :
                             selectedSubject === 'biology' ? 'NCERT Biology' : '';

        if (defaultBook) {
            const option = document.createElement('option');
            option.value = defaultBook;
            option.textContent = defaultBook;
            logBookSelect.appendChild(option);
        }

        // Also add options from chapterGoals where a book is specified for the selected subject
        const uniqueBooks = new Set();
        chapterGoals.filter(goal => goal.subject === selectedSubject && goal.book)
                    .forEach(goal => uniqueBooks.add(goal.book));
        
        Array.from(uniqueBooks).sort().forEach(bookName => {
            const option = document.createElement('option');
            option.value = bookName;
            option.textContent = bookName;
            logBookSelect.appendChild(option);
        });

        // Add a general "Other" option
        const otherOption = document.createElement('option');
        otherOption.value = 'Other';
        otherOption.textContent = 'Other';
        logBookSelect.appendChild(otherOption);
    }
    // Automatically select the first option if there's only one (other than default)
    if (logBookSelect.options.length === 2 && logBookSelect.options[1].value !== 'Other') {
        logBookSelect.value = logBookSelect.options[1].value;
        populateLogChapterDropdown(); // Trigger chapter population
    }
}


function populateLogChapterDropdown() {
    const selectedSubject = logSubjectSelect.value;
    const selectedBook = logBookSelect.value;
    logChapterSelect.innerHTML = '<option value="">Select Chapter</option>';
    logTopicsContainer.classList.add('hidden'); // Hide topics until chapter is selected

    if (selectedSubject && ALL_SUBJECT_DATA[selectedSubject]) {
        const chapters = Object.keys(ALL_SUBJECT_DATA[selectedSubject]);
        chapters.sort().forEach(chapter => {
            const option = document.createElement('option');
            option.value = chapter;
            option.textContent = chapter;
            logChapterSelect.appendChild(option);
        });
    }
}

function populateLogTopicsChecklist() {
    const selectedSubject = logSubjectSelect.value;
    const selectedChapter = logChapterSelect.value;
    logTopicsChecklist.innerHTML = ''; // Clear previous topics

    if (selectedSubject && selectedChapter && ALL_SUBJECT_DATA[selectedSubject] && ALL_SUBJECT_DATA[selectedSubject][selectedChapter]) {
        const topics = ALL_SUBJECT_DATA[selectedSubject][selectedChapter];
        if (topics && topics.length > 0 && topics[0] !== "General Topics") { // Don't show for placeholders
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
        } else {
            logTopicsContainer.classList.add('hidden'); // Hide if no specific topics or only placeholder
        }
    } else {
        logTopicsContainer.classList.add('hidden');
    }
}

function populateMCQSourceDropdown() {
    logMCQSourceSelect.innerHTML = '<option value="">Select Source</option>';
    // Add options from chapterGoals' books
    const uniqueBookSources = new Set();
    chapterGoals.forEach(goal => {
        if (goal.book) uniqueBookSources.add(goal.book);
    });
    Array.from(uniqueBookSources).sort().forEach(source => {
        const option = document.createElement('option');
        option.value = source;
        option.textContent = source;
        logMCQSourceSelect.appendChild(option);
    });

    // Add common sources
    ['NCERT', 'Coaching Module', 'Previous Year Questions (PYQ)', 'Doubt Session'].forEach(source => {
        const option = document.createElement('option');
        option.value = source;
        option.textContent = source;
        logMCQSourceSelect.appendChild(option);
    });
}

// --- Event Listeners for Dynamic Dropdowns ---
logSubjectSelect.addEventListener('change', () => {
    populateLogBookDropdown();
    populateLogChapterDropdown(); // Also clear chapter when subject changes
    populateLogTopicsChecklist(); // Also clear topics
});
logBookSelect.addEventListener('change', populateLogChapterDropdown);
logChapterSelect.addEventListener('change', populateLogTopicsChecklist);

// Populate subject dropdowns initially
populateSubjectDropdowns();
populateMCQSourceDropdown();


// --- Daily Log Functions ---
function addLogEntry() {
    const date = logDateInput.value;
    const subject = logSubjectSelect.value;
    const book = logBookSelect.value;
    const chapter = logChapterSelect.value;
    const selectedTopics = Array.from(document.querySelectorAll('input[name="logTopic"]:checked'))
                                .map(cb => cb.value);
    const studyTypes = Array.from(document.querySelectorAll('input[name="studyType"]:checked'))
                             .map(cb => cb.value);
    const mcqsPracticed = parseInt(logMCQsPracticedInput.value) || 0;
    const mcqSource = logMCQSourceSelect.value;
    const customMCQSource = logCustomMCQSourceInput.value;
    const customMCQsCount = parseInt(logCustomMCQsCountInput.value) || 0;
    const timeSpent = logTimeSpentInput.value;
    const comments = logCommentsInput.value.trim();

    if (!date || !subject || !chapter || studyTypes.length === 0) {
        alert('Please fill in Date, Subject, Chapter, and at least one Study Type.');
        return;
    }

    const newEntry = {
        id: generateId(),
        date,
        subject,
        book,
        chapter,
        topics: selectedTopics,
        studyTypes,
        mcqsPracticed,
        mcqSource: mcqSource || customMCQSource,
        customMCQsCount, // Store custom count separately
        timeSpent,
        comments
    };

    dailyLogs.push(newEntry);
    saveData();
    renderDailyLogEntries();
    updateDailyRoutineSummary();
    updateMCQQuotaCharts();
    trackCompletedTopics(subject, chapter, selectedTopics);

    // Clear form
    logSubjectSelect.value = '';
    logBookSelect.innerHTML = '<option value="">Select Book/Module</option>'; // Reset book
    logChapterSelect.innerHTML = '<option value="">Select Chapter</option>'; // Reset chapter
    logTopicsContainer.classList.add('hidden');
    logTopicsChecklist.innerHTML = '';
    document.querySelectorAll('input[name="studyType"]').forEach(cb => cb.checked = false);
    logMCQsPracticedInput.value = '';
    logMCQSourceSelect.value = '';
    logCustomMCQSourceInput.value = '';
    logCustomMCQsCountInput.value = '';
    logTimeSpentInput.value = '';
    logCommentsInput.value = '';
    populateSubjectDropdowns(); // Re-populate subject dropdowns to reset
    populateMCQSourceDropdown(); // Re-populate MCQ source dropdown
}

function renderDailyLogEntries() {
    dailyLogTableBody.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = dailyLogs.filter(log => log.date === today);

    if (todayLogs.length === 0) {
        dailyLogTableBody.innerHTML = '<tr><td colspan="7" class="py-3 px-6 text-center">No entries for today.</td></tr>';
        return;
    }

    todayLogs.forEach(entry => {
        const row = dailyLogTableBody.insertRow();
        row.innerHTML = `
            <td class="py-3 px-6 whitespace-nowrap capitalize">${entry.subject}</td>
            <td class="py-3 px-6">
                <strong>${entry.chapter}</strong><br>
                <span class="text-xs text-gray-500">${entry.topics.join(', ') || 'N/A'}</span>
            </td>
            <td class="py-3 px-6">${entry.studyTypes.join(', ')}</td>
            <td class="py-3 px-6">Book: ${entry.mcqsPracticed} <br> Other: ${entry.customMCQsCount} (${entry.mcqSource})</td>
            <td class="py-3 px-6">${entry.timeSpent}</td>
            <td class="py-3 px-6 text-sm">${entry.comments || 'N/A'}</td>
            <td class="py-3 px-6 text-center">
                <button data-id="${entry.id}" class="edit-log-btn text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button data-id="${entry.id}" class="delete-log-btn text-red-500 hover:text-red-700">Delete</button>
            </td>
        `;
    });

    document.querySelectorAll('.edit-log-btn').forEach(button => {
        button.addEventListener('click', (e) => editLogEntry(e.target.dataset.id));
    });
    document.querySelectorAll('.delete-log-btn').forEach(button => {
        button.addEventListener('click', (e) => deleteLogEntry(e.target.dataset.id));
    });
}

function editLogEntry(id) {
    const entry = dailyLogs.find(e => e.id === id);
    if (!entry) return;

    // Populate form fields for editing
    logDateInput.value = entry.date;
    logSubjectSelect.value = entry.subject;
    populateLogBookDropdown(); // Re-populate based on subject
    logBookSelect.value = entry.book;
    populateLogChapterDropdown(); // Re-populate based on book
    logChapterSelect.value = entry.chapter;
    populateLogTopicsChecklist(); // Re-populate based on chapter

    // Select topics
    document.querySelectorAll('input[name="logTopic"]').forEach(cb => {
        cb.checked = entry.topics.includes(cb.value);
    });

    // Select study types
    document.querySelectorAll('input[name="studyType"]').forEach(cb => {
        cb.checked = entry.studyTypes.includes(cb.value);
    });

    logMCQsPracticedInput.value = entry.mcqsPracticed;
    logMCQSourceSelect.value = entry.mcqSource;
    logCustomMCQSourceInput.value = entry.mcqSource.includes('Other') || !['NCERT', 'Coaching Module', 'Previous Year Questions (PYQ)', 'Doubt Session'].includes(entry.mcqSource) ? entry.mcqSource : '';
    logCustomMCQsCountInput.value = entry.customMCQsCount;
    logTimeSpentInput.value = entry.timeSpent;
    logCommentsInput.value = entry.comments;

    // Change button to update
    addLogEntryBtn.textContent = 'Update Log Entry';
    addLogEntryBtn.onclick = () => updateLogEntry(id);
}

function updateLogEntry(id) {
    const index = dailyLogs.findIndex(e => e.id === id);
    if (index === -1) return;

    // Get updated values from form
    const date = logDateInput.value;
    const subject = logSubjectSelect.value;
    const book = logBookSelect.value;
    const chapter = logChapterSelect.value;
    const selectedTopics = Array.from(document.querySelectorAll('input[name="logTopic"]:checked'))
                                .map(cb => cb.value);
    const studyTypes = Array.from(document.querySelectorAll('input[name="studyType"]:checked'))
                             .map(cb => cb.value);
    const mcqsPracticed = parseInt(logMCQsPracticedInput.value) || 0;
    const mcqSource = logMCQSourceSelect.value;
    const customMCQSource = logCustomMCQSourceInput.value;
    const customMCQsCount = parseInt(logCustomMCQsCountInput.value) || 0;
    const timeSpent = logTimeSpentInput.value;
    const comments = logCommentsInput.value.trim();

    if (!date || !subject || !chapter || studyTypes.length === 0) {
        alert('Please fill in Date, Subject, Chapter, and at least one Study Type.');
        return;
    }

    dailyLogs[index] = {
        id: id,
        date,
        subject,
        book,
        chapter,
        topics: selectedTopics,
        studyTypes,
        mcqsPracticed,
        mcqSource: mcqSource || customMCQSource,
        customMCQsCount,
        timeSpent,
        comments
    };

    saveData();
    renderDailyLogEntries();
    updateDailyRoutineSummary();
    updateMCQQuotaCharts();
    trackCompletedTopics(subject, chapter, selectedTopics);


    // Reset form and button
    addLogEntryBtn.textContent = 'Add Log Entry';
    addLogEntryBtn.onclick = addLogEntry; // Reset to original add function
    // Clear form fields
    logSubjectSelect.value = '';
    logBookSelect.innerHTML = '<option value="">Select Book/Module</option>';
    logChapterSelect.innerHTML = '<option value="">Select Chapter</option>';
    logTopicsContainer.classList.add('hidden');
    logTopicsChecklist.innerHTML = '';
    document.querySelectorAll('input[name="studyType"]').forEach(cb => cb.checked = false);
    logMCQsPracticedInput.value = '';
    logMCQSourceSelect.value = '';
    logCustomMCQSourceInput.value = '';
    logCustomMCQsCountInput.value = '';
    logTimeSpentInput.value = '';
    logCommentsInput.value = '';
    populateSubjectDropdowns();
    populateMCQSourceDropdown();
}


function deleteLogEntry(id) {
    if (confirm('Are you sure you want to delete this log entry?')) {
        dailyLogs = dailyLogs.filter(entry => entry.id !== id);
        saveData();
        renderDailyLogEntries();
        updateDailyRoutineSummary();
        updateMCQQuotaCharts();
        drawAllCharts(); // Re-draw charts as data has changed
    }
}

function updateDailyRoutineSummary() {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = dailyLogs.filter(log => log.date === today);

    const uniqueChaptersToday = new Set();
    let totalTimeTodayMinutes = 0;
    let totalMCQsToday = 0;

    todayLogs.forEach(log => {
        uniqueChaptersToday.add(log.chapter);
        const [hours, minutes] = log.timeSpent.split(':').map(Number);
        totalTimeTodayMinutes += (hours * 60) + minutes;
        totalMCQsToday += log.mcqsPracticed + log.customMCQsCount;
    });

    chaptersDoneTodayElem.textContent = uniqueChaptersToday.size;
    const hours = Math.floor(totalTimeTodayMinutes / 60);
    const minutes = totalTimeTodayMinutes % 60;
    timeSpentTodayElem.textContent = `${hours}h ${minutes}m`;
    totalMCQsTodayElem.textContent = totalMCQsToday;
    pendingBacklogsElem.textContent = backlogs.length; // From backlogs array
}


// --- MCQ Quota Chart Functions ---
function createDoughnutChart(canvasId, label, initialValue, maxValue, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const data = {
        labels: ['Completed', 'Remaining'],
        datasets: [{
            data: [initialValue, maxValue - initialValue],
            backgroundColor: [color, '#e0e0e0'],
            borderColor: [color, '#e0e0e0'],
            borderWidth: 1
        }]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
        plugins: {
            tooltip: { enabled: false },
            legend: { display: false }
        },
        elements: {
            arc: {
                borderWidth: 0 // Remove border around arcs
            }
        }
    };
    return new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options,
        plugins: [{
            id: 'textCenter',
            beforeDraw: function(chart) {
                const width = chart.width;
                const height = chart.height;
                const ctx = chart.ctx;
                ctx.restore();
                const fontSize = (height / 114).toFixed(2);
                ctx.font = `bold ${fontSize}em sans-serif`;
                ctx.textBaseline = "middle";
                const text = `${Math.round((initialValue / maxValue) * 100)}%`;
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 2;
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });
}

function updateMCQQuotaCharts() {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = dailyLogs.filter(log => log.date === today);

    let physicsMCQsDone = 0;
    let chemistryMCQsDone = 0;
    let biologyMCQsDone = 0;

    todayLogs.forEach(log => {
        if (log.studyTypes.includes('MCQs')) {
            const totalMCQs = log.mcqsPracticed + log.customMCQsCount;
            if (log.subject === 'physics') physicsMCQsDone += totalMCQs;
            else if (log.subject === 'chemistry') chemistryMCQsDone += totalMCQs;
            else if (log.subject === 'biology') biologyMCQsDone += totalMCQs;
        }
    });

    // Destroy existing charts if they exist to prevent duplicates
    if (physicsMCQChart) physicsMCQChart.destroy();
    if (chemistryMCQChart) chemistryMCQChart.destroy();
    if (biologyMCQChart) biologyMCQChart.destroy();

    // Recreate charts
    physicsMCQChart = createDoughnutChart(
        'physicsMCQQuotaChart',
        'Physics',
        physicsMCQsDone,
        mcqQuotas.physics,
        '#2563eb' // Blue
    );
    chemistryMCQChart = createDoughnutChart(
        'chemistryMCQQuotaChart',
        'Chemistry',
        chemistryMCQsDone,
        mcqQuotas.chemistry,
        '#10b981' // Green
    );
    biologyMCQChart = createDoughnutChart(
        'biologyMCQQuotaChart',
        'Biology',
        biologyMCQsDone,
        mcqQuotas.biology,
        '#8b5cf6' // Purple
    );

    // Update messages below charts
    document.getElementById('physicsMCQMessage').textContent = `${physicsMCQsDone}/${mcqQuotas.physics}`;
    document.getElementById('chemistryMCQMessage').textContent = `${chemistryMCQsDone}/${mcqQuotas.chemistry}`;
    document.getElementById('biologyMCQMessage').textContent = `${biologyMCQsDone}/${mcqQuotas.biology}`;
}

// --- Test Results Functions ---
function addTestResult() {
    const type = testTypeSelect.value;
    const date = testDateInput.value;
    const physics = parseInt(physicsScoreInput.value);
    const chemistry = parseInt(chemistryScoreInput.value);
    const biology = parseInt(biologyScoreInput.value);
    const total = parseInt(totalScoreInput.value);
    const comments = testCommentsInput.value.trim();

    if (!type || !date || isNaN(physics) || isNaN(chemistry) || isNaN(biology) || isNaN(total)) {
        alert('Please fill in all test result fields correctly.');
        return;
    }

    const newResult = {
        id: generateId(),
        type,
        date,
        physics,
        chemistry,
        biology,
        total,
        comments
    };

    testResults.push(newResult);
    saveData();
    renderTestResults();
    drawAllCharts(); // Update charts with new test data

    // Clear form
    testTypeSelect.value = '';
    // testDateInput.value = new Date().toISOString().split('T')[0]; // Reset to today
    physicsScoreInput.value = '';
    chemistryScoreInput.value = '';
    biologyScoreInput.value = '';
    totalScoreInput.value = '';
    testCommentsInput.value = '';
}

function renderTestResults() {
    testResultsTableBody.innerHTML = '';
    if (testResults.length === 0) {
        testResultsTableBody.innerHTML = '<tr><td colspan="8" class="py-3 px-6 text-center">No test results added yet.</td></tr>';
        return;
    }

    // Sort by date descending
    const sortedResults = [...testResults].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedResults.forEach(result => {
        const row = testResultsTableBody.insertRow();
        row.innerHTML = `
            <td class="py-3 px-6 whitespace-nowrap">${result.date}</td>
            <td class="py-3 px-6 capitalize">${result.type.replace('_', ' ')}</td>
            <td class="py-3 px-6">${result.physics}</td>
            <td class="py-3 px-6">${result.chemistry}</td>
            <td class="py-3 px-6">${result.biology}</td>
            <td class="py-3 px-6 font-bold">${result.total}</td>
            <td class="py-3 px-6 text-sm">${result.comments || 'N/A'}</td>
            <td class="py-3 px-6 text-center">
                <button data-id="${result.id}" class="edit-test-btn text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button data-id="${result.id}" class="delete-test-btn text-red-500 hover:text-red-700">Delete</button>
            </td>
        `;
    });

    document.querySelectorAll('.edit-test-btn').forEach(button => {
        button.addEventListener('click', (e) => editTestResult(e.target.dataset.id));
    });
    document.querySelectorAll('.delete-test-btn').forEach(button => {
        button.addEventListener('click', (e) => deleteTestResult(e.target.dataset.id));
    });
}

function editTestResult(id) {
    const result = testResults.find(r => r.id === id);
    if (!result) return;

    testTypeSelect.value = result.type;
    testDateInput.value = result.date;
    physicsScoreInput.value = result.physics;
    chemistryScoreInput.value = result.chemistry;
    biologyScoreInput.value = result.biology;
    totalScoreInput.value = result.total; // Should be auto-calculated but populate for edit
    testCommentsInput.value = result.comments;

    addTestResultBtn.textContent = 'Update Test Result';
    addTestResultBtn.onclick = () => updateTestResult(id);
}

function updateTestResult(id) {
    const index = testResults.findIndex(r => r.id === id);
    if (index === -1) return;

    const type = testTypeSelect.value;
    const date = testDateInput.value;
    const physics = parseInt(physicsScoreInput.value);
    const chemistry = parseInt(chemistryScoreInput.value);
    const biology = parseInt(biologyScoreInput.value);
    const total = parseInt(totalScoreInput.value);
    const comments = testCommentsInput.value.trim();

    if (!type || !date || isNaN(physics) || isNaN(chemistry) || isNaN(biology) || isNaN(total)) {
        alert('Please fill in all test result fields correctly.');
        return;
    }

    testResults[index] = {
        id: id,
        type,
        date,
        physics,
        chemistry,
        biology,
        total,
        comments
    };

    saveData();
    renderTestResults();
    drawAllCharts();

    addTestResultBtn.textContent = 'Add Test Result';
    addTestResultBtn.onclick = addTestResult; // Reset button
    // Clear form
    testTypeSelect.value = '';
    // testDateInput.value = new Date().toISOString().split('T')[0];
    physicsScoreInput.value = '';
    chemistryScoreInput.value = '';
    biologyScoreInput.value = '';
    totalScoreInput.value = '';
    testCommentsInput.value = '';
}

function deleteTestResult(id) {
    if (confirm('Are you sure you want to delete this test result?')) {
        testResults = testResults.filter(result => result.id !== id);
        saveData();
        renderTestResults();
        drawAllCharts();
    }
}

// --- Upcoming Plans Functions ---
function addPlan() {
    const date = planDateInput.value;
    const subject = planSubjectSelect.value;
    const chapter = planChapterInput.value.trim();
    const studyType = planStudyTypeSelect.value;
    const estimatedTime = planEstimatedTimeInput.value;

    if (!date || !subject || !chapter || !studyType || !estimatedTime) {
        alert('Please fill in all upcoming plan fields.');
        return;
    }

    const newPlan = {
        id: generateId(),
        date,
        subject,
        chapter,
        studyType,
        estimatedTime
    };

    upcomingPlans.push(newPlan);
    saveData();
    renderUpcomingPlans();

    // Clear form
    planDateInput.value = new Date().toISOString().split('T')[0];
    planSubjectSelect.value = '';
    planChapterInput.value = '';
    planStudyTypeSelect.value = '';
    planEstimatedTimeInput.value = '';
    populateSubjectDropdowns(); // Re-populate subject dropdown
}

function renderUpcomingPlans() {
    upcomingPlansTableBody.innerHTML = '';
    if (upcomingPlans.length === 0) {
        upcomingPlansTableBody.innerHTML = '<tr><td colspan="6" class="py-3 px-6 text-center">No upcoming plans.</td></tr>';
        return;
    }

    const sortedPlans = [...upcomingPlans].sort((a, b) => new Date(a.date) - new Date(b.date));

    sortedPlans.forEach(plan => {
        const row = upcomingPlansTableBody.insertRow();
        row.innerHTML = `
            <td class="py-3 px-6 whitespace-nowrap">${plan.date}</td>
            <td class="py-3 px-6 capitalize">${plan.subject}</td>
            <td class="py-3 px-6">${plan.chapter}</td>
            <td class="py-3 px-6">${plan.studyType}</td>
            <td class="py-3 px-6">${plan.estimatedTime}</td>
            <td class="py-3 px-6 text-center">
                <button data-id="${plan.id}" class="complete-plan-btn text-green-500 hover:text-green-700 mr-2">Complete</button>
                <button data-id="${plan.id}" class="move-to-backlog-btn text-orange-500 hover:text-orange-700 mr-2">Backlog</button>
                <button data-id="${plan.id}" class="edit-plan-btn text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button data-id="${plan.id}" class="delete-plan-btn text-red-500 hover:text-red-700">Delete</button>
            </td>
        `;
    });

    document.querySelectorAll('.complete-plan-btn').forEach(button => {
        button.addEventListener('click', (e) => completePlan(e.target.dataset.id));
    });
    document.querySelectorAll('.move-to-backlog-btn').forEach(button => {
        button.addEventListener('click', (e) => moveToBacklog(e.target.dataset.id));
    });
    document.querySelectorAll('.edit-plan-btn').forEach(button => {
        button.addEventListener('click', (e) => editPlan(e.target.dataset.id));
    });
    document.querySelectorAll('.delete-plan-btn').forEach(button => {
        button.addEventListener('click', (e) => deletePlan(e.target.dataset.id));
    });
}

function completePlan(id) {
    const index = upcomingPlans.findIndex(plan => plan.id === id);
    if (index === -1) return;

    const [completedPlan] = upcomingPlans.splice(index, 1);
    completedTasks.push({ ...completedPlan, completionDate: new Date().toISOString().split('T')[0] });
    saveData();
    renderUpcomingPlans();
    renderCompletedTasks();
}

function moveToBacklog(id) {
    const index = upcomingPlans.findIndex(plan => plan.id === id);
    if (index === -1) return;

    const [planToBacklog] = upcomingPlans.splice(index, 1);
    const reason = prompt('Reason for backlog:');
    if (reason !== null) { // If user didn't cancel prompt
        backlogs.push({ ...planToBacklog, backlogDate: new Date().toISOString().split('T')[0], reason: reason || 'No reason specified' });
        saveData();
        renderUpcomingPlans();
        renderBacklogs();
        updateDailyRoutineSummary(); // Update pending backlogs count
    } else {
        // Re-add the plan if user canceled the prompt
        upcomingPlans.splice(index, 0, planToBacklog);
    }
}

function editPlan(id) {
    const plan = upcomingPlans.find(p => p.id === id);
    if (!plan) return;

    planDateInput.value = plan.date;
    planSubjectSelect.value = plan.subject;
    planChapterInput.value = plan.chapter;
    planStudyTypeSelect.value = plan.studyType;
    planEstimatedTimeInput.value = plan.estimatedTime;

    addPlanBtn.textContent = 'Update Plan';
    addPlanBtn.onclick = () => updatePlan(id);
}

function updatePlan(id) {
    const index = upcomingPlans.findIndex(p => p.id === id);
    if (index === -1) return;

    const date = planDateInput.value;
    const subject = planSubjectSelect.value;
    const chapter = planChapterInput.value.trim();
    const studyType = planStudyTypeSelect.value;
    const estimatedTime = planEstimatedTimeInput.value;

    if (!date || !subject || !chapter || !studyType || !estimatedTime) {
        alert('Please fill in all upcoming plan fields.');
        return;
    }

    upcomingPlans[index] = {
        id: id,
        date,
        subject,
        chapter,
        studyType,
        estimatedTime
    };

    saveData();
    renderUpcomingPlans();

    addPlanBtn.textContent = 'Add Plan';
    addPlanBtn.onclick = addPlan; // Reset button
    // Clear form
    planDateInput.value = new Date().toISOString().split('T')[0];
    planSubjectSelect.value = '';
    planChapterInput.value = '';
    planStudyTypeSelect.value = '';
    planEstimatedTimeInput.value = '';
}

function deletePlan(id) {
    if (confirm('Are you sure you want to delete this plan?')) {
        upcomingPlans = upcomingPlans.filter(plan => plan.id !== id);
        saveData();
        renderUpcomingPlans();
    }
}

// --- Backlogs Functions ---
function renderBacklogs() {
    backlogsTableBody.innerHTML = '';
    if (backlogs.length === 0) {
        backlogsTableBody.innerHTML = '<tr><td colspan="5" class="py-3 px-6 text-center">No backlogs.</td></tr>';
        return;
    }

    const sortedBacklogs = [...backlogs].sort((a, b) => new Date(a.backlogDate) - new Date(b.backlogDate));

    sortedBacklogs.forEach(item => {
        const row = backlogsTableBody.insertRow();
        row.innerHTML = `
            <td class="py-3 px-6 whitespace-nowrap">${item.backlogDate}</td>
            <td class="py-3 px-6 capitalize">${item.subject}</td>
            <td class="py-3 px-6">${item.chapter}</td>
            <td class="py-3 px-6 text-sm">${item.reason || 'N/A'}</td>
            <td class="py-3 px-6 text-center">
                <button data-id="${item.id}" class="resolve-backlog-btn text-green-500 hover:text-green-700 mr-2">Resolve</button>
                <button data-id="${item.id}" class="delete-backlog-btn text-red-500 hover:text-red-700">Delete</button>
            </td>
        `;
    });

    document.querySelectorAll('.resolve-backlog-btn').forEach(button => {
        button.addEventListener('click', (e) => resolveBacklog(e.target.dataset.id));
    });
    document.querySelectorAll('.delete-backlog-btn').forEach(button => {
        button.addEventListener('click', (e) => deleteBacklog(e.target.dataset.id));
    });
}

function resolveBacklog(id) {
    const index = backlogs.findIndex(item => item.id === id);
    if (index === -1) return;

    const [resolvedItem] = backlogs.splice(index, 1);
    // Optionally move to completed tasks or simply remove
    completedTasks.push({ ...resolvedItem, completionDate: new Date().toISOString().split('T')[0], status: 'Resolved from Backlog' });
    saveData();
    renderBacklogs();
    renderCompletedTasks();
    updateDailyRoutineSummary(); // Update pending backlogs count
}

function deleteBacklog(id) {
    if (confirm('Are you sure you want to delete this backlog item?')) {
        backlogs = backlogs.filter(item => item.id !== id);
        saveData();
        renderBacklogs();
        updateDailyRoutineSummary(); // Update pending backlogs count
    }
}

// --- Completed Tasks Functions ---
function renderCompletedTasks() {
    completedTableBody.innerHTML = '';
    if (completedTasks.length === 0) {
        completedTableBody.innerHTML = '<tr><td colspan="6" class="py-3 px-6 text-center">No completed tasks.</td></tr>';
        return;
    }

    const sortedCompleted = [...completedTasks].sort((a, b) => new Date(b.completionDate || b.date) - new Date(a.completionDate || a.date));

    sortedCompleted.forEach(task => {
        const row = completedTableBody.insertRow();
        const chapterOrTopics = task.topics && task.topics.length > 0 ? task.topics.join(', ') : task.chapter;
        const mcqDetails = task.mcqsPracticed !== undefined ? `Book: ${task.mcqsPracticed} | Other: ${task.customMCQsCount || 0}` : 'N/A';
        const timeDetails = task.timeSpent !== undefined ? task.timeSpent : 'N/A';

        row.innerHTML = `
            <td class="py-3 px-6 whitespace-nowrap">${task.completionDate || task.date}</td>
            <td class="py-3 px-6 capitalize">${task.subject || 'N/A'}</td>
            <td class="py-3 px-6">${chapterOrTopics}</td>
            <td class="py-3 px-6">${task.studyTypes ? task.studyTypes.join(', ') : (task.studyType || 'N/A')}</td>
            <td class="py-3 px-6">${mcqDetails}</td>
            <td class="py-3 px-6">${timeDetails}</td>
        `;
    });
}


// --- Goals Functions ---
function addChapterGoal() {
    const subject = goalSubjectSelect.value;
    const book = goalBookInput.value.trim();
    const chapter = goalChapterNameInput.value.trim();
    const topics = goalTopicsInput.value.split(',').map(t => t.trim()).filter(t => t !== '');
    const dueDate = goalDueDateInput.value;

    if (!subject || !chapter || !dueDate) {
        alert('Please fill in Subject, Chapter Name, and Due Date for chapter goals.');
        return;
    }

    const newGoal = {
        id: generateId(),
        subject,
        book,
        chapter,
        topics,
        dueDate,
        progress: 0 // 0-100 percentage
    };

    chapterGoals.push(newGoal);
    saveData();
    renderChapterGoals();
    populateLogBookDropdown(); // Update daily log book dropdown with new goal books
    populateMCQSourceDropdown(); // Update MCQ source dropdown
    drawAllCharts(); // Update charts (goal completion)

    // Clear form
    goalSubjectSelect.value = '';
    goalBookInput.value = '';
    goalChapterNameInput.value = '';
    goalTopicsInput.value = '';
    goalDueDateInput.value = '';
    populateSubjectDropdowns(); // Reset subject dropdown
}

function renderChapterGoals() {
    chapterGoalsTableBody.innerHTML = '';
    if (chapterGoals.length === 0) {
        chapterGoalsTableBody.innerHTML = '<tr><td colspan="7" class="py-3 px-6 text-center">No chapter goals set yet.</td></tr>';
        return;
    }

    const sortedGoals = [...chapterGoals].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    sortedGoals.forEach(goal => {
        const topicsCoveredCount = (completedTopics[goal.subject] && completedTopics[goal.subject][goal.chapter]) ?
                                   completedTopics[goal.subject][goal.chapter].length : 0;
        const totalGoalTopics = goal.topics.length > 0 ? goal.topics.length : 1; // If no specific topics, assume 1 unit for chapter
        const currentProgress = Math.round((topicsCoveredCount / totalGoalTopics) * 100);
        goal.progress = Math.min(currentProgress, 100); // Ensure progress doesn't exceed 100%

        const row = chapterGoalsTableBody.insertRow();
        row.innerHTML = `
            <td class="py-3 px-6 capitalize">${goal.subject}</td>
            <td class="py-3 px-6">${goal.book || 'N/A'}</td>
            <td class="py-3 px-6">${goal.chapter}</td>
            <td class="py-3 px-6 text-sm">${goal.topics.join(', ') || 'N/A'}</td>
            <td class="py-3 px-6 whitespace-nowrap">${goal.dueDate}</td>
            <td class="py-3 px-6">
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${goal.progress}%"></div>
                </div>
                <span class="text-xs text-gray-500">${goal.progress}% completed</span>
            </td>
            <td class="py-3 px-6 text-center">
                <button data-id="${goal.id}" class="edit-goal-btn text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button data-id="${goal.id}" class="delete-goal-btn text-red-500 hover:text-red-700">Delete</button>
            </td>
        `;
    });

    document.querySelectorAll('.edit-goal-btn').forEach(button => {
        button.addEventListener('click', (e) => editChapterGoal(e.target.dataset.id));
    });
    document.querySelectorAll('.delete-goal-btn').forEach(button => {
        button.addEventListener('click', (e) => deleteChapterGoal(e.target.dataset.id));
    });
}

function editChapterGoal(id) {
    const goal = chapterGoals.find(g => g.id === id);
    if (!goal) return;

    goalSubjectSelect.value = goal.subject;
    goalBookInput.value = goal.book;
    goalChapterNameInput.value = goal.chapter;
    goalTopicsInput.value = goal.topics.join(', ');
    goalDueDateInput.value = goal.dueDate;

    addChapterGoalBtn.textContent = 'Update Chapter Goal';
    addChapterGoalBtn.onclick = () => updateChapterGoal(id);
}

function updateChapterGoal(id) {
    const index = chapterGoals.findIndex(g => g.id === id);
    if (index === -1) return;

    const subject = goalSubjectSelect.value;
    const book = goalBookInput.value.trim();
    const chapter = goalChapterNameInput.value.trim();
    const topics = goalTopicsInput.value.split(',').map(t => t.trim()).filter(t => t !== '');
    const dueDate = goalDueDateInput.value;

    if (!subject || !chapter || !dueDate) {
        alert('Please fill in Subject, Chapter Name, and Due Date for chapter goals.');
        return;
    }

    chapterGoals[index] = {
        id: id,
        subject,
        book,
        chapter,
        topics,
        dueDate,
        progress: chapterGoals[index].progress // Keep existing progress or recalculate
    };

    saveData();
    renderChapterGoals();
    populateLogBookDropdown();
    populateMCQSourceDropdown();
    drawAllCharts();

    addChapterGoalBtn.textContent = 'Add Chapter Goal';
    addChapterGoalBtn.onclick = addChapterGoal; // Reset button
    // Clear form
    goalSubjectSelect.value = '';
    goalBookInput.value = '';
    goalChapterNameInput.value = '';
    goalTopicsInput.value = '';
    goalDueDateInput.value = '';
    populateSubjectDropdowns();
}

function deleteChapterGoal(id) {
    if (confirm('Are you sure you want to delete this chapter goal?')) {
        chapterGoals = chapterGoals.filter(goal => goal.id !== id);
        saveData();
        renderChapterGoals();
        populateLogBookDropdown(); // Update daily log book dropdown
        populateMCQSourceDropdown(); // Update MCQ source dropdown
        drawAllCharts();
    }
}

function setMCQGoals() {
    const physics = parseInt(mcqGoalPhysicsInput.value) || 0;
    const chemistry = parseInt(mcqGoalChemistryInput.value) || 0;
    const biology = parseInt(mcqGoalBiologyInput.value) || 0;

    mcqQuotas = { physics, chemistry, biology };
    saveData();
    updateMCQQuotaDisplays();
    updateMCQQuotaCharts();
    alert('Daily MCQ quotas updated!');
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
    const score = parseInt(overallGoalScoreInput.value);
    const date = overallGoalDueDateInput.value;

    if (isNaN(score) || !date) {
        alert('Please enter a valid target score and date.');
        return;
    }

    overallGoal = { score, date };
    saveData();
    updateOverallGoalDisplay();
    alert('Overall goal set!');
}

function updateOverallGoalDisplay() {
    if (overallGoal) {
        displayOverallTargetScore.textContent = overallGoal.score;
        displayOverallTargetDate.textContent = overallGoal.date;
        overallGoalScoreInput.value = overallGoal.score;
        overallGoalDueDateInput.value = overallGoal.date;
    } else {
        displayOverallTargetScore.textContent = 'N/A';
        displayOverallTargetDate.textContent = 'N/A';
        overallGoalScoreInput.value = '';
        overallGoalDueDateInput.value = '';
    }
}

function trackCompletedTopics(subject, chapter, topicsCompleted) {
    if (!completedTopics[subject]) {
        completedTopics[subject] = {};
    }
    if (!completedTopics[subject][chapter]) {
        completedTopics[subject][chapter] = [];
    }

    topicsCompleted.forEach(topic => {
        if (!completedTopics[subject][chapter].includes(topic)) {
            completedTopics[subject][chapter].push(topic);
        }
    });
    saveData();
    renderChapterGoals(); // Re-render goals to update progress bars
    drawGoalCompletionChart();
    drawTopicCompletionChart();
}


// --- Analytics & Graphs Functions (Chart.js) ---
function initCharts() {
    // Destroy existing chart instances before re-initializing
    if (testScoreChart) testScoreChart.destroy();
    if (subjectAverageChart) subjectAverageChart.destroy();
    if (timeSpentChart) timeSpentChart.destroy();
    if (mcqsPracticedChart) mcqsPracticedChart.destroy();
    if (goalCompletionChart) goalCompletionChart.destroy();
    if (topicCompletionChart) topicCompletionChart.destroy();

    // Ensure canvas elements exist and are ready
    if (!testScoreChartCanvas) return; // Exit if canvases are not available (e.g., section not loaded)

    testScoreChart = new Chart(testScoreChartCanvas.getContext('2d'), { type: 'line', data: {}, options: {} });
    subjectAverageChart = new Chart(subjectAverageChartCanvas.getContext('2d'), { type: 'bar', data: {}, options: {} });
    timeSpentChart = new Chart(timeSpentChartCanvas.getContext('2d'), { type: 'bar', data: {}, options: {} });
    mcqsPracticedChart = new Chart(mcqsPracticedChartCanvas.getContext('2d'), { type: 'bar', data: {}, options: {} });
    goalCompletionChart = new Chart(goalCompletionChartCanvas.getContext('2d'), { type: 'pie', data: {}, options: {} });
    topicCompletionChart = new Chart(topicCompletionChartCanvas.getContext('2d'), { type: 'bar', data: {}, options: {} });
}

function drawAllCharts() {
    // Only draw if the analytics section is visible
    if (!document.getElementById('analyticsGraphsContent').classList.contains('hidden')) {
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
    const dates = testResults.map(r => r.date).sort();
    const totals = testResults.map(r => r.total);
    const physicsScores = testResults.map(r => r.physics);
    const chemistryScores = testResults.map(r => r.chemistry);
    const biologyScores = testResults.map(r => r.biology);

    testScoreChart.data = {
        labels: dates,
        datasets: [
            {
                label: 'Total Score',
                data: totals,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            },
            {
                label: 'Physics Score',
                data: physicsScores,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
                fill: false
            },
            {
                label: 'Chemistry Score',
                data: chemistryScores,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1,
                fill: false
            },
            {
                label: 'Biology Score',
                data: biologyScores,
                borderColor: 'rgb(255, 205, 86)',
                tension: 0.1,
                fill: false
            }
        ]
    };
    testScoreChart.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true, max: 720 }
        },
        plugins: {
            title: {
                display: true,
                text: 'Test Score Progression Over Time'
            }
        }
    };
    testScoreChart.update();
}

function drawSubjectAverageChart() {
    const subjectScores = { physics: [], chemistry: [], biology: [] };
    testResults.forEach(r => {
        subjectScores.physics.push(r.physics);
        subjectScores.chemistry.push(r.chemistry);
        subjectScores.biology.push(r.biology);
    });

    const average = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

    const avgPhysics = average(subjectScores.physics);
    const avgChemistry = average(subjectScores.chemistry);
    const avgBiology = average(subjectScores.biology);

    subjectAverageChart.data = {
        labels: ['Physics', 'Chemistry', 'Biology'],
        datasets: [{
            label: 'Average Score',
            data: [avgPhysics, avgChemistry, avgBiology],
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 205, 86, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)'],
            borderWidth: 1
        }]
    };
    subjectAverageChart.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true, max: 360 } // Max for Biology, others out of 180, scale for highest
        },
        plugins: {
            title: {
                display: true,
                text: 'Subject-wise Average Scores'
            }
        }
    };
    subjectAverageChart.update();
}

function drawTimeSpentChart() {
    const dailyTime = {}; // { date: totalMinutes }
    dailyLogs.forEach(log => {
        const [hours, minutes] = log.timeSpent.split(':').map(Number);
        const totalMinutes = (hours * 60) + minutes;
        dailyTime[log.date] = (dailyTime[log.date] || 0) + totalMinutes;
    });

    const sortedDates = Object.keys(dailyTime).sort();
    const dataValues = sortedDates.map(date => dailyTime[date] / 60); // Convert back to hours for display

    timeSpentChart.data = {
        labels: sortedDates,
        datasets: [{
            label: 'Hours Studied',
            data: dataValues,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };
    timeSpentChart.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Hours' } }
        },
        plugins: {
            title: {
                display: true,
                text: 'Daily Study Time'
            }
        }
    };
    timeSpentChart.update();
}

function drawMCQsPracticedChart() {
    const dailyMCQs = {}; // { date: totalMCQs }
    dailyLogs.forEach(log => {
        const totalMCQs = (log.mcqsPracticed || 0) + (log.customMCQsCount || 0);
        dailyMCQs[log.date] = (dailyMCQs[log.date] || 0) + totalMCQs;
    });

    const sortedDates = Object.keys(dailyMCQs).sort();
    const dataValues = sortedDates.map(date => dailyMCQs[date]);

    mcqsPracticedChart.data = {
        labels: sortedDates,
        datasets: [{
            label: 'MCQs Practiced',
            data: dataValues,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };
    mcqsPracticedChart.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Number of MCQs' } }
        },
        plugins: {
            title: {
                display: true,
                text: 'Daily MCQs Practiced'
            }
        }
    };
    mcqsPracticedChart.update();
}


function drawGoalCompletionChart() {
    const subjectProgress = {
        physics: { completed: 0, total: 0 },
        chemistry: { completed: 0, total: 0 },
        biology: { completed: 0, total: 0 }
    };

    // Calculate total possible topics/chapters for each subject based on ALL_SUBJECT_DATA
    for (const subject in ALL_SUBJECT_DATA) {
        for (const chapter in ALL_SUBJECT_DATA[subject]) {
            const topics = ALL_SUBJECT_DATA[subject][chapter];
            if (topics && topics.length > 0 && topics[0] !== "General Topics") {
                subjectProgress[subject].total += topics.length;
            } else {
                subjectProgress[subject].total += 1; // Count chapter as 1 unit if no specific topics
            }
        }
    }

    // Calculate completed topics/chapters based on actual completed data
    for (const subject in completedTopics) {
        for (const chapter in completedTopics[subject]) {
            const completed = completedTopics[subject][chapter];
            if (completed && completed.length > 0) {
                subjectProgress[subject].completed += completed.length;
            }
        }
    }

    const labels = [];
    const completedData = [];
    const remainingData = [];
    const backgroundColors = [];
    const borderColors = [];

    for (const subjectKey in subjectProgress) {
        labels.push(subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1));
        completedData.push(subjectProgress[subjectKey].completed);
        remainingData.push(subjectProgress[subjectKey].total - subjectProgress[subjectKey].completed);

        // Assign colors
        if (subjectKey === 'physics') {
            backgroundColors.push('rgba(255, 99, 132, 0.7)'); // Red
            borderColors.push('rgba(255, 99, 132, 1)');
        } else if (subjectKey === 'chemistry') {
            backgroundColors.push('rgba(54, 162, 235, 0.7)'); // Blue
            borderColors.push('rgba(54, 162, 235, 1)');
        } else if (subjectKey === 'biology') {
            backgroundColors.push('rgba(75, 192, 192, 0.7)'); // Green
            borderColors.push('rgba(75, 192, 192, 1)');
        } else {
            backgroundColors.push('rgba(200, 200, 200, 0.7)'); // Grey for others
            borderColors.push('rgba(200, 200, 200, 1)');
        }
    }

    goalCompletionChart.data = {
        labels: labels,
        datasets: [{
            label: 'Completed Chapters/Topics',
            data: completedData,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
        }, {
            label: 'Remaining Chapters/Topics',
            data: remainingData,
            backgroundColor: backgroundColors.map(color => color.replace('0.7', '0.2')), // Lighter shade for remaining
            borderColor: backgroundColors.map(color => color.replace('0.7', '0.5')),
            borderWidth: 1
        }]
    };
    goalCompletionChart.options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Subject-wise Chapter/Topic Completion'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed;
                        return `${label}: ${value} units`;
                    }
                }
            }
        }
    };
    goalCompletionChart.update();
}

function drawTopicCompletionChart() {
    const chapterLabels = [];
    const completedCounts = [];
    const totalCounts = [];
    const backgroundColors = [];

    // Flatten all chapters from ALL_SUBJECT_DATA
    for (const subjectKey in ALL_SUBJECT_DATA) {
        for (const chapterKey in ALL_SUBJECT_DATA[subjectKey]) {
            const topicsInChapter = ALL_SUBJECT_DATA[subjectKey][chapterKey];
            const totalTopics = topicsInChapter.length > 0 && topicsInChapter[0] !== "General Topics" ? topicsInChapter.length : 1; // Count as 1 if no specific topics

            const completedForChapter = (completedTopics[subjectKey] && completedTopics[subjectKey][chapterKey]) ?
                                        completedTopics[subjectKey][chapterKey].length : 0;

            if (totalTopics > 0) { // Only add if there's something to track
                chapterLabels.push(`${subjectKey.charAt(0).toUpperCase()}${subjectKey.slice(1)}: ${chapterKey}`);
                completedCounts.push(completedForChapter);
                totalCounts.push(totalTopics);

                // Assign colors based on subject
                if (subjectKey === 'physics') {
                    backgroundColors.push('rgba(255, 99, 132, 0.7)'); // Red
                } else if (subjectKey === 'chemistry') {
                    backgroundColors.push('rgba(54, 162, 235, 0.7)'); // Blue
                } else if (subjectKey === 'biology') {
                    backgroundColors.push('rgba(75, 192, 192, 0.7)'); // Green
                } else {
                    backgroundColors.push('rgba(200, 200, 200, 0.7)'); // Grey
                }
            }
        }
    }

    topicCompletionChart.data = {
        labels: chapterLabels,
        datasets: [{
            label: 'Completed Topics',
            data: completedCounts,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
            borderWidth: 1
        }, {
            label: 'Total Topics',
            data: totalCounts,
            backgroundColor: backgroundColors.map(color => color.replace('0.7', '0.2')), // Lighter shade for total
            borderColor: backgroundColors.map(color => color.replace('0.7', '0.5')),
            borderWidth: 1
        }]
    };
    topicCompletionChart.options = {
        indexAxis: 'y', // Make it a horizontal bar chart
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { beginAtZero: true, stacked: false },
            y: { stacked: false }
        },
        plugins: {
            title: {
                display: true,
                text: 'Topic Completion Rate per Chapter'
            }
        }
    };
    topicCompletionChart.update();
}


// --- Countdown Timer ---
function updateCountdown() {
    const neetDate = new Date('2026-05-04T09:00:00'); // Example: May 4, 2026, 9:00 AM
    const now = new Date();
    const timeLeft = neetDate - now;

    if (timeLeft <= 0) {
        countdownElement.textContent = 'NEET UG 2026 has begun!';
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}


// --- Motivational Quotes ---
const motivationalQuotes = [
    "Success is the sum of small efforts, repeated day in and day out.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Don't watch the clock; do what it does. Keep going."
];

function displayRandomMotivationalQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    motivationalQuoteElement.textContent = `"${motivationalQuotes[randomIndex]}"`;
}

// --- Initializations and Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Basic Auth Logic (For now, just toggle visibility)
    loginToggleBtn.addEventListener('click', () => showAuthSection(true));
    signupToggleBtn.addEventListener('click', () => showAuthSection(false));

    // Simulate successful login for development
    // In a real app, this would be handled by Firebase auth
    // loginForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const email = loginEmail.value;
    //     const password = loginPassword.value;
    //     if (email === 'test@example.com' && password === 'password') { // Dummy auth
    //         displayMessage(authMessage, 'Login successful!', 'success');
    //         showMainDashboard();
    //     } else {
    //         displayMessage(authMessage, 'Invalid credentials.', 'error');
    //     }
    // });
    // signupForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     displayMessage(authMessage, 'Signup successful! Please login.', 'success');
    //     showAuthSection(true); // Switch to login after signup
    // });

    // TEMPORARY: Directly show dashboard for development without login
    showMainDashboard();

    logoutBtn.addEventListener('click', () => showAuthSection(true));


    // Daily Log
    addLogEntryBtn.addEventListener('click', addLogEntry);

    // My Tests
    physicsScoreInput.addEventListener('input', calculateTotalScore);
    chemistryScoreInput.addEventListener('input', calculateTotalScore);
    biologyScoreInput.addEventListener('input', calculateTotalScore);
    addTestResultBtn.addEventListener('click', addTestResult);

    // Upcoming Plans
    addPlanBtn.addEventListener('click', addPlan);

    // Goals
    addChapterGoalBtn.addEventListener('click', addChapterGoal);
    setMCQGoalsBtn.addEventListener('click', setMCQGoals);
    setOverallGoalBtn.addEventListener('click', setOverallGoal);

    // Load data and render on page load
    loadData();
    populateSubjectDropdowns(); // Populate initially
    populateMCQSourceDropdown(); // Populate MCQ source dropdown initially
    renderDailyLogEntries(); // Render for "Today" tab by default
    renderTestResults();
    renderUpcomingPlans();
    renderBacklogs();
    renderCompletedTasks();
    renderChapterGoals();
    updateMCQQuotaDisplays();
    updateOverallGoalDisplay();
    updateDailyRoutineSummary();

    // Initialize and draw charts (will only show if section is active)
    initCharts();
    updateMCQQuotaCharts(); // Initialize MCQ charts

    // Set countdown and quote refresh
    setInterval(updateCountdown, 1000);
    setInterval(displayRandomMotivationalQuote, 15000); // Change quote every 15 seconds

    // Initial call to set quote
    displayRandomMotivationalQuote();
});