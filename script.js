const passwordLengthInput = document.getElementById('password-length');
const lengthDisplay = document.getElementById('length-display');
const includeUppercase = document.getElementById('include-uppercase');
const includeLowercase = document.getElementById('include-lowercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');
const customSymbolsInput = document.getElementById('custom-symbols');
const generatePasswordBtn = document.getElementById('generate-password');
const passwordOutput = document.getElementById('password-output');
const copyPasswordBtn = document.getElementById('copy-password');
const strengthSuggestions = document.getElementById('strength-suggestions');
const strengthBar = document.getElementById('strength-bar');
const passwordList = document.getElementById('password-list');
const clearHistoryBtn = document.getElementById('clear-history');
const languageSelect = document.getElementById('language-select');
const themeToggle = document.getElementById('theme-toggle');

let passwordHistory = [];

// Handle password length slider
passwordLengthInput.addEventListener('input', () => {
    lengthDisplay.textContent = passwordLengthInput.value;
});

// Generate password
generatePasswordBtn.addEventListener('click', () => {
    const length = passwordLengthInput.value;
    const useUppercase = includeUppercase.checked;
    const useLowercase = includeLowercase.checked;
    const useNumbers = includeNumbers.checked;
    const useSymbols = includeSymbols.checked;
    const customSymbols = customSymbolsInput.value;
    const password = generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols, customSymbols);

    passwordOutput.value = password;
    updateStrengthIndicator(password);
    displayPasswordSuggestions(password);
    saveToHistory(password);
});

// Password generation logic
function generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols, customSymbols) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|]}[{';

    let charSet = '';

    if (useUppercase) charSet += uppercaseChars;
    if (useLowercase) charSet += lowercaseChars;
    if (useNumbers) charSet += numberChars;
    if (useSymbols) charSet += symbolChars;
    if (customSymbols) charSet += customSymbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    return password;
}

// Password strength indicator
function updateStrengthIndicator(password) {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (password.length >= 12) strength++;

    strengthBar.value = strength;
}

// Password suggestions
function displayPasswordSuggestions(password) {
    let suggestions = [];
    if (password.length < 12) suggestions.push('Increase length to at least 12 characters.');
    if (!/[A-Z]/.test(password)) suggestions.push('Add uppercase letters.');
    if (!/[a-z]/.test(password)) suggestions.push('Add lowercase letters.');
    if (!/[0-9]/.test(password)) suggestions.push('Include numbers.');
    if (!/[^A-Za-z0-9]/.test(password)) suggestions.push('Include symbols.');

    if (suggestions.length > 0) {
        strengthSuggestions.classList.remove('hidden');
        strengthSuggestions.innerHTML = `<ul><li>${suggestions.join('</li><li>')}</li></ul>`;
    } else {
        strengthSuggestions.classList.add('hidden');
    }
}

// Save password to history
function saveToHistory(password) {
    passwordHistory.push(password);
    const listItem = document.createElement('li');
    listItem.textContent = password;
    passwordList.appendChild(listItem);
}

// Clear history
clearHistoryBtn.addEventListener('click', () => {
    passwordHistory = [];
    passwordList.innerHTML = '';
});

// Language selection
const translations = {
    en: {
        title: 'Password Generator',
        'length-label': 'Password Length:',
        'include-uppercase': 'Include Uppercase',
        'include-lowercase': 'Include Lowercase',
        'include-numbers': 'Include Numbers',
        'include-symbols': 'Include Symbols',
        'custom-symbols': 'Custom Symbols:',
        'generate-btn': 'Generate Password',
        'generated-password': 'Generated Password:',
        'copy-btn': 'Copy',
        'password-history': 'Password History:',
        'clear-history-btn': 'Clear History',
        'toggle-theme': 'Toggle Dark Mode',
        'lang-en': 'English',
        'lang-es': 'Español',
        'lang-ar': 'العربية'
    },
    es: {
        title: 'Generador de Contraseñas',
        'length-label': 'Longitud de la Contraseña:',
        'include-uppercase': 'Incluir Mayúsculas',
        'include-lowercase': 'Incluir Minúsculas',
        'include-numbers': 'Incluir Números',
        'include-symbols': 'Incluir Símbolos',
        'custom-symbols': 'Símbolos Personalizados:',
        'generate-btn': 'Generar Contraseña',
        'generated-password': 'Contraseña Generada:',
        'copy-btn': 'Copiar',
        'password-history': 'Historial de Contraseñas:',
        'clear-history-btn': 'Borrar Historial',
        'toggle-theme': 'Cambiar Modo Oscuro',
        'lang-en': 'Inglés',
        'lang-es': 'Español',
        'lang-ar': 'العربية'
    },
    ar: {
        title: 'مولد كلمة السر',
        'length-label': 'طول كلمة السر:',
        'include-uppercase': 'تضمين الأحرف الكبيرة',
        'include-lowercase': 'تضمين الأحرف الصغيرة',
        'include-numbers': 'تضمين الأرقام',
        'include-symbols': 'تضمين الرموز',
        'custom-symbols': 'رموز مخصصة:',
        'generate-btn': 'إنشاء كلمة السر',
        'generated-password': 'كلمة السر المُنشأة:',
        'copy-btn': 'نسخ',
        'password-history': 'سجل كلمات السر:',
        'clear-history-btn': 'مسح السجل',
        'toggle-theme': 'تبديل الوضع الليلي',
        'lang-en': 'إنجليزي',
        'lang-es': 'إسباني',
        'lang-ar': 'العربية'
    }
};

function updateLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        el.textContent = translations[lang][key];
    });
}

languageSelect.addEventListener('change', () => {
    const selectedLang = languageSelect.value;
    updateLanguage(selectedLang);
});

// Dark/Light Mode Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
