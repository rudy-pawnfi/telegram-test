
import { Route, Routes } from 'react-router-dom'
import TabBox from '../components/tab'
import HomePage from '../view/home'
import FarmingPage from '../view/farming'
import TasksPage from '../view/tasks'
import FrensPage from '../view/frens'
import { useEffect } from 'react'
const AppRouter = () => {

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const setHeaderColor = () => {
                const themeParams = window.Telegram.WebApp.themeParams;
                console.log('themeParams :>> ', themeParams);
                if (themeParams.bg_color === '#ffffff') {
                    try {
                        window.Telegram.WebApp.setHeaderColor('#000000');
                    } catch (error) {
                        console.error('设置导航栏背景颜色时出错:', error);
                    }
                } else {
                    try {
                        window.Telegram.WebApp.setHeaderColor('#000000');
                    } catch (error) {
                        console.error('设置导航栏背景颜色时出错:', error);
                    }
                }
            };

            // 初始设置
            setHeaderColor();

            // 监听主题变化
            window.Telegram.WebApp.onEvent('themeChanged', setHeaderColor);
        }
    }, []);
    return (
        <>
            <div className="page">
                <Routes>
                    <Route path={'/telegram-test'} element={<HomePage />} />
                    <Route path={'/telegram-test/farming'} element={<FarmingPage />} />
                    <Route path={'/telegram-test/tasks'} element={<TasksPage />} />
                    <Route path={'/telegram-test/friends'} element={<FrensPage />} />
                </Routes>
            </div>
            <TabBox />
        </>
    )
}

export default AppRouter