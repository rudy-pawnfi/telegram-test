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
    useEffect(() => {
        init()
    },[wallet])
    const init = async () => {

        if(!wallet) return
        const result = await ApiServe.query('userinfo',{
            tg_account: tonAddress
        })
        setUseInfo(result.data)
        console.log('useInfo :>> ', useInfo);
        const res = await ApiServe.query('launchfarming', {
            tg_account: tonAddress,
            launch_cnt: result.data?.launch_cnt + 1
        })
        setFarmingInfo(res)

        // const res1 = await ApiServe.query('farminglist', {
        //     tg_account: tonAddress
        // })
    }

    const launchpadFarming = async () => {
        if(!wallet) return showAlert('Login Wallet', 'warning')
        const res = await ApiServe.query('launchfarming', {
            tg_account: tonAddress,
            launch_cnt: useInfo?.launch_cnt + 1
        })
        setFarmingInfo(res)
    }
    return(
        <div className="farming_page pa_3">
            <div className="farming_bg flex column align_center justify_between pa_3 mb_3">
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