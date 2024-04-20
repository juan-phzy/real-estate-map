"use client";

import { GiGlobe } from "react-icons/gi";
import { FaCircleUser } from "react-icons/fa6";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const Header = () => {
	return (
		<section className={`header`}>
			<div className="header-logo-and-search-container">
				<div className="header-logo">
					<GiGlobe className="w-full h-full" />
				</div>
				<div className="header-title">Lens</div>
				<div className="header-search-container">
					{/* <input className="header-search" placeholder="Search" /> */}
					<GooglePlacesAutocomplete
						selectProps={{
							classNamePrefix: "autocomplete",
							styles: {
								input: (provided) => ({
									...provided,
									color: "blue",
								}),
								option: (provided) => ({
									...provided,
									color: "blue",
								}),
								singleValue: (provided) => ({
									...provided,
									color: "blue",
								}),
							},
						}}
						apiKey={process.env.GOOGLE_API_KEY}
					/>
				</div>
			</div>
			<div className="header-user">
				<FaCircleUser className="w-full h-full" />
			</div>
		</section>
	);
};

export default Header;
