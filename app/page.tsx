import MapBox from "@/components/map/MapBox";

import { MapSearchParams } from "@/constants/index";

const page = ({searchParams}: {searchParams: MapSearchParams}) => {
	console.log("Search Params: ", searchParams);
	return (
		<section className="main-page">
			<MapBox searchParams={searchParams} />
		</section>
	);
};

export default page;
