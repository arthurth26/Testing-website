import {NavLink} from "react-router"; 
import home from "/home.svg";

export function Nav () {
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
            <input type="text" placeholder="  Search Blogs?" className="text-gray-200 border rounded-lg"/>
        </div>
    )
}
