import { PropertyData } from "@/constants";

interface Props {
	data: [string, any][] | undefined;
	title: string;
}

const DetailCard = ({ data, title }: Props) => {
	return (
		<section className="detail-card-container">
			<div className="dc-title">{title}</div>
			<div className="dc-rows">
				{data &&
					data.map(([key, value]) => (
						<div className="dc-row" key={key}>
							<span className="font-bold">{key}</span>
							<span>{value ? value : "--"}</span>
						</div>
					))}
			</div>
		</section>
	);
};

export default DetailCard;
