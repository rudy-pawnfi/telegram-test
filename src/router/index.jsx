
import { Route, Routes } from 'react-router-dom'
import TabBox from '../components/tab'
import HomePage from '../view/home'
import FarmingPage from '../view/farming'
import TasksPage from '../view/tasks'
import FrensPage from '../view/frens'
const AppRouter = () => {

    return(
        <>
            <div className="page">
                <Routes>
                    <Route path={'/'} element={<HomePage />} />
                    <Route path={'/farming'} element={<FarmingPage />} />
                    <Route path={'/tasks'} element={<TasksPage />} />
                    <Route path={'/frens'} element={<FrensPage />} />
                </Routes>
            </div>
            <TabBox />
        </>
    )
}

export default AppRouter