import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComplaint } from "../../redux/slices/complaintSlice";
import { getUser } from "../../redux/slices/authSlice";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function FileComplaintPage() {
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Noise",
    severity: "Mild",
    createdBy: user && user._id,
  });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const resultAction = await dispatch(createComplaint(form)).unwrap();
      alert("complaint created successful!y");
      setForm({ title: "", description: "", type: "Noise", severity: "Mild", createdBy: user._id, });
      console.log(resultAction)
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">File a Complaint</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-700 mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Noise</option>
              <option>Cleanliness</option>
              <option>Bills</option>
              <option>Pets</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-gray-700 mb-1">Severity</label>
            <select
              value={form.severity}
              onChange={(e) => setForm({ ...form, severity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Mild</option>
              <option>Annoying</option>
              <option>Major</option>
              <option>Nuclear</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

