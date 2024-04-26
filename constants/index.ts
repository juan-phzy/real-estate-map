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

export const Building = [
		{
		"label":"Year Built",
		"fieldNameOrExtractor":"year_built"
		},
		{
		"label":"Year Renovated",
		"fieldNameOrExtractor":"year_renovated"
		},
		{
		"label":"Stories",
		"fieldNameOrExtractor":"floors"
		},
		{
		"label":"Number of Buildings",
		"fieldNameOrExtractor":"sum_buildings_nbr"
		},
		{
		"label":"Existing Floor Area Ratio",
		"fieldNameOrExtractor":"existing_floor_area_ratio",
		"unit":" "
		},
		{
		"label":"Commercial Units",
		"fieldNameOrExtractor":"commercial_units"
		},
		{
		"label":"Residential Units",
		"fieldNameOrExtractor":"residential_units"
		},
		{
		"label":"Total Units",
		"fieldNameOrExtractor":"total_units"
		},
		{
		"label":"Building Area",
		"unit":"sf",
		"fieldNameOrExtractor":"building_area"
		},
		{
		"label":"Max Floor Plate",
		"unit":"sf",
		"fieldNameOrExtractor":"max_floor_plate"
		},
		{
		"label":"Building Class",
		"fieldNameOrExtractor":"building_class"
		},
		{
		"label":"Frontage",
		"fieldNameOrExtractor":"frontage",
		"unit":"sf"
		},
		{
		"label":"Depth",
		"fieldNameOrExtractor":"depth",
		"unit":"sf"
		}
]
export const Lot = [
		{
			"label":"Property Type",
			"fieldNameOrExtractor":"asset_type"
		},
		{
			"label":"Lot Area SF",
			"unit":"sf",
			"fieldNameOrExtractor":"lot_size_sqft"
		},
		{
			"label":"Lot Area Acres",
			"unit":"acres",
			"fieldNameOrExtractor":"lot_size_acres"
		},
		{
			"label":"Zoning",
			"fieldNameOrExtractor":"zoning"
		},
		{
			"label":"Depth",
			"unit":"ft",
			"fieldNameOrExtractor":"lot_size_depth_feet"
		},
		{
			"label":"Frontage",
			"unit":"ft",
			"fieldNameOrExtractor":"lot_size_frontage_feet"
		},
		{
			"label":"Census Tract",
			"fieldNameOrExtractor":"census_tract"
		},
		{
			"label":"Opportunity Zone",
			"fieldNameOrExtractor":"(dataItem) => formatBoolean(dataItem.opp_zone)"
		}
]	
export const Location = [
		{
			"label":"Metropolitan Statistical Area",
			"fieldNameOrExtractor":"msa_name"
		},
		{
			"label":"County",
			"fieldNameOrExtractor":"fips_county"
		},
		{
			"label":"Municipality",
			"fieldNameOrExtractor":"municipality"
		},
		{
			"label":"Minor Civil Division",
			"fieldNameOrExtractor":"mcd_name"
		},
		{
			"label":"Neighborhood",
			"fieldNameOrExtractor":"neighborhood_name"
		},
		{
			"label":"Legal",
			"fieldNameOrExtractor":"legal_description"
		}
]

export const Zoning = [
		{
			"label":"Zoning District 1",
			"fieldNameOrExtractor":"zoning_district_1"
		},
		{
			"label":"Zoning District 2",
			"fieldNameOrExtractor":"zoning_district_2",
			"hideIfEmpty":true
		},
		{
			"label":"Special District 1",
			"fieldNameOrExtractor":"special_purpose_district",
			"hideIfEmpty":true
		},
		{
			"label":"Split Boundary",
			"fieldNameOrExtractor":"(dataItem) => formatBoolean(dataItem.split_boundary)"
		},
		{
			"label":"Sandborn Map #",
			"fieldNameOrExtractor":"sanborn_map_number"
		},
		{
			"label":"Zoning Map #",
			"fieldNameOrExtractor":"zoning_map_number"
		}
]

export interface ReonomyPropertySaleItem {
	reonomySaleBuyerFormatted: {items: Array<{ name: string }>};
	reonomySaleSellerFormatted: {items: Array<{ name: string }>};
	sale_amount: number;
	sale_date: string;
}
  
export interface ReonomyPropertyItem {
	reonomyPropertySale: {
		items: ReonomyPropertySaleItem[];
	};
}

export interface ReonomyProperties2 {
	items: ReonomyPropertyItem[];
}

export interface SalesData {
	reonomyProperties: ReonomyProperties2;
}

export interface SalesRootObject {
	data: SalesData;
}
  