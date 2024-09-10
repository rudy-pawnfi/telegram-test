import { useNavigate } from 'react-router-dom'
import './index.scss'
import imgHome from '/images/tab/img-Home.png'
import imgFarming from '/images/tab/img-Farming.png'
import imgTasks from '/images/tab/img-Tasks.png'
import imgFrens from '/images/tab/img-Frens.png'
const TabBox = (props) => {

    const navigate = useNavigate()
    // const {list} = props
    const list =[
        {
            label: 'Home',
            icon: imgHome,
            link: '/telegram-test'
        },
        {
            label: 'Farming',
            icon: imgFarming,
            link: '/telegram-test/farming'
        },
        {
            label: 'Tasks',
            icon: imgTasks,
            link: '/telegram-test/tasks'
        },
        {
            label: 'Frens',
            icon: imgFrens,
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