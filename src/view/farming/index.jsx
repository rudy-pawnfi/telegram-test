import imgIntegral from '/images/Farming/img-integral.svg'
import imgTonlord from '/images/Farming/img-Tonlord.png'
import farmingBg from '/images/Farming/img-FarmingBg.svg'
import imgNumberOfLives from '/images/Farming/img-NumberOfLives.png'
import './index.scss'
import { useEffect, useState } from 'react'
import { useTonAddress, useTonWallet } from '@tonconnect/ui-react'
import { ApiServe } from '../../service'
import { reduceLen, toFmtThousand } from '../../untils'
import Countdown from '../../components/countDown'
import { useAlert } from '../../components/alertProvider'
import { useNavigate } from 'react-router-dom'
const FarmingPage = () => {

    const wallet = useTonWallet();
    const tonAddress = useTonAddress()
    const [farmingInfo, setFarmingInfo] = useState({})
    const [useInfo, setUseInfo] = useState({})
    const { showAlert } = useAlert();
    // const initDataUnsafe = Telegram?.WebApp?.initDataUnsafe
    const navigate = useNavigate()
    const initDataUnsafe = {
        user: {
            id: 5354957141
        }
    }
    const [bubbles, setBubbles] = useState([]);
    const [invitInfo, setInvitInfo] = useState({})
    const [gameInfo, setGameInfo] = useState({})
    useEffect(() => {
        init()
    }, [])
    const init = async () => {

        const result = await ApiServe.query('userinfo', {
            tg_account: initDataUnsafe.user.id + ''
        }).catch(err => {
            return {data: {}}
        })
        setUseInfo(result.data)
        // if(!!result.data?.launch_cnt && result.data?.launch_cnt !== 0){
        const res = await ApiServe.query('launchfarming', {
            tg_account: initDataUnsafe.user.id + '',
            launch_cnt: -1
        }).catch(err => {
            return {}
        })
        setFarmingInfo(res)
        // }

        const useInfo = await ApiServe.query('invitinginfo',{
            tg_account: initDataUnsafe.user.id + '',
        }).catch(err => {
            return {data: {}}
        })
        setInvitInfo(useInfo.data)

        const game = await ApiServe.query('availableplayinfo', {
            tg_account: initDataUnsafe?.user?.id + '',
            now_ts:Math.floor(new Date().getTime() / 1000)
        }).catch(err => {
            return {data:{}}
        })
        setGameInfo(game?.data)
        // const res1 = await ApiServe.query('farminglist', {
        //     tg_account: tonAddress
        // })
    }

    const launchpadFarming = async () => {
        const res = await ApiServe.query('launchfarming', {
            tg_account: initDataUnsafe.user.id + '',
            launch_cnt: (useInfo?.launch_cnt || 0) + 1
        })
        setFarmingInfo(res)
    }

    const gradients = [
        'linear-gradient(120deg, #5E00FF 20%, #DC19FF 80%)',
        'linear-gradient(145deg, #5E00FF 20%, #FF8C00 60%)',
      ];
      
      // 定义气泡的大小
      const sizes = [20, 32, 40];

    // 创建一个气泡的函数
    const createBubble = () => {
        const size = sizes[Math.floor(Math.random() * sizes.length)]; // 随机选择气泡大小
        const leftPosition = Math.random() * (window.innerWidth - size - 20); // 随机横坐标
        const background = gradients[Math.floor(Math.random() * gradients.length)]; // 随机选择渐变

        const maxHeight = Math.random() * 500 + 100; // 随机最大上升高度
        const animationDuration = (Math.random() * 2 + 2) * 800; // 随机动画时长

        const newBubble = {
            id: Math.random(), // 唯一标识符
            size,
            leftPosition,
            background,
            maxHeight,
            animationDuration,
        };

        setBubbles((prevBubbles) => [...prevBubbles, newBubble]);
        // 一段时间后移除气泡
        setTimeout(() => {
            setBubbles((prevBubbles) =>
                prevBubbles.filter((bubble) => bubble.id !== newBubble.id)
            );
        }, animationDuration + 400);
    };

    useEffect(() => {
        const intervalId = setInterval(createBubble, 300); // 每300毫秒生成一个气泡

        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="farming_page pa_3">
            <div className="farming_bg" >
                <img className="farming_bg_img" src={farmingBg} alt="" srcset="" />
                {bubbles.map((bubble) => (
                    <div
                        key={bubble.id}
                        className="bubble"
                        style={{
                            position: 'absolute',
                            width: `${bubble.size}px`,
                            height: `${bubble.size}px`,
                            left: `${bubble.leftPosition}px`,
                            bottom: '0px',
                            background: bubble.background,
                            borderRadius: '50%',
                            opacity: bubble.opacityStart,
                            animation: `bubbleAnimation ${bubble.animationDuration}ms ease-out forwards`,
                        }}
                    />
                ))}
                <div className="flex column align_center justify_between farming_bg_center">
                    <img src={imgIntegral} alt="" srcSet="" />
                    <Countdown useInfo={useInfo} farmingInfo={farmingInfo} startTime={farmingInfo?.start_ts * 1000} endTime={farmingInfo?.end_ts * 1000} launchpadFarming={launchpadFarming} />
                </div>
                
            </div>

            <div className="br_5 px_4 pt_2 pb_4 dinosaur_box flex column align_center">
                <img className="header_img_box mb_5" src={imgTonlord} alt="" srcSet="" />
                <div className="fs_4 fw_b mb_4">Polarlord run</div>
                <div className="flex align_center justify_center dinosaur_box_box mb_4">
                    <img className="mr_2" src={imgNumberOfLives} alt="" srcSet="" />
                    <span className="fs_3 fw_b">x {gameInfo?.remain_day || gameInfo?.remain_day === 0  ? gameInfo?.remain_day : 3}</span>
                </div>
                <div className="game_btn fs_2 fw_b" onClick={() => {navigate('/telegram-test/game')}}>Start</div>
            </div>
        </div>
    )
}

export default FarmingPage