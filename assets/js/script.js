document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const langSwitcher = document.getElementById('languageBtn');
    const translatableElements = document.querySelectorAll('[data-en]');
    
    // Set default language to English
    let currentLanguage = 'en';
    
    // Function to switch language
    function switchLanguage() {
        if (currentLanguage === 'en') {
            // Switch to Spanish
            translatableElements.forEach(el => {
                el.textContent = el.getAttribute('data-es');
            });
            langSwitcher.textContent = 'English';
            currentLanguage = 'es';
        } else {
            // Switch to English
            translatableElements.forEach(el => {
                el.textContent = el.getAttribute('data-en');
            });
            langSwitcher.textContent = 'Español';
            currentLanguage = 'en';
        }
    }
    
    // Event listener to language button
    langSwitcher.addEventListener('click', switchLanguage);
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

