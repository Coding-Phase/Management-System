"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const DistributorManagement = () => {
  const [distributors, setDistributors] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter] = useState("");

  // Validation schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Distributor Name is required"),
    city: Yup.string(),
    address: Yup.string(),
    primaryContactPerson: Yup.string().required("Primary Contact Person is required"),
    primaryMobile: Yup.string().required("Primary Mobile Number is required"),
    secondaryContactPerson: Yup.string(),
    secondaryMobile: Yup.string(),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    gstNumber: Yup.string(),
    category: Yup.string().required("Distributor Category is required"),
    whatsappNumber: Yup.string(),
    logo: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      city: "",
      address: "",
      primaryContactPerson: "",
      primaryMobile: "",
      secondaryContactPerson: "",
      secondaryMobile: "",
      email: "",
      gstNumber: "",
      category: "",
      whatsappNumber: "",
      logo: null,
    },
    validationSchema,
    onSubmit: (values) => {
      setDistributors((prev) => [...prev, values]);
      formik.resetForm(); // Reset the form
      setIsFormVisible(false); // Hide the form after submission
    },
  });

  // Dummy data for distributor categories
  const distributorCategories = [
    "Retailer",
    "Wholesaler",
    "Online Seller",
    "Distributor",
  ];

  // Function to filter distributors
  const filteredDistributors = distributors.filter((distributor) =>
    distributor.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search Distributor..."
          className="p-2 border border-gray-300 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {/* Assuming only Manufacturer Owner can see this button */}
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setIsFormVisible(true)}
        >
          Add Distributor
        </button>
      </div>

      {/* Distributor Creation Form */}
      {isFormVisible && (
        <form onSubmit={formik.handleSubmit} className="mb-8 p-4 border rounded bg-white shadow">
          <h2 className="text-lg font-bold mb-4">Add Distributor</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Distributor Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="p-2 border border-gray-300 rounded"
            />
            {formik.touched.name && formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="primaryContactPerson"
              placeholder="Primary Contact Person"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.primaryContactPerson}
              className="p-2 border border-gray-300 rounded"
            />
            {formik.touched.primaryContactPerson && formik.errors.primaryContactPerson && <p className="text-red-500">{formik.errors.primaryContactPerson}</p>}
            <input
              type="text"
              name="primaryMobile"
              placeholder="Primary Mobile Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.primaryMobile}
              className="p-2 border border-gray-300 rounded"
            />
            {formik.touched.primaryMobile && formik.errors.primaryMobile && <p className="text-red-500">{formik.errors.primaryMobile}</p>}
            <input
              type="text"
              name="secondaryContactPerson"
              placeholder="Secondary Contact Person"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.secondaryContactPerson}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="secondaryMobile"
              placeholder="Secondary Mobile Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.secondaryMobile}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="p-2 border border-gray-300 rounded"
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
            <input
              type="text"
              name="gstNumber"
              placeholder="GST Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gstNumber}
              className="p-2 border border-gray-300 rounded"
            />
            <select
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>Select Distributor Category</option>
              {distributorCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && <p className="text-red-500">{formik.errors.category}</p>}
            <input
              type="text"
              name="whatsappNumber"
              placeholder="WhatsApp Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.whatsappNumber}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="file"
              name="logo"
              onChange={(event) => {
                formik.setFieldValue("logo", event.currentTarget.files[0]);
              }}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
              onClick={() => setIsFormVisible(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded"
            >
              Review and Submit
            </button>
          </div>
        </form>
      )}

      {/* Middle Section - Distributor List */}
      <div className="bg-white p-4 border rounded shadow">
        <h2 className="text-lg font-bold mb-4">Distributor List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">City</th>
              <th className="border p-2">Primary Contact</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDistributors.length > 0 ? (
              filteredDistributors.map((distributor, index) => (
                <tr key={index}>
                  <td className="border p-2">{distributor.name}</td>
                  <td className="border p-2">{distributor.city}</td>
                  <td className="border p-2">{distributor.primaryContactPerson}</td>
                  <td className="border p-2">
                    <button className="text-blue-600 hover:underline mr-2">
                      View
                    </button>
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-2">No distributors found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default DistributorManagement ;