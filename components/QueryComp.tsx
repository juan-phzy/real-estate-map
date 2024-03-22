"use client";
import { gql } from "@apollo/client";
export const dynamic = "force-dynamic";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const GET_TAX_ASSESSORS = gql`
	query {
		attomTaxAssessors(first: 5) {
			hasNextPage
			items {
				PropertyAddressFull
				PropertyLatitude
				PropertyLongitude
				ATTOM_ID
				parcel_id
				PropertyAddressZIP
				PropertyAddressCity
			}
			endCursor
		}
	}
`;

export default function PollPage() {
	const { data } = useSuspenseQuery(GET_TAX_ASSESSORS);

	const displayData = () => {
		console.log(data.attomTaxAssessors);
		console.log(data.attomTaxAssessors.items);
	};

	return (
		<div className="flex flex-col justify-start items-start">
			{/*data*/ `Data`}{" "}
			<button
				className="bg-gray-800 border-solid border-white border-1 p-2"
				onClick={displayData}
			>
				Display Data
			</button>
		</div>
	);
}
