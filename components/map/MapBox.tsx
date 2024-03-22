"use client";

import { useState, useRef } from "react";
import { FaLocationDot } from "react-icons/fa6"; //<FaLocationDot />

import { hobokenParks, hobokenRestaurants } from "@/constants/index";

import Map, {
	Marker,
	Popup,
	Source,
	Layer,
	CircleLayer,
	NavigationControl,
	GeolocateControl,
	FullscreenControl,
} from "react-map-gl";
import { Visibility } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

interface parkType {
	type: string;
	properties: {
		address: string;
		rating: number;
		name: string;
	};
	geometry: {
		coordinates: number[];
		type: string;
	};
	id: string;
}

const layerStyle: CircleLayer = {
	id: "point",
	type: "circle",
	paint: {
		"circle-radius": 25,
		"circle-color": "#007cbf",
		"circle-opacity": 0.7,
	},
};

export default function MapBox() {
	const [vis, setVis] = useState<Visibility>("visible");
	const [selectedMarker, setSelectedMarker] = useState<{
		park: parkType;
		index: number;
	} | null>(null);
	const mapRef = useRef(null);

	const zoomToSelectedLoc = (e: any, park: parkType, index: number) => {
		// stop event bubble-up which triggers unnecessary events
		e.stopPropagation();

		if (!selectedMarker || selectedMarker.park != park) {
			setSelectedMarker({ park, index });
			mapRef.current?.flyTo({
				center: [
					park.geometry.coordinates[0],
					park.geometry.coordinates[1],
				],
				zoom: 15,
			});
		} else {
			setSelectedMarker(null);
			mapRef.current?.flyTo({
				center: [-74.016226, 40.747783],
				zoom: 13.5,
			});
		}
	};

	const toggleLayer = () => {
		if (vis === "visible") {
			setVis("none");
		} else {
			setVis("visible");
		}
	};

	return (
		<div className="flex justify-center items-center w-full h-full relative">
			<Map
				ref={mapRef}
				mapboxAccessToken={process.env.MAPBOX_TOKEN}
				initialViewState={{
					latitude: 40.747783,
					longitude: -74.016226,
					zoom: 13.5, //40.747783, -74.026226
				}}
				style={{ width: "100%", height: "100%" }}
				mapStyle="mapbox://styles/mapbox/dark-v11"
			>
				<GeolocateControl position="top-right" />
				<NavigationControl position="top-right" />
				<FullscreenControl position="top-right" />

				<Source id="my-data" type="geojson" data={hobokenRestaurants}>
					<Layer layout={{ visibility: vis }} {...layerStyle} />
				</Source>

				<Source
					id="mapbox-terrain"
					type="vector"
					url="mapbox://mapbox.mapbox-terrain-v2"
				>
					<Layer
						id="terrain-data"
						source="mapbox-terrain"
						type="line"
						source-layer="contour"
						layout={{
							"line-join": "round",
							"line-cap": "round",
						}}
						paint={{
							"line-color": "#ff69b4",
							"line-width": 1,
						}}
					/>
				</Source>

				{hobokenParks.features.map((park, index) => {
					return (
						<Marker
							key={index}
							longitude={park.geometry.coordinates[0]}
							latitude={park.geometry.coordinates[1]}
						>
							<button
								type="button"
								className="cursor-pointer"
								onClick={(e) => zoomToSelectedLoc(e, park, index)}
							>
								{<FaLocationDot size={30} color="tomato" />}
							</button>
						</Marker>
					);
				})}

				{selectedMarker ? (
					<Popup
						className="flex flex-col justify-center items-center p-0"
						offset={25}
						latitude={selectedMarker.park.geometry.coordinates[1]}
						longitude={selectedMarker.park.geometry.coordinates[0]}
						onClose={() => {
							setSelectedMarker(null);
						}}
						closeButton={false}
					>
						<h3 className={`popupTitle`}>
							{selectedMarker.park.properties.name}
						</h3>
						<div className={`popupInfo`}>
							<label className={`popupLabel`}>Address: </label>
							<span>{selectedMarker.park.properties.address}</span>
							<br />
							<label className={`popupLabel`}>Rating: </label>
							<span>{selectedMarker.park.properties.rating}</span>
						</div>
					</Popup>
				) : null}
			</Map>
			<button
				onClick={toggleLayer}
				className="w-fit h-fit p-2 text-sm rounded-md bg-white text-black absolute top-5 left-5"
			>
				Toggle Layer
			</button>
		</div>
	);
}
