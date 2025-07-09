import React from "react";

export function Clock () {
    const [seconds, setSeconds] = React.useState<number>(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds/3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    return (<div className="pt-20 text-teal-500 dark:text-gray-200">
        How long have you been screaming: {formatTime(seconds)}
    </div>)
}