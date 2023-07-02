import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import Base from "./components/Base";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboard from "./pages/user-routes/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from "./pages/user-routes/UserProfile";
import PostPage from "./pages/PostPage";
import UserProvider from "./context/UserProvider";
import Services from "./pages/Services";
import Categories from "./pages/Categories";
import UpdateBlog from "./pages/UpdateBlog";

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="posts/:postId" element={<PostPage />} />
        <Route path="categories/:categoryId" element={<Categories />} />

        {/* if we give /user/dashboard then  only the private route content visible so add Outlet tag in private route and add logic if user is login then only display userDashboard */}
        <Route path="user" element={<PrivateRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="update/:blogId" element={<UpdateBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
