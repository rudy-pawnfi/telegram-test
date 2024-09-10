import { useLocation, useNavigate } from 'react-router-dom'
import './index.scss'
const TabBox = (props) => {

    const navigate = useNavigate()
    const location = useLocation()
    console.log('location :>> ', location);
    // const {list} = props
    const list =[
        {
            label: 'Home',
            icon: 'p-icon-Home',
            link: '/telegram-test'
        },
        {
            label: 'Farming',
            icon: 'p-icon-Farming',
            link: '/telegram-test/farming'
        },
        {
            label: 'Tasks',
            icon: 'p-icon-Tasks',
            link: '/telegram-test/tasks'
        },
        {
            label: 'Frens',
            icon: 'p-icon-InviteFriends',
            link: '/telegram-test/frens'
        }
    ]
    const toPage = (val) => {
        navigate(val.link)
    }
    const active = (val) => {
        if(location.pathname === val.link || location.pathname === '/telegram-test/') return 'text_2'
        return 'text_4'
    }
    return(
        <div className="tab_box w100">
            {
                list.map(val =>
                    <div className={`flex column align_center ${active(val)}`} key={val.label} onClick={() => toPage(val)}>
                        {/* <img src={val.icon} alt="" srcSet="" className="mb_2" /> */}
                        <i className={`picon is_4 ${val.icon}`} />
                        <span className="fw_m">{val.label}</span>
                    </div>    
                )
            }
        </div>
    )
}
export default TabBox