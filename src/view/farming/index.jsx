import imgIntegral from '/images/Farming/img-integral.svg'
import imgTonlord from '/images/Farming/img-Tonlord.png'
import imgNumberOfLives from '/images/Farming/img-NumberOfLives.png'
import './index.scss'
import { useEffect, useState } from 'react'
import { useTonAddress, useTonWallet } from '@tonconnect/ui-react'
import { ApiServe } from '../../service'
import { reduceLen, toFmtThousand } from '../../untils'
import Countdown from '../../components/countDown'
import { useAlert } from '../../components/alertProvider'
const FarmingPage = () => {

    
    const wallet = useTonWallet();
    const tonAddress = useTonAddress()
    const [farmingInfo, setFarmingInfo] = useState({})
    const [useInfo, setUseInfo] = useState({})
    const { showAlert } = useAlert();
    const initDataUnsafe = Telegram.WebApp.initDataUnsafe
    useEffect(() => {
        init()
    },[wallet])
    const init = async () => {

        const result = await ApiServe.query('userinfo',{
            tg_account: initDataUnsafe.query_id
        })
        setUseInfo(result.data)
        console.log('useInfo :>> ', useInfo);
        const res = await ApiServe.query('launchfarming', {
            tg_account: initDataUnsafe.query_id,
            launch_cnt: result?.data?.launch_cnt||0 + 1
        })
        setFarmingInfo(res)

        // const res1 = await ApiServe.query('farminglist', {
        //     tg_account: tonAddress
        // })
    }

    const launchpadFarming = async () => {
        const res = await ApiServe.query('launchfarming', {
            tg_account: initDataUnsafe.query_id,
            launch_cnt: useInfo?.launch_cnt + 1
        })
        setFarmingInfo(res)
    }

    const gradients = [
        'linear-gradient(120deg, #5E00FF 20%, #DC19FF 80%)',
        'linear-gradient(145deg, #5E00FF 20%, #FF8C00 60%)'
    ];

    // 定义气泡的大小
    const sizes = [20, 32, 40];

    function createBubble() {
        const bubble = document.createElement('div');
        const size = sizes[Math.floor(Math.random() * sizes.length)]; // 随机选择气泡大小
        const leftPosition = Math.random() * (368 - size); // 在盒子内随机横坐标

        bubble.classList.add('bubble');
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${leftPosition}px`;
        bubble.style.bottom = '0px';
        bubble.style.background = gradients[Math.floor(Math.random() * gradients.length)]; // 随机选择渐变

        document.querySelector('.farming_bg').appendChild(bubble);

        // 随机最大上升高度
        const maxHeight = Math.random() * 500 + 100; // 随机在100到500之间
        const animationDuration = (Math.random() * 2 + 2) * 800; // 随机动画时长

        // 动画关键帧
        bubble.animate([{
                opacity: 0,
                transform: 'translateY(0) scale(0.5)'
            },
            {
                opacity: 1,
                transform: `translateY(-${maxHeight * 0.6}px) scale(1)`
            },
            {
                opacity: 0,
                transform: `translateY(-${maxHeight}px) scale(1)`
            }
        ], {
            duration: animationDuration,
            easing: 'ease-out',
            fill: 'forwards'
        });

        // 动画结束后移除气泡
        setTimeout(() => bubble.remove(), animationDuration + 400);
    }

    // 页面加载时开始生成气泡
    window.addEventListener('load', () => {
        setInterval(createBubble, 300); // 每300毫秒生成一个气泡
    });
    return(
        <div className="farming_page pa_3">
            <div className="farming_bg flex column align_center justify_between pa_3">
                <img src={imgIntegral} alt="" srcSet="" />

                {/* <div className="farming_btn cursor flex justify_center align_center br_6 py_4" onClick={launchpadFarming}>
                    <i className="picon p-icon-StartUp is_4 mr_2"></i>
                    <div className="fs_3 fw_b">Farming</div>
                </div> */}

                {/* <div className="farming_btn_loadding cursor br_6 pa_2 p_relative mb_5 overflow_hidden">
                    <div className="w100 h100 overflow_hidden br_6">
                        <div className="farming_btn_loadding_box_bg" style={{ width: `${(progress / targetNumber) * 100}%` }}></div>
                    </div>
                    <div className="farming_btn_loadding_box flex justify_center align_center br_6 py_4">
                        <i className="picon p-icon-StartUp is_4 mr_2"></i>
                        <div className="fs_3 fw_b">Farming</div>
                    </div>
                </div> */}
                <Countdown useInfo={useInfo} farmingInfo={farmingInfo} startTime={farmingInfo?.start_ts * 1000} endTime={farmingInfo?.end_ts * 1000} launchpadFarming={launchpadFarming} updata={launchpadFarming} />
            </div>

            <div className="br_5 pa_4 dinosaur_box flex column align_center">
                <img className="header_img_box mb_5" src={imgTonlord} alt="" srcSet="" />
                <div className="fs_4 fw_b mb_4">Dinosaur Run ( Soon! )</div>
                <div className="flex align_center justify_center dinosaur_box_box">
                    <img className="mr_2" src={imgNumberOfLives} alt="" srcSet="" />
                    <span className="fs_3 fw_b">{farmingInfo.points_ps}</span>
                </div>
            </div>
        </div>
    )
}

export default FarmingPage