"use client";

import { GiGlobe } from "react-icons/gi";
import { FaCircleUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

interface ParcelByLocation {
	executeGetParcelByLocation: [
		{
			ID:string;
			LATITUDE:string;
			LONGITUDE:string;
			APN:string;
			ADDRLINE1:string;
			CITY:string;
			STATE:string;
			ZIP5:string;
		}
	]
}

const Header = () => {

	const router = useRouter();
	const [parcelInfo, setParcelInfo] = useState<any>();
	const [address, setAddress] = useState<string>('');
	const [location, setLocation] = useState<{lat:number, lon:number}>({lat: 0.1, lon: 0.1});
	const handleChange = (e:any) => {
		setAddress(e.target.value);
	}


	async function getGeocode(addr: string) {
		const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${process.env.GOOGLE_API_KEY}`) // Adjust the endpoint as necessary
		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}
		return res.json()
	}

	async function getPredictions(addr: string) {
		const res = await fetch(
			`https://maps.googleapis.com/maps/api/place/autocomplete/json
			?input=${addr}
			&location=40.7667%2C-73.9794
			&radius=22000
			&key=${process.env.GOOGLE_API_KEY}`) // Adjust the endpoint as necessary
		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}
		return res.json()
	}

	const GET_PARCEL_ID = gql`
		query {
			executeGetParcelByLocation(latitude: ${location.lat}, longitude: ${location.lon}) {
				ID
				LATITUDE
				LONGITUDE
				APN
				ADDRLINE1
				CITY
				STATE
				ZIP5
			}
		}
	`;
	const { data }: {data:ParcelByLocation} = useSuspenseQuery(GET_PARCEL_ID);

	useEffect(() => {
		getGeocode(address)
			.then((data) => {
				console.log(data.results[0]);
				setLocation({lat: data.results[0].geometry.location.lat, lon: data.results[0].geometry.location.lng})
			})
			.catch((error: any) => {console.log(error)});
		// ADD ERROR HANDLING LATER
	}, [address]);

	useEffect(() => {
		if(data.executeGetParcelByLocation[0] != undefined){
			console.log(data)
			console.log("Set PID and Loc: ",data.executeGetParcelByLocation[0]);
			const {ADDRLINE1, CITY, STATE, ZIP5, APN, ID, LATITUDE, LONGITUDE} = data.executeGetParcelByLocation[0];
			router.push(`/?pID=${ID}&lat=${LATITUDE}&lon=${LONGITUDE}&zoom=${15}&apn=${APN}&adr=${ADDRLINE1}&city=${CITY}&state=${STATE}&zip=${ZIP5}`, {scroll: false});
			router.refresh();
		}
		
	}, [data]);


	// console.log("\nAddress: ",address);
	// console.log("\nLatitude: ",location.lat, " Longitude: ",location.lon);
	return (
		<section className={`header`}>
			<div className="header-logo-and-search-container">
				<div className="header-logo">
					<GiGlobe className="w-full h-full" />
				</div>
				<div className="header-title">Lens</div>
				<div className="header-search-container">
					{/* <input className="header-search" placeholder="Search" /> */}
					<input type="text" className="header-search" placeholder="Search" onChange={handleChange} />
				</div>
			</div>
			<div className="header-user">
				<FaCircleUser className="w-full h-full" />
			</div>
		</section>
	);
};

export default Header;
