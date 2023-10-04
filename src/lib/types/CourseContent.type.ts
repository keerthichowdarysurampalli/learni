export type CourseContent = {
    _id: string;
    location: string; // the path to the file
    file: string; // will be a link to the file, the notes make using the editor are saved as json, and will be fetched and Type would be Notes
    type: string; // "export type of file"
}

export type CourseContentAccess = {
    courseId: string;
    userPermissions: Map<string, CourseContentPermission>;
}

export type CourseContentPermission = {
    role: string;
    // instead based on the role which is reference in the RolePermissionTemplate, the permissions will be taken from there.
    creatorId: string[];
    permissions: number; // for a student/user or anyother, this is the permission they have for this content, 
    visible: boolean; // for a student/user, this is whether or not they can see this content in the course the creator's can see it regardless
}

export type RolePermissionTemplate = {
    role: string;
    permissions: number;
}