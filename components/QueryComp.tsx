"use client";
import { gql } from "@apollo/client";
export const dynamic = "force-dynamic";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import PropertyCard from "./cards/PropertyCard";

type TaxAssessorsData = {
	attomTaxAssessors: {
		hasNextPage: boolean;
		items: PropertyData[];
		endCursor: string | null;
	};
};

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

export default function PollPage() {
	const GET_TAX_ASSESSORS = gql`
		query {
			attomTaxAssessors(
				first: 5
				filter: {
					PropertyAddressZIP: { isNull: false }
					PropertyAddressCity: { isNull: false }
				}
			) {
				hasNextPage
				items {
					PropertyAddressFull
					PropertyLatitude
					PropertyLongitude
					ATTOM_ID
					parcel_id
					PropertyAddressZIP
					PropertyAddressCity
					AreaLotSF
					TaxAssessedValueTotal
					BathCount
					BedroomsCount
				}
				endCursor
			}
		}
	`;

	const { data } = useSuspenseQuery<TaxAssessorsData>(GET_TAX_ASSESSORS);

	return (
		<div className="cards-container">
			{data.attomTaxAssessors.items.map((property, index) => {
				return <PropertyCard key={property.ATTOM_ID} p={property} />;
			})}
		</div>
	);
}
