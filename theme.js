/* Travel Adventures: accessible dark/light theme using vanilla JavaScript. */
(function () {
    'use strict';

    // Use one storage key across all four HTML pages.
    const storageKey = 'website_theme';
    const toggleButton = document.querySelector('#theme_toggler');

    // Read the saved preference safely; some browsers disable localStorage.
    function readSavedTheme() {
        try { return localStorage.getItem(storageKey); }
        catch (error) { return null; }
    }

    // Update the CSS class, button text, and accessibility state together.
    function applyTheme(theme) {
        const isDark = theme === 'dark_mode';
        document.body.classList.toggle('dark_mode', isDark);
        document.documentElement.classList.remove('theme-preload-dark');
        if (toggleButton) {
            toggleButton.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
            toggleButton.setAttribute('aria-pressed', String(isDark));
            toggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    // Restore the preference whenever a page loads or refreshes.
    applyTheme(readSavedTheme());

    // Switch between the themes and persist the choice.
    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            const nextTheme = document.body.classList.contains('dark_mode') ? 'default' : 'dark_mode';
            applyTheme(nextTheme);
            try { localStorage.setItem(storageKey, nextTheme); }
            catch (error) { /* The toggle still works for this page. */ }
        });
    }

    // Synchronize theme changes across tabs of the same website.
    window.addEventListener('storage', function (event) {
        if (event.key === storageKey || event.key === null) {
            applyTheme(readSavedTheme());
        }
    });
}());
