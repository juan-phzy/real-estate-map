import QueryComp from "../QueryComp";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="w-full h-fit text-4xl">Properties</div>
			<div className="w-full h-full">
				<QueryComp />
			</div>
		</div>
	);
};

export default Sidebar;
