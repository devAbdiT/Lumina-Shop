import React, { useEffect } from "react";
import { useAppDispatch } from "./store";
import { fetchProducts } from "./store/slices/productSlice";
import AppRoutes from "./routes"; // new routes file

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return <AppRoutes />; // Just render the routes
};

export default App;
