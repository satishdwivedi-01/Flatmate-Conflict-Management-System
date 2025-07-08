import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [checking, setChecking] = useState(true);

    useEffect(() => {
        dispatch(checkAuth())
            .unwrap()
            .finally(() => {
                setChecking(false);
            });
    }, [dispatch]);

    useEffect(() => {
        if (!checking && user === null) {
            alert("unauthorized")
            navigate("/login");
        }
    }, [checking, user, navigate]);

    if (checking) return <p>Checking auth...</p>;

    return children;
}

