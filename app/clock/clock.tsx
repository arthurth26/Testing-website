import React from "react";

export function Clock () {
    const [date, setDate] = React.useState<string>(new Date().toLocaleTimeString());

    React.useEffect(() => {
        const now = new Date().toLocaleTimeString();

        const intervalId = setInterval(()=>{
            setDate(new Date().toLocaleTimeString())
        },1000);
        return () => clearInterval(intervalId);
    }, []);

    return (<div>
        Current time: {date}
    </div>)
}