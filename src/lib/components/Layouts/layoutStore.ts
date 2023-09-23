import { derived, writable } from "svelte/store";

export const col1EditToggle = writable(false);
export const col2EditToggle = writable(false);
export const col3EditToggle = writable(false);

export const showWidgetList = writable(false);


export const dragWidget = writable(0);

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
    6: "To Do",
    7: "Profile"
};

export const Layout = writable(203457);

const _validateColWidgets = (col: number, widgets: number[]) => {

    console.log(col, widgets);

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
    Layout.update(
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
    Layout.update((layout: number) => {
        if (col < 1 || col > 3) {
            throw new Error("Invalid column number");
        }


        const firstWidget = Math.floor(_getCol(layout, col) / 10);
        console.log(firstWidget);

        if (full) {
            if (_isColFull(layout, col)) return layout;
            console.log(layout);

            layout = _setCol(layout, col, firstWidget);

        } else {
            console.log(layout);
            layout = _setCol(layout, col, firstWidget, 1);
        }
        console.log(layout);
        return layout;
    });
}

/**
 * isColFull takes in a column number and returns a boolean value denoting if the column is full ()
 */
export const isColFull = derived(Layout, $layout => {
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


/**
 * 
 * @param layout takes in a layout number
 * @param col this is the column number that the widget is being set to min: 1 max value: 3
 * @param widgets widgets that are being set to the column max widget number is: 1 and min: 7
 * @returns a modified layout number
 */
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

const _getCol = (layout: number, col: number) => {
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
