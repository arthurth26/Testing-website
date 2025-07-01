import React from "react";

export default function ModeToggle() {
    const [mode, setMode] = React.useState<string>("light");

    const handleDarkMode = () => setMode("dark");
    const handleLightMode = () => setMode("light");

    return (
        <main className={mode}>
            {mode === "light" ? (<button onClick={handleDarkMode}>Button</button>) : 
            (<button onClick={handleLightMode}>Button</button>)}
        </main>
    );
}