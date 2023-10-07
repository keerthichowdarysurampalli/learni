export type Course = {
	_id: string;
	title: string;
	description: string;
	instructorIdList: string[];
	studentIdList: string[];
	moderatorIdList: string[];
	seats: number;
	seatsAvailable: number;
	startDate: Date;
	endDate: Date;
};

export type CourseAccess = {
	courseId: string; // Assuming ObjectId can be represented as a string
	userPermissions: Map<string, CoursePermission>;
	globalPermissions: GlobalPermission;
	defaultPermissions: Map<string, RolePermissionTemplate>;
};

export type RolePermissionTemplate = {
	role: string;
	attendance: number;
	courseContent: number;
	assignments: number;
	assignmentSubmissions: number;
	grades: number;
};

export type GlobalPermission = {
	attendance: number;
	courseContent: number;
	assignments: number;
	assignmentSubmissions: number;
	grades: number;
};

export type CoursePermission = {
	role: string; // will be the role under RolePermissionTemplate, by default if the user will attach the role, there is no need to populate the attendance, courseContent, assignments, assignmentSubmissions, grades
	// instead based on the role which is reference in the RolePermissionTemplate, the permissions will be taken from there.
	canModifyPermissions: boolean;
	attendance: number;
	courseContent: number;
	assignments: number;
	assignmentSubmissions: number;
	grades: number;
};
