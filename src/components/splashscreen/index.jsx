import { useEffect } from 'react';
import './index.scss'
import splashImage from '/images/game/splash-image.jpg'

const SplashScreen = ({ onAnimationEnd, loadding }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onAnimationEnd(); // 动画结束后调用回调函数
        }, 5000); // 显示时间，单位为毫秒
        return () => clearTimeout(timer); // 清理定时器
    }, [onAnimationEnd]);
    return (
      <div className={`splash-screen  ${!loadding && 'splash_screen_out'}`}>
        <img src={splashImage} alt="Splash" />
      </div>
    );
};

export default SplashScreen