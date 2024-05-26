import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}

		toast.success('Logged Out', {
			style: {
				border: '1px solid #713200',
				padding: '16px',
				color: '#713200',
			},
			iconTheme: {
				primary: '#713200',
				secondary: '#FFFAEE',
			},
		});
	};

	return { loading, logout };
};
export default useLogout;
