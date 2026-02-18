// Global state
let members = JSON.parse(localStorage.getItem('badmintonMembers')) || [];
let activities = JSON.parse(localStorage.getItem('badmintonActivities')) || [];
let bills = JSON.parse(localStorage.getItem('badmintonBills')) || [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    renderMembers();
    renderActivities();
    renderBills();
    setupTabNavigation();
});

// Tab navigation
function setupTabNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Update stats
function updateStats() {
    document.getElementById('memberCount').textContent = `${members.length} Members`;
    document.getElementById('activityCount').textContent = `${activities.length} Activities`;
}

// Save to localStorage
function saveData() {
    localStorage.setItem('badmintonMembers', JSON.stringify(members));
    localStorage.setItem('badmintonActivities', JSON.stringify(activities));
    localStorage.setItem('badmintonBills', JSON.stringify(bills));
}

// Modal functions
function openAddMemberModal() {
    document.getElementById('memberModal').style.display = 'block';
}

function openAddActivityModal() {
    document.getElementById('activityModal').style.display = 'block';
    populateParticipantsList();
}

function openBillModal() {
    document.getElementById('billModal').style.display = 'block';
    populateBillParticipantsList();
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    // Reset forms
    if (modalId === 'memberModal') {
        document.getElementById('memberForm').reset();
        document.getElementById('memberPhotoPreview').innerHTML = '';
    } else if (modalId === 'activityModal') {
        document.getElementById('activityForm').reset();
    } else if (modalId === 'billModal') {
        document.getElementById('billForm').reset();
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Preview image
function previewImage(input, previewId) {
    const preview = document.getElementById(previewId);
    preview.innerHTML = '';
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '150px';
