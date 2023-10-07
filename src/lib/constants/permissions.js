/** operations that the user can perform on a resource.
 * @readonly
 * @property {number} self - if self is set then the user can only create, read, update, and delete their own content.
 * @property {number} create - if create is set then the user can create content.
 * @property {number} read - if read is set then the user can read content.
 * @property {number} update - if update is set then the user can update content.
 * @property {number} delete - if delete is set then the user can delete content.
 */
export const o = Object.freeze({
	/** if self is set then the user can only create, read, update, and delete their own content.*/
	self: 1,
	/** if create is set then the user can create content.*/
	create: 2,
	/** if read is set then the user can read content.*/
	read: 4,
	/** if update is set then the user can update content.*/
	update: 8,
	/** if delete is set then the user can delete content.*/
	delete: 16
});

/** boolean values that can be set on a resource.
 * @readonly
 * @property {number} true - if true is set then the user can perform the operation.
 * @property {number} false - if false is set then the user cannot perform the operation.
 */
export const bool = Object.freeze({
	true: 32,
	false: 64
});
