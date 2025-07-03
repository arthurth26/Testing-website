import {NavLink, useNavigate, useLocation} from "react-router"; 
import home from "/home.svg";
import { useSearch } from "../routes/searchContext";
import React from "react";

const SearchBar = ({searchTerm, setSearchTerm}:{searchTerm:string, setSearchTerm: React.Dispatch<React.SetStateAction<string>>}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;

        if (newSearchTerm.slice(-1) === ' ') {
            setSearchTerm(newSearchTerm.slice(0, -1));
        };
        setSearchTerm(newSearchTerm);

        if (location.pathname !== '/blogs' && newSearchTerm.trim() !== '') {
            navigate('/blogs');
        };
    };
    
    return (
    <input 
        type="text" 
        placeholder="  Search Blogs?" 
        className="text-gray-200 border rounded-lg sm:text-sm/6 focus:-outline-offset-2 text-base"
        value={searchTerm}
        onChange={handleSearchChange}
    />
    );
};

export function Nav () {
    const {searchTerm, setSearchTerm} = useSearch();

    return (
        <div className="flex justify-around bg-gray-800 p-4">
            <NavLink to="/" className="flex-none">
                <img src={home} alt="icon"/>
            </NavLink>          
            <div className="items-center mx-auto place-items-center"> 
                <NavLink to="/" className={({isActive}) => isActive ? "text-teal-500 mx-4 pl-20" : "text-gray-200 mx-4 pl-20"}>
                Home
                </NavLink>
                <NavLink to="/about" className={({isActive}) => isActive ? "text-teal-500 mx-4" : "text-gray-200 mx-4"}>
                About
                </NavLink>
                <NavLink to="/blogs" className={({isActive}) => isActive ? "text-teal-500 mx-4" : "text-gray-200 mx-4"}>
                Blogs
                </NavLink>
            </div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
    )
}
