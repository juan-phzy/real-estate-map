import MapBox from "@/components/map/MapBox";
import BasicTabs from "@/components/shared/BasicTabs";

const page = () => {
	return (
		<section className="main">
			<div className="text-4xl">This is the home page</div>
			<div className="bg-slate-200 text-black flex justify-center items-center gap-10 w-fit h-fit p-9">
				<MapBox />
			</div>
		</section>
	);
};

export default page;
