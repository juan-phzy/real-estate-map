import MapBox from "@/components/map/MapBox";

import { MapSearchParams } from "@/constants/index";

const page = ({searchParams}: {searchParams: MapSearchParams}) => {
	return (
		<section className="main-page">
			<MapBox googleKey={process.env.GOOGLE_API_KEY ?? ''} mapKey={process.env.MAPBOX_TOKEN ?? ''} searchParams={searchParams} />
		</section>
	);
};

export default page;
