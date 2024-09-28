// components/ReadingList.js
import React, { useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const readings = [
	{
		id: 1,
		userId: 1, // Client ID
		value: 150,
		date: "2024-09-25",
		pending: false,
		critical: false,
		role: "Client",
	},
	{
		id: 2,
		userId: 1, // Client ID
		value: 200,
		date: "2024-09-24",
		pending: true,
		critical: false,
		role: "Client",
	},
	{
		id: 3,
		userId: 2, // Manager ID
		value: 300,
		date: "2024-09-23",
		pending: false,
		critical: false,
		role: "Manager",
	},
	{
		id: 4,
		userId: 2, // Manager ID
		value: 350,
		date: "2024-09-22",
		pending: true,
		critical: true,
		role: "Manager",
	},
	{
		id: 5,
		userId: 3, // Employee ID
		value: 120,
		date: "2024-09-21",
		pending: false,
		critical: false,
		role: "Employee",
	},
	{
		id: 6,
		userId: 3, // Employee ID
		value: 90,
		date: "2024-09-20",
		pending: false,
		critical: true,
		role: "Employee",
	},
	{
		id: 7,
		userId: 2, // Manager ID
		value: 280,
		date: "2024-09-19",
		pending: true,
		critical: true,
		role: "Manager",
	},
	{
		id: 8,
		userId: 4, // Distributor ID
		value: 500,
		date: "2024-09-18",
		pending: false,
		critical: false,
		role: "Distributor",
	},
	{
		id: 9,
		userId: 4, // Distributor ID
		value: 450,
		date: "2024-09-17",
		pending: true,
		critical: false,
		role: "Distributor",
	},
	{
		id: 10,
		userId: 5, // Manufacturer ID
		value: 600,
		date: "2024-09-16",
		pending: false,
		critical: true,
		role: "Manufacturer",
	},
	{
		id: 11,
		userId: 2, // Manager ID
		value: 350,
		date: "2024-09-15",
		pending: false,
		critical: false,
		role: "Manager",
	},
	{
		id: 12,
		userId: 3, // Employee ID
		value: 130,
		date: "2024-09-14",
		pending: false,
		critical: true,
		role: "Employee",
	},
	{
		id: 13,
		userId: 3, // Employee ID
		value: 170,
		date: "2024-09-13",
		pending: false,
		critical: false,
		role: "Employee",
	},
	{
		id: 14,
		userId: 1, // Client ID
		value: 180,
		date: "2024-09-12",
		pending: true,
		critical: true,
		role: "Client",
	},
	{
		id: 15,
		userId: 4, // Distributor ID
		value: 400,
		date: "2024-09-11",
		pending: false,
		critical: false,
		role: "Distributor",
	},
];

const ReadingList = ({ role = "Manager" }) => {
	// Filter readings based on user role
	const filteredReadings = readings?.filter((reading) => {
		if (role === "Employee") {
			return reading.userId === 3 /* employee id */; // Implement logic to filter by employee id
		}
		if (role === "Manager") {
			return (
				reading.userId === 2 /* manager id */ || reading.userId === 3
			); /* employees under manager id */ // Implement logic accordingly
		}
		if (role === "Distributor") {
			return true; // Show all readings
		}
		if (role === "Client") {
			return reading.userId === 1 /* client id */;
		}
		if (role === "Manufacturer") {
			return reading.userId === 5 /* distributor id */; // Implement logic accordingly
		}
		return false;
	});

	const [loadMore, setLoadMore] = useState(10);

	const handleLoadMore = () => {
		setLoadMore((prev) => prev + 10);
	};

	const handleShowLess = () => {
		setLoadMore(10);
	};

	const maxShown = loadMore > filteredReadings.length;
	return (
		<div className="mt-4 overflow-x-auto">
			<table className="min-w-full border-collapse text-left">
				<thead>
					<tr>
						<th className="border-b p-2">Reading ID</th>
						<th className="border-b p-2">Reading Taken By</th>
						<th className="border-b p-2">Reading Value</th>
						<th className="border-b p-2">Report Date</th>
						{role === "Manager" || role === "Distributor" ? (
							<th className="border-b p-2">Pending Response</th>
						) : null}
						{role === "Manager" || role === "Distributor" ? (
							<th className="border-b p-2">Critical Reading</th>
						) : null}
					</tr>
				</thead>
				<tbody>
					{filteredReadings.slice(0, loadMore).map((reading) => (
						<tr key={reading.id}>
							<td className="border-b p-2">{reading.id}</td>
							<td className="border-b p-2">{reading.role}</td>
							<td className="border-b p-2">{reading.value}</td>
							<td className="border-b p-2">{reading.date}</td>
							{role === "Manager" || role === "Distributor" ? (
								<td className="border-b p-2">
									{reading.pending && (
										<div className="flex items-center gap-2">
											<span className="text-red-600">Pending</span>
											<Popover>
												<PopoverTrigger className="bg-white px-3 py-2 text-sm rounded-lg shadow-md">
													Action
												</PopoverTrigger>
												<PopoverContent>
													Place content for the popover here.
												</PopoverContent>
											</Popover>
										</div>
									)}
								</td>
							) : null}
							{role === "Manager" || role === "Distributor" ? (
								<td className="border-b p-2">
									{reading.critical && (
										<span className="text-red-600">Critical</span>
									)}
								</td>
							) : null}
						</tr>
					))}
				</tbody>
			</table>

			{filteredReadings.length > 10 && (
				<button
					className="mt-4 text-indigo-600"
					onClick={maxShown ? handleShowLess : handleLoadMore}>
					{maxShown ? "Show less" : "Show More"}
				</button>
			)}
		</div>
	);
};

export default ReadingList;
