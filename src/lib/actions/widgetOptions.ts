import { editToggledWidget, showWidgetList } from '$lib/components/Layouts/layoutStore';

type EditOptions = {
	colNumber: number;
	widgetPos?: number;
};

export function editLayout(targetEl: HTMLElement) {
	console.log('doing this');

	const updateEditToggledWidget = () => {
		console.log('doing this');
		editToggledWidget.update((state) => (state = 0));
		showWidgetList.update((state) => (state = true));
	};

	targetEl.addEventListener('click', updateEditToggledWidget);
	return {
		destroy() {
			targetEl.removeEventListener('click', updateEditToggledWidget);
		}
	};
}

export function editWidget(targetEl: HTMLElement, options: EditOptions) {
	options.widgetPos = options.widgetPos || 0;

	const updateEditToggledWidget = () => {
		console.log('doing this');

		editToggledWidget.update((state) => (state = options.colNumber * 10 + options.widgetPos!));
		showWidgetList.update((state) => (state = true));
	};

	targetEl.addEventListener('click', updateEditToggledWidget);

	const handleClickOutSide = (event: MouseEvent) => {
		const clickedEl = event.target as HTMLElement;

		console.log(clickedEl.id);

		console.log(clickedEl.id);

		if (targetEl && !targetEl.contains(event.target as Node)) {
			console.log('clicked outside');
			editToggledWidget.update((state) => (state = -1));
			showWidgetList.update((state) => (state = false));
		}
	};

	document.addEventListener('mousedown', handleClickOutSide);

	return {
		destroy() {
			targetEl.removeEventListener('click', updateEditToggledWidget);
			document.removeEventListener('mousedown', handleClickOutSide);
		}
	};
}
