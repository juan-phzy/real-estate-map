"use client";

import * as React from "react";
import Map, { Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.MB_TOKEN; // Set your mapbox token here

export default function MapBox() {
	return (
		<Map
			mapboxAccessToken={MAPBOX_TOKEN}
			initialViewState={{
				latitude: 37.8,
				longitude: -122.4,
				zoom: 14,
			}}
			style={{ width: 600, height: 300 }}
			// mapStyle="mapbox://styles/mapbox/streets-v9"
		>
			<Marker longitude={-122.4} latitude={37.8} color="red" />
		</Map>
	);
}
