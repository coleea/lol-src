import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import {userSidebarInfoAtom}  from '../recoil/summonerInfo'

import css from './UserSidebar.module.scss' 
import UserChampionsWinRatio from './UserSidebar/UserChampionsWinRatio'
import UserRankInfo from './UserSidebar/UserRankInfo'

const winRatioTypeMapper = {
    freeSeasion : 0,
    _7days : 1 ,
}

export default function UserSidebar() {

    const [winRatioType, setWinRatioType] = useState(winRatioTypeMapper.freeSeasion)
    const [winRatioInfo, setWinRatioInfo] = useState()
    const [userSidebarInfo, setUserSidebarInfo]  = useRecoilState(userSidebarInfoAtom)

    useEffect(()=>{
        /* 
          winRatioFreeSeason : mostInfo.champions,
            winRatio7Days : mostInfo.recentWinRate,
        */
        if(userSidebarInfo && winRatioType === winRatioTypeMapper.freeSeasion ) {
            setWinRatioInfo(userSidebarInfo.winRatioFreeSeason)
            
            // userSidebarInfo 
        } else if(userSidebarInfo) {
            setWinRatioInfo(userSidebarInfo.winRatio7Days)

        }

    }, [winRatioType, userSidebarInfo])

    return (
        <>
            <div className={css.wrapper}>
                <UserRankInfo/>
                <UserChampionsWinRatio  />
            </div>
        </>
    )
}