import type { FeatureCollection } from "geojson";

export const hobokenParks: FeatureCollection = {
	features: [
		{
			type: "Feature",
			properties: {
				address:
					"1001 Hudson Street, Hoboken, New Jersey 07030, United States",
				rating: 4.6,
				name: "Elysian Park",
			},
			geometry: {
				coordinates: [-74.0255, 40.74848],
				type: "Point",
			},
			id: "b2d937dc6b94b5ac22b37a86c42484f5",
		},
		{
			type: "Feature",
			properties: {
				name: "Sinatra Park",
				address: "Sinatra Dr, Hoboken, NJ 07030",
				rating: 4.7,
			},
			geometry: {
				coordinates: [-74.025948, 40.741643],
				type: "Point",
			},
			id: "bf6defa23b019fb728b11a37e74ab32d",
		},
		{
			type: "Feature",
			properties: {
				address:
					"9 Castle Pt Ter, Hoboken, New Jersey 07030, United States",
				rating: 4.6,
				name: "Castle Point Skatepark",
			},
			geometry: {
				coordinates: [-74.022768, 40.746219],
				type: "Point",
			},
			id: "d529ab5d7ce2e4d72059108d159791f8",
		},
		{
			type: "Feature",
			properties: {
				name: "Pier A Park",
				rating: 4.5,
				address: "100 Sinatra Dr, Hoboken, NJ 07030",
			},
			geometry: {
				coordinates: [-74.026901, 40.737],
				type: "Point",
			},
			id: "f24aafcc479394ce9c2df7d258c57cf5",
		},
	],
	type: "FeatureCollection",
};

export const hobokenRestaurants: FeatureCollection = {
	features: [
		{
			type: "Feature",
			properties: {
				Address:
					"300 Washington Street, Hoboken, New Jersey 07030, United States",
				Name: "Mamoun's Falafel",
				Rating: 4.4,
			},
			geometry: {
				coordinates: [-74.030421, 40.740158],
				type: "Point",
			},
			id: "0f9344759aefc3c15dc0721dbf89fa64",
		},
		{
			type: "Feature",
			properties: {
				Address:
					"618 Washington Street, Hoboken, New Jersey 07030, United States",
				Name: "Saka Japanese Restaurant",
				Rating: 4.7,
			},
			geometry: {
				coordinates: [-74.029156, 40.744146],
				type: "Point",
			},
			id: "2de40775dffe18ed1443f034c42e719a",
		},
		{
			type: "Feature",
			properties: {
				Address:
					"95 Washington Street, Hoboken, New Jersey 07030, United States",
				Name: "Carlo's Bakery",
				Rating: 4.4,
			},
			geometry: {
				coordinates: [-74.030712, 40.737174],
				type: "Point",
			},
			id: "528cc8254cbeac0f546b62df71cd9c5e",
		},
		{
			type: "Feature",
			properties: {
				Address:
					"908 Washington Street, Hoboken, New Jersey 07030, United States",
				Name: "Amanda's",
				Rating: 4.5,
			},
			geometry: {
				coordinates: [-74.02811, 40.747637],
				type: "Point",
			},
			id: "fb407f7edaed5b2f2959523cc950117a",
		},
	],
	type: "FeatureCollection",
};

export interface ReonomyProperty {
	year_built: number | null;
	year_renovated: number | null;
	floors: number | null;
	sum_buildings_nbr: number | null;
	existing_floor_area_ratio: number | null;
	commercial_units: number | null;
	residential_units: number | null;
	total_units: number | null;
	building_area: number | null;
	max_floor_plate: number | null;
	building_class: string | null;
	frontage: number | null;
	depth: number | null;
	asset_type: string | null;
	lot_size_sqft: number | null;
	lot_size_acres: number | null;
	zoning: string | null;
	lot_size_depth_feet: number | null;
	lot_size_frontage_feet: number | null;
	census_tract: string | null;
	opp_zone: boolean | null;
	msa_name: string | null;
	fips_county: string | null;
	municipality: string | null;
	mcd_name: string | null;
	neighborhood_name: string | null;
	legal_description: string | null;
	zoning_district_1: string | null;
	zoning_district_2: string | null;
	special_purpose_district: string | null;
	split_boundary: boolean | null;
	sanborn_map_number: string | null;
	address_line1: string | null;
	city: string | null;
	state: string | null;
	zip5: string | null;
	apn: string | null;
	borough_id: string | null;
	block_id: string | null;
	lot_id: string | null;
	lat: number | null;
	lon: number | null;
}

export interface ReonomyProperties {
	items: ReonomyProperty[];
}

export interface PropertyData {
	reonomyProperties: ReonomyProperties;
}
