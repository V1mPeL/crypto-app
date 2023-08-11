import { Route, Routes } from "react-router-dom";
import {
  Navbar,
  HomePage,
  Cryptocurrencies,
  News,
  CryptoDetails,
  Footer,
} from "./components";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
        <Route path="/news" element={<News />} />
        <Route path="/crypto/:coinId" element={<CryptoDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
