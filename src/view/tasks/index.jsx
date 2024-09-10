import './index.scss'
import imgicon_1 from '/images/Tasks/icon_1.png'
import imgicon_2 from '/images/Tasks/icon_2.png'
import imgicon_3 from '/images/Tasks/icon_3.png'
import imgicon_4 from '/images/Tasks/icon_4.png'
import imgicon_5 from '/images/Tasks/icon_5.png'
const TasksPage = () => {

    return (
        <div className="tasks_page">
            <div className="tasks_herader flex column justify_end align_center">
                <div className="fw_b pb_3">Tasks</div>
            </div>
            <div className="pa_3">
                <div className="fs_4 fw_b mb_4">Launchpad Tasks</div>
                <div className="list_box pa_4 flex justify_between align_center mb_4">
                    <div className="flex align_center">
                        <img className="mr_5" src={imgicon_1} alt="" srcSet="" />
                        <div>
                            <div className="fs_2 fw_m">Connect wallet</div>
                            <div className="fs_2 text_4">+900 BP</div>
                        </div>
                    </div>
                    <div className="tasks_btn go_btn fs_2 fw_b">
                        go
                    </div>
                </div>

                <div className="list_box pa_4 flex justify_between align_center mb_4">
                    <div className="flex align_center">
                        <img className="mr_5" src={imgicon_2} alt="" srcSet="" />
                        <div>
                            <div className="fs_2 fw_m">每日签到</div>
                            <div className="fs_2 text_4">+90 BP</div>
                        </div>
                    </div>
                    <div className="tasks_btn click_btn fs_2 fw_b">
                        ✔️
                    </div>
                </div>

                <div className="list_box pa_4 flex justify_between align_center mb_4">
                    <div className="flex align_center">
                        <img className="mr_5" src={imgicon_3} alt="" srcSet="" />
                        <div>
                            <div className="fs_2 fw_m">follow blum on X</div>
                            <div className="fs_2 text_4">+90 BP</div>
                        </div>
                    </div>
                    <div className="tasks_btn click_btn fs_2 fw_b">
                        Claim
                    </div>
                </div>

                <div className="list_box pa_4 flex justify_between align_center mb_4">
                    <div className="flex align_center">
                        <img className="mr_5" src={imgicon_4} alt="" srcSet="" />
                        <div>
                            <div className="fs_2 fw_m">加入TG频道</div>
                            <div className="fs_2 text_4">+90 BP</div>
                        </div>
                    </div>
                    <div className="tasks_btn go_btn fs_2 fw_b">
                        go
                    </div>
                </div>

                <div className="list_box pa_4 flex justify_between align_center mb_4">
                    <div className="flex align_center">
                        <img className="mr_5" src={imgicon_5} alt="" srcSet="" />
                        <div>
                            <div className="fs_2 fw_m">Invited 10 Friends</div>
                            <div className="fs_2 text_4">+90 BP   1/10 frens</div>
                        </div>
                    </div>
                    <div className="tasks_btn go_btn fs_2 fw_b">
                        go
                    </div>
                </div>
            </div>
            <div className="pa_4">
                <div className="flex justify_center align_center wallet_connect mb_2">
                    <svg className="icon is_4 mr_3" aria-hidden="true">
                        <use xlinkHref={`#p-icon-TON`}></use>
                    </svg>
                    <div className="fs_3 fw_b">Connect wallet</div>
                </div>
                <div className="flex justify_center align_center wallet_connect mb_2">
                    <div className="mr_3 round_box"></div>
                    <div className="fs_3 fw_b mr_3">0x816...Dcab6</div>
                    <i className="picon p-icon-quit is_3"></i>
                </div>
                <div className="text_center fs_2 fw_m text_4">Complete tasks to earn points for future airdrops!</div>
            </div>
        </div>
    )
}

export default TasksPage