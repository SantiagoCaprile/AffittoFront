/** @type {import('next').NextConfig} */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	images: {
		domains: [],
	},
	webpack: (config) => {
		config.plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: "node_modules/leaflet/dist/images",
						to: path.resolve(__dirname, "public", "leaflet", "images"),
					},
				],
			})
		);
		return config;
	},
};

module.exports = nextConfig;
