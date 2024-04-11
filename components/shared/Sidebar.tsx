import PropertyDetails from "../sidebar-content/PropertyDetails";

interface Props {
	pID: string | null;
}

const Sidebar = ({ pID }: Props) => {
	return (
		<section className="sidebar-container">
			<div className="sidebar-header">
				<div className="sidebar-header-btn">Parcel Filters</div>
				<div className="sidebar-header-btn">Results</div>
				<div className="sidebar-header-btn border-solid border-b-2 border-white text-white">
					Property Details
				</div>
			</div>
			<div className="sidebar-content">
				<div className="sidebar-content-test">
					<PropertyDetails pID={pID} />
				</div>
			</div>
		</section>
	);
};

export default Sidebar;
