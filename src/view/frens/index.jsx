import './index.scss'
import imgIntegral2 from "/images/Frens/img-integral2.svg"
import imgNumberOfLives from '/images/Farming/img-NumberOfLives.png'
import imgPointsRewards from '/images/img-PointsRewards.svg'
import imgDinosaurRun from '/images/img-DinosaurRun.svg'
import imgMoreRewards from '/images/img-MoreRewards.svg'
import { useEffect, useState } from 'react'
import { ApiServe } from '../../service'
import { useTonAddress, useTonWallet } from '@tonconnect/ui-react'
import axios from 'axios';
const FrensPage = () => {

    const wallet = useTonWallet();
    const tonAddress = useTonAddress()
    const [inviteUrl, setInviteUrl] = useState('')
    const [invitInfo, setInvitInfo] = useState({})
    useEffect(() => {
        init()
    },[tonAddress, wallet])

    const init = async() => {
        if(!wallet || !tonAddress) return

        const useInfo = await ApiServe.query('invitinginfo',{
            tg_account: tonAddress
        })
        setInvitInfo(useInfo.data)
        console.log('useInfo :>> ', useInfo);

        const res = await ApiServe.query('getrefcode', {
            tg_account: tonAddress,
            app_name: wallet.appName
        })
        // https://t.me/catizenbot/gameapp?startapp=r_1381_21625278
        // telegram-test
        setInviteUrl(`https://t.me/share/url?url=https://t.me/polarise?ref_code=${res?.data?.ref_code}`)
    }
    const inviteFriends = () => {
        console.log('inviteUrl :>> ', inviteUrl);
        window.open(inviteUrl, '_blank');
    }
    return (
        <div className="frens_page">
            <div className="frens_header_box flex column justify_end align_center mb_4">
                <div className="fs_3 fw_b mb_3">Friends</div>
                <div className="fw_b pb_2">{invitInfo?.friends?.inviting_ts || 0}</div>
            </div>
            <div className="flex justify_center align_center mb_2 number_img">
                <img className="mr_3" src={imgIntegral2} alt="" srcSet="" />
                <div className="fs_2 fw_m mr_3">12</div>

                <img className="mr_3" src={imgNumberOfLives} alt="" srcSet="" />
                <div className="fs_2 fw_m">90</div>
            </div>

            <div className="pa_3">
                <div className="fs_4 fw_b text_center">Invite Friends, Earn Rewards! </div>
                <div className="centernt_box pa_4 flex">

                    <div className="flex column mr_4">
                        <img className="img_1" src={imgPointsRewards} alt="" srcSet="" />
                        <img className="img_2" src={imgDinosaurRun} alt="" srcSet="" />
                        <img className="img_3" src={imgMoreRewards} alt="" srcSet="" />
                    </div>
                    <div className="">
                        <div className="pb_4 centernt_box_border centern_1">
                            <div className="fs_4 fw_b mb_2">Rewards</div>
                            <div className="fs_2 fw_m text_3 ">Earn up to XXX points worth $XXX of referral fees when your friend sign up for a new account using your unqiue referral link </div>
                        </div>

                        <div className="pb_4 centernt_box_border centern_2">
                            <div className="fs_4 fw_b mb_2">Ton Lord Run</div>
                            <div className="fs_2 fw_m text_3 ">Get exclusive play passes for every friend invited to Ton Lord Run Beta</div>
                        </div>

                        <div className="pb_4 centern_3">
                            <div className="fs_4 fw_b mb_2">More Rewards</div>
                            <div className="fs_2 fw_m text_3 ">Invite more friends to earn more rewards!</div>
                        </div>
                    </div>
                </div>
            
                <div className="frens_btn_box flex align_center justify_end">
                    <div className="invite_box fs_3 fw_b flex justify_center align_center mr_4" onClick={inviteFriends}>
                        <i className="picon p-icon-InviteFriends is_2 mr_2"></i>
                        <span className="fs_3 fw_b">Invite Friends</span>
                    </div>
                    <div className="copy_box flex justify_center align_center">
                        <i className="picon p-icon-copy is_2"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrensPage