import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './index.scss'
import splashImage from '/images/game/splash-image.jpg'
const SplashScreen = () => {
    const location = useLocation()
    const [loadding, setLoadding] = useState(true)
    const isShow = useMemo(() => {
        console.log('1 :>> ', 1);
        if (location.pathname === '/telegram-test' || location.pathname === '/telegram-test/') {
            const oneStart = sessionStorage.getItem('oneStart')
            console.log('oneStart :>> ', oneStart);
            if(!oneStart){
                // setLoadding(true)
                return false
            }
            return true
        }
        return true
    }, [location])
    useEffect(() => {
        console.log('isShow :>> ', isShow);
        if(!isShow){
            const timer = setTimeout(() => {
                console.log('动画结束后调用回调函数 :>> ');
                setLoadding(false); // 动画结束后调用回调函数
                sessionStorage.setItem('oneStart', true)
            }, 4000); // 显示时间，单位为毫秒
            return () => clearTimeout(timer); // 清理定时器
        }
    }, [isShow]);
    
    return (
        <>
            <div className={`splash-screen  ${ (isShow || !loadding) && 'splash_screen_out'}`}>
                <img src={splashImage} alt="Splash" />
            </div>
        </>
    );
};

export default SplashScreen