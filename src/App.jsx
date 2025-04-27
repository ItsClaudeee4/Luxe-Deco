import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Card from "./pages/Card";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className=" font-noto-arabic px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
      <ToastContainer />
      <Navbar />

      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/collection" element={<Collection />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/product/:productId" element={<Product />}></Route>
        <Route path="/card" element={<Card />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/placeorder" element={<PlaceOrder />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
      <Footer className="font-noto-sans-arabic" />
    </div>
  );
};

export default App;
