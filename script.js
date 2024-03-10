const passwordLengthInput = document.getElementById('password-length');
const includeUppercaseCheckbox = document.getElementById('include-uppercase');
const includeLowercaseCheckbox = document.getElementById('include-lowercase');
const includeNumbersCheckbox = document.getElementById('include-numbers');
const includeSymbolsCheckbox = document.getElementById('include-symbols');
const generatePasswordButton = document.getElementById('generate-password');
const passwordOutput = document.getElementById('password-output');
const copyPasswordButton = document.getElementById('copy-password');
const passwordList = document.getElementById('password-list');

const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
const numberCharacters = '0123456789';
const symbolCharacters = '!@#$%^&*()_+~`|]}[{';

let passwordHistory = [];

function generatePassword() {
	let password = '';
	let characters = '';
	const passwordLength = passwordLengthInput.value;

	if (includeUppercaseCheckbox.checked) {
		characters += uppercaseCharacters;
	}

	if (includeLowercaseCheckbox.checked) {
		characters += lowercaseCharacters;
	}

	if (includeNumbersCheckbox.checked) {
		characters += numberCharacters;
	}

	if (includeSymbolsCheckbox.checked) {
		characters += symbolCharacters;
	}

	if (characters.length === 0) {
		alert('Please select at least one character type.');
		return;
	}

	for (let i = 0; i < passwordLength; i++) {
		password += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	passwordOutput.value = password;
	passwordHistory.push(password);
	updatePasswordHistory();
}

function updatePasswordHistory() {
	passwordList.innerHTML = '';
	passwordHistory.forEach((password, index) => {
		const listItem = document.createElement('li');
		listItem.textContent = `${index + 1}. ${password}`;
		passwordList.appendChild(listItem);
	});
}

function copyPassword() {
	passwordOutput.select();
	document.execCommand('copy');
	alert('Password copied to clipboard!');
}

generatePasswordButton.addEventListener('click', generatePassword);
copyPasswordButton.addEventListener('click', copyPassword);