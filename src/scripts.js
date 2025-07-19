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
let completedTopics = JSON.parse(localStorage.getItem('completedTopics')) || {}; // { "subject": { "book": { "chapter": ["topic1", "topic2"] } } }

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
logSubjectSelect.addEventListener('change', populateLogBookDropdown);
logBookSelect.addEventListener('change', populateLogChapterDropdown);
logChapterSelect.addEventListener('change', populateLogTopicsChecklist); // New listener for topics

goalSubjectSelect.addEventListener('change', populateGoalBookDropdown);
goalBookSelect.addEventListener('change', populateGoalChapterDropdown);
goalChapterSelect.addEventListener('change', populateGoalTopicsChecklist); // New listener for topics

planSubjectSelect.addEventListener('change', populatePlanBookDropdown);
planBookSelect.addEventListener('change', populatePlanChapterDropdown);


// --- Daily Log Functions ---
function addLogEntry() {
    const date = logDateInput.value;
    const subject = logSubjectSelect.value;
    const book = logBookSelect.value; // Get book value
    const chapter = logChapterSelect.value;
    const selectedTopics = Array.from(logTopicsChecklist.querySelectorAll('input[name="logTopic"]:checked'))
                               .map(checkbox => checkbox.value);
    const mcqsPracticed = parseInt(logMCQsPracticedInput.value) || 0;
    const mcqSource = logMCQSourceSelect.value;
    const customMCQSource = logCustomMCQSourceInput.value;
    const customMCQsCount = parseInt(logCustomMCQsCountInput.value) || 0;
    const timeSpent = logTimeSpentInput.value;
    const comments = logCommentsInput.value;

    if (!date || !subject || !book || !chapter || (selectedTopics.length === 0 && mcqsPracticed === 0 && timeSpent === '')) {
        displayMessage(document.getElementById('dailyLogMessage'), 'Please fill in all required fields (Date, Subject, Book, Chapter, and at least one of Topics, MCQs, or Time Spent).', 'error');
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
        mcqsPracticed: totalMCQs,
        mcqSource: mcqSource === 'Other' ? customMCQSource : mcqSource,
        timeSpent,
        comments,
        type: 'chapter_study' // Default type for now, can be expanded
    };
    dailyLogs.push(newLog);
    saveData();
    renderDailyLogEntries();
    updateDailyRoutineSummary();
    drawAllCharts(); // Update charts after new data
    updateMCQQuotaCharts(); // Update MCQ charts

    // Mark topics as completed
    if (selectedTopics.length > 0) {
        if (!completedTopics[subject]) {
            completedTopics[subject] = {};
        }
        if (!completedTopics[subject][book]) { // New book level
            completedTopics[subject][book] = {};
        }
        if (!completedTopics[subject][book][chapter]) {
            completedTopics[subject][book][chapter] = [];
        }
        selectedTopics.forEach(topic => {
            if (!completedTopics[subject][book][chapter].includes(topic)) {
                completedTopics[subject][book][chapter].push(topic);
            }
        });
        saveData();
    }

    // Clear form
    logSubjectSelect.value = '';
    logBookSelect.value = ''; // Clear book
    logChapterSelect.value = '';
    logTopicsChecklist.innerHTML = '';
    logTopicsContainer.classList.add('hidden');
    logMCQsPracticedInput.value = '';
    logMCQSourceSelect.value = '';
    logCustomMCQSourceInput.value = '';
    logCustomMCQsCountInput.value = '';
    logTimeSpentInput.value = '';
    logCommentsInput.value = '';
    displayMessage(document.getElementById('dailyLogMessage'), 'Log entry added successfully!', 'success');
}


function renderDailyLogEntries() {
    dailyLogTableBody.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = dailyLogs.filter(log => log.date === today);

    if (todayLogs.length === 0) {
        dailyLogTableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-gray-500">No log entries for today.</td></tr>';
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

        logMCQsPracticedInput.value = log.mcqsPracticed;
        logMCQSourceSelect.value = log.mcqSource; // This might need adjustment if custom source was used
        logTimeSpentInput.value = log.timeSpent;
        logCommentsInput.value = log.comments;

        // Remove the original entry, it will be re-added on save
        dailyLogs = dailyLogs.filter(entry => entry.id !== id);
        saveData();
        renderDailyLogEntries();
        updateDailyRoutineSummary();
        displayMessage(document.getElementById('dailyLogMessage'), 'Log entry loaded for editing.', 'info');
    }
}

function deleteLogEntry(id) {
    if (confirm('Are you sure you want to delete this log entry?')) {
        dailyLogs = dailyLogs.filter(entry => entry.id !== id);
        saveData();
        renderDailyLogEntries();
        updateDailyRoutineSummary();
        drawAllCharts();
        updateMCQQuotaCharts();
        displayMessage(document.getElementById('dailyLogMessage'), 'Log entry deleted successfully!', 'success');
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
        const [hours, minutes] = (log.timeSpent || '0h 0m').split('h ').map(Number);
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
        displayMessage(document.getElementById('testResultFormMessage'), 'Please fill in all test result fields.', 'error');
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
    saveData();
    renderTestResults();
    drawAllCharts(); // Update charts after new data
    displayMessage(document.getElementById('testResultFormMessage'), 'Test result added successfully!', 'success');

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
            <td class="py-3 px-6 text-left">${test.type.charAt(0).toUpperCase() + test.type.slice(1)}</td>
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
    if (confirm('Are you sure you want to delete this test result?')) {
        testResults = testResults.filter(test => test.id !== id);
        saveData();
        renderTestResults();
        drawAllCharts();
        displayMessage(document.getElementById('testResultFormMessage'), 'Test result deleted successfully!', 'success');
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
        displayMessage(document.getElementById('planFormMessage'), 'Please fill in all upcoming plan fields.', 'error');
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
    saveData();
    renderUpcomingPlans();
    displayMessage(document.getElementById('planFormMessage'), 'Plan added successfully!', 'success');

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
        saveData();
        renderUpcomingPlans();
        renderCompletedTasks();
        displayMessage(document.getElementById('planFormMessage'), 'Plan marked as completed!', 'success');
    }
}

function markPlanBacklog(id) {
    const planIndex = upcomingPlans.findIndex(p => p.id === id);
    if (planIndex > -1) {
        const plan = upcomingPlans[planIndex];
        plan.isBacklog = true;
        plan.backlogDate = new Date().toISOString().split('T')[0];
        backlogs.push({ // Add to backlogs
            id: generateId(),
            date: plan.backlogDate,
            subject: plan.subject,
            book: plan.book, // Store book
            chapter: plan.chapter,
            reason: 'Moved from Upcoming Plans', // Default reason
            originalPlanId: plan.id
        });
        upcomingPlans.splice(planIndex, 1); // Remove from upcoming plans
        saveData();
        renderUpcomingPlans();
        renderBacklogs();
        updateDailyRoutineSummary();
        displayMessage(document.getElementById('planFormMessage'), 'Plan moved to backlogs!', 'info');
    }
}

function deletePlan(id) {
    if (confirm('Are you sure you want to delete this plan?')) {
        upcomingPlans = upcomingPlans.filter(plan => plan.id !== id);
        saveData();
        renderUpcomingPlans();
        displayMessage(document.getElementById('planFormMessage'), 'Plan deleted successfully!', 'success');
    }
}

// --- Backlogs Functions ---
function renderBacklogs() {
    backlogsTableBody.innerHTML = '';
    if (backlogs.length === 0) {
        backlogsTableBody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500">No backlogs.</td></tr>';
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
        saveData();
        renderBacklogs();
        renderCompletedTasks();
        updateDailyRoutineSummary();
        displayMessage(document.getElementById('backlogsFormMessage'), 'Backlog resolved!', 'success');
    }
}

function deleteBacklog(id) {
    if (confirm('Are you sure you want to delete this backlog?')) {
        backlogs = backlogs.filter(item => item.id !== id);
        saveData();
        renderBacklogs();
        updateDailyRoutineSummary();
        displayMessage(document.getElementById('backlogsFormMessage'), 'Backlog deleted successfully!', 'success');
    }
}


// --- Completed Tasks Functions ---
function renderCompletedTasks() {
    completedTableBody.innerHTML = '';
    if (completedTasks.length === 0) {
        completedTableBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-gray-500">No completed tasks yet.</td></tr>';
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
            <td class="py-3 px-6 text-left">${task.type}</td>
            <td class="py-3 px-6 text-center">${task.mcqs || 'N/A'}</td>
            <td class="py-3 px-6 text-center">${task.time || 'N/A'}</td>
            <td class="py-3 px-6 text-center">
                <button onclick="deleteCompletedTask('${task.id}')" class="text-red-600 hover:text-red-800">Delete</button>
            </td>
        `;
    });
}

function deleteCompletedTask(id) {
    if (confirm('Are you sure you want to delete this completed task?')) {
        completedTasks = completedTasks.filter(task => task.id !== id);
        saveData();
        renderCompletedTasks();
        displayMessage(document.getElementById('completedTasksMessage'), 'Completed task deleted successfully!', 'success');
    }
}


// --- Goals Functions ---
function addChapterGoal() {
    const subject = goalSubjectSelect.value;
    const book = goalBookSelect.value;
    const chapter = goalChapterSelect.value;
    const selectedTopics = Array.from(goalTopicsChecklist.querySelectorAll('input[name="goalTopic"]:checked'))
                               .map(checkbox => checkbox.value);
    const dueDate = goalDueDateInput.value;

    if (!subject || !book || !chapter || !dueDate) {
        displayMessage(document.getElementById('chapterGoalMessage'), 'Please select Subject, Book, Chapter, and Due Date.', 'error');
        return;
    }

    // Check if a goal for this specific chapter (and book) already exists
    const existingGoal = chapterGoals.find(g =>
        g.subject === subject &&
        g.book === book &&
        g.chapter === chapter
    );

    if (existingGoal) {
        displayMessage(document.getElementById('chapterGoalMessage'), 'Goal for this Chapter in this Book already exists. You can edit it from the table.', 'error');
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
    saveData();
    renderChapterGoals();
    drawAllCharts(); // Update goal completion chart
    displayMessage(document.getElementById('chapterGoalMessage'), 'Chapter goal added successfully!', 'success');

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
        chapterGoalsTableBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-gray-500">No chapter goals set yet.</td></tr>';
        return;
    }

    chapterGoals.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).forEach(goal => {
        const totalTopics = getTopicsForChapter(goal.subject, goal.book, goal.chapter).length;
        const completedCount = Object.values(goal.completionStatus.topics).filter(status => status).length;
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
            if (chapter && chapter.topics && chapter.topics[0] !== "General Topics") {
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

        // Remove the original entry, it will be re-added on save
        chapterGoals = chapterGoals.filter(g => g.id !== id);
        saveData();
        renderChapterGoals();
        displayMessage(document.getElementById('chapterGoalMessage'), 'Goal loaded for editing.', 'info');
    }
}

function deleteChapterGoal(id) {
    if (confirm('Are you sure you want to delete this chapter goal?')) {
        chapterGoals = chapterGoals.filter(goal => goal.id !== id);
        saveData();
        renderChapterGoals();
        drawAllCharts(); // Update chart
        displayMessage(document.getElementById('chapterGoalMessage'), 'Chapter goal deleted successfully!', 'success');
    }
}

function setMCQGoals() {
    const physicsQuota = parseInt(mcqGoalPhysicsInput.value);
    const chemistryQuota = parseInt(mcqGoalChemistryInput.value);
    const biologyQuota = parseInt(mcqGoalBiologyInput.value);

    if (isNaN(physicsQuota) || isNaN(chemistryQuota) || isNaN(biologyQuota)) {
        displayMessage(document.getElementById('mcqGoalMessage'), 'Please enter valid numbers for all MCQ quotas.', 'error');
        return;
    }

    mcqQuotas = { physics: physicsQuota, chemistry: chemistryQuota, biology: biologyQuota };
    saveData();
    updateMCQQuotaDisplays();
    updateMCQQuotaCharts();
    displayMessage(document.getElementById('mcqGoalMessage'), 'Daily MCQ quotas set successfully!', 'success');
}

function updateMCQQuotaDisplays() {
    displayPhysicsQuota.textContent = mcqQuotas.physics;
    displayChemistryQuota.textContent = mcqQuotas.chemistry;
    displayBiologyQuota.textContent = mcqQuotas.biology;
}

function setOverallGoal() {
    const targetScore = parseInt(overallGoalScoreInput.value);
    const targetDate = overallGoalDueDateInput.value;

    if (isNaN(targetScore) || !targetDate) {
        displayMessage(document.getElementById('overallGoalMessage'), 'Please enter a valid target score and date.', 'error');
        return;
    }

    overallGoal = { score: targetScore, dueDate: targetDate };
    saveData();
    updateOverallGoalDisplay();
    displayMessage(document.getElementById('overallGoalMessage'), 'Overall goal set successfully!', 'success');
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


// --- Charting Functions (using Chart.js) ---
let chartInstances = {}; // Store chart instances to destroy them before re-drawing

function initCharts() {
    // Ensure canvas elements exist before initializing charts
    if (testScoreChartCanvas) {
        const ctx = testScoreChartCanvas.getContext('2d');
        if (chartInstances.testScoreChart) chartInstances.testScoreChart.destroy();
        chartInstances.testScoreChart = new Chart(ctx, {
            type: 'line',
            data: { labels: [], datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 720 }
                },
                plugins: { legend: { display: true } }
            }
        });
    }
    if (subjectAverageChartCanvas) {
        const ctx = subjectAverageChartCanvas.getContext('2d');
        if (chartInstances.subjectAverageChart) chartInstances.subjectAverageChart.destroy();
        chartInstances.subjectAverageChart = new Chart(ctx, {
            type: 'bar',
            data: { labels: ['Physics', 'Chemistry', 'Biology'], datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 180 }
                },
                plugins: { legend: { display: false } }
            }
        });
    }
    if (timeSpentChartCanvas) {
        const ctx = timeSpentChartCanvas.getContext('2d');
        if (chartInstances.timeSpentChart) chartInstances.timeSpentChart.destroy();
        chartInstances.timeSpentChart = new Chart(ctx, {
            type: 'bar',
            data: { labels: [], datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } },
                plugins: { legend: { display: false } }
            }
        });
    }
    if (mcqsPracticedChartCanvas) {
        const ctx = mcqsPracticedChartCanvas.getContext('2d');
        if (chartInstances.mcqsPracticedChart) chartInstances.mcqsPracticedChart.destroy();
        chartInstances.mcqsPracticedChart = new Chart(ctx, {
            type: 'bar',
            data: { labels: [], datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } },
                plugins: { legend: { display: false } }
            }
        });
    }
    if (goalCompletionChartCanvas) {
        const ctx = goalCompletionChartCanvas.getContext('2d');
        if (chartInstances.goalCompletionChart) chartInstances.goalCompletionChart.destroy();
        chartInstances.goalCompletionChart = new Chart(ctx, {
            type: 'doughnut',
            data: { labels: ['Completed', 'In Progress', 'Not Started'], datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' },
                    title: { display: true, text: 'Overall Chapter Goal Completion' }
                }
            }
        });
    }
    if (topicCompletionChartCanvas) {
        const ctx = topicCompletionChartCanvas.getContext('2d');
        if (chartInstances.topicCompletionChart) chartInstances.topicCompletionChart.destroy();
        chartInstances.topicCompletionChart = new Chart(ctx, {
            type: 'bar',
            data: { labels: [], datasets: [] },
            options: {
                indexAxis: 'y', // Make it a horizontal bar chart
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { beginAtZero: true, max: 100, title: { display: true, text: 'Completion %' } },
                    y: { title: { display: true, text: 'Chapter' } }
                },
                plugins: { legend: { display: false } }
            }
        });
    }
}

function drawAllCharts() {
    drawTestScoreChart();
    drawSubjectAverageChart();
    drawTimeSpentChart();
    drawMCQsPracticedChart();
    drawGoalCompletionChart();
    drawTopicCompletionChart();
}

function drawTestScoreChart() {
    const dates = [...new Set(testResults.map(t => t.date))].sort();
    const totalScores = dates.map(date => {
        const testsOnDate = testResults.filter(t => t.date === date);
        const sumScores = testsOnDate.reduce((sum, t) => sum + t.total, 0);
        return sumScores / testsOnDate.length; // Average if multiple tests on same day
    });

    if (chartInstances.testScoreChart) {
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
}

function drawSubjectAverageChart() {
    const physicsScores = testResults.map(t => t.physics);
    const chemistryScores = testResults.map(t => t.chemistry);
    const biologyScores = testResults.map(t => t.biology);

    const avgPhysics = physicsScores.length ? (physicsScores.reduce((a, b) => a + b, 0) / physicsScores.length).toFixed(1) : 0;
    const avgChemistry = chemistryScores.length ? (chemistryScores.reduce((a, b) => a + b, 0) / chemistryScores.length).toFixed(1) : 0;
    const avgBiology = biologyScores.length ? (biologyScores.reduce((a, b) => a + b, 0) / biologyScores.length).toFixed(1) : 0;

    if (chartInstances.subjectAverageChart) {
        chartInstances.subjectAverageChart.data.datasets = [{
            label: 'Average Score',
            data: [avgPhysics, avgChemistry, avgBiology],
            backgroundColor: ['#667eea', '#81e6d9', '#a78bfa'],
            borderColor: ['#4c51bf', '#38b2ac', '#8b5cf6'],
            borderWidth: 1
        }];
        chartInstances.subjectAverageChart.update();
    }
}

function drawTimeSpentChart() {
    const dailyTime = {};
    dailyLogs.forEach(log => {
        const date = log.date;
        const [hours, minutes] = (log.timeSpent || '0h 0m').split('h ').map(Number);
        const totalMinutes = (hours * 60) + minutes;
        dailyTime[date] = (dailyTime[date] || 0) + totalMinutes;
    });

    const dates = Object.keys(dailyTime).sort();
    const timeInHours = dates.map(date => (dailyTime[date] / 60).toFixed(2));

    if (chartInstances.timeSpentChart) {
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
}

function drawMCQsPracticedChart() {
    const dailyMCQs = {};
    dailyLogs.forEach(log => {
        const date = log.date;
        dailyMCQs[date] = (dailyMCQs[date] || 0) + (log.mcqsPracticed || 0);
    });

    const dates = Object.keys(dailyMCQs).sort();
    const mcqCounts = dates.map(date => dailyMCQs[date]);

    if (chartInstances.mcqsPracticedChart) {
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
}

function drawGoalCompletionChart() {
    let completedGoals = 0;
    let inProgressGoals = 0;
    let notStartedGoals = 0;
    let overdueGoals = 0;

    chapterGoals.forEach(goal => {
        const totalTopics = getTopicsForChapter(goal.subject, goal.book, goal.chapter).length;
        const completedCount = Object.values(goal.completionStatus.topics).filter(status => status).length;

        if (totalTopics === 0) { // If no topics defined, consider chapter completion status
             if (goal.completionStatus.chapter === 'Completed') {
                completedGoals++;
            } else if (goal.completionStatus.chapter === 'In Progress') {
                inProgressGoals++;
            } else if (new Date(goal.dueDate) < new Date().setHours(0,0,0,0)) {
                overdueGoals++; // Only mark overdue if not started/in progress
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
                 overdueGoals++; // Only mark overdue if not started
            }
            else {
                notStartedGoals++;
            }
        }
    });

    const data = [completedGoals, inProgressGoals, notStartedGoals, overdueGoals].filter(count => count > 0);
    const labels = ['Completed', 'In Progress', 'Not Started', 'Overdue'].filter((_, i) => [completedGoals, inProgressGoals, notStartedGoals, overdueGoals][i] > 0);
    const colors = ['#48bb78', '#ecc94b', '#a0aec0', '#f56565'].filter((_, i) => [completedGoals, inProgressGoals, notStartedGoals, overdueGoals][i] > 0);

    if (chartInstances.goalCompletionChart) {
        chartInstances.goalCompletionChart.data.labels = labels;
        chartInstances.goalCompletionChart.data.datasets = [{
            data: data,
            backgroundColor: colors,
            hoverOffset: 4
        }];
        chartInstances.goalCompletionChart.update();
    }
}


function drawTopicCompletionChart() {
    const chapterLabels = [];
    const completionPercentages = [];

    chapterGoals.forEach(goal => {
        const totalTopics = getTopicsForChapter(goal.subject, goal.book, goal.chapter).length;
        const completedCount = Object.values(goal.completionStatus.topics).filter(status => status).length;
        const completionPercentage = totalTopics > 0 ? ((completedCount / totalTopics) * 100) : 0;

        // Only include if there are topics defined
        if (totalTopics > 0 && getTopicsForChapter(goal.subject, goal.book, goal.chapter)[0] !== "General Topics") {
            chapterLabels.push(`${goal.chapter} (${goal.book})`); // Include book in label
            completionPercentages.push(completionPercentage);
        }
    });

    if (chartInstances.topicCompletionChart) {
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
}


function updateMCQQuotaCharts() {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = dailyLogs.filter(log => log.date === today);

    const currentMCQs = { physics: 0, chemistry: 0, biology: 0 };
    todayLogs.forEach(log => {
        if (log.subject === 'physics') currentMCQs.physics += log.mcqsPracticed || 0;
        if (log.subject === 'chemistry') currentMCQs.chemistry += log.mcqsPracticed || 0;
        if (log.subject === 'biology') currentMCQs.biology += log.mcqsPracticed || 0;
    });

    const renderChart = (chart, subject, quota) => {
        if (!chart) return; // Ensure chart instance exists

        const remaining = Math.max(0, quota - currentMCQs[subject]);
        const data = [currentMCQs[subject], remaining];
        const labels = ['Done', 'Remaining'];
        const colors = ['#48bb78', '#a0aec0']; // Green for done, Gray for remaining

        chart.data.labels = labels;
        chart.data.datasets = [{
            data: data,
            backgroundColor: colors,
            hoverOffset: 4
        }];
        chart.options.plugins.title.text = `${subject.charAt(0).toUpperCase() + subject.slice(1)} Daily Quota (${currentMCQs[subject]}/${quota})`;
        chart.update();
    };

    // Physics Chart
    if (physicsMCQQuotaChartCanvas) {
        const ctx = physicsMCQQuotaChartCanvas.getContext('2d');
        if (!physicsMCQChart) {
            physicsMCQChart = new Chart(ctx, {
                type: 'doughnut',
                data: { labels: [], datasets: [] },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: '' } // Title set dynamically
                    }
                }
            });
            chartInstances.physicsMCQQuotaChart = physicsMCQChart; // Store instance
        }
        renderChart(physicsMCQChart, 'physics', mcqQuotas.physics);
    }

    // Chemistry Chart
    if (chemistryMCQQuotaChartCanvas) {
        const ctx = chemistryMCQQuotaChartCanvas.getContext('2d');
        if (!chemistryMCQChart) {
            chemistryMCQChart = new Chart(ctx, {
                type: 'doughnut',
                data: { labels: [], datasets: [] },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: '' }
                    }
                }
            });
            chartInstances.chemistryMCQQuotaChart = chemistryMCQChart; // Store instance
        }
        renderChart(chemistryMCQChart, 'chemistry', mcqQuotas.chemistry);
    }

    // Biology Chart
    if (biologyMCQQuotaChartCanvas) {
        const ctx = biologyMCQQuotaChartCanvas.getContext('2d');
        if (!biologyMCQChart) {
            biologyMCQChart = new Chart(ctx, {
                type: 'doughnut',
                data: { labels: [], datasets: [] },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: '' }
                    }
                }
            });
            chartInstances.biologyMCQQuotaChart = biologyMCQChart; // Store instance
        }
        renderChart(biologyMCQChart, 'biology', mcqQuotas.biology);
    }
}


// --- Countdown and Motivational Quote ---
function updateCountdown() {
    const neetDate = new Date('2026-05-04T09:00:00'); // Assuming NEET UG 2026 on May 4th
    const now = new Date();
    const timeLeft = neetDate - now;

    if (timeLeft <= 0) {
        countdownElement.textContent = "NEET UG 2026 Has Arrived!";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
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
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    motivationalQuoteElement.textContent = motivationalQuotes[randomIndex];
}

// --- MCQ Source Dropdown Logic ---
function populateMCQSourceDropdown() {
    const allCategories = dailyLogs.filter(log => log.mcqSource && log.mcqSource !== 'Other').map(log => ({ name: log.mcqSource }));

    // Add default options
    const defaultSources = [
        { name: 'Aakash Module' },
        { name: 'Allen Module' },
        { name: 'FIITJEE Module' },
        { name: 'Online Test Series' },
        { name: 'Previous Year Questions (PYQs)' },
        { name: 'NCERT Exemplar' }
    ];

    const uniqueCategoryNames = new Set();
    defaultSources.forEach(source => uniqueCategoryNames.add(source.name)); // Add defaults first
    allCategories.forEach(cat => uniqueCategoryNames.add(cat.name)); // Add from logs

    logMCQSourceSelect.innerHTML = '<option value="">Select Source</option>';
    Array.from(uniqueCategoryNames).sort().forEach(name => {
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

logMCQSourceSelect.addEventListener('change', () => {
    if (logMCQSourceSelect.value === 'Other') {
        logCustomMCQSourceInput.classList.remove('hidden');
        logCustomMCQsCountInput.classList.remove('hidden');
    } else {
        logCustomMCQSourceInput.classList.add('hidden');
        logCustomMCQsCountInput.classList.add('hidden');
        logCustomMCQSourceInput.value = ''; // Clear custom input when 'Other' is not selected
        logCustomMCQsCountInput.value = '';
    }
});


// --- Initial Load and Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Event Listeners for Authentication
    // (Assuming Firebase is handled externally or will be added later)
    // loginForm.addEventListener('submit', handleLogin);
    // signupForm.addEventListener('submit', handleSignup);
    // loginToggleBtn.addEventListener('click', () => showAuthSection(true));
    // signupToggleBtn.addEventListener('click', () => showAuthSection(false));
    // logoutBtn.addEventListener('click', handleLogout);

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

    // Initialize dropdowns based on potential existing data or defaults
    // If the user logs in and there's existing data, these will re-populate
    // with the saved values if any, otherwise they'll be blank.
    populateLogBookDropdown();
    populateLogChapterDropdown();
    populateLogTopicsChecklist();
    populateGoalBookDropdown();
    populateGoalChapterDropdown();
    populateGoalTopicsChecklist();
    populatePlanBookDropdown();
    populatePlanChapterDropdown();


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