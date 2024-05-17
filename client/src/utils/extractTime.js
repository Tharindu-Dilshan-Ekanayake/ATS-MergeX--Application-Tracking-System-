export function extractTime(dateString) {
	const date = new Date(dateString);
	let hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	const period = date.getHours() >= 12 ? "PM" : "AM";

	// Convert to 12-hour format if necessary
	if (hours > 12) {
			hours -= 12;
	} else if (hours === 0) {
			hours = 12; // Special case for midnight (12 AM)
	}

	return `${hours}:${minutes} ${period}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}