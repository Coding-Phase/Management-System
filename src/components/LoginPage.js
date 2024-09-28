"use client";
import { Mail, Lock } from "lucide-react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useState } from "react";

export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const validationSchema = object({
		email: string()
			.email("Enter a valid email")
			.required("Email is required")
			.test("Invalid email address", (value) =>
				/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
			),
		password: string().required("Required"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			setLoading(true);
			console.log("🚀 - LoginPage - values:", values);
			setLoading(false);
			resetForm();
		},
	});

	return (
		<div className="flex flex-col justify-between min-h-screen px-4 py-8 bg-gray-50">
			{/* Top Section with Logo */}
			<p className="flex justify-center text-4xl text-blue-600 font-bold">
				Syncro
			</p>

			{/* Middle Section */}
			<div className="flex flex-col max-w-md mx-auto w-full space-y-6">
				<h1 className="text-2xl font-bold text-center">Login</h1>

				{/* Username / Mobile / Email Input */}

				<div>
					{formik.touched.email && formik.errors.email && (
						<p className="text-red-500 text-xs py-1">{formik.errors.email}</p>
					)}
					<div className="relative">
						<input
							type="text"
							placeholder="Email"
							name="email"
							id="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
					</div>
				</div>

				{/* Password Input */}
				<div>
					{formik.touched.password && formik.errors.password && (
						<p className="text-red-500 text-xs py-1">
							{formik.errors.password}
						</p>
					)}
					<div className="relative">
						<input
							type="password"
							placeholder="Password"
							id="password"
							name="password"
							value={formik.values.password}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
					</div>
				</div>

				{/* Login Button */}
				<button
					// type="submit"
					onClick={formik.handleSubmit}
					disabled={loading}
					className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
					Login
				</button>
			</div>

			{/* Footer Section */}
			<div className="text-center space-y-4">
				<a
					href="/forgot-password"
					className="text-sm text-gray-500 hover:text-gray-700">
					Forgot Password?
				</a>
				<a
					href="/sign-up"
					className="text-sm text-blue-600 hover:text-blue-700">
					Sign Up
				</a>
			</div>
		</div>
	);
}
