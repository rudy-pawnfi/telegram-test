import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from '../../components/alertProvider'
import Modal from '../../components/Modal'
import { ApiServe } from '../../service'
import { toFixed, toFmtThousand } from '../../untils'
import { getFormatDate } from '../../untils/formatDate'
import Countdown from './app/countDown'
import './index.scss'
import launchpoolIcon from '/images/launchpad/img-img-launchpoolIcon.png'
import InvitePool from '/images/launchpad/img-InvitePool.png'
import PointsPool from '/public/images/launchpad/img-PointsPool.png'
import TONPool from '/public/images/launchpad/img-TONPool.png'

const LaunchpadPage = () => {

    const tabList = [
        { lable: '矿池', value: '1' },
        { lable: '项目信息', value: '2' },
    ]
    const [tab, setTab] = useState('1')
    const [tonConnectUi] = useTonConnectUI();
    const tonAddress = useTonAddress()
    const { showAlert } = useAlert();
    const [info, setInfo] = useState({
        endTime: 1730535077,
        launchpadAddress: '0QBLM5tohk1hY7EQ7ijaOKVDFH68dpMH76NTllGVKb0MBG54',
        stakeToken: 1,
        tokensTotal: 3000000,
        pointsTotal: 3000000,
        stakePoint: 100
    })

    const [madul, setMadul] = useState({
        visible: false,
        dec: '',
        img: '',
    })
    const initDataUnsafe = Telegram?.WebApp?.initDataUnsafe

    // const initDataUnsafe = {
    //     user: {
    //         id: 5354957141
    //     }
    // }
    useEffect(() => {
        init()
    },[])

    const init = async() => {

        const stakeToken = await ApiServe.query('getstaketokens', {
            tg_account: initDataUnsafe.user.id + '',
        }).catch(err => {
            return {data:{}}
        })
        
        const stakePoint = await ApiServe.query('getstakepoints', {
            tg_account: initDataUnsafe.user.id + '',
        }).catch(err => {
            return {data:{}}
        })
        const result = await ApiServe.query('userinfo', {
            tg_account: initDataUnsafe.user.id + ''
        }).catch(err => {
            return {data: {}}
        })
        setInfo({
            ...info,
            selfTokens: stakeToken?.data?.self_tokens ? stakeToken?.data?.self_tokens / 1e9 : 0,
            totalTokens: stakeToken?.data?.total_tokens ? stakeToken?.data?.total_tokens / 1e9 : 0,
            selfPoints: stakePoint?.data?.self_points || 0,
            totalPoints: stakePoint?.data?.total_points || 0,
            myPoints: result.data?.total_points || 0
        })
        console.log('info :>> ', info);
    }

    const mtStakePoints = async() => {
        if(info?.myPoints < info?.stakePoint) return setMadul({visible: true, dec: '您的积分不足，请完成任务获取更多积分。', img: TONPool})
        const res = await ApiServe.query('stakepoints', {
            tg_account: initDataUnsafe.user.id + '',
            stake_ts: Math.floor(Date.now() / 1000),
            stake_points: info?.stakePoint,
        })
        init()
    }
    const mtStakeToken = async() => {
        if(!tonAddress) return showAlert('请前往task登录', 'warning')
        tonConnectUi.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 1200,
            messages: [
                {
                    address: info?.launchpadAddress,
                    // address: "0:abffb20ca89eb26709ce50ed8eafaf151948603b85d942638ac15966fc380682", // destination address
                    amount: (info.stakeToken * 1e9).toString(), //Toncoin in nanotons
                    // stateInit: wallet.account.walletStateInit,
                }
            ]
        }).then(async res => {
            const result = await ApiServe.query('staketokens', {
                tg_account: initDataUnsafe.user.id + '',
                wallet_account: tonAddress,
                stake_ts: Math.floor(Date.now() / 1000),
                stake_tokens: (info.stakeToken * 1e9).toString(),
                tx_hash: res.boc,
            })
            init()
        }).catch(err => {
        })
    }
    return (
        <div className="launchpad_page">
            <div className="header_box br_5 flex column justify_end align_center overflow_hidden">
                <img className="mb_2" src={launchpoolIcon} alt="" srcset="" />
                <span className="fs_6 fw_b mb_4">Launchpool</span>
                <div className="count_down">
                    <div className="count_down_box flex column align_center">
                        <div className="fs_2 fw_m">
                            {
                                info?.endTime * 1000 > Date.now() ? '进行中' : '已结束'
                            }
                        </div>
                        <div className="line"></div>
                        <div className="time fs_2 fw_m">
                            <Countdown endTime={info.endTime * 1000} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pa_5">
                <div className="fs_5 fw_b text_center mb_3">tokenname</div>

                <div className="pa_6 br_5 token_name_box mb_3">
                    <div className="flex justify_between align_center mb_2">
                        <div className="fw_m text_4">空投总量</div>
                        <div className="fs_2 fw_m">{toFmtThousand(info.tokensTotal + info.pointsTotal)}</div>
                    </div>
                    <div className="flex justify_between align_center mb_2">
                        <div className="fw_m text_4">项目时长</div>
                        <div className="fs_2 fw_m">4 Days</div>
                    </div>
                    <div className="flex justify_between align_center mb_2">
                        <div className="fw_m text_4">项目结束日期</div>
                        <div className="fs_2 fw_m">{getFormatDate(new Date(info.endTime * 1000),"M d y")}</div>
                    </div>
                </div>

                <div className="tab_list_box token_name_box mb_3 pa_2 br_6">
                    {
                        tabList.map(val =>
                            <div className={`fs_2 fw_b text_center py_4 br_6 ${val.value === tab ? 'active' : ''}`} key={val.value} onClick={() => setTab(val.value)}>
                                {val.lable}
                            </div>
                        )
                    }
                </div>

                {
                    tab === '1' ?
                        <div className="pool_box">
                            <div className="flex align_center justify_center mb_3">
                                <img src={TONPool} alt="" srcset="" />
                                <span className="fs_3 fw_b ml_4">TON Pool</span>
                            </div>

                            <div className="token_name_box pa_6 br_5 mb_3">
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="underline">分配空投总量</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({visible: true, dec: '当前池中所分配用于空投的总数量。', img: TONPool})}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{toFmtThousand(info?.tokensTotal)} TOKEN</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="underline">我的质押数量</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({visible: true, dec: '当前池中所您的质押总数量', img: TONPool})}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{toFmtThousand(info?.selfTokens || 0)} TON</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="underline">我的份额占比</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({visible: true, dec: '当前池中所您质押总数量占池中份额的比例，质押占比越高，所获取的空投额度越高。', img: TONPool})}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{info?.totalTokens === 0 ? toFixed(0, 2) : (info?.selfTokens / info?.totalTokens * 100 < 0.01 ? '<0.01' : toFixed(info?.selfTokens / info?.totalTokens * 100, 2))}%</div>
                                </div>
                                <div className="flex justify_between align_center mb_4">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="underline">{info?.endTime * 1000 > Date.now() ? '我的预计空投' : '我的获取空投'}</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({visible: true, dec: '根据您当前的份额占比，预计可以获得的空投额度。注：由于您当前的份额占比可能会实时变化，预计空投额度也将会实时变化。空投将在活动结束后24小时内完成。', img: TONPool})}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{toFmtThousand(info.tokensTotal * (info?.totalTokens === 0 ? 0 : info?.selfTokens / info?.totalTokens))} TOKEN</div>
                                </div>

                                
                                {
                                    info?.endTime * 1000 > Date.now() ? 
                                    <div className="br_6 active pa_4 flex justify_center align_center" onClick={mtStakeToken}>
                                        <i className="picon p-icon-airdrop is_4"></i>
                                        <span className="fs_2 fw_b ml_4">质押{info?.stakeToken} TON获取空投</span>
                                    </div>
                                    :
                                    <div className="br_6 active pa_4 flex justify_center align_center" onClick={()=> window.open('https://x.com/Polartonlord', '_blank')}>
                                        <i className="picon p-icon-trade is_4"></i>
                                        <span className="fs_2 fw_b ml_4">去DEX中进行交易</span>
                                    </div>
                                }
                            </div>

                            <div className="flex align_center justify_center mb_3">
                                <img src={PointsPool} alt="" srcset="" />
                                <span className="fs_3 fw_b ml_4">Points Pool</span>
                            </div>

                            <div className="token_name_box pa_6 br_5 mb_3">
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="underline">分配空投总量</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({visible: true, dec: '当前池中所分配用于空投的总数量。', img: PointsPool})}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{toFmtThousand(info?.pointsTotal || 0)} TOKEN</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="underline">我的燃烧积分</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({visible: true, dec: '您在当前活动时间内所燃烧积分的总分数', img: PointsPool})}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{toFmtThousand(info?.selfPoints || 0)} TON</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="underline">我的份额占比</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({visible: true, dec: '当前池中所您燃烧积分的总分数占池中份额的比例，质押占比越高，所获取的空投额度越高。', img: PointsPool})}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{info?.totalPoints === 0 ? toFixed(0, 2) : (info?.selfPoints / info?.totalPoints * 100 < 0.01 ? '<0.01' : toFixed(info?.selfPoints / info?.totalPoints * 100, 2))}%</div>
                                </div>
                                <div className="flex justify_between align_center mb_4">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="underline">{info?.endTime * 1000 > Date.now() ? '我的预计空投' : '我的获取空投'}</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({visible: true, dec: '根据您当前的份额占比，预计可以获得的空投额度。注：由于您当前的份额占比可能会实时变化，预计空投额度也将会实时变化。空投将在活动结束后24小时内完成。', img: PointsPool})}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{toFmtThousand(info.pointsTotal * (info?.totalPoints === 0 ? 0 : info?.selfPoints / info?.totalPoints))} TOKEN</div>
                                </div>

                                
                                {
                                    info?.endTime * 1000 > Date.now() ?
                                    <div className="br_6 active pa_4 flex justify_center align_center" onClick={mtStakePoints}>
                                        <i className="picon p-icon-combustion is_4"></i>
                                        <span className="fs_2 fw_b ml_4">燃烧{info?.stakePoint}积分</span>
                                    </div>
                                    :
                                    <div className="br_6 active pa_4 flex justify_center align_center" onClick={()=> window.open('https://x.com/Polartonlord', '_blank')}>
                                        <i className="picon p-icon-trade is_4"></i>
                                        <span className="fs_2 fw_b ml_4">去DEX中进行交易</span>
                                    </div>
                                }
                            </div>
                            
                        </div>
                        :
                        <div className="dec_box">
                            <div className="token_name_box br_5 pa_6">
                                <div className="fs_3 fw_n text_center mb_4">项目简介</div>
                                <div className="text_4 fs_1 fw_m mb_5"></div>

                                <div className="fs_3 fw_n text_center mb_4">项目特点</div>
                                <div className="text_4 fs_1 fw_m mb_5"></div>

                                <div className="fs_3 fw_n text_center mb_4">代币经济学</div>
                                <div className="text_4 fs_1 fw_m mb_5"></div>

                                <div className="fs_3 fw_n text_center mb_4">风险提示</div>
                                <div className="text_4 fs_1 fw_m mb_5"></div>
                            </div>
                        </div>
                }
            </div>
            <Modal visible={madul.visible} img={madul.img} dec={madul.dec} close={() => setMadul({...madul, visible: false})} />
        </div>
    )
}

export default LaunchpadPage