import { Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import Home1 from "./pages/Home1";
import Cart from "./pages/Cart";
import Home from "./components/Home";
import Product from "./pages/Product";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Mprofile from "./components/Profile/Mprofile";
import Order from "./components/Profile/Order/Order";
import Settings from "./components/Profile/Settings/Settings";
import Payment from "./pages/Payment";
// import Cart1 from "./components/Cart1";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <div>
      <div className="bg-slate-900">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/*" element={<Home1 />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/cart1" element={<Cart1 />} /> */}
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<Profile />}>
          <Route path="profile/my-profile" element={<Mprofile />} />

          <Route path="profile/orders" element={<Order />} />

          <Route path="profile/settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
