
interface Props {
	data: [string, any][] | undefined;
	title: string;
	matches: 
	({
		label: string;
		fieldNameOrExtractor: string;
		unit?: undefined;
	} | {
		label: string;
		fieldNameOrExtractor: string;
		unit: string;
	} | {
		label: string;
		fieldNameOrExtractor: string;
		hideIfEmpty?: undefined;
	} | {
		label: string;
		fieldNameOrExtractor: string;
		hideIfEmpty: boolean;
	} | {
		label: string;
		fieldNameOrExtractor: string;
	})[]
}

const DetailCard = ({ data, title, matches }: Props) => {

	const renderLabel = (key:string) => {
        // Find the match for the key in the matches array
        const match = matches.find(match => match.fieldNameOrExtractor === key);
        // Return the label if a match is found, otherwise return the original key
        return match ? match.label : key;
    };

	return (
		<section className="detail-card-container">
			<div className="dc-title">{title}</div>
			<div className="dc-rows">
				{data &&
					data.map(([key, value]) => (
						<div className="dc-row" key={key}>
							<span className="font-bold">{renderLabel(key)}</span>
							<span>{value ? value : "--"}</span>
						</div>
					))}
			</div>
		</section>
	);
};

export default DetailCard;
