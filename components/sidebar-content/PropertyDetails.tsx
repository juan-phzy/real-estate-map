"use client";

import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/client";
import { PropertyData } from "@/constants";
import DetailCard from "../cards/DetailCard";

interface Props {
	pID: string | null;
}

const PropertyDetails = ({ pID }: Props) => {
	//------------------------------------------------------------------------------GraphQL Query
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
					lat
					lon
				}
			}
		}
	`;

	//------------------------------------------------------------------------------Stores Query Data
	const { data } = useSuspenseQuery<PropertyData>(GET_PROPERTY_INFO);
	const featureData = data.reonomyProperties.items[0];

	//---------------------------------------------------------Converts Property Data Object to array of Keys and Values
	const propertyDataArray = featureData ? Object.entries(featureData) : null;

	//-----------------------------------------------------------------------------Separates Data by Topic
	const buildingData = propertyDataArray?.slice(1, 14);
	const lotData = propertyDataArray?.slice(14, 22);
	const locData = propertyDataArray?.slice(22, 28);
	const zoneData = propertyDataArray?.slice(28, 34);

	return (
		<section className="property-details-container">
			<div className="pd-title">
				<span className="text-lg">
					{featureData ? (
						<>
							{featureData.address_line1}
							{`, `}
							{featureData.city}
							{`, `}
							{featureData.state}
							{`, `}
							{featureData.zip5}
						</>
					) : (
						`No Property Selected`
					)}
				</span>
				<span className="text-xs">
					{featureData ? (
						<>
							{"APN: "}
							{featureData.apn}
							{", Borough: "}
							{featureData.borough_id}
							{", Block: "}
							{featureData.block_id}
							{", Lot: "}
							{featureData.lot_id}
						</>
					) : (
						<div></div>
					)}
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
			{featureData ? (
				<div className="pd-cards">
					<DetailCard title={`Building`} data={buildingData} />
					<DetailCard title={`Lot`} data={lotData} />
					<DetailCard title={`Location`} data={locData} />
					<DetailCard title={`Zoning`} data={zoneData} />
				</div>
			) : (
				<></>
			)}
		</section>
	);
};

export default PropertyDetails;
