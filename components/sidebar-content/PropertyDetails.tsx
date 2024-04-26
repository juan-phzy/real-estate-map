"use client";

import { gql, useSuspenseQuery } from "@apollo/client";
import DetailCard from "../cards/DetailCard";
import { Building, Lot, Zoning, Location, PropertyData, SalesData } from "@/constants";
import { useState } from "react";
import SalesTable from "../SalesTable";

interface Props {
	pID: string | null;
}

const PropertyDetails = ({ pID }: Props) => {
	const [activeTab, setActiveTab] = useState<1|2|3|4|5>(1);
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

	const GET_SALES_INFO = gql`
		query {
			reonomyProperties(filter: {parcel_id: {eq: "${pID}"}}) {
			items {
				reonomyPropertySale {
				items {
					reonomySaleBuyerFormatted(first: 1) {
					items {
						name
					}
					}
					reonomySaleSellerFormatted(first: 1) {
					items {
						name
					}
					}
					sale_amount
					sale_date
				}
				}
			}
			}
		}
	`;

	//------------------------------------------------------------------------------Stores Query Data
	const { data:propertyData } = useSuspenseQuery<PropertyData>(GET_PROPERTY_INFO);
	const featureData = propertyData.reonomyProperties.items[0];

	const { data } = useSuspenseQuery<SalesData>(GET_SALES_INFO);
	const salesData = data.reonomyProperties.items;

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
				<button onClick={()=>{setActiveTab(1)}} className={`pd-info-btn ${activeTab === 1 && 'border-underline'}`}>Building & Lot</button>
				<button onClick={()=>{setActiveTab(2)}} className={`pd-info-btn ${activeTab === 2 && 'border-underline'}`}>Owner</button>
				<button onClick={()=>{setActiveTab(3)}} className={`pd-info-btn ${activeTab === 3 && 'border-underline'}`}>Sales</button>
				<button onClick={()=>{setActiveTab(4)}} className={`pd-info-btn ${activeTab === 4 && 'border-underline'}`}>Debt</button>
				<button onClick={()=>{setActiveTab(5)}} className={`pd-info-btn ${activeTab === 5 && 'border-underline'}`}>Financials</button>
			</div>
			{(activeTab === 1) && featureData ? (
				<div className="pd-cards">
					<DetailCard title={`Building`} data={buildingData} matches={Building} />
					<DetailCard title={`Lot`} data={lotData} matches={Lot} />
					<DetailCard title={`Location`} data={locData} matches={Location} />
					<DetailCard title={`Zoning`} data={zoneData} matches={Zoning} />
				</div>
			) : (
				<></>
			)}
			{(activeTab === 3) && featureData ? (
				<div className="pd-cards">
					<SalesTable salesData={salesData} />
				</div>
			) : (
				<></>
			)}
		</section>
	);
};

export default PropertyDetails;
