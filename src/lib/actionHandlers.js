export const Operations = Object.freeze({
	CREATE: 1 << 0,
	READ: 1 << 1,
	UPDATE: 1 << 2,
	DELETE: 1 << 3,
	READ_SELF: 1 << 4,
	CREATE_SELF: 1 << 5,
	UPDATE_SELF: 1 << 6,
	DELETE_SELF: 1 << 7
});

// Check if a specific permission is valid
/**
 * @param {number} permissionNumber
 * @param {number} permission
 */
export function hasPermission(permissionNumber, permission) {
	return (permissionNumber & permission) !== 0;
}

// Set one or multiple permissions
/**
 * @param {number} permissionNumber
 * @param {Operations[]} permissions
 */
export function setPermission(permissionNumber, ...permissions) {
	for (const permission of permissions) {
		permissionNumber |= permission;
	}
	return permissionNumber;
}

// Revoke one or multiple permissions
/**
 * @param {number} permissionNumber
 * @param {Operations[]} permissions
 */
export function revokePermission(permissionNumber, ...permissions) {
	for (const permission of permissions) {
		permissionNumber &= ~permission;
	}
	return permissionNumber;
}
