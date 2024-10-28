import { useMemo } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './index.scss'
import splashImage from '/images/game/splash-image.jpg'
const SplashScreen = ({ onAnimationEnd, loadding }) => {
    const location = useLocation()
    useEffect(() => {
        const timer = setTimeout(() => {
            onAnimationEnd(); // 动画结束后调用回调函数
            sessionStorage.setItem('oneStart', true)
        }, 5000); // 显示时间，单位为毫秒
        return () => clearTimeout(timer); // 清理定时器
    }, [onAnimationEnd]);
    const isShow = useMemo(() => {
        if (location.pathname === '/telegram-test' || location.pathname === '/telegram-test/') {
            const oneStart = sessionStorage.getItem('oneStart')
            if(!oneStart){
                return false
            }
            return true
        }
        return true
    }, [location])
    return (
        <>
            {
                !isShow &&
                <div className={`splash-screen  ${!loadding && 'splash_screen_out'}`}>
                    <img src={splashImage} alt="Splash" />
                </div>
            }
        </>
    );
};

export default SplashScreen