

import './index.scss'
import TONPool from '/public/images/launchpad/img-TONPool.png'
const Modal = (props) => {
    const { visible, title, icon, img, dec, close, trade, confirmTrade } = props


    const mtClose = async() => {
        if(trade) {
            confirmTrade()
        }else{
            close()
        }
    }
    return (
        <>
            {
                visible &&
                <div className="modal_page" onClick={close}>
                    <div className="modal_box flex column align_center br_5">
                        <img src={img} alt="" srcset="" />
                        <div className="fs_2 fw_m my_4">
                            {dec}
                        </div>
                        <div className="btn_box py_4 text_center br_6 w100 fs_2 fw_m" onClick={mtClose}>OK</div>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal