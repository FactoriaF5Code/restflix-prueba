import "./App.css";
import { Home } from "./components/Home"
import { Login } from "./components/Login.jsx"
import { Routes, Route } from "react-router-dom";

function App()  {

  return (
    <>
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/Login" element={<Login />} />
          <Route path="/de" element={<Home language={"de"} />} />
        </Routes>

    </>
  );
}

export default App;