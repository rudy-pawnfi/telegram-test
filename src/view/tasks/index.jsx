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
import { useAlert } from '../../components/alertProvider'
const defaultTx = {
    // The transaction is valid for 10 minutes from now, in unix epoch seconds.
    validUntil: Math.floor(Date.now() / 1000) + 600,
    messages: [

        {
            // The receiver's address.
            address: '0x0000000000000000000000000000000000000000',
            // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
            amount: '0.01',
            // (optional) State initialization in boc base64 format.
            stateInit: 'te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==',
            // (optional) Payload in boc base64 format.
            payload: 'te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==',
        },
    ],
};
const TasksPage = () => {


    const [tonConnectUI] = useTonConnectUI();

    const wallet = useTonWallet();
    const tonAddress = useTonAddress()
    const [inviteUrl, setInviteUrl] = useState('')
    const [useInfo, setUseInfo] = useState({})
    const [loginStatus, setLoginStatus] = useState(false)
    const [taskList, setTaskList] = useState([])
    const [invitInfo, setInvitInfo] = useState({})

    const [tx, setTx] = useState(defaultTx);
    const [tonConnectUi] = useTonConnectUI();
    const { showAlert } = useAlert();
    const [isClaim, setIsClaim] = useState(false)
    const initDataUnsafe = Telegram.WebApp.initDataUnsafe
    console.log('wallet :>> ', wallet);
    useEffect(() => {
        init()
    }, [wallet])
    useEffect(() => {
        loginApi()
    }, [wallet])

    const sendTrade = async () => {
        if (!wallet) return showAlert('Login Wallet', 'warning')
        tonConnectUi.sendTransaction(defaultTx).then(res => {
            ApiServe.query('finishtask', {
                tg_account: initDataUnsafe.user.id + '',
                task_id: "1",
                task_name: "Login to your account daily",
                points: 90
            })
        })
    }
    const loginApi = async () => {
        if (!wallet || !loginStatus) return
        const res = await ApiServe.query('usersignin', {
            tg_account: initDataUnsafe.user.id + '',
            chain_name: wallet.account.chain,
            wallet_account: tonAddress
        })

        await ApiServe.query('finishtask', {
            tg_account: initDataUnsafe.user.id + '',
            task_id: "0",
            task_name: "Connect your wallet",
            points: 900
        })

        setLoginStatus(false)
    }
    const init = async () => {
        const res = await ApiServe.query('getrefcode', {
            tg_account: initDataUnsafe.user.id + '',
            app_name: 'Rudy_test'
        })
        setInviteUrl(`https://t.me/share/url?url=https://t.me/rudy_pawnfi_bot/polarise?startapp=ref_code=${res?.data?.ref_code}`)

        const result = await ApiServe.query('finishedtaskList', {
            tg_account: initDataUnsafe.user.id + '',
        }).catch(err => {
            return { data: { list: [] } }
        })

        setTaskList(result.data.list)
        const useInfo = await ApiServe.query('userinfo', {
            tg_account: initDataUnsafe.user.id + ''
        }).catch(err => {
            return {}
        })
        setUseInfo(useInfo.data)

        const invit = await ApiServe.query('invitinginfo', {
            tg_account: initDataUnsafe.user.id + ''
        }).catch(err => {
            return {}
        })
        setInvitInfo(invit.data)
    }
    const inviteFriends = async () => {
        window.open(inviteUrl, '_blank');
        // await ApiServe.query('finishtask', {
        //     tg_account: tonAddress,
        //     task_id: "4",
        //     task_name: "Invited 10 Friends",
        //     points: 90
        // })
    }
    const disconnect = async () => {
        ApiServe.query('usersignout', {
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
    const toTollow = async () => {
        window.open('https://x.com/elonmusk/status/1836319222982701534', '_blank');
        await ApiServe.query('finishtask', {
            tg_account: initDataUnsafe.user.id + '',
            task_id: "2",
            task_name: "Follow us on X",
            points: 90
        })
    }
    const toTg = async () => {
        window.open('https://t.me/officialvanillafinance ', '_blank');
        await ApiServe.query('finishtask', {
            tg_account: initDataUnsafe.user.id + '',
            task_id: "3",
            task_name: "Join our TG community",
            points: 90
        })
    }
    return (
        <>
            <div className="tasks_page">
                <div className="tasks_herader flex column justify_end align_center">
                    <div className="fw_b pb_3">Tasks</div>
                </div>
                <div className="pa_3">
                    <div className="fs_4 fw_b mb_4 text_center">Capsule Tasks</div>
                    <div className="list_box list_box_1 pa_4 flex justify_between align_center mb_3">
                        <div className="flex align_center">
                            <img className="mr_5" src={imgicon_1} alt="" srcSet="" />
                            <div>
                                <div className="fs_2 fw_m">Connect your wallet</div>
                                <div className="fs_2 text_4">+900 BP</div>
                            </div>
                        </div>
                        {
                            !!taskList?.find(val => val.task_id === "0") ?
                                <div className="tasks_btn click_btn fs_2 fw_b">
                                    <i className="picon p-icon-Finish is_3"></i>
                                </div>
                                :
                                <div className="tasks_btn go_btn fs_2 fw_b" onClick={() => login()}>
                                    Go
                                </div>
                        }

                    </div>

                    <div className="list_box list_box_2 pa_4 flex justify_between align_center mb_3">
                        <div className="flex align_center">
                            <img className="mr_5" src={imgicon_2} alt="" srcSet="" />
                            <div>
                                <div className="fs_2 fw_m">Login to your account daily</div>
                                <div className="fs_2 text_4">+90 BP</div>
                            </div>
                        </div>
                        {
                            !!taskList?.find(val => val.task_id === "1") ?
                                <div className="tasks_btn click_btn fs_2 fw_b">
                                    <i className="picon p-icon-Finish is_3"></i>
                                </div>
                                :
                                <div className="tasks_btn go_btn fs_2 fw_b" onClick={sendTrade}>
                                    Go
                                </div>
                        }

                    </div>

                    <div className="list_box list_box_3 pa_4 flex justify_between align_center mb_3">
                        <div className="flex align_center">
                            <img className="mr_5" src={imgicon_3} alt="" srcSet="" />
                            <div>
                                <div className="fs_2 fw_m">Follow us on X</div>
                                <div className="fs_2 text_4">+90 BP</div>
                            </div>
                        </div>
                        {
                            !!taskList?.find(val => val.task_id === "2") ?
                                <div className="tasks_btn click_btn fs_2 fw_b">
                                    <i className="picon p-icon-Finish is_3"></i>
                                </div>
                                :
                                <div className="tasks_btn go_btn fs_2 fw_b" onClick={toTollow}>
                                    Go
                                </div>
                        }
                    </div>

                    <div className="list_box list_box_4 pa_4 flex justify_between align_center mb_3">
                        <div className="flex align_center">
                            <img className="mr_5" src={imgicon_4} alt="" srcSet="" />
                            <div>
                                <div className="fs_2 fw_m">Join our TG community</div>
                                <div className="fs_2 text_4">+90 BP</div>
                            </div>
                        </div>
                        {
                            !!taskList?.find(val => val.task_id === "3") ?
                                <div className="tasks_btn click_btn fs_2 fw_b">
                                    <i className="picon p-icon-Finish is_3"></i>
                                </div>
                                :
                                <div className="tasks_btn go_btn fs_2 fw_b" onClick={toTg}>
                                    Go
                                </div>
                        }
                    </div>

                    <div className="list_box list_box_5 pa_4 flex justify_between align_center mb_3">
                        <div className="flex align_center">
                            <img className="mr_5" src={imgicon_5} alt="" srcSet="" />
                            <div>
                                <div className="fs_2 fw_m">Invited 10 Friends</div>
                                <div className="fs_2 text_4">+90 BP   {invitInfo?.friends?.inviting_ts || 0}/10 frens</div>
                            </div>
                        </div>
                        {
                            !!taskList?.find(val => val.task_id === "4") ?
                                <div className="tasks_btn click_btn fs_2 fw_b">
                                    <i className="picon p-icon-Finish is_3"></i>
                                </div>
                                :
                                <div className="tasks_btn go_btn fs_2 fw_b" onClick={inviteFriends}>
                                    Go
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className="pa_4 connect_btn">
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
        </>
    )
}

export default TasksPage