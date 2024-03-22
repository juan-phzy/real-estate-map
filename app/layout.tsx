import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";

import { ApolloProvider } from "@apollo/client";
import client from "@/apolloClient";

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
			</body>
		</html>
	);
}
