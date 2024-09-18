import imgToken from '/images/home/img-Token.svg'
import imgPolariseCapsule from '/images/home/logo-PolariseCapsule.svg'
import imgOneClick from '/images/home/img-One-Click.svg'
import imgBondingCurvev from '/images/home/img-BondingCurvev.svg'
import imgCurve from '/images/home/img-Curve.svg'
import imgERC1000 from '/images/home/img-ERC1000.svg'
import imgERC from '/images/home/img-erc.svg'
import './index.scss'
import { Header } from '../../components/Header/Header'
import { Footer } from "../../components/Footer/Footer";
import { TxForm } from "../../components/TxForm/TxForm";
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { ApiServe } from '../../service'
import { useTonAddress } from '@tonconnect/ui-react'
import { useAlert } from '../../components/alertProvider'
const HomePage = () => {

    const [searchParams] = useSearchParams();
    const tonAddress = useTonAddress()
    const initData = Telegram.WebApp;
    const initDataUnsafe = Telegram.WebApp.initDataUnsafe
    const { showAlert } = useAlert();
    console.log('initData', initData);
    console.log('initDataUnsafe :>> ', initDataUnsafe);
    const startParam = initDataUnsafe.start_param
    useEffect(() => {
        init()
    },[tonAddress])
    const init = async() =>{
        if (startParam) {
            // 解析 ref_code 参数
            const refCode = startParam.split('ref_code=')[1];
            const useInfo = await ApiServe.query('invitinginfo',{
                ref_code: refCode,
                tg_friend_account: initDataUnsafe.query_id
            })
            console.log("Referral Code: ", refCode);
        } else {
            console.log("没有获取到邀请链接的参数");
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

            <div className="pa_4">
                <div className="token_issuance p_relative br_5 mb_3">
                    <div className="token_issuance_box flex">
                        <img className="token_img mr_4" src={imgToken} alt="" srcSet="" />
                        <div className="flex align_center">
                            <div>
                                <div className="fs_4 fw_b mb_4">One-Click Token Issuance</div>
                                <div className="fs_2 text_3 fw_m">The #1 Bonding Curve Launchpad on TON</div>
                            </div>
                            <img className="end_img" src={imgOneClick} alt="" srcSet="" />
                        </div>
                    </div>
                </div>

                <div className="bonding_issuance p_relative br_5 mb_3">
                    <div className="token_issuance_box flex">
                        <div className="flex align_center mr_4">
                            <img className="end_img" src={imgBondingCurvev} alt="" srcSet="" />
                            <div className="text_right">
                                <div className="fs_4 fw_b mb_4">Bonding Curve</div>
                                <div className="fs_2 text_3 fw_m">Facilitates fair and transaparent issuance of digital assets.</div>
                            </div>
                        </div>
                        <img className="token_img " src={imgCurve} alt="" srcSet="" />
                    </div>
                </div>


                <div className="erc1000_issuance p_relative br_5 mb_3">
                    <div className="token_issuance_box flex">
                        <img className="token_img mr_4" src={imgERC1000} alt="" srcSet="" />
                        <div className="flex align_center">
                            <div>
                                <div className="fs_4 fw_b mb_4">ERC-1000 Support</div>
                                <div className="fs_2 text_3 fw_m">The launch of the ERC-1000 protocol will also be supported in the future</div>
                            </div>
                            <img className="end_img" src={imgERC} alt="" srcSet="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify_center">
                <div className="telegaml_box flex align_center py_3 px_5">
                    <i className="picon p-icon-x is_4 mr_4"></i>
                    <i className="picon p-icon-tg is_4 "></i>
                </div>
            </div>
        </div>
    )
}

export default HomePage