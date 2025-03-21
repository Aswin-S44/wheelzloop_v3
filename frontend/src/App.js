import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DetailsScreen from "./screens/DetailsScreen/DetailsScreen";
import SavedCarsScreen from "./screens/SavedCarsScreen/SavedCarsScreen";
import BlogsScreen from "./screens/BlogsScreen/BlogsScreen";
import ExploreCarsScreen from "./screens/ExploreCarsScreen/ExploreCarsScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen/SignUpScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import AddCarScreen from "./screens/AddCarScreen/AddCarScreen";

function Layout() {
  const location = useLocation();
  const hideHeaderFooter = ["/signin", "/signup"].includes(location.pathname);

  return (
    <div>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/signin" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/car" element={<DetailsScreen />} />
        <Route path="/favourites" element={<SavedCarsScreen />} />
        <Route path="/blogs" element={<BlogsScreen />} />
        <Route path="/used-cars" element={<ExploreCarsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/car/add" element={<AddCarScreen />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
