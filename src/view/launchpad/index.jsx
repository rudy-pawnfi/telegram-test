import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { useEffect } from 'react'
import { useState } from 'react'
import Modal from '../../components/Modal'
import { ApiServe } from '../../service'
import { toFmtThousand } from '../../untils'
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
    const [info, setInfo] = useState({
        endTime: 1730535077
    })
    // const initDataUnsafe = Telegram?.WebApp?.initDataUnsafe

    const initDataUnsafe = {
        user: {
            id: 5354957141
        }
    }
    useEffect(() => {
        init()
    },[])

    const init = async() => {

        const stakeToken = await ApiServe.query('getstaketokens', {
            tg_account: initDataUnsafe.user.id + '',
        })
        
        const stakePoint = await ApiServe.query('getstakepoints', {
            tg_account: initDataUnsafe.user.id + '',
        })
        console.log('stakePoint :>> ', stakePoint);
    }

    const stakePoints = async() => {
        const res = await ApiServe.query('stakepoints', {
            tg_account: initDataUnsafe.user.id + '',
            stake_ts: Math.floor(Date.now() / 1000),
            stake_points: '100',
        })
    }
    const stakeToken = async() => {
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
            const result = await ApiServe.query('staketokens', {
                tg_account: initDataUnsafe.user.id + '',
                wallet_account: tonAddress,
                stake_ts: Math.floor(Date.now() / 1000),
                stake_tokens: 100 * 1e9,
                tx_hash: '100',
            })
        }).catch(err => {
        })
    }
    return (
        <div className="launchpad_page">
            <div className="header_box br_5 flex column justify_end align_center overflow_hidden">
                <img className="mb_2" src={launchpoolIcon} alt="" srcset="" />
                <span className="fs_6 fw_b mb_4">launchpool</span>
                <div className="count_down">
                    <div className="count_down_box flex column align_center">
                        <div className="fs_2 fw_m">
                            进行中
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
                        <div className="fs_2 fw_m">{toFmtThousand(3000000)}</div>
                    </div>
                    <div className="flex justify_between align_center mb_2">
                        <div className="fw_m text_4">项目时长</div>
                        <div className="fs_2 fw_m">4 Days</div>
                    </div>
                    <div className="flex justify_between align_center mb_2">
                        <div className="fw_m text_4">项目结束日期</div>
                        <div className="fs_2 fw_m">May 3 2024</div>
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
                                    <div className="fw_m text_4">分配空投总量！</div>
                                    <div className="fs_2 fw_m">30000 TOKEN</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4">我的质押数量</div>
                                    <div className="fs_2 fw_m">0 TON</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4">我的份额占比</div>
                                    <div className="fs_2 fw_m">00.00%</div>
                                </div>
                                <div className="flex justify_between align_center mb_4">
                                    <div className="fw_m text_4">我的预计空投</div>
                                    <div className="fs_2 fw_m">0 TOKEN</div>
                                </div>

                                <div className="br_6 active pa_4 flex justify_center align_center">
                                    <i className="is_4"></i>
                                    <span className="fs_2 fw_b ml_4">质押10 TON获取空投</span>
                                </div>
                            </div>

                            <div className="flex align_center justify_center mb_3">
                                <img src={PointsPool} alt="" srcset="" />
                                <span className="fs_3 fw_b ml_4">Points Pool</span>
                            </div>

                            <div className="token_name_box pa_6 br_5 mb_3">
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4">分配空投总量</div>
                                    <div className="fs_2 fw_m">30000 TOKEN</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4">我的燃烧积分</div>
                                    <div className="fs_2 fw_m">0 TON</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4">我的份额占比</div>
                                    <div className="fs_2 fw_m">00.00%</div>
                                </div>
                                <div className="flex justify_between align_center mb_4">
                                    <div className="fw_m text_4">我的预计空投</div>
                                    <div className="fs_2 fw_m">0 TOKEN</div>
                                </div>

                                <div className="br_6 active pa_4 flex justify_center align_center">
                                    <i className="is_4"></i>
                                    <span className="fs_2 fw_b ml_4">燃烧100积分</span>
                                </div>
                            </div>
                            

                            <div className="flex align_center justify_center mb_3">
                                <img src={InvitePool} alt="" srcset="" />
                                <span className="fs_3 fw_b ml_4">Invite Pool</span>
                            </div>
                            <div className="token_name_box pa_6 br_5">
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4">分配空投总量</div>
                                    <div className="fs_2 fw_m">30000 TOKEN</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4">我的燃烧积分</div>
                                    <div className="fs_2 fw_m">0 TON</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4">我的份额占比</div>
                                    <div className="fs_2 fw_m">00.00%</div>
                                </div>
                                <div className="flex justify_between align_center mb_4">
                                    <div className="fw_m text_4">我的预计空投</div>
                                    <div className="fs_2 fw_m">0 TOKEN</div>
                                </div>

                                <div className="br_6 active pa_4 flex justify_center align_center">
                                    <i className="is_4"></i>
                                    <span className="fs_2 fw_b ml_4">燃烧100积分</span>
                                </div>
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
            <Modal />
        </div>
    )
}

export default LaunchpadPage