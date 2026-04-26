import { showError } from "./ToastBar";
const loginUser = async (userData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
      showError(data.message);
      throw new Error(data.message || "Login failed"); 
    }

  return data;
};
export default loginUser;