import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import AddPost from "./Components/AddPost";
import Navigationbar from "./Components/Navigationbar";
import NotFound from "./Components/NotFound";

import { UserData } from "./context/UserContext";

const App = () => {
  const { user, isAuth, loading } = UserData();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/account"
          element={isAuth ? <Account user={user} /> : <Login />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/create"
          element={isAuth ? <AddPost type="post" /> : <Login />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {isAuth ? <Navigationbar /> : null}
    </>
  );
};

export default App;
