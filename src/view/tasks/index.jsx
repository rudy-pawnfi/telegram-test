import { useTonAddress, useTonConnectUI, useTonWallet, TonConnectButton } from '@tonconnect/ui-react'
import './index.scss'
import imgicon_1 from '/images/Tasks/icon_1.png'
import imgicon_2 from '/images/Tasks/icon_2.png'
import imgicon_3 from '/images/Tasks/icon_3.png'
import imgicon_4 from '/images/Tasks/icon_4.png'
import imgicon_5 from '/images/Tasks/icon_5.png'
import { reduceLen } from '../../untils'
import { ApiServe } from '../../service'
const TasksPage = () => {


    const [tonConnectUI] = useTonConnectUI();

    const wallet = useTonWallet();
    const tonAddress = useTonAddress()

    console.log('wallet :>> ', wallet);
    const disconnect = async () => {
        ApiServe.query('usersignout',{
            tg_account: tonAddress,
            chain_name: wallet.account.chain,
            wallet_account: ''
        })
        await tonConnectUI.disconnect();
    }
    return (
        <div className="tasks_page">
            <div className="tasks_herader flex column justify_end align_center">
                <div className="fw_b pb_3">Tasks</div>
            </div>
            <div className="pa_3">
                <div className="fs_4 fw_b mb_4 text_center">Capsule Tasks</div>
                <div className="list_box pa_4 flex justify_between align_center mb_3">
                    <div className="flex align_center">
                        <img className="mr_5" src={imgicon_1} alt="" srcSet="" />
                        <div>
                            <div className="fs_2 fw_m">Connect your wallet</div>
                            <div className="fs_2 text_4">+900 BP</div>
                        </div>
                    </div>
                    <div className="tasks_btn go_btn fs_2 fw_b">
                        go
                    </div>
                </div>

                <div className="list_box pa_4 flex justify_between align_center mb_3">
                    <div className="flex align_center">
                        <img className="mr_5" src={imgicon_2} alt="" srcSet="" />
                        <div>
                            <div className="fs_2 fw_m">Login to your account daily</div>
                            <div className="fs_2 text_4">+90 BP</div>
                        </div>
                    </div>
                    <div className="tasks_btn click_btn fs_2 fw_b">
                        <i className="picon p-icon-Finish is_3"></i>
                    </div>
                </div>

                <div className="list_box pa_4 flex justify_between align_center mb_3">
                    <div className="flex align_center">
                        <img className="mr_5" src={imgicon_3} alt="" srcSet="" />
                        <div>
                            <div className="fs_2 fw_m">Follow us on X</div>
                            <div className="fs_2 text_4">+90 BP</div>
                        </div>
                    </div>
                    <div className="tasks_btn click_btn fs_2 fw_b">
                        Claim
                    </div>
                </div>

                <div className="list_box pa_4 flex justify_between align_center mb_3">
                    <div className="flex align_center">
                        <img className="mr_5" src={imgicon_4} alt="" srcSet="" />
                        <div>
                            <div className="fs_2 fw_m">Join our TG community</div>
                            <div className="fs_2 text_4">+90 BP</div>
                        </div>
                    </div>
                    <div className="tasks_btn go_btn fs_2 fw_b">
                        go
                    </div>
                </div>

                <div className="list_box pa_4 flex justify_between align_center mb_3">
                    <div className="flex align_center">
                        <img className="mr_5" src={imgicon_5} alt="" srcSet="" />
                        <div>
                            <div className="fs_2 fw_m">Invited 10 Friends</div>
                            <div className="fs_2 text_4">+90 BP   1/10 frens</div>
                        </div>
                    </div>
                    <div className="tasks_btn go_btn fs_2 fw_b">
                        go
                    </div>
                </div>
            </div>
            <div className="pa_4">
                {
                    wallet ?
                        <div className="flex justify_center align_center wallet_connect mb_2">
                            <div className="mr_3 round_box"></div>
                            <div className="fs_3 fw_b mr_3">{reduceLen(tonAddress)}</div>
                            <i className="picon p-icon-quit is_3" onClick={disconnect}></i>
                        </div>
                    :
                        <div className="flex justify_center align_center wallet_connect mb_2" onClick={() => tonConnectUI.openModal()}>
                            <svg className="icon is_4 mr_3" aria-hidden="true">
                                <use xlinkHref={`#p-icon-TON`}></use>
                            </svg>
                            <div className="fs_3 fw_b">Connect wallet</div>
                        </div>

                }
                <div className="text_center fs_2 fw_m text_4">Complete more tasks to earn more rewards!</div>

                {/* <div className="flex justify_center"><TonConnectButton /></div> */}
            </div>
        </div>
    )
}

export default TasksPage