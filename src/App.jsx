import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./common/Header";
import Home from "./pages/Home";
import AddProducts from "./pages/AddProducts";

function App() {
  return (
   <div>
     <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add-products" element={<AddProducts/>} />
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
