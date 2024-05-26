export function numberFormatter(number: number) {
	const f = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
	return f.format(number);
}
