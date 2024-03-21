import MapBox from "@/components/map/MapBox";

const page = () => {
	return (
		<section className="main">
			<div className="bg-slate-200 text-black flex justify-center items-center gap-10 w-full h-full">
				<MapBox />
			</div>
		</section>
	);
};

export default page;
