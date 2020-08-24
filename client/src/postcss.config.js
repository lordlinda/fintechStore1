const tailwindcss =require('tailwindcss')

module.exports ={
	//add plugins
	plugins:[
	tailwindcss('./tailwind.js'),
	require('autoprefixer')
	]
}