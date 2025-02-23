// Wait for the DOM elements to load before executing the logic
document.addEventListener('DOMContentLoaded', function () {
    
    // hamburger menu logic
    const hamMenu = document.querySelector('#hamMenu');
    const navbarHam = document.querySelector('#navbarHam');

    hamMenu.addEventListener('click', () => {
        hamMenu.classList.toggle('open');  // This is for animating the menu button
        navbarHam.classList.toggle('open'); // This makes the menu appear
    });

    // Get elements for the dropdown
    const globeBtn = document.getElementById('globeBtn');
    const globeBtnHam = document.getElementById('globeBtnHam');
    const dropdown = document.getElementById('languageDropdown');
    const translatableElements = document.querySelectorAll('[data-en]');

    let currentLanguage = 'en'; // Default language

    // Track dropdown visibility state
    let isDropdownOpen = false;

    // Toggle dropdown visibility
    globeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent this click from triggering the outside click listener
        isDropdownOpen = !isDropdownOpen;
        dropdown.classList.toggle('hidden', !isDropdownOpen);
    });

    globeBtnHam.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent this click from triggering the outside click listener
        isDropdownOpen = !isDropdownOpen;
        dropdown.classList.toggle('hidden', !isDropdownOpen);
    });

    // Handle language selection
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedLang = e.target.dataset.lang;

            // Trigger transition reset before updating content
            if (selectedLang !== currentLanguage) {
                resetSlideInTransition();

                // Switch language logic
                translatableElements.forEach(el => {
                    if (el.tagName.toLowerCase() === 'img') {
                        // If the element is an image, update the alt attribute
                        el.setAttribute('alt', el.getAttribute(`data-${selectedLang}`));
                    } else {
                        // Otherwise, update the text content
                        el.textContent = el.getAttribute(`data-${selectedLang}`);
                    }
                });

                // Update the globe button text to show the opposite language
                globeBtn.textContent = selectedLang === 'en' ? '🌐 Español' : '🌐 English';
                currentLanguage = selectedLang;
            }

            // Hide dropdown after selection
            dropdown.classList.add('hidden');
            isDropdownOpen = false;
        });
    });

    // Close dropdown when clicking outside of it
    document.addEventListener('click', () => {
        if (isDropdownOpen) {
            dropdown.classList.add('hidden');
            isDropdownOpen = false;
        }
    });

    // Prevent clicks inside the dropdown from closing it
    dropdown.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the document click event
    });

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

    resumeDivHam .addEventListener('click', function () {
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

    // Function to reset the slide-in transition
    function resetSlideInTransition() {
        const h1 = document.querySelector('h1');
        
        // Temporarily remove the animation
        h1.style.animation = 'none';
        
        // Force reflow/repaint so the browser registers the change
        void h1.offsetWidth;
        
        // Re-apply the animation
        h1.style.animation = 'slide-in 1s ease-out forwards';
    }
});
