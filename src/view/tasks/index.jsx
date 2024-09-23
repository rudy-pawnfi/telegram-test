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
    validUntil: Math.floor(Date.now() / 1000) + 1200,
    messages: [
        {
            address: "0:abffb20ca89eb26709ce50ed8eafaf151948603b85d942638ac15966fc380682", // destination address
            amount: (0.001 * 1e9).toString(), //Toncoin in nanotons
            // stateInit: 'te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==',
        }
    ]
};
const TasksPage = () => {


    const [tonConnectUI] = useTonConnectUI();

    const wallet = useTonWallet();
    const tonAddress = useTonAddress()
    const [inviteUrl, setInviteUrl] = useState('')
    const [useInfo, setUseInfo] = useState({})
    const [taskList, setTaskList] = useState([])
    const [invitInfo, setInvitInfo] = useState({})

    const [tx, setTx] = useState(defaultTx);
    const [tonConnectUi] = useTonConnectUI();
    const { showAlert } = useAlert();
    const [isClaim, setIsClaim] = useState('')
    const [claimObj, setClaimObj] = useState({
        1: false,
        2: false,
        3: false,
    })
    const initDataUnsafe = Telegram.WebApp.initDataUnsafe
    console.log('wallet :>> ', wallet);
    useEffect(() => {
        init()
    }, [wallet])

    const sendTrade = async () => {
        if(isClaim=== '1') return
        if (!wallet) return login()
        setIsClaim('1')
        tonConnectUi.sendTransaction(defaultTx).then(async res => {
            setIsClaim('')
            claimObj[1] = true
            setClaimObj({...claimObj})
            localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
        }).catch(err => {
            setIsClaim('')
        })
    }
    const finshLogin = async () => {

        setIsClaim('0')
        const res = await ApiServe.query('usersignin', {
            tg_account: initDataUnsafe.user.id + '',
            chain_name: wallet.account.chain,
            wallet_account: tonAddress
        })
        await ApiServe.query('finishtask', {
            tg_account: initDataUnsafe.user.id + '',
            task_id: "0",
            task_name: "Connect your wallet",
            points: 900.00
        })

        const result = await ApiServe.query('finishedtaskList', {
            tg_account: initDataUnsafe.user.id + '',
        }).catch(err => {
            return { data: { list: [] } }
        })
        setTaskList(result.data.list)
        setTimeout(() => {
            setIsClaim('')
        }, 1000);
    }
    const init = async () => {
        const claimObj = localStorage.getItem(initDataUnsafe.user.id + 'CLAIM') ? JSON.parse(localStorage.getItem(initDataUnsafe.user.id + 'CLAIM')) : {
            1: false,
            2: false,
            3: false,
        }
        setClaimObj({...claimObj})
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
        Telegram.WebApp.openTelegramLink(inviteUrl)
    }
    const disconnect = async () => {
        ApiServe.query('usersignout', {
            tg_account: initDataUnsafe.user.id + '',
            chain_name: wallet.account.chain,
            wallet_account: tonAddress
        })
        await tonConnectUI.disconnect();
    }

    const login = async () => {
        tonConnectUI.openModal()
    }
    const toTollow = async () => {
        setTimeout(() => {
            claimObj[2] = true
            setClaimObj({...claimObj})
            localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
        }, 2000);
        // Telegram.WebApp.openTelegramLink('https://x.com/elonmusk/status/1836319222982701534')
        // Telegram.WebApp.openLink('https://x.com/elonmusk/status/1836319222982701534')
        window.open('https://x.com/Polartonlord','_blank')

    }
    const toTg = async () => {
        claimObj[3] = true
        setClaimObj({...claimObj})
        localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
        Telegram.WebApp.openTelegramLink('https://t.me/polartonlord')

    }

    const claimMt = async (task_name, points, task_id) => {
        setIsClaim(task_id)
        await ApiServe.query('finishtask', {
            tg_account: initDataUnsafe.user.id + '',
            task_id: task_id,
            task_name: task_name,
            points: points
        })
        ApiServe.query('finishedtaskList', {
            tg_account: initDataUnsafe.user.id + '',
        }).then(result => {
            setTaskList(result.data.list)
            setTimeout(() => {
                setIsClaim('')
            }, 1000);
        }).catch(err => {
            return { data: { list: [] } }
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
                    <div className="tasks_list">
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
                                    (
                                        !!wallet ?
                                            <div className="tasks_btn click_btn fs_2 fw_b" onClick={finshLogin}>
                                                {/* Claim */}
                                                {
                                                    isClaim === '0' ?
                                                        <span className="loader"></span>
                                                        :
                                                        <span>Claim</span>
                                                }
                                            </div>
                                            :
                                            <div className="tasks_btn go_btn fs_2 fw_b" onClick={() => login()}>
                                                Go
                                            </div>
                                    )
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
                                    (
                                        claimObj[1] ?
                                            <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => claimMt('Login to your account daily', 90.00, '1')}>
                                                {
                                                    isClaim === '1' ?
                                                        <span className="loader"></span>
                                                        :
                                                        <span>Claim</span>
                                                }
                                            </div>
                                            :
                                            <div className="tasks_btn go_btn fs_2 fw_b" onClick={sendTrade}>
                                                {
                                                    isClaim === '1' ?
                                                        <span className="loader"></span>
                                                        :
                                                        <span>Go</span>
                                                }
                                            </div>
                                    )
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
                                    (
                                        claimObj[2] ?
                                            <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => claimMt('Follow us on X', 90.00, '2')}>
                                                {
                                                    isClaim === '2' ?
                                                        <span className="loader"></span>
                                                        :
                                                        <span>Claim</span>
                                                }
                                            </div>
                                            :
                                            <div className="tasks_btn go_btn fs_2 fw_b" onClick={toTollow}>
                                                Go
                                            </div>
                                    )

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
                                    (
                                        claimObj[3] ?
                                            <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => claimMt('Join our TG community', 90.00, '3')}>
                                                {
                                                    isClaim === '3' ?
                                                        <span className="loader"></span>
                                                        :
                                                        <span>Claim</span>
                                                }
                                            </div>
                                            :
                                            <div className="tasks_btn go_btn fs_2 fw_b" onClick={toTg}>
                                                Go
                                            </div>
                                    )

                            }
                        </div>

                        <div className="list_box list_box_5 pa_4 flex justify_between align_center mb_3">
                            <div className="flex align_center">
                                <img className="mr_5" src={imgicon_5} alt="" srcSet="" />
                                <div>
                                    <div className="fs_2 fw_m">Invited 10 Friends</div>
                                    <div className="fs_2 text_4">+90 BP   {invitInfo?.friends?.length || 0}/2 frens</div>
                                </div>
                            </div>
                            {
                                !!taskList?.find(val => val.task_id === "4") ?
                                    <div className="tasks_btn click_btn fs_2 fw_b">
                                        <i className="picon p-icon-Finish is_3"></i>
                                    </div>
                                    :
                                    (
                                        invitInfo?.friends?.length >= 2 ?
                                            <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => claimMt('Invited 10 Friends', 90.00, '4')}>
                                                {
                                                    isClaim === '4' ?
                                                        <span className="loader"></span>
                                                        :
                                                        <span>Claim</span>
                                                }
                                            </div>
                                            :
                                            <div className="tasks_btn go_btn fs_2 fw_b" onClick={inviteFriends}>
                                                Go
                                            </div>
                                    )

                            }
                        </div>
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