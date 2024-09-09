
import './index.scss'
const FarmingPage = () => {

    return(
        <div className="farming_page pa_3">
            <div className="farming_bg flex column align_center justify_between pa_3 mb_3">
                <img src="/images/Farming/img-integral.svg" alt="" srcset="" />
                <div className="text_center">
                    <div className="fs_5 fw_b">UserName</div>
                    <div className="fs_8 fw_b">1,151</div>
                </div>

                <div className="farming_btn cursor flex justify_center align_center br_6 py_5">
                    <img className="mr_2" src="/images/Farming/img-Farming2.png" alt="" srcset="" />
                    <div className="fs_3 fw_b">Farming</div>
                </div>

                {/* <div className="farming_btn_loadding cursor br_6 pa_2 p_relative">
                    <div className="farming_btn_loadding_box_bg"></div>
                    <div className="farming_btn_loadding_box flex justify_center align_center br_6 py_4">
                        <img className="mr_2" src="/images/Farming/img-Farming2.png" alt="" srcset="" />
                        <div className="fs_3 fw_b">Farming</div>
                    </div>
                </div> */}
            </div>

            <div className="br_5 pa_4 dinosaur_box flex column align_center">
                <img className="header_img_box mb_5" src="/images/Farming/img-Tonlord.png" alt="" srcset="" />
                <div className="fs_4 fw_b mb_4">Dinosaur Run ( Soon! )</div>
                <div className="flex align_center justify_center dinosaur_box_box">
                    <img className="mr_2" src="/images/Farming/img-NumberOfLives.png" alt="" srcset="" />
                    <span className="fs_3 fw_b">90</span>
                </div>
            </div>
        </div>
    )
}

export default FarmingPage