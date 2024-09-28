"use client";
import { Mail, Lock } from "lucide-react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validationSchema = object({
    email: string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true); // Show loading state
      setError(""); // Clear previous errors
      setSuccessMessage(""); // Clear success message

      try {
        // Login API call 
        const response = await axios.post("http://192.168.2.172:1337/api/auth/local", {
          identifier: values.email, // Strapi uses 'identifier' for email/username
          password: values.password,
        });

        // Handle successful login
        setSuccessMessage("Login successful! Redirecting...");
		console.log('Login successful! Redirecting...');
        // Store the JWT token locally (if needed)
        localStorage.setItem("jwt", response.data.jwt);
        // Redirect to dashboard or protected page (if needed)
        // window.location.href = "/dashboard"; // Uncomment this if you want to redirect the user
      } catch (err) {
        // Handle errors
        if (err.response && err.response.data) {
          const errorMsg = err.response.data.message[0].messages[0].message;
          setError(errorMsg || "Login failed");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      } finally {
        setLoading(false); // Reset loading state
        resetForm();
      }
    },
  });

  // Function to handle forgot password
  const handleForgotPassword = async (email) => {
    if (!email) {
      setError("Please enter your email for password recovery.");
      return;
    }

    setLoading(true);
    try {
      // Forgot password API call
      const response = await axios.post("http://192.168.2.172:1337/api/auth/forgot-password", {
        email: email,
      });

      setSuccessMessage("Password reset link sent! Check your email.");
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMsg = err.response.data.message[0].messages[0].message;
        setError(errorMsg || "Failed to send reset email.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen px-4 py-8 bg-gray-50">
      {/* Top Section with Logo */}
      <p className="flex justify-center text-4xl text-blue-600 font-bold">
        Syncro
      </p>

      {/* Middle Section */}
      <div className="flex flex-col max-w-md mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {/* Show success or error messages */}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Email Input */}
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
          type="submit"
          onClick={formik.handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Forgot Password */}
        <button
          type="button"
          onClick={() => handleForgotPassword(formik.values.email)}
          className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 mt-3"
        >
          Forgot Password?
        </button>
      </div>

      {/* Footer Section */}
      <div className="text-center space-y-4">
        <a
          href="/sign-up"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}
