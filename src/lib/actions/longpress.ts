import { showWidgetList, editToggledWidget } from "../components/Layouts/layoutStore";
import { get } from 'svelte/store'

type LongPressOptions = {
    colNumber: number,
    widgetPos?: number
}

export function longPressAction(targetEl: HTMLElement, options: LongPressOptions) {
    let timer: NodeJS.Timeout;
    options.widgetPos = options.widgetPos || 0;
    const handleMouseDown = () => {
        timer = setTimeout(() => {
            editToggledWidget.update((state) => state = (options.colNumber * 10) + options.widgetPos!);
        }, 800);
    }


    const handleMouseUp = () => clearTimeout(timer);
    const handleMouseLeave = () => clearTimeout(timer);

    const handleClickOutSide = (event: MouseEvent) => {

        const clickedEl = event.target as HTMLElement;
        if (clickedEl.id === 'widget-list' || clickedEl.id === 'widget-options' || (clickedEl.id === 'widget' && get(editToggledWidget) === 0)) {
            return;
        }


        if (targetEl && !targetEl.contains(event.target as Node)) {
            editToggledWidget.update((state) => state = -1);
            showWidgetList.update((state) => state = false);
        }
    };

    targetEl.addEventListener('mousedown', handleMouseDown);
    targetEl.addEventListener('mouseup', handleMouseUp);
    targetEl.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('mousedown', handleClickOutSide);

    return {
        destroy() {
            targetEl.removeEventListener('mousedown', handleMouseDown);
            targetEl.removeEventListener('mouseup', handleMouseUp);
            targetEl.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mousedown', handleClickOutSide);
            document.removeEventListener('contextmenu', (e) => e.preventDefault());
        }
    }

}