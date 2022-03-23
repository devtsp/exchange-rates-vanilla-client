export const renderError = error => {
	const message =
		+error.message < 500
			? `Resource not found. Error ${error.message}`
			: `Internal server error. Error ${error.message}`;
	document.querySelectorAll('.error').forEach(errorMessage => {
		errorMessage.innerText = message;
	});
};

export const resetError = () => {
	document.querySelectorAll('.error').forEach(errorMessage => {
		errorMessage.innerText = '';
	});
};
