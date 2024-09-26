
import { Route, Routes, useLocation } from 'react-router-dom'
import TabBox from '../components/tab'
import HomePage from '../view/home'
import FarmingPage from '../view/farming'
import TasksPage from '../view/tasks'
import FrensPage from '../view/frens'
import ErrorPage from '../view/error'
import PrairiePage from '../view/prairie'
import { useEffect } from 'react'
const AppRouter = () => {
    const location = useLocation()
    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const setHeaderColor = () => {
                const themeParams = window.Telegram.WebApp.themeParams;
                console.log('themeParams :>> ', themeParams);
                if (themeParams.bg_color === '#ffffff') {
                    try {
                        window.Telegram.WebApp.setHeaderColor(location.pathname === '/telegram-test' || location.pathname === '/telegram-test/' ? '#6E19FF' : '#000000');
                    } catch (error) {
                        console.error('设置导航栏背景颜色时出错:', error);
                    }
                } else {
                    try {
                        window.Telegram.WebApp.setHeaderColor(location.pathname === '/telegram-test' || location.pathname === '/telegram-test/' ? '#6E19FF' : '#000000');
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
    }, [location.pathname]);
    return (
        <>
            <div className="page">
                <Routes>
                    <Route path={'/telegram-test'} element={<HomePage />} />
                    <Route path={'/telegram-test/farming'} element={<FarmingPage />} />
                    <Route path={'/telegram-test/tasks'} element={<TasksPage />} />
                    <Route path={'/telegram-test/friends'} element={<FrensPage />} />
                    <Route path={'/telegram-test/prairie'} element={<PrairiePage />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </div>
            <TabBox />
        </>
    )
}

export default AppRouter