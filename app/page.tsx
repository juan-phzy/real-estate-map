import MapBox from "@/components/map/MapBox";

import { MapSearchParams } from "@/constants/index";

const page = ({searchParams}: {searchParams: MapSearchParams}) => {
	return (
		<section className="main-page">
			<MapBox searchParams={searchParams} />
		</section>
	);
};

export default page;
