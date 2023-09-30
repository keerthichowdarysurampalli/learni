export const load = ({ params }) => {
	const courses = [
		{
			name: 'Directed Research',
			code: '82FAGCIS4440A',
			semester: 'Fall 1982',
			nextClass: 'Sep 20, 2023 11:59 PM, Sunday',
			instructor: 'Clinton Kane',
			assignments: [
				{
					name: 'Assignment 1',
					dueDate: 'Sep 20, 2023 11:59 PM, Sunday',
					description: 'This is the description of the assignment',
					files: [
						{
							name: 'File 1',
							link: 'https://www.google.com'
						},
						{
							name: 'File 2',
							link: 'https://www.google.com'
						}
					]
				},
				{
					name: 'Assignment 2',
					dueDate: 'Sep 20, 2023 11:59 PM, Sunday',
					description: 'This is the description of the assignment',
					files: [
						{
							name: 'File 1',
							link: 'https://www.google.com'
						},
						{
							name: 'File 2',
							link: 'https://www.google.com'
						}
					]
				}
			],
			announcements: [
				{
					title: 'Added New Assignment',
					description:
						'Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline',
					date: 'Sep 20, 2023 11:59 PM, Sunday'
				},
				{
					title: 'Added New Assignment',
					description:
						'Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline',
					date: 'Sep 20, 2023 11:59 PM, Sunday'
				}
			]
		},
		{
			name: 'Directed Research',
			code: '82FAGCIS4440A',
			semester: 'Fall 1982',
			nextClass: 'Sep 20, 2023 11:59 PM, Sunday',
			instructor: 'Clinton Kane',
			assignments: [
				{
					name: 'Assignment 1',
					dueDate: 'Sep 20, 2023 11:59 PM, Sunday',
					description: 'This is the description of the assignment',
					files: [
						{
							name: 'File 1',
							link: 'https://www.google.com'
						},
						{
							name: 'File 2',
							link: 'https://www.google.com'
						}
					]
				},
				{
					name: 'Assignment 2',
					dueDate: 'Sep 20, 2023 11:59 PM, Sunday',
					description: 'This is the description of the assignment',
					files: [
						{
							name: 'File 1',
							link: 'https://www.google.com'
						},
						{
							name: 'File 2',
							link: 'https://www.google.com'
						}
					]
				}
			],
			announcements: [
				{
					title: 'Added New Assignment',
					description:
						'Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline',
					date: 'Sep 20, 2023 11:59 PM, Sunday'
				},
				{
					title: 'Added New Assignment',
					description:
						'Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline',
					date: 'Sep 20, 2023 11:59 PM, Sunday'
				}
			]
		},
		{
			name: 'Directed Research',
			code: '82FAGCIS4440A',
			semester: 'Fall 1982',
			nextClass: 'Sep 20, 2023 11:59 PM, Sunday',
			instructor: 'Clinton Kane',
			assignments: [
				{
					name: 'Assignment 1',
					dueDate: 'Sep 20, 2023 11:59 PM, Sunday',
					description: 'This is the description of the assignment',
					files: [
						{
							name: 'File 1',
							link: 'https://www.google.com'
						},
						{
							name: 'File 2',
							link: 'https://www.google.com'
						}
					]
				},
				{
					name: 'Assignment 2',
					dueDate: 'Sep 20, 2023 11:59 PM, Sunday',
					description: 'This is the description of the assignment',
					files: [
						{
							name: 'File 1',
							link: 'https://www.google.com'
						},
						{
							name: 'File 2',
							link: 'https://www.google.com'
						}
					]
				}
			],
			announcements: [
				{
					title: 'Added New Assignment',
					description:
						'Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline',
					date: 'Sep 20, 2023 11:59 PM, Sunday'
				},
				{
					title: 'Added New Assignment',
					description:
						'Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline',
					date: 'Sep 20, 2023 11:59 PM, Sunday'
				}
			]
		}
	];

	const course = courses.find(course => course.code === params.courseId);

	return {
		course
	}
}