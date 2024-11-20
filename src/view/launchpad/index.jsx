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
import PointsPool from '/images/launchpad/img-PointsPool.png'
import TONPool from '/images/launchpad/img-TONPool.png'

import MadulImg1 from '/images/launchpad/img-1.png'
import MadulImg2 from '/images/launchpad/img-2.png'
import MadulImg3 from '/images/launchpad/img-3.png'
import { Address, beginCell, Cell, loadMessage, storeMessage } from '@ton/core'
import TonWeb from 'tonweb'
import ApiContact from '../../service/contract/handleServe'
import { TonClient } from '@ton/ton'
import LoadingSpinner from '../../components/loadding'
import { useTonClient } from '../../hooks/useTonClient'

const LaunchpadPage = () => {
    const tabList = [
        { lable: 'Pool', value: '1', default: true },
        { lable: 'Project Info', value: '2', default: false },
    ]
    const {client} = useTonClient()
    console.log('client :>> ', client);
    const [tab, setTab] = useState('1')
    const [tonConnectUi] = useTonConnectUI();
    const tonAddress = useTonAddress()
    const { showAlert } = useAlert();
    const [info, setInfo] = useState({
        endTime: 1732554400,
        launchpadAddress: '0QBLM5tohk1hY7EQ7ijaOKVDFH68dpMH76NTllGVKb0MBG54',
        stakeToken: 0.001,
        tokensTotal: 3000000,
        pointsTotal: 3000000,
        stakePoint: 0.1
    })

    const [loadding, setLoadding] = useState(false)

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
    }, [])

    const init = async () => {

        const stakeToken = await ApiServe.query('getstaketokens', {
            tg_account: initDataUnsafe.user.id + '',
        }).catch(err => {
            return { data: {} }
        })

        const stakePoint = await ApiServe.query('getstakepoints', {
            tg_account: initDataUnsafe.user.id + '',
        }).catch(err => {
            return { data: {} }
        })
        const result = await ApiServe.query('userinfo', {
            tg_account: initDataUnsafe.user.id + ''
        }).catch(err => {
            return { data: {} }
        })
        setInfo({
            ...info,
            selfTokens: stakeToken?.data?.self_tokens ? stakeToken?.data?.self_tokens : 0,
            totalTokens: stakeToken?.data?.total_tokens ? stakeToken?.data?.total_tokens : 0,
            selfPoints: stakePoint?.data?.self_points || 0,
            totalPoints: stakePoint?.data?.total_points || 0,
            myPoints: result.data?.total_points || 0
        })
        console.log('info :>> ', info);
    }

    const mtStakePoints = async () => {
        if (info?.myPoints < info?.stakePoint) return setMadul({ visible: true, dec: '您的积分不足，请完成任务获取更多积分。', img: MadulImg1 })
        const res = await ApiServe.query('stakepoints', {
            tg_account: initDataUnsafe.user.id + '',
            stake_ts: Math.floor(Date.now() / 1000),
            stake_points: info?.stakePoint,
        }).catch(err => {
        })
        console.log('res :>> ', res);
        if (res.code !== -1) {
            showAlert('燃烧积分成功', 'success')
        } else {
            showAlert('燃烧积分失败', 'error')
        }
        init()
    }

    const waitForTransaction = async (
        options,
        client
    ) => {
        const { hash, refetchInterval = 1000, refetchLimit=50, address } = options;

        return new Promise((resolve) => {
            let refetches = 0;
            const walletAddress = Address.parse(address);
            const interval = setInterval(async () => {
                refetches += 1;

                console.log("waiting transaction...");
                const state = await client.getContractState(walletAddress);
                if (!state || !state.lastTransaction) {
                    clearInterval(interval);
                    resolve(null);
                    return;
                }
                const lastLt = state.lastTransaction.lt;
                const lastHash = state.lastTransaction.hash;
                const lastTx = await client.getTransaction(
                    walletAddress,
                    lastLt,
                    lastHash
                );

                if (lastTx && lastTx.inMessage) {
                    const msgCell = beginCell()
                        .store(storeMessage(lastTx.inMessage))
                        .endCell();

                    const inMsgHash = msgCell.hash().toString("base64");
                    console.log("InMsgHash", inMsgHash);
                    if (inMsgHash === hash) {
                        clearInterval(interval);
                        resolve(lastTx);
                    }
                }
                if (refetchLimit && refetches >= refetchLimit) {
                    clearInterval(interval);
                    resolve(null);
                }
            }, refetchInterval);
        });
    };
    function handleContractData(data) {
        if (Array.isArray(data)) {
            return data.map(item => handleContractData(item));
          }else if (typeof data === 'bigint') {
          return data.toString();
        } else if (typeof data === 'object' && data !== null) {
          const result = {};
          for (const key in data) {
            result[key] = handleContractData(data[key]);
          }
          return result;
        } else {
          return data;
        }
    }
    const confirmTrade = async () => {
        setMadul({ ...madul, visible: false })
        try {
            setLoadding(true)
            const res = await tonConnectUi.sendTransaction({
                validUntil: Math.floor(Date.now() / 1000) + 1200,
                messages: [
                    {
                        address: info?.launchpadAddress,
                        // address: "0:abffb20ca89eb26709ce50ed8eafaf151948603b85d942638ac15966fc380682", // destination address
                        amount: (info.stakeToken * 1e9).toString(), //Toncoin in nanotons
                        // stateInit: wallet.account.walletStateInit,
                    }
                ]
            })
            const hash = Cell.fromBase64(res.boc)
            .hash()
            .toString("base64");

            const message = loadMessage(
                Cell.fromBase64(res.boc).asSlice()
            );
            console.log('hash :>> ', hash);
            console.log("Message:", message.body.hash().toString("hex"));

            const txFinalized = await waitForTransaction(
                {
                    address: tonConnectUi.account?.address ?? "",
                    hash: hash,
                },
                client
            );

            console.log('txFinalized :>> ', txFinalized);
            console.log('object :>> ', txFinalized.hash().toString('hex'));
            // setTimeout(async () => {
            //     console.log('444 :>> ', 444);
            //     const addressInfo = await ApiContact.query('getTransaction', {
            //         address: '0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU',
            //         limit: 1,
            //         to_lt: 0,
            //         archival: false
            //     }, 'get')
            //     console.log('addressInfo :>> ', addressInfo);
            // }, 5000);
            // addressInfo.last_transaction_id.lt
            // addressInfo.last_transaction_id.hash
            // const cell = Cell.fromBoc(Buffer.from(res.boc, 'base64'))[0];
            // console.log('cell :>> ', cell);
            // const cellHash = cell.hash();
            const result = await ApiServe.query('staketokens', {
                tg_account: initDataUnsafe.user.id + '',
                wallet_account: tonAddress,
                stake_ts: Math.floor(Date.now() / 1000),
                stake_tokens: info.stakeToken,
                // tx_hash: cellHash.toString('hex'),
                tx_hash: txFinalized.hash().toString('hex'),
                stake_dstaddr: info?.launchpadAddress,
                network: 'Testnet',
                tx_lt: Number(handleContractData(txFinalized.lt))
            })
            console.log('result :>> ', result);
            if(result.code !== -1) {
                showAlert('质押成功', 'success')
            }else{
                showAlert('质押失败', 'error')
            }
            setLoadding(false)
            init()
        } catch (error) {
            console.log('error :>> ', error);
            setLoadding(false)
            showAlert('交易失败', 'error')
        }
    }
    const mtStakeToken = async () => {
        if (!tonAddress) return showAlert('请前往task登录', 'warning')
        if(loadding) reutrn
        setMadul({ visible: true, dec: '注意在交易时，要等待钱包确认操作弹窗交易完成', img: MadulImg1, trade: true })
        // tonConnectUi.sendTransaction({
        //     validUntil: Math.floor(Date.now() / 1000) + 1200,
        //     messages: [
        //         {
        //             address: info?.launchpadAddress,
        //             // address: "0:abffb20ca89eb26709ce50ed8eafaf151948603b85d942638ac15966fc380682", // destination address
        //             amount: (info.stakeToken * 1e9).toString(), //Toncoin in nanotons
        //             // stateInit: wallet.account.walletStateInit,
        //         }
        //     ]
        // }).then(async res => {
        //     console.log('res :>> ', res);
        //     const cell = Cell.fromBoc(Buffer.from(res.boc, 'base64'))[0];
        //     const cellHash = cell.hash();
        //     showAlert(cellHash.toString('hex'), 'success')
        //     const result = await ApiServe.query('staketokens', {
        //         tg_account: initDataUnsafe.user.id + '',
        //         wallet_account: tonAddress,
        //         stake_ts: Math.floor(Date.now() / 1000),
        //         stake_tokens: (info.stakeToken * 1e9),
        //         tx_hash: cellHash.toString('hex')
        //     })
        //     console.log('result :>> ', result);
        //     if(result.code !== -1) {
        //         showAlert('质押成功', 'success')
        //     }else{
        //         showAlert('质押失败', 'error')
        //     }
        //     init()
        // }).catch(err => {
        //     showAlert('交易失败', 'error')
        // })
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
                        <div className="fw_m text_4">Total Airdrop Amount</div>
                        <div className="fs_2 fw_m">{toFmtThousand(info.tokensTotal + info.pointsTotal)}</div>
                    </div>
                    <div className="flex justify_between align_center mb_2">
                        <div className="fw_m text_4">Duration</div>
                        <div className="fs_2 fw_m">4 Days</div>
                    </div>
                    <div className="flex justify_between align_center mb_2">
                        <div className="fw_m text_4">End Date</div>
                        <div className="fs_2 fw_m">{getFormatDate(new Date(info.endTime * 1000), "M d y")}</div>
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
                                        <span className="">Airdrop Amount</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({ visible: true, dec: 'The allocated airdrop amount in the TON Pool', img: MadulImg3 })}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{toFmtThousand(info?.tokensTotal)} TOKEN</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="">My Staking Amount</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({ visible: true, dec: 'The total amount you have staked in this pool', img: MadulImg3 })}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{toFmtThousand(info?.selfTokens || 0)} TON</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="">My Share</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({ visible: true, dec: 'The proportion of your staking amount in the current pool. The higher the share, the higher the airdrop you can claim', img: MadulImg3 })}></i>
                                    </div>
                                    <div className="fs_2 fw_m gradient_text">{!info?.totalTokens || info?.totalTokens === 0 ? toFixed(0, 2) : (info?.selfTokens / info?.totalTokens * 100 < 0.01 ? '<0.01' : toFixed(info?.selfTokens / info?.totalTokens * 100, 2))}%</div>
                                </div>
                                <div className="flex justify_between align_center mb_4">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="">{info?.endTime * 1000 > Date.now() ? 'My Airdrop' : 'My Estimated'}</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({ visible: true, dec: 'The airdrop amount you are expected to receive is calculated based on your current share. Please note that as your share fluctuates in real-time, so too will your estimated airdrop amount. The distribution of the airdrop will be concluded within a 24-hour window following the event\'\s conclusion', img: MadulImg3 })}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{toFmtThousand(toFixed(info.tokensTotal * (!info?.totalTokens || info?.totalTokens === 0 ? 0 : info?.selfTokens / info?.totalTokens), 2))} TOKEN</div>
                                </div>


                                {
                                    info?.endTime * 1000 > Date.now() ?
                                        <div className={`br_6 pa_4 flex justify_center align_center ${loadding ? 'button waiting' : 'active'}`} onClick={mtStakeToken}>
                                            {
                                                !loadding && <>
                                                <i className="picon p-icon-airdrop is_4"></i>
                                            <span className="fs_2 fw_b ml_4">Stake {info?.stakeToken} $TON</span>
                                                </>
                                            }
                                        </div>
                                        :
                                        <div className="br_6 active pa_4 flex justify_center align_center" onClick={() => window.open('https://x.com/Polartonlord', '_blank')}>
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
                                        <span className="">Airdrop Amount</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({ visible: true, dec: 'The allocated airdrop amount in the Points Pool', img: MadulImg3 })}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{toFmtThousand(info?.pointsTotal || 0)} TOKEN</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="">My Burned Points</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({ visible: true, dec: 'The total points you have burned during the current event', img: MadulImg2 })}></i>
                                    </div>
                                    <div className="fs_2 fw_m">{toFmtThousand(info?.selfPoints || 0)}</div>
                                </div>
                                <div className="flex justify_between align_center mb_2">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="">My Share</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({ visible: true, dec: 'The proportion of your burned points in the current pool. The higher the share, the higher the airdrop you can claim', img: MadulImg3 })}></i>
                                    </div>
                                    <div className="fs_2 fw_m gradient_text">{!info?.totalPoints || info?.totalPoints === 0 ? toFixed(0, 2) : (info?.selfPoints / info?.totalPoints * 100 < 0.01 ? '<0.01' : toFixed(info?.selfPoints / info?.totalPoints * 100, 2))}%</div>
                                </div>
                                <div className="flex justify_between align_center mb_4">
                                    <div className="fw_m text_4 flex align_center">
                                        <span className="">{info?.endTime * 1000 > Date.now() ? 'My Airdrop' : 'My Estimated'}</span>
                                        <i className="picon p-icon-doubt is_2 ml_2" onClick={() => setMadul({ visible: true, dec: 'The airdrop amount you are expected to receive is calculated based on your current share. Please note that as your share fluctuates in real-time, so too will your estimated airdrop amount. The distribution of the airdrop will be concluded within a 24-hour window following the event\'\s conclusion', img: MadulImg2 })}></i>
                                    </div>
                                    <div className="fs_2 fw_m">
                                        {toFmtThousand(toFixed(info.pointsTotal * (!info?.totalPoints || info?.totalPoints === 0 ? 0 : (info?.selfPoints / info?.totalPoints)), 2))} TOKEN</div>
                                </div>


                                {
                                    info?.endTime * 1000 > Date.now() ?
                                        <div className="br_6 active pa_4 flex justify_center align_center" onClick={mtStakePoints}>
                                            <i className="picon p-icon-combustion is_4"></i>
                                            <span className="fs_2 fw_b ml_4">Burn {info?.stakePoint} points</span>
                                        </div>
                                        :
                                        <div className="br_6 active pa_4 flex justify_center align_center" onClick={() => window.open('https://x.com/Polartonlord', '_blank')}>
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
            <Modal visible={madul.visible} img={madul.img} dec={madul.dec} trade={madul.trade} confirmTrade={confirmTrade} close={() => setMadul({ ...madul, visible: false })} />
        </div>
    )
}

export default LaunchpadPage