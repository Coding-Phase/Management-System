import React from "react";
import PageLayout from "../PageLayout";
import Readings from "../Reading";

export default function HomePage() {
	return (
		<PageLayout>
			<div className="flex flex-col items-center justify-center py-6">
				{/* Welcome Message */}
				<h1 className="text-2xl font-bold mb-4">Welcome, Vishal!</h1>

				{/* Menu Options */}
				<div className="bg-white p-6 rounded-lg shadow-lg container mx-auto ">
					<Readings role="Distributor" />
				</div>
				{/* <div className="bg-white p-6 rounded-lg shadow-lg container mx-auto mb-4">
					<Readings role="Employee" />
				</div>
				<div className="bg-white p-6 rounded-lg shadow-lg container mx-auto mb-4">
					<Readings role="Manager" />
				</div>
				<div className="bg-white p-6 rounded-lg shadow-lg container mx-auto mb-4">
					<Readings role="Client" />
				</div> */}
			</div>
		</PageLayout>
	);
}
