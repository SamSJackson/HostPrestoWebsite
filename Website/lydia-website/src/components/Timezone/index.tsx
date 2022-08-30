import React, { useState, useEffect } from 'react';

import './main.scss'

type Props = {
    timeZone: string
}

const Timezone : React.FC<Props> = ({
    timeZone,
}) => {

    const [time, setTime] = useState<string>(
        new Date().toLocaleTimeString('en-GB', {timeZone})
    );

    const refreshClock = () => {
        const newTime = new Date();

        setTime(newTime.toLocaleTimeString('en-GB', {timeZone}));
    };

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    });

    return (
        <div className="timezone-container-display">
            {time}
        </div>
    )
}

export default Timezone;