import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Create from "./pages/posts/Create";
import Show from "./pages/posts/Show";
import Update from "./pages/posts/Update";

function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/create" element={user ? <Create /> : <Login />} />
          <Route path="/posts/update/:id" element={user ? <Update /> : <Login />} />
          
          <Route path="/posts/:id" element={<Show />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
