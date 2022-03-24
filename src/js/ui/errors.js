export const renderError = error => {
	const message =
		+error.message < 500
			? `Error: ${error.message}`
			: `Error: ${error.message}`;
	document.querySelectorAll('.error').forEach(errorMessage => {
		errorMessage.innerText = message;
		errorMessage.classList.remove('d-none');
	});
};

export const resetError = () => {
	document.querySelectorAll('.error').forEach(errorMessage => {
		errorMessage.innerText = '';
		errorMessage.classList.add('d-none');
	});
};
