"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState, useRef } from "react";

import Map, {
	Marker,
	Popup,
	Source,
	Layer,
	CircleLayer,
	NavigationControl,
	GeolocateControl,
	FullscreenControl,
	MapRef,
} from "react-map-gl";
import { Visibility } from "mapbox-gl";
import { MapLayerMouseEvent } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import Sidebar from "../shared/Sidebar";

export default function MapBox() {
	//URL Functionality
	const router = useRouter();
	const searchParams = useSearchParams();

	const urlPID = searchParams.get("pID");
	const urlFID = searchParams.get("fID");

	//Parcel Functionality
	const [hoveredFeatureId, setHoveredFeatureId] = useState<
		string | number | undefined | null
	>(null);
	const [clickedFeatureId, setClickedFeatureId] = useState<
		string | number | undefined | null
	>(urlFID ? urlFID : null);

	const [parcelID, setParcelID] = useState<string | null>(
		urlPID ? urlPID : null
	);

	//Map Functionality
	const [vis, setVis] = useState<Visibility>("visible");
	const mapRef = useRef<MapRef>(null);

	//Utility Functions
	const handleClick = (event: MapLayerMouseEvent) => {
		const feature = event.features && event.features[0];
		if (feature && feature.layer.id === "parcel-fill-layer") {
			setClickedFeatureId(feature.id);
			setParcelID(feature.properties?.ID);
			console.log(feature.properties?.ID);
			router.push(`/?pID=${feature.properties?.ID}&fID=${feature.id}`, {
				scroll: false,
			});
		} else {
			setClickedFeatureId(null); // Reset when map is clicked outside any feature
			setParcelID(null);
			router.replace("/", { scroll: false });
		}
	};

	const handleHover = (event: any) => {
		const feature = event.features[0];
		if (feature && feature.layer.id === "parcel-fill-layer") {
			setHoveredFeatureId(feature.id);
		}
	};

	const handleMouseLeave = () => {
		setHoveredFeatureId(null);
	};

	return (
		<section className="mapbox-component-container">
			<div className="mapbox-sidebar">
				<Sidebar pID={parcelID} />
			</div>
			<div className="map-container">
				<Map
					ref={mapRef}
					mapboxAccessToken={process.env.MAPBOX_TOKEN}
					initialViewState={{
						latitude: 40.717793,
						longitude: -73.995,
						zoom: 13, //40.747783, -74.026226
					}}
					style={{ width: "100%", height: "100%" }}
					mapStyle="mapbox://styles/juan-phzy/cluvk1xks001d01nu8b14bs9p"
					onClick={handleClick}
					onMouseMove={handleHover}
					onMouseLeave={handleMouseLeave}
					interactiveLayerIds={[`parcel-fill-layer`]}
				>
					<GeolocateControl position="top-right" />
					<NavigationControl position="top-right" />
					<FullscreenControl position="top-right" />

					<Source
						id="parcel-source"
						type="vector"
						url="mapbox://svayser.ae1mculr"
					>
						<Layer
							id="parcel-line-layer"
							source="parcel-source"
							type="line"
							beforeId="land-structure-polygon"
							source-layer="manhattan_staten_island_parce-7ng65o"
							layout={{
								"line-join": "round",
								"line-cap": "round",
							}}
							paint={{
								"line-color": "#ff69b4",
								"line-width": 1,
							}}
						/>

						<Layer
							id="parcel-fill-layer"
							source="parcel-source"
							type="fill"
							beforeId="land-structure-polygon"
							source-layer="manhattan_staten_island_parce-7ng65o"
							paint={{
								"fill-color": [
									"case",
									["==", ["id"], clickedFeatureId], // Condition for clicked feature
									"#6c00ab", // Color for clicked feature
									["==", ["id"], hoveredFeatureId], // Condition for hovered feature
									"#ff69b4", // Color for hovered feature
									"#6F788A", // Default color
								],
								"fill-opacity": 0.7,
							}}
						/>
					</Source>
				</Map>
			</div>
		</section>
	);
}
