        const MOCK_USERS = {
            "admin": { 
                password: "admin123", 
                role: "admin", 
                name: "Admin User", 
                img: "https://placehold.co/128x128/E0E7FF/4F46E5?text=A" 
            },
            "dr.williams": { 
                password: "doctor123", 
                role: "doctor", 
                name: "Dr. Williams", 
                img: "https://placehold.co/128x128/D1FAE5/065F46?text=W" 
            },
            "nurse.brown": { 
                password: "staff123", 
                role: "staff", 
                name: "Nurse Brown", 
                img: "https://placehold.co/128x128/FEF3C7/92400E?text=B" 
            },
            "john.davis": { 
                password: "patient123", 
                role: "patient", 
                name: "John Davis", 
                img: "https://placehold.co/128x128/DBEAFE/1E40AF?text=J" 
            }
        };

        // --- Login Logic ---
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const loginError = document.getElementById('loginError');
            
            const user = MOCK_USERS[username];
            
            if (user && user.password === password) {
                loginError.classList.add('hidden');
                document.getElementById('loginPage').classList.remove('active');
                
                // Show the correct dashboard based on role
                if (user.role === 'admin' || user.role === 'staff' || user.role === 'doctor') {
                    setupAdminDashboard(user);
                    document.getElementById('adminAppContainer').classList.add('active');
                } else {
                    // Handle patient login (not implemented in this scope)
                    alert('Patient dashboard is not yet implemented.');
                    // For demo, just log them out
                    logout();
                }
            } else {
                loginError.classList.remove('hidden');
            }
        });

        function setupAdminDashboard(user) {
            // Update sidebar profile
            document.getElementById('sidebarUserName').textContent = user.name;
            document.getElementById('sidebarUserRole').textContent = user.role;
            document.getElementById('sidebarUserImage').src = user.img;
            
            // TODO: Hide/show sidebar links based on role
            // Example:
            // if (user.role === 'staff') {
            //     document.querySelector('a[href*="adminPanelPage"]').parentElement.style.display = 'none';
            // }
        }

        function logout() {
            document.getElementById('adminAppContainer').classList.remove('active');
            // Hide other potential dashboards (patient, doctor)
            document.getElementById('loginPage').classList.add('active');
            
            // Reset login form
            document.getElementById('loginForm').reset();
            document.getElementById('loginError').classList.add('hidden');
            
            // Reset to default dashboard page
            showAdminPage('dashboardPage', document.querySelector('.sidebar-link'));
        }

        // --- Admin Page Navigation ---
        function showAdminPage(pageId, linkElement) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Deactivate all sidebar links
            document.querySelectorAll('.sidebar-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Show the target page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // Activate the clicked link
            if (linkElement) {
                linkElement.classList.add('active');
            }
        }

        // --- Font Size Controls ---
        let current_FontSize = 16;
        const htmlElement = document.documentElement;

        function updateFontSize() {
            htmlElement.style.fontSize = `${currentFontSize}px`;
        }
        function decreaseFont() {
            if (currentFontSize > 12) {
                currentFontSize -= 1;
                updateFontSize();
            }
        }
        function increaseFont() {
            if (currentFontSize < 20) {
                currentFontSize += 1;
                updateFontSize();
            }
        }
        function resetFont() {
            currentFontSize = 16;
            updateFontSize();
        }

        // --- Modal Controls ---
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

        // --- Staff Page Search Filter ---
        function filterStaff(searchText) {
            const searchTerm = searchText.toLowerCase();
            const staffCards = document.querySelectorAll('#staffGrid .staff-card');
            
            staffCards.forEach(card => {
                const name = card.dataset.name.toLowerCase();
                const role = card.dataset.role.toLowerCase();
                const department = card.dataset.department.toLowerCase();
                
                if (name.includes(searchTerm) || role.includes(searchTerm) || department.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }


                const demoUsers = {
            "admin": "admin123",
            "dr.williams": "doctor123",
            "nurse.brown": "staff123",
            "john.davis": "patient123"
        };
        
        let currentAdminPage = 'dashboardPage';
        let currentPatientPage = 'patientPortalPage';
        let currentFontSize = 16; // Default font size in px

        // --- Page Navigation ---

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
            currentAdminPage = pageId;

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
            currentPatientPage = pageId;

            // Update sidebar active link
            if (linkElement) {
                document.querySelectorAll('#patientAppContainer .sidebar-link').forEach(link => {
                    link.classList.remove('active');
                });
                linkElement.classList.add('active');
            }
        }

        // --- Authentication ---

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const loginError = document.getElementById('loginError');

            if (demoUsers[username] && demoUsers[username] === password) {
                loginError.classList.add('hidden');
                
                // Route to the correct dashboard
                if (username === 'admin' || username === 'dr.williams' || username === 'nurse.brown') {
                    showPageContainer('adminAppContainer');
                    // Reset to default page
                    showAdminPage('dashboardPage', document.querySelector('#adminAppContainer .sidebar-link'));
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
        });

        function logout() {
            showPageContainer('loginPage');
        }

        // --- Modals ---

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
        });

        // --- Font Size Controls ---

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
        showPageContainer('loginPage');
