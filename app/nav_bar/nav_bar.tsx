import {NavLink} from "react-router";  
import React from "react";

type IconType = {
    color?: string;
    size?: number | string;
    weight?: "thin" | "medium" | "bold"
    className?: string;
}

const fontWidth = {
  thin: 1,
  medium: 1.5,
  bold: 2,
};


interface SvgHouseHomeProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    className?: string;
    weight?: keyof typeof fontWidth;
}

const SvgHouseHome = (props: SvgHouseHomeProps) => /*#__PURE__*/React.createElement("svg", _extends({
    id: "house-home_svg__Layer_1",
    "data-name": "Layer 1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: props.size == null ? 24 : props.size,
    height: props.size == null ? 24 : props.size,
    className: props.className == null ? '' : props.className,

    strokeWidth: props.weight ? fontWidth[props.weight] : fontWidth.medium
}, props), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("style", null, '.house-home_svg__cls-1{fill:none;stroke:currentColor;stroke-miterlimit:10}')), /*#__PURE__*/React.createElement("path", {
    className: "house-home_svg__cls-1",
    d: "M20.63 11.04v11.5H3.38v-11.5"
}), /*#__PURE__*/React.createElement("path", {
    className: "house-home_svg__cls-1",
    d: "M22.54 11.04 12 2.42 1.46 11.04V12h21.08v-.96zM13.92 16.79h1.92v5.75h-1.92zM8.17 16.79h1.92v1.92H8.17zM23.5 22.54H.5"
}), /*#__PURE__*/React.createElement("path", {
    className: "house-home_svg__cls-1",
    d: "M3.38 9.47V1.46h3.83v4.88M9.13 1.46H1.46"
}));

export function Nav () {
    return (
        <div className="flex justify-around bg-gray-800 p-4">
            <NavLink to="/" className="flex-none">
                <SvgHouseHome size={24} className="text-gray-200" weight="bold"/>
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
function _extends(arg0: { id: string; "data-name": string; xmlns: string; viewBox: string; width: number; height: number; className: string; strokeWidth: number; }, props: SvgHouseHomeProps): any {
    throw new Error("Function not implemented.");
}

