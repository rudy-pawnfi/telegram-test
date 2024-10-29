
import { Route, Routes, useLocation } from 'react-router-dom'
import TabBox from '../components/tab'
import HomePage from '../view/home'
import FarmingPage from '../view/farming'
import TasksPage from '../view/tasks'
import FrensPage from '../view/frens'
import ErrorPage from '../view/error'
import TestPage from '../view/test'
import GamePage from '../view/game'
import { useEffect, useMemo, useState } from 'react'
import SplashScreen from '../components/splashscreen'
import LaunchpadPage from '../view/launchpad'
const AppRouter = () => {
    const location = useLocation()
    useEffect(() => {
        console.log('location :>> ', location);
        if (window.Telegram?.WebApp) {
            const setHeaderColor = () => {
                const themeParams = window.Telegram.WebApp.themeParams;
                console.log('themeParams :>> ', themeParams);
                if (themeParams.bg_color === '#ffffff') {
                    try {
                        window.Telegram.WebApp.setHeaderColor(location.pathname === '/telegram-test' || location.pathname === '/telegram-test/' ? '#6E19FF' : (location.pathname === '/telegram-test/prairie' ? '#BABBBE' : '#000000'));
                    } catch (error) {
                        console.error('设置导航栏背景颜色时出错:', error);
                    }
                } else {
                    try {
                        window.Telegram.WebApp.setHeaderColor(location.pathname === '/telegram-test' || location.pathname === '/telegram-test/' ? '#6E19FF' : (location.pathname === '/telegram-test/prairie' ? '#BABBBE' : '#000000'));
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

    const className = useMemo(() => {
        if(location.pathname === '/telegram-test/game'){
            return 'page1'
        }
        return 'page'
    },[location])
    
    return (
        <>
            <SplashScreen />
            <div className={className}>
                <Routes>
                    <Route path={'/telegram-test'} element={<HomePage />} />
                    <Route path={'/telegram-test/farming'} element={<FarmingPage />} />
                    <Route path={'/telegram-test/tasks'} element={<TasksPage />} />
                    <Route path={'/telegram-test/friends'} element={<FrensPage />} />
                    <Route path={'/telegram-test/game'} element={<GamePage />} />
                    <Route path={'/telegram-test/launchpad'} element={<LaunchpadPage />} />
                    <Route path={'/telegram-test/test'} element={<TestPage />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </div>
            <TabBox />
        </>
    )
}

export default AppRouter