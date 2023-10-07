import {
	ASSIGNMENTS,
	ASSIGNMENT_SUBMISSIONS,
	ATTENDANCE,
	CAN_MODIFY,
	COURSE_CONTENT,
	GRADES
} from '$lib/constants/course';
import { bool } from '$lib/constants/permissions';
import { clearPermission, hasPermission, setPermission } from './permissionHandler';

/**
 * @typedef {1 | 2 | 4 | 8} o
 * @typedef {16 | 32} Bool
 */

export default class CoursePermission {
	constructor(/**@type {number} */ perms) {
		this.perms = perms;
	}

	setAssignmentPerm(/**@type {o[]} */ ...perms) {
		for (const perm of perms) this.perms = setPermission(this.perms, ASSIGNMENTS, perm);
	}
	checkAssignmentPerm(/**@type {o}*/ perm) {
		return hasPermission(this.perms, ASSIGNMENTS, perm);
	}
	delAssignmentPerm(/**@type {o[]} */ ...perms) {
		for (const perm of perms) this.perms = clearPermission(this.perms, ASSIGNMENTS, perm);
	}

	setCanModifyPerm(/**@type {Bool} */ perm) {
		this.perms = setPermission(this.perms, CAN_MODIFY, perm);
	}
	CanModifyPerm() {
		return hasPermission(this.perms, CAN_MODIFY, bool.true);
	}

	setAssignmentSubmissionPerm(/**@type {o[]} */ ...perms) {
		for (const perm of perms) this.perms = setPermission(this.perms, ASSIGNMENT_SUBMISSIONS, perm);
	}
	checkAssignmentSubmissionPerm(/**@type {o}*/ perm) {
		return hasPermission(this.perms, ASSIGNMENT_SUBMISSIONS, perm);
	}
	delAssignmentSubmissionPerm(/**@type {o[]} */ ...perms) {
		for (const perm of perms)
			this.perms = clearPermission(this.perms, ASSIGNMENT_SUBMISSIONS, perm);
	}

	setAttendancePerm(/**@type {o[]} */ ...perms) {
		for (const perm of perms) this.perms = setPermission(this.perms, ATTENDANCE, perm);
	}
	checkAttendancePerm(/**@type {o}*/ perm) {
		return hasPermission(this.perms, ATTENDANCE, perm);
	}
	delAttendancePerm(/**@type {o[]} */ ...perms) {
		for (const perm of perms) this.perms = clearPermission(this.perms, ATTENDANCE, perm);
	}

	setCourseContentPerm(/**@type {o[]} */ ...perms) {
		for (const perm of perms) this.perms = setPermission(this.perms, COURSE_CONTENT, perm);
	}
	checkCourseContentPerm(/**@type {o}*/ perm) {
		return hasPermission(this.perms, COURSE_CONTENT, perm);
	}
	delCourseContentPerm(/**@type {o[]} */ ...perms) {
		for (const perm of perms) this.perms = clearPermission(this.perms, COURSE_CONTENT, perm);
	}

	setGradePerm(/**@type {o[]} */ ...perms) {
		for (const perm of perms) this.perms = setPermission(this.perms, GRADES, perm);
	}
	checkGradePerm(/**@type {o}*/ perm) {
		return hasPermission(this.perms, GRADES, perm);
	}
	delGradePerm(/**@type {o[]} */ ...perms) {
		for (const perm of perms) this.perms = clearPermission(this.perms, GRADES, perm);
	}
}
