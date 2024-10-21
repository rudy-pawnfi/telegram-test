import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { useEffect, useMemo, useState } from 'react'
import { useAlert } from '../../components/alertProvider'
import ApiContact from '../../service/contract/handleServe'
import { toFixed } from '../../untils'
import { getFormatDate } from '../../untils/formatDate'
import './index.scss'
import headerImg from '/images/prairie/img-PrairieDog2.png'
const PrairiePage = () => {


    const tonAddress = useTonAddress()
    const [mintInfo, setMintInfo] = useState({
        white: {
            startTime: 1729512000,
            endTime: 1729512600,//
            amount: 100,
            address: '0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU'

        },
        public: {
            startTime: 1729513200,
            endTime: 1729513800,
            amount: 100,
            address: '0QCPwqYk_hYpnxTA_2li09mo6VD41UqGr0ftJs0X6ZNMvpas'
        },
        claim: {
            startTime: 1729514400,
        }
    })
    useEffect(() => {
        init()
    },[tonAddress])

    const init = async () => {
        if(!tonAddress) return
        const balance = await ApiContact.query('getAddressBalance',{
                address: tonAddress
            },'get')
        const balance1 = await ApiContact.query('getAddressBalance',{
                address: mintInfo.white.address
            },'get')
        const balance2 = await ApiContact.query('getAddressBalance',{
                address: mintInfo.public.address
            },'get')
        let info = {
            white: {
                ...mintInfo.white,
                amountBalance: balance1?.result ? toFixed(balance1?.result / 1e9, 2) : 0
            },
            public: {
                ...mintInfo.public,
                amountBalance: balance2?.result ? toFixed(balance2?.result / 1e9, 2) : 0
            },
            claim: {
                ...mintInfo.claim,
            },
            amount: mintInfo.amount,
            balance: balance?.result ? toFixed(balance?.result / 1e9, 2) : 0
        }
        console.log('info :>> ', info);
        setMintInfo({...info})
    }
    return (
        <div className="prairie_page">
            <div className="prairie_header pa_4">
                <div className="flex column align_center prairie_header_img mb_3">
                    <img src={headerImg} alt="" srcset="" className="mb_4" />
                    <span className="fw_b fs_6">Prairie dog</span>
                    <div className="flex" style={{gap: '12px'}}>
                        <i className="picon p-icon-etherscan is_5"></i>
                        <i className="picon p-icon-Discord is_5"></i>
                        <i className="picon p-icon-Twitter2 is_5"></i>
                        <i className="picon p-icon-medium is_5"></i>
                    </div>
                    <div className="w50 text_center text_4 fs_2 fw_m">Revolutionize NFT finance with Pawnfi's All-In-One system. Trade</div>
                </div>

                <div className="pa_6 header_box_text br_6 mb_3">
                    <div className="flex justify_between align_center mb_2">
                        <span className="fs_2 fw_m text_4">Price Per Token </span>
                        <span className="fs_2 fw_m">1.00 USDT Per PFT</span>
                    </div>
                    <div className="flex justify_between align_center mb_2">
                        <span className="fs_2 fw_m text_4">Targetde allocation </span>
                        <span className="fs_2 fw_m">0 PFT</span>
                    </div>
                    <div className="flex justify_between align_center mb_2">
                        <span className="fs_2 fw_m text_4">Targetde Raise </span>
                        <span className="fs_2 fw_m"> $2,916,666</span>
                    </div>
                </div>
                <div className="pa_6 header_box_text br_6 mb_3">
                    <div className="flex justify_between align_center mb_2">
                        <span className="fs_2 fw_m text_4">Accept Currency </span>
                        <span className="fs_2 fw_m">USDT</span>
                    </div>
                    <div className="flex justify_between align_center mb_2">
                        <span className="fs_2 fw_m text_4">Network </span>
                        <div className="flex align_center">
                            <svg className="icon is_2 mr_2" aria-hidden="true">
                                <use xlinkHref={`#p-icon-eth2`}></use>
                            </svg>
                            <span className="fs_2 fw_m">Ethereum</span>
                        </div>
                    </div>
                    <div className="flex justify_between mb_2">
                        <span className="fs_2 fw_m text_4 white_space_nowrap w50">Vesting Schedule</span>
                        <span className="fs_2 fw_m w50">15% on TGE, no cliff, 4 months linear vesting</span>
                    </div>
                </div>

                <TimeLineBox mintInfo={mintInfo} />

                <MintBox mintInfo={mintInfo} />
                
                <TableDec />
            </div>
        </div>
    )
}

const MintBox = (props) => {
    const {mintInfo} = props
    const tonAddress = useTonAddress()
    const [ tonConnectUi ] = useTonConnectUI()
    const [loadding, setLoadding] = useState(false)
    const wallet = useTonWallet();
    const { showAlert } = useAlert();
    const progress = useMemo(() => {

        let amountBalance = 0, amount= 0
        if((Date.now())  < (mintInfo?.white?.endTime * 1000)){
            amountBalance = mintInfo.white?.amountBalance
            amount = mintInfo.white?.amount
        }else{
            amountBalance = mintInfo.public?.amountBalance
            amount = mintInfo.public?.amount
        }
        let width = 0
        width = amountBalance === 0 ? 0 : toFixed(amountBalance / amount * 100, 4)
        return width > 100 ? 100 : toFixed(width || 0,2)

    },[mintInfo])

    const sendTrade = async () => {
        if(!tonAddress) return tonConnectUi.openModal()
        if(mintInfo.balance < 5) return showAlert('余额不足', 'warning')
        if((Date.now()) < (mintInfo?.white?.startTime * 1000)  || ((Date.now()) < (mintInfo?.public?.startTime * 1000) && (Date.now()) > (mintInfo?.white?.endTime * 1000)) ) return showAlert('筹集活动还未开始', 'warning')
        if((Date.now()) > (mintInfo?.public?.endTime * 1000)) return showAlert('活动结束', 'warning')
        setLoadding(true)
        let address = ''
        let amount = 0, maxAmount=0
        if((Date.now())  < (mintInfo?.white?.endTime * 1000)){
            address = mintInfo?.white?.address
            amount = mintInfo?.white?.amountBalance
            // maxAmount = mintInfo?.white?.amount
        }else{
            address = mintInfo?.public?.address
            amount = mintInfo?.public?.amountBalance
            // maxAmount = mintInfo?.public?.amount
        }
        // if(amount > maxAmount){
        //     setLoadding(false)
        //     return showAlert('已筹满', 'warning')
        // } 
        tonConnectUi.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 1200,
            messages: [
                {
                    address: address,
                    amount: (5 * 1e9).toString(), //Toncoin in nanotons
                    stateInit: wallet.account.walletStateInit,
                }
            ]
        }).then(async res => {
            init()
            setLoadding(false)
        }).catch(err => {
            setLoadding(false)
        })
    }
    return(
        <>
        {
            (Date.now()) > (mintInfo?.claim?.startTime * 1000) ?
            <div className="mint_box pa_6 br_6 mb_3 text_center">
                <div className="fs_5 fw_b text_center mb_4">Airdrop</div>
                <img src={headerImg} alt="" srcset="" className="" />
                <div className="fs_5 fw_b text_center">空投已发放！请在钱包中查收。</div>
                
            </div>
        :
            <div className="mint_box pa_6 br_6 mb_3">
                <div className="fs_5 fw_b text_center mb_4">{(Date.now()) < (mintInfo?.white?.endTime * 1000) ? 'White List' : 'Public List'}</div>
                <div className="flex justify_between align_center mb_4">
                    <div className="flex align_center">
                        <svg className="icon is_5 mr_3" aria-hidden="true">
                            <use xlinkHref={`#p-icon-usdt`}></use>
                        </svg>
                        <span className="fs_4 fw_b">{(Date.now()) < (mintInfo?.white?.endTime * 1000) ? (mintInfo?.white?.amountBalance || '- -') : (mintInfo?.public?.amountBalance || '- -')}USDT</span>
                    </div>
                    <span className="fs_4 fw_b">3 USDT / PFT</span>
                </div>

                <div className="flex justify_between align_center mb_4">
                    <span className="fs_2 fw_b">Progress {progress}%</span>
                    <span className="fs_2 fw_b"> {(Date.now()) < (mintInfo?.white?.endTime * 1000) ? ((mintInfo?.white?.amountBalance || '- -') + '/' + mintInfo?.white?.amount) : ((mintInfo.public?.amountBalance  || '- -') + '/' + mintInfo?.white?.amount)} PFT</span>
                </div>

                <div className="progress_box br_7 pa_2 mb_4">
                    <div className="progress_box_box br_7" style={{width: progress + '%'}}></div>
                </div>

                <div className="flex justify_between align_center mb_2">
                    <span className="fs_2 fw_m text_4">Per Wallet Purchase</span>
                    <span className="fs_2 fw_m"> 5 PFT</span>
                </div>
                {/* <div className="flex justify_between align_center mb_2">
                    <span className="fs_2 fw_m text_4">My Reservation</span>
                    <span className="fs_2 fw_m">- - PFT</span>
                </div> */}
                <div className="flex justify_between align_center mb_4">
                    <span className="fs_2 fw_m text_4">Wallet Balance</span>
                    <span className="fs_2 fw_m">{mintInfo?.balance || '--'} USDT</span>
                </div>

                <div className="mint_btn br_7 text_center fs_4 fw_b" onClick={sendTrade}>
                    
                    {
                        loadding ?
                        <span className="loader"></span>
                        :
                        <span>Revelation </span>
                    }
                </div>
            </div>
            }
        </> 
    )
}



const TimeLineBox = (props) => {

    const {mintInfo} = props
    return(
        <div className="time_line_box br_6 pa_6 mb_3">
            <div className="time_box_list mb_4">
                    <div className="fs_2 fw_b flex column align_center justify_center">White List</div>
                    <div className="fs_2 fw_b flex column align_center justify_center">Public List</div>
                    <div className="fs_2 fw_b flex column align_center justify_center">Airdrop PFT</div>
                </div>
                <div className="time_box_list mb_4">
                    <div className="flex column align_center justify_center">
                        <div className="new_b_g_1 br_7 bd round_box flex column align_center justify_center ">
                            <div className={`${(Date.now()) > (mintInfo?.white?.startTime * 1000) && (Date.now()) < (mintInfo?.white?.endTime * 1000) ? 'b_g_1' : '' } br_7`}></div>
                        </div>
                    </div>
                    <div className="flex column align_center justify_center">
                        <div className="new_b_g_1 br_7 bd round_box flex column align_center justify_center ">
                            <div className={`${(Date.now()) > (mintInfo?.public?.startTime * 1000) && (Date.now()) < (mintInfo?.public?.endTime * 1000) ? 'b_g_1' : '' } br_7`}></div>
                        </div>
                    </div>
                    <div className="flex column align_center justify_center">
                        <div className="new_b_g_1 br_7 bd round_box flex column align_center justify_center ">
                            <div className={`${(Date.now()) > (mintInfo?.claim?.startTime * 1000) ? 'b_g_1' : ''} br_7`}></div>
                        </div>
                    </div>
                    <div className="line_box"></div>
                </div>
                <div className="time_box_list text_4">
                    <div className="fs_1 fw_m text_center ">
                        {getFormatDate(new Date(mintInfo?.white?.startTime * 1000),"M d y h:i P u")}
                    </div>
                    <div className="fs_1 fw_m text_center ">
                    {getFormatDate(new Date(mintInfo?.public?.startTime * 1000),"M d y h:i P u")}
                    </div>
                    <div className="fs_1 fw_m text_center ">TBU</div>
                </div>
        </div>
    )
}


const TableDec = () => {
    const tabList = [
        {title: 'Overview', value: '1'},
        {title: 'Tokenomics', value: '2'},
    ]
    const [tab, setTab] = useState('1')
    return(
        <div className="table_dec">
            <div className="table_dec_box mb_5">
                <div className="table_dec_list">
                    {
                        tabList.map((val, index) => 
                            <div 
                                className={`py_5 text_center cursor fs_2 fw_600 new_text_2 white_space_nowrap ${tab === val.value ? 'active' : ''}`} 
                                key={index}
                                onClick={() => {setTab(val.value)}}
                            >
                                {val.title}
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="table_dec_list_1 fs_2 fw_m text_4">
            {
                tab === '1' &&
                <>
                    <div className="mb_3 flex align_center">
                        <span className="fs_2 fw_m text_2">Polarise Platform</span>
                    </div>
                    <div className="br_3 text_box">
                        <div className='mb_2'>
                        Polarise Protocol, the trailblazing multi-chain AI asset solution and liquidity platform, aims to be the innovative, multi-chain, multi-form crypto asset financial platform that will revolutionize multi-form crypto asset finance (including ERC-721, ERC-20, Ordinals NFT, AI nodes, BRC-20 and Runes) with secure and easy-to-use financial tools such as flash (instantaneous) trade, consignment with immediate floor price liquidity, and provision of almost 100% LTV loan without mid-term liquidation risk.
                        </div>
                    </div>
                    <div className="mb_3 flex align_center">
                        <span className="fs_3 fw_m text_2">Polar Fighters</span>
                    </div>
                    <div className="br_3 text_box">
                        <div className='mb_2'>
                        Polar Fighters, the first ever ERC-1000 standard NFT collection, represents a premier collection of core privilege NFTs for Polarise, the trailblazing initiator of NFT liquidity. Its corresponding ERC-20 asset is $PFT (each Polar Fighters NFT can be converted interchangeably with 1000 $PFT). The sale of Polar Fighters will comprise of a whitelist ERC-20 mint and IDO across multiple platforms. The whitelist will grant an ERC-20 mint quota, with specific amounts to be determined.
                        </div>
                    </div>
                    <div className="mb_3 flex align_center">
                        <span className="fs_3 fw_m text_2">Polar Fighters NFT Benefits</span>
                    </div>
                    <div className="br_3 text_box">
                        <div className='mb_2'>
                        · First ever collection of ERC-1000
                        </div>
                        <div className='mb_2'>
                        · Top-tier institutional investment in the platform
                        </div>
                        <div className='mb_2'>
                        · Platform-level core identity NFTs
                        </div>
                        <div className='mb_2'>
                        · Additional platform rewards upon staking
                        </div>
                        <div className='mb_2'>
                        · Priority access to Launchpad projects
                        </div>
                        <div className='mb_2'>
                        · Airdrops of platform and Layer 2 tokens
                        </div>
                    </div>
                    <div className="mb_3 flex align_center">
                        <span className="fs_3 fw_m text_2">What is Polar Fighters?</span>
                    </div>
                    <div className="br_3 text_box">
                        <div className='mb_2'>
                        Polar Fighters, the inaugural ERC-1000 collection, represents a premier collection of core privilege tokens for Polarise Protocol, the trailblazing multi-chain AI asset solution and liquidity platform. 1,000 Polar Fighters ERC-20 tokens NFTs can be converted to one PolarFighters NFT and vice versa.
                        </div>
                    </div>
                    
                </>
            }
            {
                tab === '2' &&
                <>
                    <div className="mb_3 flex align_center">
                        <span className="fs_3 fw_m text_2">Supply</span>
                    </div>
                    <div className=" br_3  text_box">
                        <div className="mb_2">
                        3,000,000 ERC-20 Tokens(The initial circulation will be below 6.2%)
                        </div>
                    </div>
                    <div className="mb_3 flex align_center">
                        <span className="fs_3 fw_m text_2">Token Utilities</span>
                    </div>
                    <div className=" br_3 text_box">
                        <div className="mb_2">
                        1. First ever collection of ERC-1000 NFTs: possess novelty value
                        </div>
                        <div className="mb_2">
                        2. Business Utility: Enables priority access to Launchpad projects
                        </div>
                        <div className="mb_2">
                            3. Community Utility: functions as the IDs and verification of Polarise community members
                        </div>
                        <div className="mb_2">
                            4. Investor Utility: Awards revenue share for LP and launchpad
                        </div>
                    </div>

                    <div className="mb_3 flex align_center">
                        <span className="fs_3 fw_m text_2">Token Metrics</span>
                    </div>
                    <div className=" br_3 text_box">
                        <img src="/images/launchpad/tokenMetrics.png" alt="" srcset=""  className="w100"/>
                    </div>

                    <div className=" bd bd_c_1 br_3">
                    Note:The initial circulation, representing 36.7% of total tokens, will comprise of Crowdsale - IDO/IEO, Crowdsale - NFT Whitelists, Market Liquidity. Majority of the locked tokens have a cliff of 6 - 12 months, with 6 months vesting.
                    </div>

                </>
            }
            </div>
        </div>
    )
}
export default PrairiePage