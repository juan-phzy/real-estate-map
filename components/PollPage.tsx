"use client";
import { gql } from "@apollo/client";
export const dynamic = "force-dynamic";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
	query {
		launchLatest {
			mission_name
		}
	}
`;

export default function PollPage() {
	const { data } = useSuspenseQuery(query);

	return <div>{data.launchLatest.mission_name}</div>;
}
