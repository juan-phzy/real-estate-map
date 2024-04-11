"use client";

import { GiGlobe } from "react-icons/gi";
import { FaCircleUser } from "react-icons/fa6";

import { useState } from "react";

const Header = () => {
	return (
		<section className={`header`}>
			<div className="header-logo-and-search-container">
				<div className="header-logo">
					<GiGlobe className="w-full h-full" />
				</div>
				<div className="header-title">Lens</div>
				<div className="header-search-container">
					<input className="header-search" placeholder="Reonomy Search" />
				</div>
			</div>
			<div className="header-user">
				<FaCircleUser className="w-full h-full" />
			</div>
		</section>
	);
};

export default Header;
