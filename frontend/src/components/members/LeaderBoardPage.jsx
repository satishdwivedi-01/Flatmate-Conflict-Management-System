import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slices/authSlice";
import { useParams } from "react-router-dom";

export default function LeaderboardPage() {
    const user = useSelector((state) => state.auth.user);
    const { id } = useParams();

    const [leaders, setLeaders] = useState([]);
    console.log(leaders)
    const dispatch = useDispatch();
    useEffect(() => {
        axiosInstance.get("/leaderboard").then((res) => setLeaders(res.data));
    }, []);

    useEffect(() => {
        dispatch(getUser(id));
    }, [dispatch, id]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-4xl mx-auto py-8 px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Leaderboard
                </h2>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {leaders.length > 0 ? (
                            leaders.map((l, index) => (
                                <li
                                    key={l._id}
                                    className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition"
                                >
                                    <span className="font-medium text-gray-700">
                                        {index + 1}.  <span className="font-bold text-gray-900">{l.username}</span>
                                    </span>
                                    <span className="text-gray-700 font-bold">
                                        karma : <span className="text-green-600 ">{l.karmaPoints} pts</span>
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="text-center py-4 text-gray-500">
                                No leaders to show.
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

