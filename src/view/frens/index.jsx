import './index.scss'
import imgIntegral2 from "/images/Frens/img-integral2.svg"
import imgNumberOfLives from '/images/Farming/img-NumberOfLives.png'
import imgPointsRewards from '/images/5.png'
import imgDinosaurRun from '/images/img-DinosaurRun.svg'
import imgMoreRewards from '/images/img-MoreRewards.svg'
import { useEffect, useState } from 'react'
import { ApiServe } from '../../service'
import { useTonAddress, useTonWallet } from '@tonconnect/ui-react'
import axios from 'axios';
import { useAlert } from '../../components/alertProvider'
import { toFixed } from '../../untils'
const FrensPage = () => {

    const wallet = useTonWallet();
    const tonAddress = useTonAddress()
    const [inviteUrl, setInviteUrl] = useState('')
    const [invitInfo, setInvitInfo] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [refCode, setRefCode] = useState('')
    const { showAlert } = useAlert();
    const initDataUnsafe = Telegram.WebApp.initDataUnsafe
    useEffect(() => {
        init()
    },[tonAddress, wallet])

    const init = async() => {

        const res = await ApiServe.query('getrefcode', {
            tg_account: initDataUnsafe.user.id + '',
            app_name: 'Rudy_test'
        })
        setRefCode(res?.data?.ref_code)
        // https://t.me/catizenbot/gameapp?startapp=r_1381_21625278
        // telegram-testt.me/rudy_pawnfi_bot/polarise
        // https://t.me/rudy_pawnfi_bot/polarise?startapp=polarise_ref_code=ffc09125ee9553c0988b
        setInviteUrl(`https://t.me/share/url?url=https://t.me/rudy_pawnfi_bot/polarise?startapp=ref_code=${res?.data?.ref_code}`)
        const useInfo = await ApiServe.query('invitinginfo',{
            tg_account: initDataUnsafe.user.id + '',
        })
        setInvitInfo(useInfo.data)

        const result = await ApiServe.query('userinfo', {
            tg_account: initDataUnsafe.user.id + ''
        }).catch(err => {
            return {
                data: {}
            }
        })
        setUserInfo(result.data)
        console.log('useInfo :>> ', useInfo);

    }
    const inviteFriends = () => {
        console.log('inviteUrl :>> ', inviteUrl);
        // window.open(inviteUrl, '_blank');
        Telegram.WebApp.openTelegramLink(inviteUrl)
    }

    const copy = () => {
        navigator.clipboard.writeText(`https://t.me/rudy_pawnfi_bot/polarise?startapp=ref_code=${refCode}`).then(() => {
            // 复制成功后显示提示信息
            showAlert('Replicating Success', 'success')
        }).catch(err => {
            console.error('无法复制文本: ', err);
        });
    }
    return (
        <>
        <div className="frens_page">
            <div className="frens_header_box flex column justify_end align_center mb_4">
                <div className="fs_3 fw_b mb_3">Friends</div>
                <div className="fw_b pb_2">{invitInfo?.friends?.length || 0}</div>
            </div>
            <div className="flex justify_center align_center mb_2 number_img">
                <img className="mr_3" src={imgIntegral2} alt="" srcSet="" />
                <div className="fs_2 fw_m mr_3">{toFixed(userInfo?.inviting_points || 0, 2)}</div>

                <img className="mr_3" src={imgNumberOfLives} alt="" srcSet="" />
                <div className="fs_2 fw_m">{invitInfo?.friends?.length || 0}</div>
            </div>

            <div className="pa_3">
                <div className="fs_4 fw_b text_center">Invite Friends, Earn Rewards! </div>
                <div className="centernt_box flex">
                    <img className="img_1" src={imgPointsRewards} alt="" srcSet="" />
                    {/* <div className="flex column mr_4">
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
                    </div> */}
                </div>
            </div>

            
            <div className="copy_box pa_5" onClick={() => {localStorage.clear()}}>clear</div>
        </div>
        <div className="frens_btn_box flex align_center justify_end py_4 ">
            <div className="invite_box fs_3 fw_b flex justify_center align_center mr_4 ml_5" onClick={inviteFriends}>
                <i className="picon p-icon-InviteFriends is_2 mr_2"></i>
                <span className="fs_3 fw_b">Invite Friends</span>
            </div>
            <div className="copy_box flex justify_center align_center mr_4" onClick={copy}>
                <i className="picon p-icon-copy is_2"></i>
            </div>
        </div>
        </>
    )
}

export default FrensPage