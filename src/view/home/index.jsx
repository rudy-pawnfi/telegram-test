
import './index.scss'
const HomePage = () => {

    return(
        <div className="home_page">
            <div className="flex column align_center home_herader pt_4 br_b_5">
                <img src="/images/home/logo-PolariseCapsule.svg" alt="" srcset="" />
                <div className="fw_b fs_6 mb_2">Polarise Capsule </div>
                <div className="fs_2 fw_b text_3">The First bonding curve Launchpad</div>
                <div className="fs_2 fw_b text_3 mb_5">platform on Ton</div>
                <div className="home_herader_btn cursor flex justify_center align_center br_6 py_5 mb_7">
                    <img className="mr_2" src="/images/tab/img-Farming.png" alt="" srcset="" />
                    <div className="fs_3 fw_b">Star a new coin! (Soon)</div>
                </div>
            </div>

            <div className="pa_4">
                <div className="token_issuance p_relative br_5 mb_3">
                    <div className="token_issuance_box flex">
                        <img className="token_img mr_4" src="/images/home/img-Token.svg" alt="" srcset="" />
                        <div className="flex align_center">
                            <div>
                                <div className="fs_4 fw_b mb_4">One-Click Token Issuance</div>
                                <div className="fs_2 text_3 fw_m">The #1 Bonding Curve Launchpad on TON</div>
                            </div>
                            <img className="end_img" src="/images/home/img-One-Click.svg" alt="" srcset="" />
                        </div>
                    </div>
                </div>

                <div className="bonding_issuance p_relative br_5 mb_3">
                    <div className="token_issuance_box flex">
                        <div className="flex align_center mr_4">
                            <img className="end_img" src="/images/home/img-BondingCurvev.svg" alt="" srcset="" />
                            <div className="text_right">
                                <div className="fs_4 fw_b mb_4">Bonding Curve</div>
                                <div className="fs_2 text_3 fw_m">Facilitates fair and transaparent issuance of digital assets.</div>
                            </div>
                        </div>
                        <img className="token_img " src="/images/home/img-Curve.svg" alt="" srcset="" />
                    </div>
                </div>


                <div className="token_issuance p_relative br_5 mb_3">
                    <div className="token_issuance_box flex">
                        <img className="token_img mr_4" src="/images/home/img-ERC1000.svg" alt="" srcset="" />
                        <div className="flex align_center">
                            <div>
                                <div className="fs_4 fw_b mb_4">ERC-1000 Support</div>
                                <div className="fs_2 text_3 fw_m">The launch of the ERC-1000 protocol will also be supported in the future</div>
                            </div>
                            <img className="end_img" src="/images/home/img-erc.svg" alt="" srcset="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage