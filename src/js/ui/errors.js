export const renderError = error => {
	document.querySelectorAll('.error').forEach(errorMessage => {
		errorMessage.innerText = error.message;
		errorMessage.classList.remove('d-none');
	});
};

export const resetError = () => {
	document.querySelectorAll('.error').forEach(errorMessage => {
		errorMessage.innerText = '';
		errorMessage.classList.add('d-none');
	});
};
