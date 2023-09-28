import { derived, writable } from "svelte/store";
	import Announcements from '../Widgets/Announcements.svelte';
	import Calendar from '../Widgets/Calendar.svelte';
	import Chats from '../Widgets/Chats.svelte';
	import Courses from '../Widgets/Courses.svelte';
	import Grades from '../Widgets/Grades.svelte';
	import Todo from '../Widgets/Todo.svelte';
	import Profile from '../Widgets/Profile.svelte';

export const col1EditToggle = writable(false);
export const col2EditToggle = writable(false);
export const col3EditToggle = writable(false);

export const toggleColEdit = (col: number, toggle: boolean) => {
    if (col === 1) {
        col1EditToggle.update((edit: boolean) => {
            return toggle;
        });
    }
    if (col === 2) {
        col2EditToggle.update((edit: boolean) => {
            return toggle;
        });

    }

    if (col === 3) {
        col3EditToggle.update((edit: boolean) => {
            return toggle;
        });

    }
}

export const getColEditToggle = derived([col1EditToggle, col2EditToggle, col3EditToggle], ([$col1EditToggle, $col2EditToggle, $col3EditToggle]) => {
    return (col: number) => {
        if (col === 1) {
            return $col1EditToggle;
        }
        if (col === 2) {
            return $col2EditToggle;
        }
        if (col === 3) {
            return $col3EditToggle;
        }
    }
});


export const showWidgetList = writable(false);

export const selectedCol = writable('NONE');

export const widgetClicked = writable(false);

export const ANNONUCEMENTS = 1;
export const CALENDAR = 2;
export const CHATS = 3;
export const COURSES = 4;
export const GRADES = 5;
export const TODO = 6;
export const PROFILE = 7;

export const widgetNames = {
    1: "Announcements",
    2: "Calendar",
    3: "Chats",
    4: "Courses",
    5: "Grades",
    6: "Todo",
    7: "Profile"
};

export const Col1 = 1;
export const Col2 = 2;
export const Col3 = 4;

export const Widgets = writable(746130);

const _validateColWidgets = (col: number, widgets: number[]) => {

    if (col < 1 || col > 3) {
        throw new Error("Invalid column number");
    }

    if (widgets.length < 1 || widgets.length > 2) {
        throw new Error("Invalid number of widgets");
    }

    widgets.forEach(widget => {
        if (widget < 1 || widget > 7) {
            throw new Error("Invalid widget number");
        }
    });
}

export function setCol(col: number, ...widgets: number[]) {
    _validateColWidgets(col, widgets);
    Widgets.update(
        (layout: number) => {
            switch (col) {
                case 1:
                    const rem = layout % 10000;
                    return widgets.length === 2 ?
                        (widgets[0] * 10 + widgets[1]) * 10000 + rem :
                        widgets[0] * 100000 + rem;
                case 2:
                    const rem2 = Math.floor(layout / 10000) * 10000 + layout % 100;
                    return widgets.length === 2 ?
                        rem2 + (widgets[0] * 10 + widgets[1]) * 100 :
                        rem2 + widgets[0] * 1000;
                case 3:
                    const rem3 = Math.floor(layout / 100) * 100;
                    return widgets.length === 2 ?
                        rem3 + (widgets[0] * 10 + widgets[1]) :
                        rem3 + widgets[0] * 10;
                default:
                    return layout;
            }
        });
}

export function changeCol(col: number, full: boolean) {
    Widgets.update((layout: number) => {
        if (col < 1 || col > 3) {
            throw new Error("Invalid column number");
        }
        const firstWidget = Math.floor(_getCol(layout, col) / 10);
        if (full) {
            if (_isColFull(layout, col)) return layout;
            layout = _setCol(layout, col, firstWidget);

        } else {
            layout = _setCol(layout, col, firstWidget, 1);
        }
        return layout;
    });
}

export const isColFull = derived(Widgets, $layout => {
    return (col: number) => {
        if (col < 1 || col > 3) {
            throw new Error("Invalid column number");
        }
        switch (col) {
            case 1:
                return Math.floor($layout / 10000) % 10 === 0;
            case 2:
                return Math.floor($layout / 100) % 10 === 0;
            case 3:
                return $layout % 10 === 0;
        }
    };
});

export const getColWidgets = derived(Widgets, $layout => {

    return (col: number) => {
        const currentCol = _getCol($layout, col);
        const firstWidget = Math.floor(currentCol / 10);
        const secondWidget = currentCol % 10;

        return {
            firstWidget,
            secondWidget
        };
    }
});

const _setCol = (layout: number, col: number, ...widgets: number[]) => {
    _validateColWidgets(col, widgets);
    switch (col) {
        case 1:
            const rem = layout % 10000;
            return widgets.length === 2 ?
                (widgets[0] * 10 + widgets[1]) * 10000 + rem :
                widgets[0] * 100000 + rem;
        case 2:
            const rem2 = Math.floor(layout / 10000) * 10000 + layout % 100;
            return widgets.length === 2 ?
                rem2 + (widgets[0] * 10 + widgets[1]) * 100 :
                rem2 + widgets[0] * 1000;
        case 3:
            const rem3 = Math.floor(layout / 100) * 100;
            return widgets.length === 2 ?
                rem3 + (widgets[0] * 10 + widgets[1]) :
                rem3 + widgets[0] * 10;
        default:
            return layout;
    }
};

export const _getCol = (layout: number, col: number) => {
    switch (col) {
        case 1: return Math.floor(layout / 10000);
        case 2: return Math.floor(layout / 100) % 100;
        case 3: return layout % 100;
        default: return 0;
    }
}

const _isColFull = (layout: number, col: number) => {
    switch (col) {
        case 1: return Math.floor(layout / 10000) % 10 === 0;
        case 2: return Math.floor(layout / 100) % 10 === 0;
        case 3: return layout % 10 === 0;
    }
};


export const getHeading = (widget: number) => {
    switch (widget) {
        case 1:
            return 'Announcements';
        case 2:
            return 'Calendar';
        case 3:
            return 'Chats';
        case 4:
            return 'Courses';
        case 5:
            return 'Grades';
        case 6:
            return 'Todo';
        case 7:
            return 'Profile';
        default:
            return 'Error';
    }
};

export const getBody = (widget: number) => {
    switch (widget) {
        case 1:
            return Announcements;
        case 2:
            return Calendar;
        case 3:
            return Chats;
        case 4:
            return Courses;
        case 5:
            return Grades;
        case 6:
            return Todo;
        case 7:
            return Profile;
    }
};