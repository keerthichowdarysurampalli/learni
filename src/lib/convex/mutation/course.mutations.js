// @ts-nocheck
import { client, api } from '../index';

export async function createCourse({
	/** @type {string}*/ title,
	/** @type {string}*/ description
}) {
	const course = await client.mutation(api.course.createCourse, {
		title,
		description
	});

	console.log(course);
}
