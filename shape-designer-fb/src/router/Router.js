import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import ShapeForm from "../pages/Shapes/ShapeForm";
import ShapeList from "../pages/Shapes/ShapeList";
import Layout from "./Layout";
import ShapeView from "../pages/Shapes/ShapeView";


const Router = () => {
  return (
      // <Routes>
      //   <Route path="/" element={<ShapeList />} />

      //   <Route path="/shape" element={<ShapeForm />} />

      //   <Route path="/shape/:id" element={<ShapeForm />} />
      // </Routes>      

      <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ShapeList />} />
        <Route path="/shape" element={<ShapeForm />} />
        <Route path="/shape/:id" element={<ShapeForm />} />
        <Route path="/shape/view/:id" element={<ShapeView />} />
      </Route>
    </Routes>
  );
};

export default Router;
