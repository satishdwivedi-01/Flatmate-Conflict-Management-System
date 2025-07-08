import axiosInstance from "../../api/axiosInstance";

export default function ComplaintCard({ complaint }) {
    const handleVote = async (voteType) => {
        try {
            await axiosInstance.post(`/complaints/${complaint._id}/vote`, { voteType });
            alert(`You ${voteType}d this complaint.`);
            window.location.reload();
        } catch (err) {
            console.error("Voting error:", err);
            const backendMessage = err?.response?.data?.message || "Something went wrong while voting.";
            alert(backendMessage);
        }
    };

    const handleResolve = async () => {
        try {
            await axiosInstance.put(`/complaints/${complaint._id}/resolve`);
            alert("Complaint marked as resolved.");
            window.location.reload();
        } catch (err) {
            console.error("Resolve error:", err);
            const backendMessage = err?.response?.data?.message || "Something went wrong while resolving.";
            alert(backendMessage);
        }
    };

    return (
        <div className="border-2 border-gray-500 p-3 mb-4">
            <h3>
                Title: <span className="font-semibold">{complaint.title}</span>
            </h3>
            <p>
                Desc: <span className="font-semibold">{complaint.description}</span>
            </p>
            <p>
                Type: <span className="font-semibold">{complaint.type}</span> | Severity:{" "}
                <span className="font-semibold">{complaint.severity}</span>
            </p>
            <p>
                Votes: <span className="font-semibold">{complaint.votes}</span>
            </p>
            {complaint.punishment && (
                <p>
                    Punishment:{" "}
                    <span className="font-semibold">{complaint.punishment}</span>
                </p>
            )}

            <div className="flex justify-between my-2">
                <button
                    className="font-semibold bg-blue-700 text-white px-2 rounded-md cursor-pointer"
                    onClick={() => handleVote("upvote")}
                >
                    Upvote
                </button>
                <button
                    className="font-semibold bg-blue-700 text-white px-2 rounded-md cursor-pointer"
                    onClick={() => handleVote("downvote")}
                >
                    Downvote
                </button>
            </div>

            {!complaint.resolved && (
                <button
                    className="bg-green-700 text-white px-3 rounded-md py-1 mt-2 cursor-pointer"
                    onClick={handleResolve}
                >
                    Resolve Complaint
                </button>
            )}
        </div>
    );
}
