"use client";

import * as React from "react";
import Map, { Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export default function MapBox() {
	return (
		<Map
			mapboxAccessToken={process.env.MAPBOX_TOKEN}
			initialViewState={{
				latitude: 40.747783,
				longitude: -74.016226,
				zoom: 13.5, //40.747783, -74.026226
			}}
			style={{ width: "100%", height: "100%" }}
			mapStyle="mapbox://styles/juan-phzy/clu1ks59f000201pabasxbja0"
		>
			<Marker longitude={40.7} latitude={-74} color="red" />
		</Map>
	);
}
