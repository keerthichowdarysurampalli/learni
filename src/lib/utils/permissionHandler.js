
/**
 * Function to set permissions
 * @param {number} permissions : permission number to be set
 * @param {number} entity : ATTENDANCE, COURSE_CONTENT, ASSIGNMENTS, ASSIGNMENT_SUBMISSIONS, GRADES
 * @param {number} operation : CREATE, READ, UPDATE, DELETE
 */
export function setPermission(permissions, entity, operation) {
    return permissions |= (operation << entity);
}

/**
 * Function to check permissions
 * @param {number} permissions : permission number to be checked
 * @param {number} entity : ATTENDANCE, COURSE_CONTENT, ASSIGNMENTS, ASSIGNMENT_SUBMISSIONS, GRADES
 * @param {number} operation : CREATE, READ, UPDATE, DELETE
 */
export function hasPermission(permissions, entity, operation) {
    return Boolean((permissions >> entity) & operation);
}
/**
 * Function to clear permissions
 * @param {number} permissions : permission number to be cleared
 * @param {number} entity : ATTENDANCE, COURSE_CONTENT, ASSIGNMENTS, ASSIGNMENT_SUBMISSIONS, GRADES
 * @param {number} operation : CREATE, READ, UPDATE, DELETE
 */
export function clearPermission(permissions, entity, operation) {
    return permissions &= ~(operation << entity);
}