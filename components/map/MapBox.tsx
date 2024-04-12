"use client";

//-----------------------------------------------------------------Next & React Imports
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef } from "react";

//-----------------------------------------------------------------MapBox Imports
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

//----------------------------------------------------------------Component Import
import Sidebar from "../shared/Sidebar";

interface MapLocState {
	lat: number;
	lon: number;
	zoom: number;
}

const initialMapState: MapLocState = {
	lat: 40.717793,
	lon: -73.995,
	zoom: 13,
};

export default function MapBox() {
	//
	const router = useRouter(); //-----------------------------------URL Functionality
	const searchParams = useSearchParams();

	const urlPID = searchParams.get("pID"); //-----------------------Extract URL Values
	const urlFID = searchParams.get("fID");
	const urlLat = searchParams.get("lat");
	const urlLon = searchParams.get("lon");
	const urlZoom = searchParams.get("zoom");

	const urlMapState: MapLocState | null = //-----------------------Create Map Location State from URL values
		urlLat && urlLon && urlZoom
			? {
					lat: parseFloat(urlLat),
					lon: parseFloat(urlLon),
					zoom: parseFloat(urlZoom),
			  }
			: null;

	const [mapPosition, setMapPosition] = useState<MapLocState>( //---Set Map Location State
		urlMapState ? urlMapState : initialMapState
	);

	const mapRef = useRef<MapRef>(null); //---------------------------Set Map Reference

	//----------------------------------------------------------------Controls Parcel Hover State
	const [hoveredFeatureId, setHoveredFeatureId] = useState<
		string | number | undefined | null
	>(null);

	//----------------------------------------------------------------Controls Parcel Click State
	const [clickedFeatureId, setClickedFeatureId] = useState<
		string | number | undefined | null
	>(urlFID ? parseFloat(urlFID) : null);

	//----------------------------------------------------------------Sets Parcel ID State
	const [parcelID, setParcelID] = useState<string | null>(
		urlPID ? urlPID : null
	);

	const [vis, setVis] = useState<Visibility>("visible");

	//----------------------------------------------------------------Map Parcel Click Handler
	const handleClick = (event: MapLayerMouseEvent) => {
		const feature = event.features && event.features[0]; //---------Extracts Map Feature from Event

		//--------------------------------------------------------------Validates Clicked Feature
		if (feature && feature.layer.id === "parcel-fill-layer") {
			//------------------------------------------------------------Set Clicked Featured ID & Parcel ID State
			setClickedFeatureId(feature.id);
			setParcelID(feature.properties?.ID);

			//------------------------------------------------------------Stores Parcel ID, Feature ID & Map Position in URL
			router.push(
				`/?pID=${feature.properties?.ID}&fID=${feature.id}&lat=${
					feature.properties?.LATITUDE
				}&lon=${feature.properties?.LONGITUDE}&zoom=${14.5}`,
				{ scroll: false }
			);
		} else {
			//-----------------------------------------------------Resets all states when user clicks out of parcel
			setClickedFeatureId(null);
			setParcelID(null);
			setMapPosition({
				lat: 40.717793,
				lon: -73.995,
				zoom: 13,
			});
			router.replace("/", { scroll: false });
		}
	};

	//----------------------------------------------------------Sets Hovered Feature ID to highlight Parcel
	const handleHover = (event: MapLayerMouseEvent) => {
		const feature = event.features ? event.features[0] : null;
		if (feature && feature.layer.id === "parcel-fill-layer") {
			setHoveredFeatureId(feature.id);
		}
	};

	//----------------------------------------------------------Resets Hovered Feature ID
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
						latitude: mapPosition.lat,
						longitude: mapPosition.lon,
						zoom: mapPosition.zoom, //40.747783, -74.026226
					}}
					style={{ width: "100%", height: "100%" }}
					mapStyle="mapbox://styles/juan-phzy/cluvmhrg0000s01nr30rzdo5n"
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
							beforeId="aerialway"
							source-layer="manhattan_staten_island_parce-7ng65o"
							layout={{
								"line-join": "round",
								"line-cap": "round",
							}}
							paint={{
								"line-color": "#00fff2",
								"line-width": 2,
							}}
						/>

						<Layer
							id="parcel-fill-layer"
							source="parcel-source"
							type="fill"
							beforeId="aerialway"
							source-layer="manhattan_staten_island_parce-7ng65o"
							paint={{
								"fill-color": [
									"case",
									["==", ["id"], clickedFeatureId], // Condition for clicked feature
									"#00fff6", // Color for clicked feature
									["==", ["id"], hoveredFeatureId], // Condition for hovered feature
									"#ff69b4", // Color for hovered feature
									"#194f4d", // Default color
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
