"use client";

import Loading from "@/components/Loading";
import MapBox from "@/components/map/MapBox";
import { Suspense } from "react";

const x = 2;

const page = () => {
	return (
		<section className="main-page">
			<Suspense fallback={<Loading />}>
				<MapBox />
			</Suspense>
		</section>
	);
};

export default page;
