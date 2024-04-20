/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	env: {
		MAPBOX_TOKEN:
			"pk.eyJ1Ijoic3ZheXNlciIsImEiOiJjbGgwbzl5NXcwdmMzM2VwdTkya2J6cDVmIn0.VrQewCt9w1K8QPsLzuDZjg",
		GOOGLE_API_KEY: "AIzaSyD08rjnou28_G3CzAoMKKa3B-NWncMTZs4",
	},
};

export default nextConfig;
