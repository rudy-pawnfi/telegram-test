import imgToken from '/images/1.png'
import imgPolariseCapsule from '/images/home/logo-PolariseCapsule.svg'
import imgOneClick from '/images/home/img-One-Click.svg'
import imgBondingCurvev from '/images/2.png'
import imgCurve from '/images/home/img-Curve.svg'
import imgERC1000 from '/images/3.png'
import imgERC from '/images/home/img-erc.svg'
import './index.scss'
import { Header } from '../../components/Header/Header'
import { Footer } from "../../components/Footer/Footer";
import { TxForm } from "../../components/TxForm/TxForm";
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { ApiServe } from '../../service'
import { useTonAddress, useTonWallet } from '@tonconnect/ui-react'
import { useAlert } from '../../components/alertProvider'
const HomePage = () => {

    const [searchParams] = useSearchParams();
    const tonAddress = useTonAddress()
    const initData = Telegram.WebApp;
    const initDataUnsafe = Telegram.WebApp.initDataUnsafe
    const wallet = useTonWallet(); 
    const { showAlert } = useAlert();
    console.log('initData', initData);
    console.log('wallet :>> ', wallet);
    const startParam = initDataUnsafe.start_param
    useEffect(() => {
        init()
    },[tonAddress])
    Telegram.WebApp.onEvent('backButtonClicked', function() {
        console.log("用户点击了返回按钮");
        // 在这里执行自定义逻辑
        ApiServe.query('usersignout', {
            tg_account: initDataUnsafe.user.id + '',
            chain_name: wallet?.account?.chain || "-239",
            wallet_account: ''
        })
    });
    const init = async() =>{
        const result = await ApiServe.query('userinfo', {
            tg_account: initDataUnsafe.user.id + ''
        }).catch(err => {
            return {
                data: {}
            }
        })
        if(!tonAddress){
            const res = await ApiServe.query('usersignin', {
                tg_account: initDataUnsafe.user.id + '',
                chain_name: wallet?.account?.chain || "-239",
                wallet_account: ''
            })
        }
        const res = await ApiServe.query('getrefcode', {
            tg_account: initDataUnsafe.user.id + '',
            app_name: 'Rudy_test'
        })
        const refCode = startParam && startParam?.split('ref_code=')[1];
        if (startParam && Object.keys(result?.data).length === 0 && res?.data?.ref_code !== refCode) {
            // 解析 ref_code 参数
            const useInfo = await ApiServe.query('launchinviting',{
                ref_code: refCode,
                tg_friend_account: initDataUnsafe.user.id + ''
            })
            console.log("Referral Code: ", refCode);
        } else {
            console.log("没有获取到邀请链接的参数");
        }
        
    }

    const toTollow = async () => {
        const claimObj = localStorage.getItem(initDataUnsafe.user.id + 'CLAIM') ? JSON.parse(localStorage.getItem(initDataUnsafe.user.id + 'CLAIM')) : {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
        }
        if(claimObj[2]){
            // Telegram.WebApp.openTelegramLink('https://x.com/elonmusk/status/1836319222982701534')
            // Telegram.WebApp.openLink('https://x.com/elonmusk/status/1836319222982701534')
            window.open('https://x.com/Polartonlord','_blank')
        }else{
            claimObj[2] = true
            localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
            // Telegram.WebApp.openTelegramLink('https://x.com/elonmusk/status/1836319222982701534')
            // Telegram.WebApp.openLink('https://x.com/elonmusk/status/1836319222982701534')
            window.open('https://x.com/Polartonlord','_blank')
        }
        
        

    }
    const toTg = async () => {
        const claimObj = localStorage.getItem(initDataUnsafe.user.id + 'CLAIM') ? JSON.parse(localStorage.getItem(initDataUnsafe.user.id + 'CLAIM')) : {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
        }
        if(claimObj[3]){
            Telegram.WebApp.openTelegramLink('https://t.me/polartonlord')
        }else{
            claimObj[3] = true
            localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
            Telegram.WebApp.openTelegramLink('https://t.me/polartonlord')
        }
        

    }
    return(
        <div className="home_page">
            {/* <TxForm /> */}
                {/* <Header />
                <TxForm />
                <TonProofDemo />
                <Footer/> */}
            <div className="flex column align_center home_herader pt_4 br_b_5">
                <img src={imgPolariseCapsule} alt="" srcSet="" />
                <div className="fw_b fs_6 mb_2">Polarise Capsule </div>
                <div className="fs_2 fw_b text_3">The First bonding curve Launchpad</div>
                <div className="fs_2 fw_b text_3 mb_5">platform on Ton</div>
                <div className="home_herader_btn cursor flex justify_center align_center br_6 mb_7">
                    <i className="picon p-icon-Farming is_4 mr_2"></i>
                    <div className="fs_3 fw_b">Star A New Coin! (Soon)</div>
                </div>
            </div>

            <div className="pa_3 mt_2">
                <div className="token_issuance p_relative br_5 mb_3">
                    <img className="token_img" src={imgToken} alt="" srcSet="" />
                    {/* <div className="token_issuance_box flex">
                        <img className="token_img mr_4" src={imgToken} alt="" srcSet="" />
                        <div className="flex align_center">
                            <div>
                                <div className="fs_4 fw_b mb_4">One-Click Token Issuance</div>
                                <div className="fs_2 text_3 fw_m">The #1 Bonding Curve Launchpad on TON</div>
                            </div>
                            <img className="end_img" src={imgOneClick} alt="" srcSet="" />
                        </div>
                    </div> */}
                </div>

                <div className="bonding_issuance p_relative br_5 mb_3">
                    <img className="token_img" src={imgBondingCurvev} alt="" srcSet="" />
                    {/* <div className="token_issuance_box flex">
                        <div className="flex align_center mr_4">
                            <img className="end_img" src={imgBondingCurvev} alt="" srcSet="" />
                            <div className="text_right">
                                <div className="fs_4 fw_b mb_4">Bonding Curve</div>
                                <div className="fs_2 text_3 fw_m">Facilitates fair and transaparent issuance of digital assets.</div>
                            </div>
                        </div>
                        <img className="token_img " src={imgCurve} alt="" srcSet="" />
                    </div> */}
                </div>


                <div className="erc1000_issuance p_relative br_5 mb_3">
                    <img className="token_img" src={imgERC1000} alt="" srcSet="" />
                    {/* <div className="token_issuance_box flex">
                        <img className="token_img mr_4" src={imgERC1000} alt="" srcSet="" />
                        <div className="flex align_center">
                            <div>
                                <div className="fs_4 fw_b mb_4">ERC-1000 Support</div>
                                <div className="fs_2 text_3 fw_m">The launch of the ERC-1000 protocol will also be supported in the future</div>
                            </div>
                            <img className="end_img" src={imgERC} alt="" srcSet="" />
                        </div>
                    </div> */}
                </div>
            </div>

            <div className="flex justify_center">
                <div className="telegaml_box flex align_center py_3 px_5">
                    <i className="picon p-icon-x is_4 mr_4" onClick={toTollow}></i>
                    <i className="picon p-icon-tg is_4 " onClick={toTg}></i>
                </div>
            </div>
        </div>
    )
}

export default HomePage