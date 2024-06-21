/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'maps.googleapis.com',
		  },
		],
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	env: {
		// Reference a variable that was defined in the .env.local file and make it available at Build Time
		MAPBOX_TOKEN:"pk.eyJ1Ijoic3ZheXNlciIsImEiOiJjbGgwbzl5NXcwdmMzM2VwdTkya2J6cDVmIn0.VrQewCt9w1K8QPsLzuDZjg",
		GOOGLE_API_KEY:"AIzaSyAYtYh4QOSbcTR3v6Qy8VBiOW9qLLoZMU0",

	},
};

export default nextConfig;
