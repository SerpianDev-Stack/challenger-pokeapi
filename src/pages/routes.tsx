import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { PokeList } from "./pokeList";
import { PokeDetails } from "./pokeDetails";
import { useState } from "react";

const AppRoutes = () => {
    const [showExtra, setShowExtra] = useState(false);
    const togglePokemons = () => setShowExtra(prev => !prev);

    return (
        <BrowserRouter basename="/challenger-pokeapi/">
            <NavBar togglePokemons={togglePokemons} showExtra={showExtra} />
            <Routes>
                <Route path="/" element={<PokeList showExtra={showExtra} />} />
                <Route path="/pokemon/:nome" element={<PokeDetails />} />
            </Routes>
        </BrowserRouter>
    );
};

export { AppRoutes };