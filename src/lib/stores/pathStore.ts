import { writable } from "svelte/store";


export const currentPathModified = writable("");
export const currentPath = writable("");


export function truncatePath(path: string, index: number) {
    // Split the path into its components
    const parts = path.split('/');

    // Remove empty strings caused by leading/trailing slashes
    const filteredParts = parts.filter(Boolean);

    // Slice the array up to the given index
    const truncated = filteredParts.slice(0, index + 1);

    // Join it back into a string
    return '/' + truncated.join('/');
}