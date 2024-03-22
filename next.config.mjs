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
			"pk.eyJ1IjoianVhbi1waHp5IiwiYSI6ImNsdHN1ZWl6eTB2MWYyanIwZWF4aXJsM2sifQ.qAJ5LF7kHiUS2XJCmpEkKA",
	},
};

export default nextConfig;
