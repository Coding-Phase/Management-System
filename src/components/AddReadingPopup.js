// components/AddReadingPopup.js
import React, { useState } from "react";
// import QRCodeScanner from "./QRCodeScanner"; // Assume this component is implemented to scan QR codes

const AddReadingPopup = ({ onClose }) => {
	const [isScanning, setIsScanning] = useState(false);
	const [readingData, setReadingData] = useState({
		value: "",
		critical: false,
		notInUse: false,
	});

	const handleToggleMachineNotInUse = (e) => {
		if (e.target.checked) {
			setReadingData({ ...readingData, value: "", notInUse: true });
		} else {
			setReadingData({ ...readingData, notInUse: false });
		}
	};

	const handleCritical = (e) => {
		if (e.target.checked) {
			setReadingData({ ...readingData, critical: true });
		} else {
			setReadingData({ ...readingData, critical: false });
		}
	};

	const handleSubmit = () => {
		// Dispatch action to add reading here
		console.log("Reading data submitted:", readingData);
		onClose();
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded shadow-lg">
				<h2 className="text-xl mb-4">Add Reading</h2>
				{isScanning ? (
					// <QRCodeScanner
					// 	onScan={(data) => {
					// 		setReadingData({ ...readingData, value: data });
					// 		setIsScanning(false);
					// 	}}
					// />
					<h1>Scanner</h1>
				) : (
					<div>
						<button
							onClick={() => setIsScanning(true)}
							className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded">
							Scan QR Code
						</button>

						<label className="flex items-center mb-4">
							<input type="checkbox" onChange={handleToggleMachineNotInUse} />
							Machine Not in Use
						</label>

						{!readingData.notInUse && (
							<input
								type="text"
								value={readingData.value}
								onChange={(e) =>
									setReadingData({ ...readingData, value: e.target.value })
								}
								className="block w-full mb-4 p-2 border"
								placeholder="Enter reading value"
							/>
						)}
						<label className="flex items-center mb-4 ">
							<input type="checkbox" onChange={handleCritical} />
							Critical Reading
						</label>

						<button
							onClick={handleSubmit}
							className="bg-indigo-600 text-white py-2 px-4 rounded">
							Confirm and Submit
						</button>
						<button
							onClick={onClose}
							className="ml-2 bg-gray-300 py-2 px-4 rounded">
							Cancel
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AddReadingPopup;
