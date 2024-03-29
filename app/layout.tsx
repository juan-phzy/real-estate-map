import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
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
			<body className={`${inter.className} root-body`}>
				<ApolloWrapper>
					<section className="body-container">
						<div className={`header-container`}>
							<Header />
						</div>
						<div className={`main-container`}>
							<div className="sidebar-container">
								<Sidebar />
							</div>
							<div className="main-content">{children}</div>
						</div>
					</section>
				</ApolloWrapper>
			</body>
		</html>
	);
}
