import BasicTabs from "@/components/shared/BasicTabs";

const page = () => {
	return (
		<section className="main">
			<div className="text-4xl">This is the home page</div>
			<div className="bg-slate-200 text-black flex justify-center items-center gap-10 w-[70%] h-fit p-9 flex justify-center items-center">
				And this is a content block with a material ui sample component
				<BasicTabs />
			</div>
		</section>
	);
};

export default page;
