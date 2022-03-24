export const renderPairConversionCard = conversionResults => {
	const $conversionResultCard = document.querySelector('#conversion-result');
	const { base_code, target_code, conversion_result } = conversionResults;
	const amount = document.querySelector('#pair-conversion form').amount.value;
	$conversionResultCard.children[0].innerText = `${amount} ${base_code} = `;
	$conversionResultCard.children[2].innerText = ` ${conversion_result} ${target_code}`;
	$conversionResultCard.classList.remove('visually-hidden');
};
