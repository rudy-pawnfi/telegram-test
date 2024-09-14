import { useTonAddress, useTonConnectUI, useTonWallet, TonConnectButton } from '@tonconnect/ui-react'
import './index.scss'
import imgicon_1 from '/images/Tasks/icon_1.png'
import imgicon_2 from '/images/Tasks/icon_2.png'
import imgicon_3 from '/images/Tasks/icon_3.png'
import imgicon_4 from '/images/Tasks/icon_4.png'
import imgicon_5 from '/images/Tasks/icon_5.png'
import { reduceLen } from '../../untils'
import { ApiServe } from '../../service'
import { useEffect, useState } from 'react'
const TasksPage = () => {


    const [tonConnectUI] = useTonConnectUI();

    const wallet = useTonWallet();
    const tonAddress = useTonAddress()
    const [inviteUrl, setInviteUrl] = useState('')
    const [useInfo, setUseInfo] = useState({})
    const [loginStatus, setLoginStatus] = useState(false)
    const [taskList, setTaskList] = useState([])
    const [list, setList] = useState([
        {
            name: "Connect your wallet",
            img: imgicon_1,
            isWallet: true,
            points: 900
        },
        {
            name: "Login to your account daily",
            img: imgicon_2,
            isWallet: false,
            points: 90
        },
        {
            name: "Follow us on X",
            img: imgicon_3,
            isWallet: false,
            points: 90
        },
        {
            name: "Join our TG community",
            img: imgicon_4,
            isWallet: false,
            points: 90
        },
        {
            name: "Invited 10 Friends",
            img: imgicon_1,
            isWallet: true,
            points: 900
        },

    ])
    console.log('wallet :>> ', wallet);
    useEffect(() => {
        init()
    }, [wallet])
    useEffect(() => {
        loginApi()
    },[wallet])
    const loginApi = async () => {
        if(!wallet || !loginStatus) return
        const res = await ApiServe.query('usersignin', {
            tg_account: tonAddress,
            chain_name: wallet.account.chain,
            wallet_account: wallet.account.address
        })

        await ApiServe.query('finishtask', {
            tg_account: tonAddress,
            task_id: "0",
            task_name: "Connect your wallet",
            points: 900
        })
        
        setLoginStatus(false)
    }
    const init = async () => {
        const res = await ApiServe.query('getrefcode', {
            tg_account: tonAddress,
            app_name: wallet.appName
        })
        setInviteUrl(`https://t.me/share/url?url=https://t.me/rudy_pawnfi_bot?ref_code=${res?.data?.ref_code}`)
        
        const useInfo = await ApiServe.query('userinfo',{
            tg_account: tonAddress
        })
        setUseInfo(useInfo.data)
        console.log('useInfo :>> ', useInfo);

        const result = await ApiServe.query('finishedtaskList', {
            tg_account: tonAddress,
        })
        setTaskList(result.data.list)
        console.log('finishedtaskList :>> ', result);
    }
    const disconnect = async () => {
        ApiServe.query('usersignout',{
            tg_account: tonAddress,
            chain_name: wallet.account.chain,
            wallet_account: wallet.account.address
        })
        await tonConnectUI.disconnect();
    }

    const login = async () => {
        tonConnectUI.openModal()
        setLoginStatus(true)
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
                    {
                        wallet ? 
                            <div className="tasks_btn click_btn fs_2 fw_b">
                                <i className="picon p-icon-Finish is_3"></i>
                            </div>
                            :
                            <div className="tasks_btn go_btn fs_2 fw_b" onClick={() => login()}>
                                Go
                            </div>
                    }
                    
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
                        Go
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
                    Go
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
                    Go
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
                        <div className="flex justify_center align_center wallet_connect mb_2" onClick={() => login()}>
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