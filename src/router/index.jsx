
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
                    <Route path={'/telegram-test'} element={<HomePage />} />
                    <Route path={'/telegram-test/farming'} element={<FarmingPage />} />
                    <Route path={'/telegram-test/tasks'} element={<TasksPage />} />
                    <Route path={'/telegram-test/frens'} element={<FrensPage />} />
                </Routes>
            </div>
            <TabBox />
        </>
    )
}

export default AppRouter