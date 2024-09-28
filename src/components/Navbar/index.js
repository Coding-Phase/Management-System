"use client";
import { useState } from "react";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="bg-gray-800 p-4 sticky top-0">
			<nav className="flex justify-between items-center">
				<div className="flex justify-between items-center max-sm:w-full">
					<p className="flex justify-center text-2xl text-blue-600 font-bold">
						<a href="/">Syncro</a>
					</p>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="text-white focus:outline-none block	md:hidden">
						Menu
					</button>
				</div>

				<div className="md:block hidden">
					<ul className=" text-white flex justify-between items-center gap-4">
						<li>
							<a href="/dashboard">Dashboard</a>
						</li>
						<li>
							<a href="/distributor-management">Distributor Management</a>
						</li>
						<li>
							<a href="/client-management">Client Management</a>
						</li>
						<li>
							<a href="/machine-management">Machine Management</a>
						</li>
						<li>
							<a href="/employee-management">Employee Management</a>
						</li>
						<li>
							<a href="/reports">Reports</a>
						</li>
						<li>
							<a href="/profile">User Profile</a>
						</li>
					</ul>
				</div>
			</nav>
			{isOpen && (
				<ul className="space-y-2 mt-4 text-white">
					<li>
						<a href="/dashboard">Dashboard</a>
					</li>
					<li>
						<a href="/distributor-management">Distributor Management</a>
					</li>
					<li>
						<a href="/client-management">Client Management</a>
					</li>
					<li>
						<a href="/machine-management">Machine Management</a>
					</li>
					<li>
						<a href="/employee-management">Employee Management</a>
					</li>
					<li>
						<a href="/reports">Reports</a>
					</li>
					<li>
						<a href="/profile">User Profile</a>
					</li>
				</ul>
			)}
		</header>
	);
}
