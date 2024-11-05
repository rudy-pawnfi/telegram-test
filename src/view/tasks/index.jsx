import { useTonAddress, useTonConnectUI, useTonWallet, TonConnectButton } from '@tonconnect/ui-react'
import './index.scss'
import imgicon_1 from '/images/Tasks/icon_1.png'
import imgicon_2 from '/images/Tasks/icon_2.png'
import imgicon_3 from '/images/Tasks/icon_3.png'
import imgicon_4 from '/images/Tasks/icon_4.png'
import imgicon_5 from '/images/Tasks/icon_5.png'
import channelIcon from '/images/Tasks/channel.png'
import erc1000Icon from '/images/Tasks/erc1000.png'
import { reduceLen } from '../../untils'
import { ApiServe } from '../../service'
import { useEffect, useMemo, useState } from 'react'
import { useAlert } from '../../components/alertProvider'
import LoadingSpinner from '../../components/loadding'
const TasksPage = () => {


    const [tonConnectUI] = useTonConnectUI();

    const wallet = useTonWallet();
    const tonAddress = useTonAddress()
    const [inviteUrl, setInviteUrl] = useState('')
    const [useInfo, setUseInfo] = useState({})
    const [taskList, setTaskList] = useState([])
    const [invitInfo, setInvitInfo] = useState({})
    const [dayTaskList, setDayTaskList] = useState([])

    const [tonConnectUi] = useTonConnectUI();
    const { showAlert } = useAlert();
    const [isClaim, setIsClaim] = useState('')
    const [loadding, setLoadding] = useState(false)
    const [claimObj, setClaimObj] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
    })
    const initDataUnsafe = Telegram?.WebApp?.initDataUnsafe
    // const initDataUnsafe = {
    //     user: {
    //         id: 5354957141
    //     }
    // }
    console.log('wallet :>> ', wallet);
    useEffect(() => {
        init()
    }, [wallet])

    const sendTrade = async () => {
        if (isClaim === '1') return
        if (!wallet) return login()
        setIsClaim('1')

        tonConnectUi.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 1200,
            messages: [
                {
                    address: "UQBqRYRXnKMKL5IEeXrUVCMqGx0pa4yRsrDrQhtVWwLQ4GPR",
                    // address: "0:abffb20ca89eb26709ce50ed8eafaf151948603b85d942638ac15966fc380682", // destination address
                    amount: (0.001 * 1e9).toString(), //Toncoin in nanotons
                    // stateInit: wallet.account.walletStateInit,
                }
            ]
        }).then(async res => {
            setIsClaim('')
            claimObj[1] = true
            setClaimObj({ ...claimObj })
            localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
        }).catch(err => {
            setIsClaim('')
        })
    }
    const sendTradeClaim = async (task_id) => {
        if (!wallet) return login()
        setIsClaim(task_id)
        const res = await ApiServe.query('usersignin', {
            tg_account: initDataUnsafe.user.id + '',
            chain_name: wallet.account.chain,
            wallet_account: tonAddress
        })
        init()
        setTimeout(() => {
            setIsClaim('')
        }, 1000);
    }
    const finshLogin = async () => {

        setIsClaim('0')
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
        setLoadding(true)
        // showAlert(localStorage.getItem(initDataUnsafe.user.id + 'CLAIM') , 'success')
        console.log('localStorage.getItem(initDataUnsafe.user.id  :>> ', localStorage.getItem(initDataUnsafe.user.id + 'CLAIM') );
        const claimObj = localStorage.getItem(initDataUnsafe.user.id + 'CLAIM') ? JSON.parse(localStorage.getItem(initDataUnsafe.user.id + 'CLAIM')) : {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
        }
        setClaimObj({ ...claimObj })
        const res = await ApiServe.query('getrefcode', {
            tg_account: initDataUnsafe?.user?.id + '',
            app_name: 'Rudy_test'
        }).catch(err => {
            return {data:{ref_code: ''}}
        })
        setInviteUrl(`https://t.me/share/url?url=https://t.me/rudy_pawnfi_bot/polarise?startapp=ref_code=${res?.data?.ref_code}`)

        const result = await ApiServe.query('finishedtaskList', {
            tg_account: initDataUnsafe?.user?.id + '',
        }).catch(err => {
            return { data: { list: [] } }
        })

        setTaskList(result.data.list)
        const useInfores = await ApiServe.query('userinfo', {
            tg_account: initDataUnsafe?.user?.id + ''
        }).catch(err => {
            return {}
        })
        if ((useInfores?.data?.state & 0x02) === 0x02) {
            claimObj[1] = false
            setClaimObj({ ...claimObj })
            localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
        }
        const filterTask5 = result?.data?.list?.filter(val => val.task_id === "5")?.sort((a, b) => b.finish_ts - a.finish_ts)
        const filterTask6 = result?.data?.list?.filter(val => val.task_id === "6")?.sort((a, b) => b.finish_ts - a.finish_ts)
        const filterTask7 = result?.data?.list?.filter(val => val.task_id === "7")?.sort((a, b) => b.finish_ts - a.finish_ts)
        const filterTask8 = result?.data?.list?.filter(val => val.task_id === "8")?.sort((a, b) => b.finish_ts - a.finish_ts)
        const list = []
        if(filterTask5 && filterTask5?.length > 0){
            list.push(filterTask5[0])
        }
        if(filterTask6 && filterTask6?.length > 0){
            list.push(filterTask6[0])
        }
        if(filterTask7 && filterTask7?.length > 0){
            list.push(filterTask7[0])
        }
        if(filterTask8 && filterTask8?.length > 0){
            list.push(filterTask8[0])
        }
        setDayTaskList([...list])
        console.log('list :>> ', list);
        // 过滤排序5,6,7最新的
        // let task5 = result?.data?.list?.find(val => val.task_id === "5")
        // let task6 = result?.data?.list?.find(val => val.task_id === "6")
        // let task7 = result?.data?.list?.find(val => val.task_id === "7")
        // if(!!task5){
        //     if(!isNotNewDay(task5.finish_ts) && !claimObj[4]){
        //         claimObj[4] = false
        //         setClaimObj({ ...claimObj })
        //         localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
        //     }
        // }
        // if(!!task6){
        //     if(!isNotNewDay(task6.finish_ts) && !claimObj[5]){
        //         claimObj[5] = false
        //         setClaimObj({ ...claimObj })
        //         localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
        //     }
        // }
        // if(!!task7){
        //     if(!isNotNewDay(task7.finish_ts) && !claimObj[6]){
        //         claimObj[6] = false
        //         setClaimObj({ ...claimObj })
        //         localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
        //     }
        // }
        setUseInfo(useInfores.data)

        const invit = await ApiServe.query('invitinginfo', {
            tg_account: initDataUnsafe?.user?.id + ''
        }).catch(err => {
            return {}
        })
        setInvitInfo(invit.data)
        setLoadding(false)
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
            setClaimObj({ ...claimObj })
            localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
        }, 2000);
        // Telegram.WebApp.openTelegramLink('https://x.com/elonmusk/status/1836319222982701534')
        // Telegram.WebApp.openLink('https://x.com/elonmusk/status/1836319222982701534')
        window.open('https://x.com/Polartonlord', '_blank')

    }
    const toTg = async (url, index) => {
        claimObj[index] = true
        setClaimObj({ ...claimObj })
        localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
        Telegram.WebApp.openTelegramLink(url)
    }

    const toChannel = async () => {
        claimObj[4] = true
        setClaimObj({ ...claimObj })
        localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
        Telegram.WebApp.openTelegramLink('https://t.me/polartonlord')
    }
    const toWebsite = async (url, index) => {
        claimObj[index] = true
        setClaimObj({ ...claimObj })
        localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
        window.open(url,'_blank')
    }
    

    const claimMt = async (task_name, points, task_id, index) => {
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
            const filterTask5 = result?.data?.list?.filter(val => val.task_id === "5")?.sort((a, b) => b.finish_ts - a.finish_ts)
            const filterTask6 = result?.data?.list?.filter(val => val.task_id === "6")?.sort((a, b) => b.finish_ts - a.finish_ts)
            const filterTask7 = result?.data?.list?.filter(val => val.task_id === "7")?.sort((a, b) => b.finish_ts - a.finish_ts)
            const filterTask8 = result?.data?.list?.filter(val => val.task_id === "8")?.sort((a, b) => b.finish_ts - a.finish_ts)
            const list = []
            if(filterTask5.length > 0){
                list.push(filterTask5[0])
            }
            if(filterTask6.length > 0){
                list.push(filterTask6[0])
            }
            if(filterTask7.length > 0){
                list.push(filterTask7[0])
            }
            if(filterTask8.length > 0){
                list.push(filterTask8[0])
            }
            setDayTaskList([...list])
            if(!!index){
                claimObj[index] = false
                setClaimObj({ ...claimObj })
                localStorage.setItem(initDataUnsafe.user.id + 'CLAIM', JSON.stringify(claimObj))
            }
            setTimeout(() => {
                setIsClaim('')
            }, 1000);
        }).catch(err => {
            return { data: { list: [] } }
        })
    }

    function isNotNewDay(lastTimestamp) {
        if(!lastTimestamp) return false
        let last = lastTimestamp * 1000
        // const currentTime = Date.now(); // 当前时间的时间戳（毫秒）
        
        // 获取当前日期的时间戳（从凌晨12点开始）
        const currentMidnight = new Date();
        currentMidnight.setHours(0, 0, 0, 0); // 设置为当天凌晨12:00
        const currentMidnightTimestamp = currentMidnight.getTime(); // 获取当前日期凌晨的时间戳
        // 如果上次完成任务的时间戳小于今天凌晨12点的时间戳，说明不是新的一天
        return last > currentMidnightTimestamp;


        // const currentTime = Date.now(); // 获取当前时间的时间戳（毫秒）
        // const oneHourInMilliseconds = 60 * 60 * 1000; // 1 小时 = 3600000 毫秒

        // // 比较当前时间和上次任务完成的时间是否相差超过 1 小时
        // return currentTime - last < oneHourInMilliseconds;
    }
    return (
        <>
            {
                loadding ?
                    <LoadingSpinner />
                    :
                    <>
                        <div className="tasks_page">
                            <div className="tasks_herader flex column justify_end align_center">
                                <div className="fw_b pb_3">Tasks</div>
                            </div>
                            <div className="pa_3">
                                <div className="fs_4 fw_b mb_4 text_center">Launchpad Tasks</div>
                                <div className="tasks_list">
                                    <div className="fs_2 fw_b text_center mb_3">Daily</div>
                                    <div className="list_box list_box_3 pa_4 flex justify_between align_center mb_3">
                                        <div className="flex align_center"> 
                                            <img className="mr_5" src={channelIcon} alt="" srcSet="" />
                                            <div>
                                                <div className="fs_2 fw_m">Login to Polar Capsule</div>
                                                <div className="fs_2 text_4">+90 BP</div>
                                            </div>
                                        </div>
                                        {
                                            !!dayTaskList?.find(val => val.task_id === "8") && isNotNewDay(dayTaskList?.find(val => val.task_id === "8")?.finish_ts) ?
                                                <div className="tasks_btn click_btn fs_2 fw_b">
                                                    <i className="picon p-icon-Finish is_3"></i>
                                                </div>
                                                :
                                                (
                                                    <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => claimMt('login to Polar Capsule', 90.00, '8', 7)}>
                                                        {
                                                            isClaim === '8' ?
                                                                <span className="loader"></span>
                                                                :
                                                                <span>Claim</span>
                                                        }
                                                    </div>
                                                )

                                        }
                                    </div>

                                    <div className="list_box list_box_3 pa_4 flex justify_between align_center mb_3">
                                        <div className="flex align_center"> 
                                            <img className="mr_5" src={channelIcon} alt="" srcSet="" />
                                            <div>
                                                <div className="fs_2 fw_m">Visit channel</div>
                                                <div className="fs_2 text_4">+90 BP</div>
                                            </div>
                                        </div>
                                        {
                                            !!dayTaskList?.find(val => val.task_id === "5") && isNotNewDay(dayTaskList?.find(val => val.task_id === "5")?.finish_ts) ?
                                                <div className="tasks_btn click_btn fs_2 fw_b">
                                                    <i className="picon p-icon-Finish is_3"></i>
                                                </div>
                                                :
                                                (
                                                    claimObj[4] ?
                                                        <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => claimMt('Visit channel', 90.00, '5', 4)}>
                                                            {
                                                                isClaim === '5' ?
                                                                    <span className="loader"></span>
                                                                    :
                                                                    <span>Claim</span>
                                                            }
                                                        </div>
                                                        :
                                                        <div className="tasks_btn go_btn fs_2 fw_b" onClick={toChannel}>
                                                            Go
                                                        </div>
                                                )

                                        }
                                    </div>

                                    

                                    <div className="list_box list_box_3 pa_4 flex justify_between align_center mb_3">
                                        <div className="flex align_center">
                                            <img className="mr_5" src={erc1000Icon} alt="" srcSet="" />
                                            <div>
                                                <div className="fs_2 fw_m">Visit ERC-1000 website</div>
                                                <div className="fs_2 text_4">+90 BP</div>
                                            </div>
                                        </div>
                                        {
                                            !!dayTaskList?.find(val => val.task_id === "6") && isNotNewDay(dayTaskList?.find(val => val.task_id === "6")?.finish_ts)?
                                                <div className="tasks_btn click_btn fs_2 fw_b">
                                                    <i className="picon p-icon-Finish is_3"></i>
                                                </div>
                                                :
                                                (
                                                    claimObj[5] ?
                                                        <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => claimMt('Visit ERC-1000 website', 90.00, '6', 5)}>
                                                            {
                                                                isClaim === '6' ?
                                                                    <span className="loader"></span>
                                                                    :
                                                                    <span>Claim</span>
                                                            }
                                                        </div>
                                                        :
                                                        <div className="tasks_btn go_btn fs_2 fw_b" onClick={() => {toWebsite('https://erc1000.polarise.org/ ', 5)}}>
                                                            Go
                                                        </div>
                                                )

                                        }
                                    </div>

                                    <div className="list_box list_box_3 pa_4 flex justify_between align_center mb_3">
                                        <div className="flex align_center">
                                            <img className="mr_5" src={erc1000Icon} alt="" srcSet="" />
                                            <div>
                                                <div className="fs_2 fw_m">Visit Polarise website</div>
                                                <div className="fs_2 text_4">+90 BP</div>
                                            </div>
                                        </div>
                                        {
                                            !!dayTaskList?.find(val => val.task_id === "7") && isNotNewDay(dayTaskList?.find(val => val.task_id === "7")?.finish_ts)?
                                                <div className="tasks_btn click_btn fs_2 fw_b">
                                                    <i className="picon p-icon-Finish is_3"></i>
                                                </div>
                                                :
                                                (
                                                    claimObj[6] ?
                                                        <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => claimMt('Visit Polarise website', 90.00, '7', 6)}>
                                                            {
                                                                isClaim === '7' ?
                                                                    <span className="loader"></span>
                                                                    :
                                                                    <span>Claim</span>
                                                            }
                                                        </div>
                                                        :
                                                        <div className="tasks_btn go_btn fs_2 fw_b" onClick={() => {toWebsite('https://www.polarise.org/', 6)}}>
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
                                                <div className="fs_2 text_4">+200 BP</div>
                                            </div>
                                        </div>
                                        {
                                            (useInfo?.state & 0x02) === 0x02 ?
                                                <div className="tasks_btn click_btn fs_2 fw_b">
                                                    <i className="picon p-icon-Finish is_3"></i>
                                                </div>
                                                :
                                                (
                                                    claimObj[1] ?
                                                        <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => sendTradeClaim('1')}>
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
                                    <div className="fs_2 fw_b text_center mb_3">Basic Tasks</div>
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
                                                        <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => claimMt('Follow us on X', 90.00, '2', 2)}>
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
                                                        <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => claimMt('Join our TG community', 90.00, '3', 3)}>
                                                            {
                                                                isClaim === '3' ?
                                                                    <span className="loader"></span>
                                                                    :
                                                                    <span>Claim</span>
                                                            }
                                                        </div>
                                                        :
                                                        <div className="tasks_btn go_btn fs_2 fw_b" onClick={() => {toTg('https://t.me/polartonlord', 3)}}>
                                                            Go
                                                        </div>
                                                )

                                        }
                                    </div>

                                    <div className="list_box list_box_4 pa_4 flex justify_between align_center mb_3">
                                        <div className="flex align_center">
                                            <img className="mr_5" src={imgicon_3} alt="" srcSet="" />
                                            <div>
                                                <div className="fs_2 fw_m">Follow Polarise on X</div>
                                                <div className="fs_2 text_4">+90 BP</div>
                                            </div>
                                        </div>
                                        {
                                            !!taskList?.find(val => val.task_id === "9") ?
                                                <div className="tasks_btn click_btn fs_2 fw_b">
                                                    <i className="picon p-icon-Finish is_3"></i>
                                                </div>
                                                :
                                                (
                                                    claimObj[7] ?
                                                        <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => claimMt('Follow Polarise on X', 90.00, '9', 7)}>
                                                            {
                                                                isClaim === '9' ?
                                                                    <span className="loader"></span>
                                                                    :
                                                                    <span>Claim</span>
                                                            }
                                                        </div>
                                                        :
                                                        <div className="tasks_btn go_btn fs_2 fw_b" onClick={() => {toWebsite("https://x.com/polariseorg", 7)}}>
                                                            Go
                                                        </div>
                                                )

                                        }
                                    </div>

                                    <div className="list_box list_box_4 pa_4 flex justify_between align_center mb_3">
                                        <div className="flex align_center">
                                            <img className="mr_5" src={imgicon_4} alt="" srcSet="" />
                                            <div>
                                                <div className="fs_2 fw_m">Join Polarise community</div>
                                                <div className="fs_2 text_4">+90 BP</div>
                                            </div>
                                        </div>
                                        {
                                            !!taskList?.find(val => val.task_id === "10") ?
                                                <div className="tasks_btn click_btn fs_2 fw_b">
                                                    <i className="picon p-icon-Finish is_3"></i>
                                                </div>
                                                :
                                                (
                                                    claimObj[8] ?
                                                        <div className="tasks_btn click_btn fs_2 fw_b" onClick={() => claimMt('Join Polarise community', 90.00, '10', 8)}>
                                                            {
                                                                isClaim === '10' ?
                                                                    <span className="loader"></span>
                                                                    :
                                                                    <span>Claim</span>
                                                            }
                                                        </div>
                                                        :
                                                        <div className="tasks_btn go_btn fs_2 fw_b" onClick={() => {toTg("https://t.me/polariseorg", 8)}}>
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
            }

        </>
    )
}

export default TasksPage