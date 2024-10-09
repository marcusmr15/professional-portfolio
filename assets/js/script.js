//  Wait for the DOM elements to load before executing the logic
document.addEventListener('DOMContentLoaded', function () {
    // Get elements for language switcher
    const langSwitcher = document.getElementById('languageBtn');
    const translatableElements = document.querySelectorAll('[data-en]');
    
    // Set default language to English
    let currentLanguage = 'en';
    
    // Function to switch language
    function switchLanguage() {
        if (currentLanguage === 'en') {
            // Switch to Spanish
            translatableElements.forEach(el => {
                if (el.tagName.toLowerCase() === 'img') {
                    // If the element is an image, update the alt attribute
                    el.setAttribute('alt', el.getAttribute('data-es'));
                } else {
                    // Otherwise, update the text content
                    el.textContent = el.getAttribute('data-es');
                }
            });
            langSwitcher.textContent = '🌐 English';
            currentLanguage = 'es';
        } else {
            // Switch to English
            translatableElements.forEach(el => {
                if (el.tagName.toLowerCase() === 'img') {
                    // If the element is an image, update the alt attribute
                    el.setAttribute('alt', el.getAttribute('data-en'));
                } else {
                    // Otherwise, update the text content
                    el.textContent = el.getAttribute('data-en');
                }
            });
            langSwitcher.textContent = '🌐 Español';
            currentLanguage = 'en';
        }
    }
    
    // Event listener to language button
    langSwitcher.addEventListener('click', switchLanguage);


    // ! Get the email address element and the copy icon
    const emailAddress = document.getElementById('emailAddress').textContent;
    const copyIcon = document.getElementById('copyIcon');

    // Function to copy the email address
    function copyEmailToClipboard() {
        // Use the Clipboard API to copy text
        navigator.clipboard.writeText(emailAddress).then(function() {
            // Show feedback to the user (optional)
            alert('Email copied to clipboard!');
        }).catch(function(error) {
            console.error('Error copying text: ', error);
        });
    }

    // Add click event listener to the copy icon
    copyIcon.addEventListener('click', copyEmailToClipboard);


    // ! Preview PDF file (CV)
    const resumeDiv = document.getElementById('resume');

    resumeDiv.addEventListener('click', function () {
        // Open the PDF in a new tab
        window.open('./assets/CV - Marcos Muñoz (English).pdf', '_blank');
    });
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

