import { writable } from "svelte/store";


export const currentPathModified = writable("");
export const currentPath = writable("");

/**
 * @param {string} currentPath
 * @param {number} index
 */
export function truncatePath(currentPath, index) {
    let indexModified = index;
    let length = 0;

    currentPathModified.subscribe(state => {
        length = state.split('/').filter((/** @type {string} */ item) => item !== '').length
    })

    // Extract the base URL and query parameters
    const [base, params] = currentPath.split("?");
    /**
     * @type {string[] | void[]}
     */
    let paramsSplit = [];
    let i = 0;
    let baseSplit = base.split("/");


    if (params) {
        console.log("params", params);
        indexModified = length - index - 1;
        paramsSplit = params.split("/");
        while (i < indexModified) {
            if (paramsSplit.length > 0) {
                paramsSplit.pop();
            } else {
                baseSplit.pop();
            }
            i++;
        }
        let newBase = baseSplit.join("/");
        let newParams = paramsSplit.join("/");

        if (newParams !== "") {
            newParams = "?" + newParams;
        }
        let newCurrentPath = newBase + newParams;
        return newCurrentPath;
    }

    // Split the path into its components
    const parts = currentPath.split('/');

    // Remove empty strings caused by leading/trailing slashes
    const filteredParts = parts.filter(Boolean);


    // Slice the array up to the given index
    const truncated = filteredParts.slice(0, index + 1);

    // Join it back into a string
    return '/' + truncated.join('/');
}


/**
 * @param {string | URL} url
 */
export function reformatURL(url) {
    // Create a URL object from the given URL string
    const urlObj = new URL(url);
    const params = urlObj.searchParams.get('path')
    if (params !== null) {
        // Extract the 'path' query parameter and decode it
        let pathParam = decodeURIComponent(params);
        // Remove the query parameters from the URL
        urlObj.search = '';

        // Append the path parameter to the main URL path only if it exists and is not the string "null" or empty
        if (pathParam && pathParam !== 'null') {
            urlObj.pathname += `/${pathParam}`;
        }
    }

    // Return the formatted URL, removing the domain part and also removed  any %20 which is a space.
    return decodeURIComponent(urlObj.pathname);
}

/**
 * @param {string | URL} url
 */
export function omitDomainFromUrl(url) {
    const urlObj = new URL(url);
    return urlObj.pathname + urlObj.search + urlObj.hash;
}
