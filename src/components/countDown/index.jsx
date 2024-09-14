import { useTonAddress } from "@tonconnect/ui-react";
import React, { useState, useEffect, useMemo } from "react";
import { reduceLen, toFmtThousand } from "../../untils";

const Countdown = ({ endTime, startTime, launchpadFarming, updata, useInfo, farmingInfo }) => {
    const timeCount = endTime - Date.now()
    const [remainingTime, setRemainingTime] = useState(Number(timeCount));
    const [percentage, setPercentage] = useState(0)
    const tonAddress = useTonAddress()
    const [count, setCount] = useState(0)

    const [progress, setProgress] = useState(0);  // 控制数字的状态
    const duration = 30000;  // 动画持续时间 3 秒
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

    useEffect(() => {
        if (progress < useInfo?.farming_points) {
            const stepTime = duration / useInfo?.farming_points;
          const timer = setTimeout(() => {
            setProgress((prev) => prev + 1);
          }, stepTime);
    
          return () => clearTimeout(timer);  // 清除定时器，防止内存泄漏
        }
    }, [progress, useInfo]);

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
        return `${hours}: ${minutes}: ${seconds}`;
    };

    const points = useMemo(() => {
        let totle = progress || 0
        totle = totle + (count * farmingInfo.points_ps)
        return toFmtThousand(totle || 0)
    },[remainingTime, progress, farmingInfo])
    return (
        <>
            <div className="text_center">
                <div className="fs_5 fw_b">{reduceLen(tonAddress)}</div>
                <div className="fs_8 fw_b">{points}</div>
            </div>
            {
                remainingTime > 0 ?
                <div className="farming_btn_loadding cursor br_6 pa_2 p_relative mb_5 overflow_hidden">
                    <div className="w100 h100 overflow_hidden br_6">
                        <div className="farming_btn_loadding_box_bg" style={{ width: `${(100 - percentage)}%` }}></div>
                    </div>
                    <div className="farming_btn_loadding_box flex justify_center align_center br_6 py_4">
                        <i className="picon p-icon-StartUp is_4 mr_2"></i>
                        <div className="fs_3 fw_b">Farming</div>
                    </div>
                </div>
                :
                <div className="farming_btn cursor flex justify_center align_center br_6 py_4" onClick={launchpadFarming}>
                    <i className="picon p-icon-StartUp is_4 mr_2"></i>
                    <div className="fs_3 fw_b">Farming</div>
                </div>

            }
            
            
            <div className="fs_3 fw_b">
                {remainingTime > 0 ? (
                    <span>{formatTime(remainingTime)}</span>
                ) : (
                    <span>00: 00: 00</span>
                )}
            </div>
        </>
    );
};

export default Countdown;
