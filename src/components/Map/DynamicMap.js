import { useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";
const imagenMarkerURL = "/leaflet/images/marker-icon.png";

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }) => {
	let mapClassName = "w-full h-full";

	if (className) {
		mapClassName = `${mapClassName} ${className}`;
	}

	useEffect(() => {
		(async function init() {
			delete Leaflet.Icon.Default.prototype._getIconUrl;

			Leaflet.Icon.Default.mergeOptions({
				iconRetinaUrl: "/leaflet/images/marker-casa.webp",
				iconUrl: "/leaflet/images/marker-casa.webp",
				shadowUrl: "/leaflet/images/marker-shadow.png",
				iconSize: [40, 40],
				iconAnchor: [20, 40],
				popupAnchor: [0, -40],
				shadowSize: [40, 40],
			});
		})();
	}, []);

	return (
		<MapContainer className={mapClassName} {...rest}>
			{children(ReactLeaflet, Leaflet)}
		</MapContainer>
	);
};

export default Map;
