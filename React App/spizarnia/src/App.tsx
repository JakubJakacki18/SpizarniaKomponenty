import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.tsx";
import AddCategory from "./pages/Manage/Add-Category.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Manage/add-category">Add Category</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Manage/add-category" element={<AddCategory />} />
            </Routes>
        </Router>
    );
};

export default App;
