import { PropertyData } from "@/constants";

interface Props {
	pdata: PropertyData;
	title: string;
}

const DetailCard = ({ pdata, title }: Props) => {
	const propertyObj = pdata.reonomyProperties.items[0];

	return (
		<section className="detail-card-container">
			<div className="dc-title">{title}</div>
			<div className="dc-rows">
				{propertyObj &&
					Object.entries(propertyObj).map(([key, value]) => (
						<div className="dc-row" key={key}>
							<span className="font-bold">{key}</span>
							<span>{value}</span>
						</div>
					))}
			</div>
		</section>
	);
};

export default DetailCard;
