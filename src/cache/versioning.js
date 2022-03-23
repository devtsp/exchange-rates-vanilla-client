export const handleCacheVersion = () => {
	const date = Date.now();
	if (!localStorage.getItem('exchange_rates_current_cache')) {
		localStorage.setItem('exchange_rates_current_cache', date);
	} else {
		if (
			localStorage.getItem('exchange_rates_current_cache') <=
			date - 86400000
		) {
			caches.delete(localStorage.getItem('exchange_rates_current_cache'));
			localStorage.removeItem('exchange_rates_current_cache');
			localStorage.setItem('exchange_rates_current_cache', date);
		}
	}
};
