import React, { useState, useEffect, useRef } from 'react';

import './index.scss'

const GamePage = () => {

    const [moles, setMoles] = useState(new Array(9).fill(false)); // 地鼠是否出现
    const [time, setTime] = useState(10); // 剩余时间
    const [score, setScore] = useState(0); // 分数
    const [gameRunning, setGameRunning] = useState(false); // 游戏是否正在进行
    const [intervals, setIntervals] = useState({ t1: null, t2: null }); // 保存计时器
    const [musicPlaying, setMusicPlaying] = useState(false); // 控制背景音乐
    const audioRef = useRef(null); // 引用 audio 元素
  
    // 游戏开始
    const startGame = () => {
      setScore(0);
      setTime(10);
      setGameRunning(true);
  
      // 每2秒随机出现地鼠
      const t2 = setInterval(() => {
        const randomMole = Math.floor(Math.random() * 9);
        const newMoles = moles.map((_, index) => index === randomMole);
        setMoles(newMoles);
      }, 2000);
  
      // 每秒减少时间
      const t1 = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(t1);
            clearInterval(t2);
            setGameRunning(false);
            setMoles(new Array(9).fill(false)); // 隐藏所有地鼠
          }
          return prevTime - 1;
        });
      }, 1000);
  
      setIntervals({ t1, t2 });
    };
  
    // 击中地鼠
    const whackMole = (index) => {
      if (moles[index]) {
        setScore(score + 1);
        const newMoles = moles.map((_, i) => (i === index ? false : _));
        setMoles(newMoles);
      }
    };
  
    // 控制背景音乐播放/暂停
    const toggleMusic = () => {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setMusicPlaying(!musicPlaying);
    };
  
    // 组件销毁时清除计时器
    useEffect(() => {
      return () => {
        clearInterval(intervals.t1);
        clearInterval(intervals.t2);
      };
    }, [intervals]);
  
    return (
      <div className="game_page">
        <h1>打地鼠游戏</h1>
        <div className="game-container">
          {/* 背景音乐 */}
          <audio ref={audioRef} src="./images/game/background-music.mp3" loop />
  
          {/* 音乐控制按钮 */}
          <button onClick={toggleMusic}>
            {musicPlaying ? '关闭背景音乐' : '打开背景音乐'}
          </button>
  
          {/* 游戏网格 */}
          <div className="box">
            {moles.map((visible, index) => (
              <img
                key={index}
                src={visible ? './images/game/mouse.png' : './images/game/mouse2.png'}
                alt="地鼠"
                style={{ visibility: visible ? 'visible' : 'hidden' }}
                onClick={() => whackMole(index)}
              />
            ))}
          </div>
          <button onClick={startGame} disabled={gameRunning}>
            {gameRunning ? '游戏进行中...' : '点击开始游戏'}
          </button>
          <div className="times">剩余时间：{time}秒</div>
          <div className="fens">当前得分为：{score}分</div>
        </div>
      </div>
    );
  }

export default GamePage