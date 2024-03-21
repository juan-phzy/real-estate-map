"use client";

import { GiGlobe } from "react-icons/gi";
import { FaCircleUser } from "react-icons/fa6";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

import { useState } from "react";

const Header = () => {
	const [area, setArea] = useState("Hoboken");

	const handleChange = (event: SelectChangeEvent) => {
		setArea(event.target.value as string);
	};

	return (
		<section className={`header`}>
			<div className="flex flex-row gap-2 w-fit h-full justify-center align-center">
				<div className="flex justify-center items-center h-full">
					<GiGlobe size={40} />
				</div>
				<div className="flex justify-center items-center h-full mr-4 text-3xl">
					Lens
				</div>
				<div className="flex justify-center items-center h-full">
					<Box sx={{ minWidth: 200 }}>
						<FormControl fullWidth size="small">
							<InputLabel
								sx={{
									color: "white",
									"&.Mui-focused": {
										color: "white", // Label color on focus
									},
									"&:hover": {
										color: "white", // Label color on hover
									},
								}}
								id="demo-simple-select-label"
							>
								Area
							</InputLabel>
							<Select
								sx={{
									"&.MuiInputBase-root": {
										color: "white", // Text color
										"&:hover": {
											"& .MuiOutlinedInput-notchedOutline": {
												borderColor: "white", // Border color on hover
											},
											backgroundColor: "rgba(255, 255, 255, 0.1)", // Background color on hover
											transition: "background-color 0.3s ease", // Smooth transition
										},
										"&.Mui-focused": {
											"& .MuiOutlinedInput-notchedOutline": {
												borderColor: "white", // Border color on focus
											},
										},
										"& .MuiOutlinedInput-notchedOutline": {
											borderColor: "white", // Default border color
										},
									},
									"& .MuiSelect-icon": {
										color: "white", // Dropdown arrow color
									},
								}}
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={area}
								label="Area"
								onChange={handleChange}
							>
								<MenuItem value={"Hoboken"}>Hoboken</MenuItem>
								<MenuItem value={"Chelsea"}>Chelsea</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</div>
			</div>
			<div className="h-full w-fit flex justify-center items-center">
				<FaCircleUser size={40} />
			</div>
		</section>
	);
};

export default Header;
