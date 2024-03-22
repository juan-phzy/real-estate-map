type PropertyData = {
	PropertyAddressFull: string;
	PropertyLatitude: string;
	PropertyLongitude: string;
	ATTOM_ID: string;
	parcel_id: string;
	PropertyAddressZIP: string;
	PropertyAddressCity: string;
	AreaLotSF: string;
	TaxAssessedValueTotal: string;
	BathCount: string;
	BedroomsCount: string;
};

interface PropertyCardProps {
	p: PropertyData;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ p }) => {
	const {
		PropertyAddressFull,
		PropertyAddressZIP,
		PropertyAddressCity,
		AreaLotSF,
		TaxAssessedValueTotal,
		BathCount,
		BedroomsCount,
	} = p;

	return (
		<section className="property-card-container">
			<div className="property-card-title">
				{PropertyAddressFull} | $
				{Number(TaxAssessedValueTotal).toLocaleString()}
			</div>
			<div className="property-card-info">
				{BedroomsCount} Beds | {BathCount} Baths | {AreaLotSF} sqft
			</div>
			<div className="property-card-info">
				{PropertyAddressCity}, {PropertyAddressZIP}
			</div>
		</section>
	);
};

export default PropertyCard;
