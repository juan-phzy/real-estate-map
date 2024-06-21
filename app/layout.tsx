import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import { ApolloWrapper } from "@/lib/apollo-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Real Estate Map",
	description: "Micro Internship Project",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				<ApolloWrapper>
					<section className="body-container">
						<div className={`header-container`}>
							<Header googleKey={process.env.GOOGLE_API_KEY ?? ''} />
						</div>
						<div className={`main-container`}>{children}</div>
					</section>
				</ApolloWrapper>
			</body>
		</html>
	);
}
