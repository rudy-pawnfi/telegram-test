import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import React, { useState, useEffect, useMemo } from "react";

const Countdown = ({ endTime }) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const tonAddress = useTonAddress()
    const [count, setCount] = useState(0)

    const [activeDot, setActiveDot] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setActiveDot(prev => (prev + 1) % 3);
        }, 1000); // 每500毫秒切换一次
        return () => clearInterval(interval);
    }, []);
    // 每次递增的时间间隔
    useEffect(() => {
        let timeCount = endTime - Date.now()
        if (timeCount > 0) {
            const timer = setInterval(() => {
                const time = endTime - Date.now()
                // setPercentage((time / countdown) * 100)
                setCount(count + 1)
                setRemainingTime(Number(time));
            }, 1000);

            return () => clearInterval(timer); // 清理计时器
        }
    }, [remainingTime, endTime]);

    // 格式化剩余时间为小时、分钟、秒
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${formatTimeZeon(hours)}: ${formatTimeZeon(minutes)}: ${formatTimeZeon(seconds)}`;
    };
    function formatTimeZeon(time) {
        return time.toString().padStart(2, '0');
    }

    return (
        <>
            {
                remainingTime > 0 && (
                    <div>
                        <span>{formatTime(remainingTime)}</span>
                        <div className="dot-loader">
                            <div className={`dot ${activeDot === 0 ? 'active_dot' : ''}`}></div>
                            <div className={`dot ${activeDot === 1 ? 'active_dot' : ''}`}></div>
                            <div className={`dot ${activeDot === 2 ? 'active_dot' : ''}`}></div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Countdown;
