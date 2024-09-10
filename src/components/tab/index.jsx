import { useNavigate } from 'react-router-dom'
import './index.scss'

const TabBox = (props) => {

    const navigate = useNavigate()
    // const {list} = props
    const list =[
        {
            label: 'Home',
            icon: '/images/tab/img-Home.png',
            link: '/telegram-test'
        },
        {
            label: 'Farming',
            icon: '/images/tab/img-Farming.png',
            link: '/telegram-test/farming'
        },
        {
            label: 'Tasks',
            icon: '/images/tab/img-Tasks.png',
            link: '/telegram-test/tasks'
        },
        {
            label: 'Frens',
            icon: '/images/tab/img-Frens.png',
            link: '/telegram-test/frens'
        }
    ]
    const toPage = (val) => {
        navigate(val.link)
    }
    return(
        <div className="tab_box w100">
            {
                list.map(val =>
                    <div className="flex column justify_center align_center" key={val.label} onClick={() => toPage(val)}>
                        <img src={val.icon} alt="" srcset="" className="mb_2" />
                        <span>{val.label}</span>
                    </div>    
                )
            }
        </div>
    )
}
export default TabBox