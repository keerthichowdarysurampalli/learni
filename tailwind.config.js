/** @type {import('tailwindcss').Config} */

const debugScreens = require('tailwindcss-debug-screens');



export default {
	content: ['./src/**/*.{html,js,svelte,ts,css}'],
	safelist: [
		'text-gray-400',
		'text-emerald-400',
		'text-red-400',
		'text-blue-400',
		'text-yellow-400',
		'text-orange-400',
		'text-violet-400',
		'text-purple-400',
		'text-indigo-400',
		'bg-gray-400',
		'bg-emerald-400',
		'bg-red-400',
		'bg-blue-400',
		'bg-yellow-400',
		'bg-orange-400',
		'bg-violet-400',
		'bg-purple-400',
		'bg-indigo-400',
		'hover:bg-red-400',
		'hover:bg-gray-400',
		'hover:bg-emerald-400',
		'hover:bg-blue-400',
		'hover:bg-yellow-400',
		'hover:bg-orange-400',
		'hover:bg-violet-400',
		'hover:bg-purple-400',
		'hover:bg-indigo-400'
	],
	theme: {
		extend: {
			fontFamily: {
				body: ['Montserrat', 'Inclusive\\ Sans']
			},
			backdropBlur: {
				'half-sm': 'blur(2px)' // You can adjust the blur value as needed
			},

			animation: {
				'fade-in-scale-up': 'fadeInScaleUp 1s ease-in-out forwards'
			}
		}
	},
	plugins: [debugScreens]
};
