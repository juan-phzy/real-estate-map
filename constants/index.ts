export interface ReonomyProperty {
	year_built: string | null;
	year_renovated: string | null;
	floors: string | null;
	sum_buildings_nbr: string | null;
	existing_floor_area_ratio: string | null;
	commercial_units: string | null;
	residential_units: string | null;
	total_units: string | null;
	building_area: string | null;
	max_floor_plate: string | null;
	building_class: string | null;
	frontage: string | null;
	depth: string | null;
	asset_type: string | null;
	lot_size_sqft: string | null;
	lot_size_acres: string | null;
	zoning: string | null;
	lot_size_depth_feet: string | null;
	lot_size_frontage_feet: string | null;
	census_tract: string | null;
	opp_zone: string | null;
	msa_name: string | null;
	fips_county: string | null;
	municipality: string | null;
	mcd_name: string | null;
	neighborhood_name: string | null;
	legal_description: string | null;
	zoning_district_1: string | null;
	zoning_district_2: string | null;
	special_purpose_district: string | null;
	split_boundary: string | null;
	sanborn_map_number: string | null;
	address_line1: string | null;
	city: string | null;
	state: string | null;
	zip5: string | null;
	apn: string | null;
	borough_id: string | null;
	block_id: string | null;
	lot_id: string | null;
	lat: string | null;
	lon: string | null;
}

export interface ReonomyProperties {
	items: ReonomyProperty[];
}

export interface PropertyData {
	reonomyProperties: ReonomyProperties;
}

export interface MapSearchParams {
	pID: string | null;
	lat: string | null;
	lon: string | null;
	zoom: string | null;
	apn: string | null;
	adr: string | null;
	city: string | null;
	state: string | null;
	zip: string | null;
}

export interface PopUpObject {
	latitude: string;
	longitude: string;
	apn: string;
	adr: string;
	city: string;
	state: string;
	zip: string;
}

export interface MapLocState {
	lat: number;
	lon: number;
	zoom: number;
}

