import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Revenue from "./pages/Revenue";
import Expenses from "./pages/Expenses";
 
import Analytics from "./pages/Analytics";

import Navbar from "./components/Navbar";
import Reports from "./pages/Reports";
import Exports from "./pages/Exports";
 

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />

        {/* REVENUE */}

        <Route
          path="/revenue"
          element={
            <>
              <Navbar />
              <Revenue />
            </>
          }
        />

        {/* EXPENSES */}

        <Route
          path="/expenses"
          element={
            <>
              <Navbar />
              <Expenses />
            </>
          }
        />

      
        <Route
          path="/reports"
          element={
            <>
              <Navbar />
              <Reports />
            </>
          }
        />

        {/* ANALYTICS */}

        <Route
          path="/analytics"
          element={
            <>
              <Navbar />
              <Analytics />
            </>
          }
        />

         <Route
          path="/exports"
          
          element={

            <>
          <Navbar /> 
          <Exports />
          </>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;