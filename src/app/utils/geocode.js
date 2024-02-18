import opencage from "opencage-api-client";
const API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

const fetchGeocode = async (direccion) => {
	return opencage
		.geocode({ q: direccion, key: API_KEY })
		.then((data) => {
			if (data.results.length > 0) {
				const place = data.results[0];
				return place.geometry;
			} else {
				console.log("No results found");
			}
		})
		.catch((error) => {
			throw error;
		});
};

export default fetchGeocode;
