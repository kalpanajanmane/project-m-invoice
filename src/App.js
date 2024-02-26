import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Invoice from "./Invoice";
import Invoiceview from "./Invoiceview";
import { IdProvider } from "./IdContext";

function App() {
  return (
    <Router>
      <IdProvider>
        <div className="App">
          <Routes>
            <Route path="/:id" element={<Invoice />} />
            <Route path="/invoices" element={<Invoiceview />} />
          </Routes>
        </div>
      </IdProvider>
    </Router>
  );
}

export default App;
