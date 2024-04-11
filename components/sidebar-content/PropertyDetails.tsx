"use client";

import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { PropertyData } from "@/constants";
import DetailCard from "../cards/DetailCard";

interface Props {
	pID: string | null;
}

const PropertyDetails = ({ pID }: Props) => {
	const [selectedOption, setSelectedOption] = useState("Option 1");

	const handleChange = (event: any) => {
		setSelectedOption(event.target.value);
	};

	const GET_PROPERTY_INFO = gql`
		query {
			reonomyProperties(
				filter: { parcel_id: { eq: "${pID}" } }
			) {
				items {
					year_built
					year_renovated
					floors
					sum_buildings_nbr
					existing_floor_area_ratio
					commercial_units
					residential_units
					total_units
					building_area
					max_floor_plate
					building_class
					frontage
					depth
					asset_type
					lot_size_sqft
					lot_size_acres
					zoning
					lot_size_depth_feet
					lot_size_frontage_feet
					census_tract
					opp_zone
					msa_name
					fips_county
					municipality
					mcd_name
					neighborhood_name
					legal_description
					zoning_district_1
					zoning_district_2
					special_purpose_district
					split_boundary
					sanborn_map_number
					zoning_map_number
					address_line1
					city
					state
					zip5
					apn
					borough_id
					block_id
					lot_id
				}
			}
		}
	`;
	const { data } = useSuspenseQuery<PropertyData>(GET_PROPERTY_INFO);
	const featureData = data.reonomyProperties.items[0];

	return (
		<section className="property-details-container">
			<div className="pd-title">
				<span className="text-lg">
					{featureData.address_line1}
					{`, `}
					{featureData.city}
					{`, `}
					{featureData.state}
					{`, `}
					{featureData.zip5}
				</span>
				<span className="text-xs">
					{"APN: "}
					{featureData.apn}
					{", Borough: "}
					{featureData.borough_id}
					{", Block: "}
					{featureData.block_id}
					{", Lot: "}
					{featureData.lot_id}
				</span>
			</div>
			<div className="pd-deals">No deals found for this property</div>
			<div className="pd-db-selector">
				<span>
					<input
						type="radio"
						id="option1"
						name="group1"
						value="Option 1"
						checked={selectedOption === "Option 1"}
						onChange={handleChange}
					/>
					<label htmlFor="option1">Reonomy</label>
				</span>
				<span>
					<input
						type="radio"
						id="option2"
						name="group1"
						value="Option 2"
						checked={selectedOption === "Option 2"}
						onChange={handleChange}
					/>
					<label htmlFor="option2">ATTOM</label>
				</span>
				<span>
					<input
						type="radio"
						id="option3"
						name="group1"
						value="Option 3"
						checked={selectedOption === "Option 3"}
						onChange={handleChange}
					/>
					<label htmlFor="option3">ACRIS</label>
				</span>
			</div>
			<div className="pd-info-selector">
				<div className="pd-info-btn border-solid border-b-2 border-white text-white">
					Building & Lot
				</div>
				<div className="pd-info-btn">Owner</div>
				<div className="pd-info-btn">Sales</div>
				<div className="pd-info-btn">Debt</div>
				<div className="pd-info-btn">Financials</div>
			</div>
			<div className="pd-cards">
				<DetailCard title={`Building`} pdata={data} />
			</div>
		</section>
	);
};

export default PropertyDetails;
