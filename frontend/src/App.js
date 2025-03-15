import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DetailsScreen from "./screens/DetailsScreen/DetailsScreen";
import SavedCarsScreen from "./screens/SavedCarsScreen/SavedCarsScreen";
import BlogsScreen from "./screens/BlogsScreen/BlogsScreen";
import ExploreCarsScreen from "./screens/ExploreCarsScreen/ExploreCarsScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen/SignUpScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <Header />
        <Routes>
          <Route path="/signin" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/car" element={<DetailsScreen />} />
          <Route path="/favourites" element={<SavedCarsScreen />} />
          <Route path="/blogs" element={<BlogsScreen />} />
          <Route path="/used-cars" element={<ExploreCarsScreen />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
