import {useState, useEffect}  from 'react'
import css from './UserRankInfo.module.scss'
import { useRecoilState } from 'recoil'
import {userSidebarInfoAtom}  from '../../recoil/summonerInfo'

const l = console.log 

export default function UserMain() {

    const [userSidebarInfo, setUserSidebarInfo]  = useRecoilState(userSidebarInfoAtom)
    const [lp_5on5, setLP_5on5] = useState()
    const [lp_solo, setLPSolo] = useState()

    const [winratio_5on5, setWinratio_5on5] = useState()
    const [winratio_solo, setWinratio_solo] = useState()


    useEffect(() => {
        if(userSidebarInfo){
                const lp_5on5Rank =  userSidebarInfo._5on5Rank.tierRank.string.split('(')[1].split(')')[0]
                setLP_5on5(lp_5on5Rank)
                const lp_soloRank = userSidebarInfo.solRank.tierRank.string.split('(')[1].split(')')[0]
                setLPSolo(lp_soloRank)

                const totalMatchCount_5on5 = userSidebarInfo._5on5Rank.wins + userSidebarInfo._5on5Rank.losses
                const winRatio_5on5 =  (userSidebarInfo._5on5Rank.wins / totalMatchCount_5on5 * 100).toFixed(0) + '%'
                setWinratio_5on5(winRatio_5on5)

                const totalMatchCount_solo = userSidebarInfo.solRank.wins + userSidebarInfo.solRank.losses
                const winRatio_solo = (userSidebarInfo.solRank.wins / totalMatchCount_solo * 100).toFixed(0) + '%' 
                setWinratio_solo(winRatio_solo)

        }
    }, [userSidebarInfo])
    /*     
        const sidebarInfo = {
            solRank : basicInfo.summoner.leagues[0],
            // hasResults: true
losses: 702
tierRank: {name: '솔랭', tier: 'Diamond', tierDivision: 'Diamond', string: 'Diamond (267LP)', shortString: 'D1', …}
division: "i"
imageUrl: "https://opgg-static.akamaized.net/images/medals/diamond_1.png"
lp: 267
name: "솔랭"
shortString: "D1"
string: "Diamond (267LP)"
tier: "Diamond"
tierDivision: "Diamond"
tierRankPoint: 454

wins: 463

            _5on5Rank : basicInfo.summoner.leagues[1],
            winRatioFreeSeason : mostInfo.champions,
            winRatio7Days : mostInfo.recentWinRate,
        }
    */

    // l('ASDFuserSidebarInfo', userSidebarInfo && userSidebarInfo._5on5Rank)

    return (
        <>
            {userSidebarInfo && (
                <div className={css.wrapper}>
                    <div className={css.solRankInfo}>
                        <div>
                            <img width="104px" height="104px" src={userSidebarInfo.solRank.tierRank.imageUrl}></img>
                        </div>
                        <div>
                            <p>솔로 랭크</p>
                            <p>탑 (총 27게임) !주의</p>
                            <p className={css.tierRank}>{userSidebarInfo.solRank.tierRank.tier} {userSidebarInfo.solRank.tierRank.shortString.replace(/[^0-9]/g, '')}</p>
                            <div className={css.lpAndWinLose}>
                               <div className={css.lp}>{lp_solo}</div>
                               <div>/ {userSidebarInfo.solRank.wins}승 {userSidebarInfo.solRank.losses}패</div>                               
                            </div>
                            <div>
                                <div>승률 {winratio_solo}</div>                            
                            </div>
                        </div>
                    </div>
                     <div className={css._5on5RankInfo}>
                        <div>
                            <img width="104px" height="104px" src={userSidebarInfo._5on5Rank.tierRank.imageUrl}></img>
                        </div>
                        <div>
                            <p>자유 5:5 랭크</p>
                            <p className={css.tierRank}>{userSidebarInfo._5on5Rank.tierRank.tier} {userSidebarInfo._5on5Rank.tierRank.shortString.replace(/[^0-9]/g, '')}</p>
                            <div className={css.lpAndWinLose}>
                                <div className={css.lp}>{lp_5on5}</div>
                                <div>/ {userSidebarInfo._5on5Rank.wins}승 {userSidebarInfo._5on5Rank.losses}패</div>
                            </div>
                            <div>
                                <div>승률 {winratio_5on5}</div>                            
                            </div>
                        </div>
                    </div>                
                </div>
            )}

        </>
    )
}