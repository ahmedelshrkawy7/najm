import React from "react";
import { MiniHeader, Navbar } from "../../import";
import About from "../../component/about/About";
import Header from "../../includes/header/Header";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
    </div>
  );
};

export default HomePage;
