/** @type {import('./$types').PageLoad} */
export async function load({ params, url }) {
	return {
		assignments: [
			{
				id: 1,
				name: 'Assignment 1',
				maxPoints: 100,
				deadline: 'Sep 20, 2023 11:59 PM',
				submissions: '5/10',
				description: 'This is the first assignment.'
			},
			{
				id: 2,
				name: 'Assignment 2',
				maxPoints: 90,
				deadline: 'Sep 20, 2023 11:59 PM',
				submissions: '8/10',
				description: 'This is the second assignment.'
			}
		]
	};
}
