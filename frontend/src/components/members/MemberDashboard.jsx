import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplaints } from "../../redux/slices/complaintSlice";
import { getUser } from "../../redux/slices/authSlice";
import ComplaintCard from "./ComplaintCard";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const MemberDashboard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { complaints, loading } = useSelector((state) => state.complaint);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]); 

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <h1 className="my-4 font-semibold text-xl text-center">
        Welcome!{" "}
        <span className="text-2xl text-green-700">{user?.username}</span>
      </h1>

      <div className="  py-8 px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Active Complaints</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {complaints.length > 0 ? (
            complaints.map((c) => (
              <ComplaintCard key={c._id} complaint={c} />
            ))
          ) : (
            <div className="text-gray-600 font-semibold text-center">
              No complaints to show
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;

