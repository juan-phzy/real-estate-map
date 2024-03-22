import React from "react";
import QueryComp from "../QueryComp";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="w-full h-[20%] min-h-fit border-solid border-white border-2">
				Query
			</div>
			<div className="w-full h-[50%] min-h-fit border-solid border-white border-2">
				<QueryComp />
			</div>
		</div>
	);
};

export default Sidebar;
