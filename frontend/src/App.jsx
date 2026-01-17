import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import AddPost from "./Components/AddPost";
import Navigationbar from "./Components/Navigationbar";
import NotFound from "./Components/NotFound";

import { UserData } from "./context/UserContext";
import UserAccount from "./pages/UserAccount";

const App = () => {
  const { user, isAuth, loading } = UserData();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  // hide bottom nav on auth pages
  const hideNavbarRoutes = ["/login", "/register"];
  const showNavbar = isAuth && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Page content */}
      <div className={showNavbar ? "pb-16" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/account"
            element={isAuth ? <Account user={user} /> : <Login />}
          />
          <Route
            path="/users/:id"
            element={isAuth ? <UserAccount user={user} /> : <Login />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/create"
            element={isAuth ? <AddPost type="post" /> : <Login />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Bottom Navigation */}
      { <Navigationbar />}
    </>
  );
};

export default App;
