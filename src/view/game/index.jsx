import { useTonWallet } from '@tonconnect/ui-react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../components/alertProvider';
import { ApiServe } from '../../service';
import TitleImg from '/images/game/title.png'
import OverImg from '/images/game/over.png'
import BGM from '/images/game/bgm.mp3'
import './index.scss'
const TimeCount = 60
let SCORE = 0
let TIME = 10
const GamePage = () => {

    const wallet = useTonWallet();
    const [moles, setMoles] = useState(new Array(10).fill({ visible: false, hit: false })); // 地鼠状态：是否显示、是否被击中
    const [time, setTime] = useState(0); // 剩余时间
    const [score, setScore] = useState(0); // 分数
    const [gameRunning, setGameRunning] = useState(false); // 游戏是否正在进行
    const [intervals, setIntervals] = useState({ t1: null, t2: null, t3: null }); // 保存计时器
    const [musicPlaying, setMusicPlaying] = useState(false); // 控制背景音乐
    const audioRef = useRef(null); // 引用 audio 元素
    const [fadeOut, setFadeOut] = useState(false)
    const navigate = useNavigate()
    const [gameInfo, setGameInfo] = useState({})
    const { showAlert } = useAlert();
    const [loadding, setLoadding] = useState(true)
    const initDataUnsafe = Telegram?.WebApp?.initDataUnsafe
    const [allowNewMole, setAllowNewMole] = useState(true); // 控制新地鼠出现的状态

    // const initDataUnsafe = {
    //     user: {
    //         id: 5354957141
    //     }
    // }

    const init = async() => {
        const res = await ApiServe.query('availableplayinfo', {
            tg_account: initDataUnsafe?.user?.id + '',
            now_ts:Math.floor(new Date().getTime() / 1000)
        }).catch(err => {
            return {data:{}}
        })
        setGameInfo(res?.data)
        console.log('res :>> ', res);
    }
    const submintScor = async() => {
        console.log('1 :>> ', 1);
        const res = await ApiServe.query('finishgroundhog', {
            tg_account: initDataUnsafe?.user?.id + '',
            play_points: SCORE,
            start_ts: Math.floor(new Date().getTime() / 1000) - TimeCount,
            end_ts: Math.floor(new Date().getTime() / 1000),
            count_day: gameInfo?.count_day + 1
        }).catch(err => {
            return {data:{}}
        })
    }
    // 游戏开始
    const startGame = async () => {
        if(gameRunning) return
        const res = await ApiServe.query('availableplayinfo', {
            tg_account: initDataUnsafe?.user?.id + '',
            now_ts:Math.floor(new Date().getTime() / 1000)
        }).catch(err => {
            return {data:{}}
        })
        if(res?.data?.remain_day <= 0) return showAlert('No play pass today', 'warning')
        clearInterval(intervals.t3);
        clearInterval(intervals.t1)
        clearInterval(intervals.t2)
        setMoles(new Array(10).fill({ visible: false, hit: false }))
        setFadeOut(true)
        setAllowNewMole(true)
        setScore(0);
        SCORE = 0
        // TIME = 10
        setTime(TimeCount);
        
        setTimeout(() => {
            setGameRunning(true);
            // 每2秒随机出现地鼠
            const t1 = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime === 0) {
                        // console.log('prevTime :>> ', prevTime);
                        clearInterval(t1);
                        clearInterval(t2);
                        setGameRunning(false);
                        setMoles(new Array(10).fill({ visible: false, hit: false })); // 隐藏所有地鼠
                        return -1
                    }
                    return prevTime - 1;
                });
            }, 1000);
            const t2 = setInterval(() => {
                if (!moles.some(mole => mole.visible)) {
                    const randomMole = Math.floor(Math.random() * 9);
                    setMoles(prevMoles => {
                      const newMoles = prevMoles.map((mole, index) => 
                        index === randomMole ? { visible: true, hit: false } : mole
                      );
          
                      // 设置地鼠在一段时间后消失
                      setTimeout(() => {
                        setMoles(prevMoles => 
                          prevMoles.map((mole, index) => 
                            index === randomMole ? { visible: false, hit: false } : mole
                          )
                        );
                      }, 1000); // 设置消失时间
          
                      return newMoles;
                    });
                  }
            }, 2000);
            // 每秒减少时间
            setIntervals({ t1, t2, t3: null });
        }, 2000);
    };

    useEffect(() => {
        if(time === -1 && !gameRunning){
            init()
            submintScor()
        }
    },[time])

    // 击中地鼠
    const whackMole = (index) => {
        if(!gameRunning) return
        if (moles[index].visible) {
            const newMoles = moles.map((mole, i) => {
              if (i === index) {
                return { visible: false, hit: true }; // 击中后不再可见
              }
              return mole;
            });
            setMoles(newMoles);
            SCORE += 1
            setScore(prevScore => prevScore + 1);
            setAllowNewMole(false);
            // 添加闪现效果
            setTimeout(() => {
              setMoles(prevMoles => 
                prevMoles.map((mole, i) => (i === index ? { visible: false, hit: false } : mole))
              );
            }, 200); // 控制闪现时间

            setTimeout(() => {
                setAllowNewMole(true);
              }, 1000);
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
    useEffect(() => {
        const t3 = setInterval(() => {
            const randomMole = Math.floor(Math.random() * 10);
            const newMoles = moles.map((_, index) => {
                if (index === randomMole) {
                    return { visible: true, hit: false }; // 随机地鼠出现，未被击中
                }
                return { visible: false, hit: false };
            });
            setMoles(newMoles);
        }, 2000);
        setIntervals({t1: null, t2: null, t3: t3})
        setLoadding(true)
        setTimeout(() => {
            setLoadding(false)
        }, 3000);
    },[])

    useEffect(() => {
        if (audioRef.current) {
            toggleMusic()
        }
        init()
    }, []);

    // 组件销毁时清除计时器
    useEffect(() => {
        return () => {
            clearInterval(intervals.t1);
            clearInterval(intervals.t2);
        };
    }, [intervals]);

    const back = () => {
        navigate(-1)
    }
    return (
        <>
            <audio ref={audioRef} src={BGM} loop />
                <div className="game_page">
                    <div className="title_box flex justify_between column">
                        <div className="flex justify_between align_center back_box">
                            <div className="title_round" onClick={back}><i className="picon p-icon-return is_1" /></div>
                            <div className="title_round" onClick={toggleMusic}><i className={`picon ${musicPlaying ? 'p-icon-NormalSound' : 'p-icon-Mute'} is_1`} /></div>
                        </div>
                        {
                            gameRunning ?
                                <>
                                    <div className="btn_box flex justify_center column align_center">
                                        <div className="flex">
                                            <div className="time py_3 text_center mr_4 br_4 flex align_center justify_center" onClick={() => startGame(true)}>
                                                <i className="picon p-icon-Countdown is_3 mr_2"></i>
                                                <span className="fw_b">{time}</span>
                                            </div>
                                            <div className="score1 py_3 text_center br_4 flex align_center justify_center">
                                                <i className="picon p-icon-money is_3 mr_2"></i>
                                                <span className="fw_b">{score}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div></div>
                                </>
                            :
                                (
                                    time !== -1 ?
                                    <div className={`${fadeOut && 'btn_box_fade_out'} btn_box flex justify_center column align_center`}>
                                        <img src={TitleImg} alt="" srcset="" />
                                        <div className="flex">
                                            <div className="start py_3 text_center fw_b mr_4 br_4" onClick={startGame}>NEW</div>
                                            <div className="quite py_3 text_center fw_b br_4" onClick={back}>Quite</div>
                                        </div>
                                    </div>
                                    :
                                    <div className={`${fadeOut && 'btn_box_fadeInDown'} btn_box btn_over flex justify_center column align_center`}>
                                        <img src={OverImg} alt="" srcset="" />
                                        {/* <div className="flex"> */}
                                            <div className="score py_3 text_center br_4 flex column">
                                                <i className="picon p-icon-money is_5"></i>
                                                <span className="fw_b fs_6">+{score}</span>
                                            </div>
                                            <div className="startend py_3 text_center fw_b br_4" onClick={startGame}>Start</div>
                                        {/* </div> */}
                                    </div>
                                )
                                
                        }
                    </div>
                    <div className="px_4 flex justify_center">
                        <div className={`game_box ${!gameRunning && time === -1 && 'game_filter'}`}>
                            {moles.map((mole, index) => (
                                // <div key={index} style={{ display: mole.visible ? 'block' : 'none' }} onClick={() => handleMoleHit(index)}>
                                    <img
                                        className={mole.visible || mole.hit ? 'game_fadeInUp' : 'game_fadeOutDown'}
                                        key={index}
                                        src={
                                            mole.hit
                                            ? './images/game/hit.png' // 击中时显示的图片
                                            : mole.visible
                                            ? './images/game/mouse.png' // 出现时的图片
                                            : './images/game/mouse.png' // 默认图片
                                        }
                                        alt="地鼠"
                                        style={{ visibility: mole.visible || mole.hit ? 'visible' : 'hidden' }} // 隐藏未出现或未被击中的地鼠
                                        onClick={() => whackMole(index)}
                                    />
                                // </div>
                            ))}
                        </div>
                    </div>
                </div>
            {/* } */}
        </>
  );
}


export default GamePage