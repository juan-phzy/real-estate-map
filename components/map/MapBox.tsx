"use client";

//-----------------------------------------------------------------Constants & Interfaces Imports
import { MapSearchParams, PopUpObject, MapLocState } from "@/constants/index";

//-----------------------------------------------------------------Next & React Imports
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

//-----------------------------------------------------------------MapBox Imports
import Map, {
	Popup,
	Source,
	Layer,
	NavigationControl,
	GeolocateControl,
	FullscreenControl,
	MapRef,
	MapLayerMouseEvent
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

//----------------------------------------------------------------Component Import
import Sidebar from "../shared/Sidebar";
import Image from "next/image";

//----------------------------------------------------------------Default Map Location
const initialMapState: MapLocState = {
	lat: 40.717793,
	lon: -73.995,
	zoom: 13,
};


export default function MapBox({searchParams, mapKey, googleKey}: {readonly searchParams: MapSearchParams, readonly mapKey: string, readonly googleKey: string}) {
	//---------------------------------------------------------------URL Search Parameters
	const { pID, lat, lon, zoom, apn, adr, city, state, zip } = searchParams;

	const router = useRouter(); //-----------------------------------URL Functionality

	//---------------------------------------------------------------Create Map Location State from URL values
	const urlMapState: MapLocState | null = (lat && lon && zoom) ? 
	{lat: parseFloat(lat), lon: parseFloat(lon), zoom: parseFloat(zoom)} : null;

	const [mapPosition, setMapPosition] = useState<MapLocState>( //---Set Map Location State
		urlMapState ? urlMapState : initialMapState
	);

	const urlPopupState: PopUpObject | null = //-----------------------Create PopUp State from URL values
		lat && lon && apn && adr && city && state && zip
			? {
					latitude: lat,
					longitude: lon,
					apn: apn,
					adr: adr,
					city: city,
					state: state,
					zip: zip,
			  }
			: null;

	//-----------------------------------------------------------------Set PopUp State
	const [popupInfo, setPopupInfo] = useState<PopUpObject | null>(urlPopupState ? urlPopupState : null);

	const mapRef = useRef<MapRef>(null); //---------------------------Set Map Reference

	//----------------------------------------------------------------Controls Parcel Hover State
	const [hoveredFeatureId, setHoveredFeatureId] = useState<string | number | undefined | null>(null);

	//----------------------------------------------------------------Sets Parcel ID State
	const [parcelID, setParcelID] = useState<string | null>(pID ? pID : null);

	//----------------------------------------------------------------Map Parcel Click Handler
	const handleClick = (event: MapLayerMouseEvent) => {
		const feature = event.features && event.features[0]; //---------Extracts Map Feature from Event

		//--------------------------------------------------------------Validates Clicked Feature
		if (feature && feature.layer.id === "parcel-fill-layer") {
			//------------------------------------------------------------Set Parcel ID and PopupInfo State
			setParcelID(feature.properties?.ID);
			setPopupInfo({
				latitude: feature.properties?.LATITUDE,
				longitude: feature.properties?.LONGITUDE,
				apn: feature.properties?.APN,
				adr: feature.properties?.ADDRLINE1,
				city: feature.properties?.CITY,
				state: feature.properties?.STATE,
				zip: feature.properties?.ZIP5,
			});

			//------------------------------------------------------------Stores Parcel ID, Map Position, & PopupInfo in URL
			router.push(
				`/?pID=${feature.properties?.ID}&lat=${
					feature.properties?.LATITUDE
				}&lon=${feature.properties?.LONGITUDE}&zoom=${15}&apn=${
					feature.properties?.APN
				}&adr=${feature.properties?.ADDRLINE1}&city=${
					feature.properties?.CITY
				}&state=${feature.properties?.STATE}&zip=${
					feature.properties?.ZIP5
				}`,
				{ scroll: false }
			);
		} else {
			//-----------------------------------------------------Resets all states when user clicks out of parcel
			setPopupInfo(null);
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

	//----------------------------------------------------------Sets Parcel ID and PopupInfo State from URL changes
	useEffect(() => {
		if (searchParams.pID && searchParams.lat && searchParams.lon && searchParams.zoom && searchParams.apn && searchParams.adr && searchParams.city && searchParams.state && searchParams.zip) {
			setParcelID(searchParams.pID);
			setPopupInfo({
				latitude: searchParams.lat,
				longitude: searchParams.lon,
				apn: searchParams.apn,
				adr: searchParams.adr,
				city: searchParams.city,
				state: searchParams.state,
				zip: searchParams.zip,
			});
			
			
			const newLat = parseFloat(searchParams.lat);
			const newLon = parseFloat(searchParams.lon);
			const newZoom = searchParams.zoom ? parseFloat(searchParams.zoom) : mapPosition.zoom;

			setMapPosition({
				lat: newLat,
				lon: newLon,
				zoom: newZoom
			});

			if (mapRef.current) {
				mapRef.current.flyTo({
					center: [newLon, newLat],
					zoom: newZoom
				});
			}
			
		}
	
	}, [searchParams, mapPosition.zoom])


	return (
		<section className="mapbox-component-container">
			<div className="mapbox-sidebar">
				<Sidebar pID={parcelID} />
			</div>
			<div className="map-container">
				<Map
					ref={mapRef}
					mapboxAccessToken={mapKey}
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

					{
						//------------------------------------------------------------Clicked Parcel Pop Up Component
						popupInfo && (
							<Popup
								latitude={parseFloat(popupInfo.latitude)}
								longitude={parseFloat(popupInfo.longitude)}
								closeButton={true}
								closeOnClick={false}
								onClose={() => setPopupInfo(null)}
								anchor="right"
							>
								<div className="w-full h-fit flex flex-col justify-center items-center text-black p-2">
									<div className="w-[200px] h-[200px] relative">
										<Image
											className="object-contain"
											src={`https://maps.googleapis.com/maps/api/streetview?size=200x200&source=outdoor&pitch=10&fov=110&location=${adr},${city},${state}&key=${googleKey}`}
											alt="Parcel Street View"
											sizes="200px"
											fill />
									</div>
									<div className="w-full">
										<span className="font-bold">APN: </span>
										{popupInfo.apn}
									</div>
									<div className="w-full">
										<span className="font-bold">Address: </span>
										{`${popupInfo.adr}, ${popupInfo.city}, ${popupInfo.state}, ${popupInfo.zip}`}
									</div>
								</div>
							</Popup>
						)
					}

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
									["==", ["get", "ID"], parcelID], // Condition for clicked feature
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
