// Wait for the DOM elements to load before executing the logic
document.addEventListener('DOMContentLoaded', function () {
    
    // hamburger menu logic
    const hamMenu = document.querySelector('#hamMenu');
    const navbarHam = document.querySelector('#navbarHam');

    hamMenu.addEventListener('click', () => {
        hamMenu.classList.toggle('open');  // This is for animating the hamMenu button to an 'X'
        if (navbarHam.style.display === "none" || !navbarHam.style.display) {
            navbarHam.style.display = "flex";  // Show the menu
            setTimeout(() => {
                navbarHam.style.transform = "translateX(0%)";
            }, 10);  // Delay to allow display change before transform triggers
        } else {
            navbarHam.style.transform = "translateX(100%)";
            setTimeout(() => {
                navbarHam.style.display = "none";  // Hide after animation completes
            }, 300); // Match the transition time in CSS
        }
    });

    // Get elements for the dropdown in the regular navbar and hamburger menu
    const globeBtn = document.getElementById('globeBtn');
    const globeBtnHam = document.getElementById('globeBtnHam');
    const dropdown = document.getElementById('languageDropdown');
    const dropdownHam = document.getElementById('languageDropdownHam');
    const translatableElements = document.querySelectorAll('[data-en]');

    let currentLanguage = 'en'; // Default language
    let isDropdownOpen = false; // Track visibility for the regular menu
    let isDropdownOpenHam = false; // Track visibility for the hamburger menu

    // Function to toggle dropdown visibility
    function toggleDropdown(dropdownElement, isHamMenu = false) {
        if (isHamMenu) {
            isDropdownOpenHam = !isDropdownOpenHam;
            dropdownElement.classList.toggle('hiddenHam'); // Just toggle it
        } else {
            isDropdownOpen = !isDropdownOpen;
            dropdownElement.classList.toggle('hidden');
        }
    }

    // Regular navbar dropdown
    globeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        toggleDropdown(dropdown);
    });

    // Hamburger menu dropdown
    globeBtnHam.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(dropdownHam, true);
    });

    // Handle language selection for both dropdowns
    document.querySelectorAll('.dropdown-item, .dropdown-item-Ham').forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedLang = e.target.dataset.lang;
    
            if (selectedLang !== currentLanguage) {
                translatableElements.forEach(el => {
                    if (el.tagName.toLowerCase() === 'img') {
                        el.setAttribute('alt', el.getAttribute(`data-${selectedLang}`));
                    } else {
                        el.textContent = el.getAttribute(`data-${selectedLang}`);
                    }
                });

                // Reset h1 animation
                resetSlideInTransition();

                // Update the globe button texts
                globeBtn.textContent = selectedLang === 'en' ? '🌐 Español' : '🌐 English';
                globeBtnHam.textContent = selectedLang === 'en' ? '🌐 Español' : '🌐 English';

                currentLanguage = selectedLang;
            }

            // Instead of directly adding classes, use the toggle function to close properly
            if (isDropdownOpen) {
                toggleDropdown(dropdown);
            }
            if (isDropdownOpenHam) {
                toggleDropdown(dropdownHam, true);
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target) && event.target !== globeBtn && isDropdownOpen) {
            dropdown.classList.add('hidden');
            isDropdownOpen = false;
        }
        if (!dropdownHam.contains(event.target) && event.target !== globeBtnHam && isDropdownOpenHam) {
            dropdownHam.classList.add('hiddenHam');
            isDropdownOpenHam = false;
        }
    });    
    
    // Prevent clicks inside dropdowns from closing them
    dropdown.addEventListener('click', (event) => event.stopPropagation());
    dropdownHam.addEventListener('click', (event) => event.stopPropagation());

    // Function to reset the h1 animation
    function resetSlideInTransition() {
        const h1 = document.querySelector('h1');
        
        if (h1) {
            h1.style.animation = 'none';  // Remove animation temporarily
            void h1.offsetWidth;  // Force a reflow/repaint
            h1.style.animation = 'slide-in 1s ease-out forwards';  // Reapply animation
        }
    }

    // ! Get the email address element and the copy icon
    const emailAddress = document.getElementById('emailAddress').textContent;
    const copyIcon = document.getElementById('copyIcon');

    // Function to copy the email address
    function copyEmailToClipboard() {
        // Use the Clipboard API to copy text
        navigator.clipboard.writeText(emailAddress).then(function() {
            // Show feedback to the user (adjust message based on language)
            if (currentLanguage === 'en') {
                alert('Email copied to clipboard!');
            } else {
                alert('¡Correo electrónico copiado!');
            }
        }).catch(function(error) {
            console.error('Error copying text: ', error);
        });
    }

    // Add click event listener to the copy icon
    copyIcon.addEventListener('click', copyEmailToClipboard);

    // ! Preview PDF file (CV)
    const resumeDiv = document.getElementById('resume');
    const resumeDivHam = document.getElementById('resumeHam');

    resumeDiv.addEventListener('click', function () {
        // Open the PDF in a new tab
        window.open('./assets/documents/CV - Marcos Munoz.pdf', '_blank');
    });

    resumeDivHam.addEventListener('click', function () {
        // Open the PDF in a new tab
        window.open('./assets/documents/CV - Marcos Munoz.pdf', '_blank');
    });

    // Slow scroll down when clicking the anchor elements
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        });
    });

});
