
const demoUsers = {
    "admin": "admin123",
    "dr.williams": "doctor123",
    "nurse.brown": "staff123",
    "john.davis": "patient123"
};

let currentAdminPage = 'dashboardPage';
let currentPatientPage = 'patientPortalPage';
let currentFontSize = 16; // Default font size in p
// --- Page Navigation --
function showPageContainer(containerId) {
    document.querySelectorAll('.page-container').forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });
    const targetPage = document.getElementById(containerId);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.classList.remove('hidden');
    }
}
function showAdminPage(pageId, linkElement) {
    // Hide all admin pages
    document.querySelectorAll('#adminAppContainer .page').forEach(page => {
        page.classList.remove('active');
    });
    // Show the target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    currentAdminPage = pageId
    // Update sidebar active link
    if (linkElement) {
        document.querySelectorAll('#adminAppContainer .sidebar-link').forEach(link => {
            link.classList.remove('active');
        });
        linkElement.classList.add('active');
    }
}
function showPatientPage(pageId, linkElement) {
    // Hide all patient pages
    document.querySelectorAll('#patientAppContainer .page').forEach(page => {
        page.classList.remove('active');
    });
    // Show the target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    currentPatientPage = pageId
    // Update sidebar active link
    if (linkElement) {
        document.querySelectorAll('#patientAppContainer .sidebar-link').forEach(link => {
            link.classList.remove('active');
        });
        linkElement.classList.add('active');
    }
}
// --- Authentication --
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError')
    if (demoUsers[username] && demoUsers[username] === password) {
        loginError.classList.add('hidden');
        
        // Route to the correct dashboard
        if (username === 'admin' || username === 'dr.williams' || username === 'nurse.brown') {
             window.location.href = "dashboard.html";
            showPageContainer('adminAppContainer');
            // Reset to default page
           // showAdminPage('dashboardPage', document.querySelector('#adminAppContainer .sidebar-link'));
        } else if (username === 'john.davis') {
            showPageContainer('patientAppContainer');
            // Reset to default page
            showPatientPage('patientPortalPage', document.querySelector('#patientAppContainer .sidebar-link'));
        }
        
        // Clear form
        document.getElementById('loginForm').reset();
    } else {
        loginError.classList.remove('hidden');
    }
})
function logout() {
    showPageContainer('loginPage');

// --- Modals --
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Add event listener to close modals when clicking on the backdrop
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', () => closeModal(modal.id));
})
// --- Font Size Controls --
function updateFontSize() {
    document.documentElement.style.fontSize = currentFontSize + 'px';
}

function increaseFont() {
    if (currentFontSize < 20) { // Max 20px
        currentFontSize += 1;
        updateFontSize();
    }
}
function decreaseFont() {
    if (currentFontSize > 12) { // Min 12px
        currentFontSize -= 1;
        updateFontSize();
    }
}

function resetFont() {
    currentFontSize = 16; // Default
    updateFontSize();
}
// Initialize the first page
showPageContainer('loginPage')}
