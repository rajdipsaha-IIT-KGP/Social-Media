import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

axios.defaults.withCredentials = true;

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/users/me"
      );
      setUser(data);
      setIsAuth(true);
    } catch {
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function loginUser(email, password, navigate) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      toast.success(data.message);
      await fetchUser();
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <UserContext.Provider value={{ loginUser, isAuth, user, loading }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
