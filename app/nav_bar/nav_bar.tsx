import {NavLink, useLocation} from "react-router";   
import { HouseHome, MagnifyingGlass } from "@vectopus/atlas-icons-react";
import React from "react";

export function Nav () {
    const location = useLocation();
    const isBlogsActive = location.pathname === "/blogs" || location.pathname.startsWith("/blogs/post/");
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const searchContainerRef = React.useRef<HTMLDivElement>(null);

    const handleSearchToggle = () => {
        if (isBlogsActive) {
            setIsSearchOpen((prev) => !prev);
        }
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };
        if (isSearchOpen) {document.addEventListener("mousedown", handleClickOutside);}

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchOpen]);

    return (
        <div className="bg-orange-500 flex fixed top-0 left-0 right-0 p-4 z-20">
            <div className="flex-shrink-0">
                <span>
                    <NavLink to="/">
                        <HouseHome size={24}/>
                    </NavLink>
                </span>
            </div>
            <div className="flex flex-1 justify-center space-x-10 items-center mx-auto ml-32"> 
                <span>
                    <NavLink to="/" className={({isActive}) => isActive ? "text-teal-500" : "text-black"}>
                    Home
                    </NavLink>
                </span>
                <span>
                    <NavLink to="/about" className={({isActive}) => isActive ? "text-teal-500" : "text-black"}>
                    About
                    </NavLink>
                </span>
                <span>
                    <NavLink to="/blogs" className={({isActive}) => isActive ? "text-teal-500" : "text-black"}>
                    Blogs
                    </NavLink>
                </span>
            </div>
            <div className="flex-shrink-0 w-40 relative">
                <span>
                    {isBlogsActive && (
                        <div ref={searchContainerRef}>
                            <button onClick={handleSearchToggle}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                <MagnifyingGlass size={20}/>
                            </button>
                            {isSearchOpen ? (
                                <input 
                                    type="text" 
                                    placeholder="Search blogs..." 
                                    className="pr-10 p-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full text-left"
                                    onBlur={() => setIsSearchOpen(false)}
                                />
                            ) : (
                                <div className="w-full h-6 invisible"/>
                            )}
                        </div>
                    )}
                </span>
            </div>
        </div>
    )
}

