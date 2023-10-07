/**
 * @vamshinenu
 * @param {HTMLElement} element
 * @returns
 * @description: This action creates a basic tooltip with a title that appears after a delay when the user hovers over an element.
 */
export function tooltip(element, { title = '' }) {
	/**
	 * @type {HTMLDivElement}
	 */
	let div;

	let tooltipActive = false;
	/**
	 * @type {string | number | NodeJS.Timeout | undefined}
	 */
	let tooltipTimeout;

	function mouseOver() {
		if (tooltipTimeout) clearTimeout(tooltipTimeout);
		tooltipTimeout = setTimeout(() => {
			if (tooltipActive) return;
			tooltipActive = true;
			div = document.createElement('div');
			div.className = 'tooltip';
			div.textContent = title;
			const rect = element.getBoundingClientRect();
			div.style.top = `${rect.top + window.scrollY - 34}px`;
			document.body.appendChild(div);
			const centeredLeft = rect.left + window.scrollX + rect.width / 2 - div.clientWidth / 2;
			div.style.left = `${centeredLeft}px`;
		}, 500);
	}

	function mouseLeave() {
		if (tooltipTimeout) clearTimeout(tooltipTimeout);
		tooltipActive = false; // Clear the flag
		try {
			document.body.removeChild(div);
		} catch (e) {
			console.log('Error removing tooltip div', e);
		}
	}

	element.addEventListener('mouseover', mouseOver);
	element.addEventListener('mouseleave', mouseLeave);

	return {
		destroy() {
			element.removeEventListener('mouseover', mouseOver);
			element.removeEventListener('mouseleave', mouseLeave);
		}
	};
}
