import css from './UserChampionsWinRatio.module.scss'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import {userSidebarInfoAtom}  from '../../recoil/summonerInfo'

const l = console.log

export default function UserMain({}) {

    const [userSidebarInfo, setUserSidebarInfo]  = useRecoilState(userSidebarInfoAtom)

    const [viewtype, setviewtype] = useState('general')

    const [winRatioInfo, setWinRatioInfo] = useState(null)
    
    const [winRatioFreeSeason, setWinRatioFreeSeason] = useState()
    const [winRatio7Days, setWinRatio7Days] = useState()

    useEffect(() => {
        // l('winRatio7Days', winRatio7Days)
    }, [winRatio7Days])

    useEffect(() => {
        // l('갱신됨 userSidebarInfo', userSidebarInfo)

        userSidebarInfo && setWinRatioFreeSeason(_ => userSidebarInfo.winRatioFreeSeason)
        userSidebarInfo && setWinRatio7Days(_ => userSidebarInfo.winRatio7Days)

    }, [userSidebarInfo])

    const toggleviewtype = e => {
        const viewtype = e.target.attributes.viewtype.value
        setviewtype(viewtype)
        l('viewtype', viewtype)
        if(viewtype === 'general') {
            setWinRatioInfo(userSidebarInfo.winRatioFreeSeason)
        } else if(viewtype === '7days') {
            setWinRatioInfo(userSidebarInfo.winRatio7Days)            
        }        
    }

    return (
        <>
            <div className={css.winRatioOption}>
                <div className={css.winRatioType + ' ' + css.itemActive} onClick={toggleviewtype} viewtype='general'>챔피언 승률</div>
                <div className={css.winRatioType} onClick={toggleviewtype} viewtype='7days'>7일간 랭크 승률</div>
            </div>
            {userSidebarInfo && (
                <>
                    <div className={css.wrapper}>
                        {viewtype === 'general' && winRatioFreeSeason && winRatioFreeSeason.map((v,i)=> {
                            const totalGamesPlayed = v.wins  + v.losses
                            const winRatio =  (v.wins / totalGamesPlayed * 100)  | 0
                            const kda = ((v.kills + v.assists) / v.deaths).toFixed(2)
                            return (
                                <div className={css.championWinRateWrapper} key={i}>
                                    <div>
                                            <img className={css.championImg} src={v.imageUrl}></img>
                                    </div>
                                    <div>
                                            <p className={css.upperContents}>{v.name}</p>
                                            <p className={css.bottomContents}>CS {v.cs} (추가필요)</p>
                                    </div>
                                    <div>
                                            <p className={css.upperContents}>{kda} : 1 평점</p>
                                            <p className={css.bottomContents}>{v.kills} / {v.assists} / {v.deaths}</p>                               
                                    </div>
                                    <div>
                                            <p className={css.upperContents}>{winRatio}%</p>
                                            <p className={css.bottomContents}>{totalGamesPlayed}게임</p>                               
                                    </div>                             
                                </div>

                            )
                        })}  
                        {viewtype === '7days' && winRatio7Days.map((v,i)=> {
                            const totalBattles = v.losses + v.wins
                            const winRatio = (v.wins / totalBattles * 100).toFixed(0)
                            const loseRatio = (v.losses / totalBattles * 100).toFixed(0)
                            
                            return (
                                <div className={css.championWinRateWrapper} key={i}>                                    
                                    <div>
                                        <img className={css.championImg} src={v.imageUrl}></img>
                                    </div>
                                    <div>
                                        {v.name}
                                    </div>
                                    <div>
                                        {winRatio}%
                                    </div>
                                    <div className={css.winRatioBar}>
                                        <div className={css.winBar} style={{flexBasis : `${winRatio}%`}}>
                                            {v.wins}승
                                        </div>
                                        <div  className={css.loseBar} style={{flexBasis : `${loseRatio}%`}}>
                                            {v.losses}패
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>             
                </>
            )}

        </>
    )
}


    /* 
        assists: 286
        cs: 122
        deaths: 204
        games: 30
        id: 126
        imageUrl: "https://opgg-static.akamaized.net/images/lol/champion/Jayce.png?image=w_30&v=1"
        key: "Jayce"
        kills: 21
        losses: 24
        name: "제이스"
        rank: 1
        wins: 6
    */