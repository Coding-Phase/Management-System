// components/Readings.js
"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../redux/store"; // Adjust the path as necessary
import { fetchReadings } from "../redux/slices/readingsSlice"; // Assume you have this action
import AddReadingPopup from "./AddReadingPopup";
import ReadingList from "./ReadingList";

const Readings = ({ role }) => {
	const dispatch = useDispatch();
	const { user } = useSelector(selectAuth);
	const [readings, setReadings] = useState([]);
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		dispatch(fetchReadings()).then((data) => setReadings(data)); // Fetch the readings from the store
	}, [dispatch]);

	// const role = user?.role; // Assume user object contains a role property

	const handleShowPopup = () => {
		setShowPopup(true);
	};

	return (
		<div>
			{(role === "Distributor" ||
				role === "Manager" ||
				role === "Employee") && (
				<button
					onClick={handleShowPopup}
					className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded">
					Add Reading
				</button>
			)}

			{showPopup && <AddReadingPopup onClose={() => setShowPopup(false)} />}

			<h2 className="text-xl mb-4">Latest Readings :- {role}</h2>
			<ReadingList readings={readings} role={role} />
		</div>
	);
};

export default Readings;
