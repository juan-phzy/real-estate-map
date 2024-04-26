"use client";

import { GiGlobe } from "react-icons/gi";
import { FaCircleUser } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { gql, useSuspenseQuery } from "@apollo/client";
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
    const [address, setAddress] = useState<string>('');
	const [location, setLocation] = useState<{lat:number, lon:number}>({lat: 0.1, lon: 0.1});
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<any>(null);

    const initializeAutocomplete = () => {
        if (inputRef.current && !autocompleteRef.current) {
            autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current);
            autocompleteRef.current.addListener('place_changed', onPlaceChanged);
        }
    };

    const onPlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
            setAddress(place.formatted_address);
        }
    };

    useEffect(() => {
        if (window?.google?.maps) {
            initializeAutocomplete();
        }
    }, []);

	async function getGeocode(addr: string) {
		const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${process.env.GOOGLE_API_KEY}`) // Adjust the endpoint as necessary
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
		address && getGeocode(address)
			.then((data) => {
				console.log(data.results[0]);
				if(data.results[0] != undefined) {
					setLocation({lat: data.results[0].geometry.location.lat, lon: data.results[0].geometry.location.lng});
				}
			})
			.catch((error: any) => {console.log("Address Has no Geocode: ",error.message)});
		
	}, [address]);

	useEffect(() => {
		if(data.executeGetParcelByLocation[0] != undefined){
			console.log(data)
			console.log("Set PID and Loc: ",data.executeGetParcelByLocation[0]);
			const {ADDRLINE1, CITY, STATE, ZIP5, APN, ID, LATITUDE, LONGITUDE} = data.executeGetParcelByLocation[0];
			router.push(`/?pID=${ID}&lat=${LATITUDE}&lon=${LONGITUDE}&zoom=${15}&apn=${APN}&adr=${ADDRLINE1}&city=${CITY}&state=${STATE}&zip=${ZIP5}`, {scroll: false});
		}
		
	}, [data, router]);


	
	return (
		<>
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`}
                strategy="afterInteractive"
                onLoad={() => {
                    initializeAutocomplete();
                }}
            />
            <section className="header">
                <div className="header-logo-and-search-container">
                    <div className="header-logo">
                        <GiGlobe className="w-full h-full" />
                    </div>
                    <div className="header-title">Lens</div>
                    <div className="header-search-container">
                        <input 
                            ref={inputRef}
                            type="text" 
                            className="header-search" 
                            placeholder="Search" 
                            onChange={(e) => setAddress(e.target.value)}
                            value={address} 
                        />
                    </div>
                </div>
                <div className="header-user">
                    <FaCircleUser className="w-full h-full" />
                </div>
            </section>
        </>
	);
};

export default Header;
