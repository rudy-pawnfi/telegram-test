import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import React, { useState, useEffect, useMemo } from "react";
import { reduceLen, toFixed, toFmtThousand } from "../../untils";

const Countdown = ({ endTime, startTime, launchpadFarming, updata, useInfo, farmingInfo }) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const [percentage, setPercentage] = useState(0)
    const tonAddress = useTonAddress()
    const [count, setCount] = useState(0)
    const wallet = useTonWallet();
    const initDataUnsafe = Telegram.WebApp.initDataUnsafe
      // 每次递增的时间间隔
    useEffect(() => {
        let timeCount = endTime - Date.now()
        let countdown = endTime - startTime
        if (timeCount > 0) {
            const timer = setInterval(() => {
                const time = endTime - Date.now()
                setPercentage((time / countdown) * 100)
                setCount(count + 1)
                setRemainingTime(Number(time));
            }, 1000);

            return () => clearInterval(timer); // 清理计时器
        }else{
            updata()
        }
    }, [remainingTime, endTime]);


    // useEffect(() => {
    //     if (percentage < useInfo?.farming_points) {
    //         const stepTime = duration / useInfo?.farming_points;
    //       const timer = setTimeout(() => {
    //         setProgress((prev) => prev + 1);
    //       }, stepTime);
    
    //       return () => clearTimeout(timer);  // 清除定时器，防止内存泄漏
    //     }
    // }, [percentage])

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

    const points = useMemo(() => {
        let totle = farmingInfo?.points || 0
        totle = totle + (count * farmingInfo.points_ps)
        return toFmtThousand(toFixed(totle || 0, 2))
    },[remainingTime, useInfo, farmingInfo])
    return (
        <>
            <div className="text_center">
                <div className="fs_5 fw_b">{initDataUnsafe?.user?.first_name} {initDataUnsafe?.user?.last_name}</div>
                <div className={`${Number(useInfo?.total_points || 0) > 100000 ? 'fs_7' : 'fs_8'} fw_b`}>{toFixed(useInfo?.total_points || 0, 2)}</div>
            </div>
            <div>
                {
                    remainingTime > 0 ?
                    <div className="farming_btn_loadding cursor br_6 pa_2 p_relative mb_3 overflow_hidden">
                        <div className="w100 h100 overflow_hidden br_6">
                            <div className="farming_btn_loadding_box_bg" style={{ width: `${(100 - percentage)}%` }}></div>
                        </div>
                        <div className="farming_btn_loadding_box flex justify_center align_center br_6 py_4">
                            <i className="picon p-icon-StartUp is_4 mr_2"></i>
                            <div className="fs_3 fw_b mr_2">Farming</div>
                            <span className="gradient_text">{points}</span>
                        </div>
                    </div>
                    :
                    <div className="farming_btn cursor flex justify_center align_center br_6 py_4 mb_7" onClick={launchpadFarming}>
                        <i className="picon p-icon-StartUp is_4 mr_2"></i>
                        <div className="fs_3 fw_b">Farming</div>
                    </div>

                }
                
                
                <div className="fs_3 fw_b text_center mb_7">
                    {remainingTime > 0 ? (
                        <span>{formatTime(remainingTime)}</span>
                    ) : (
                        
                        !!useInfo?.launch_cnt && (useInfo?.launch_cnt === '0' || useInfo?.launch_cnt === 0 )&&
                            <span>00: 00: 00</span>
                        
                    )}
                </div>
            </div>
        </>
    );
};

export default Countdown;
