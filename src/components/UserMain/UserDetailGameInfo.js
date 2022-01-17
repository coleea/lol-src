import css from './UserDetailGameInfo.module.scss'
import {useState, useRef, useEffect} from 'react'
import {matchHistoryDetailInfoAtom} from '../../recoil/summonerInfo'
import { useRecoilState } from 'recoil'

const l = console.log
const booleanToWinOrLoseMapper = {
    true : '승리',
    false : '패배',
}

export default function UserMain() {

    const [matchHistoryDetailInfo, setMatchHistoryDetailInfo]  = useRecoilState(matchHistoryDetailInfoAtom)
    const itemToolTipRef = useRef(null)
    const [itemsInfo, setItemsInfo] = useState()
    
    const requestItemsInfo = async () => {
        const dbRes = await fetch('http://ddragon.leagueoflegends.com/cdn/10.15.1/data/ko_KR/item.json')
                .then(r=>r.json())
        // l('dbRes', dbRes.data)       
        setItemsInfo(_ => dbRes.data)
    }

    useEffect(() => {
        // l('itemsInfo', itemsInfo)
    }, [itemsInfo])


    useEffect(() => {
        requestItemsInfo()
    }, [])

    const calculatePassedTime = (v) => {

        const now = new Date()
        const gameDate = new Date(v.createDate * 1000) 
        const diffTime = Math.abs(now - gameDate);
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60)); 
        const diffDays =  Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
        
        if(diffDays < 1) {
            return diffHours + '시간 전'
        } else {
            return diffHours + '일 전'
        }
    }

    const calculatePlayaTime = (v) => {

        const gamePlayMinutes =  (v.gameLength / 60) | 0
        const gamePlaySeconds =  (v.gameLength % 60)
        const gamePlayHour =  (gamePlayMinutes / 60) | 0
        return {gamePlaySeconds, gamePlayMinutes, gamePlayHour}
    }

    const showItemToolTip = e => {

        itemToolTipRef.current.style.display = 'block'
        const itemNumber = e.currentTarget.attributes.itemnumber.value
        const itemInfo = itemsInfo[itemNumber]
        const itemName = itemInfo.name
        const itemDescription = itemInfo.description
        const basePrice = itemInfo.gold.base
        const sellPrice = itemInfo.gold.sell

        const itemHTML =  `
            <div class="${css.itemToolTipUpperSide} itemToolTip" 
                style="top : 0px">
                <b style="color: #00cfbc">${itemName}</b>
                <br/>
                ${itemDescription}
                <br/>
                <br/>
                가격: 
                <span style="color: #ffc659">${basePrice} (${sellPrice})</span>
            </div>                 
        `

        itemToolTipRef.current.innerHTML = itemHTML

        const itemToolTipElem = document.querySelector('.itemToolTip')

        // css.itemToolTipBottomSide

        if(e.clientY < itemToolTipElem.getBoundingClientRect().height + 200) {
            l('아래로 배치할것')
            const newY = e.currentTarget.offsetTop + e.currentTarget.getBoundingClientRect().height + 10
            itemToolTipElem.style.top = newY + 'px'

            const newX = e.currentTarget.offsetLeft - (itemToolTipElem.getBoundingClientRect().width / 2)
            itemToolTipElem.style.left = newX + 'px'

            itemToolTipElem.classList.remove(css.itemToolTipUpperSide)         

            itemToolTipElem.classList.add(css.itemToolTipBottomSide)

            l('itemToolTipRef.current.classList', itemToolTipRef.current.classList)   

            // itemToolTipUpperSideElem.style.top = 100 + 'px'

        } else {
            const newY = e.currentTarget.offsetTop - itemToolTipElem.getBoundingClientRect().height - 13
            itemToolTipElem.style.top = newY + 'px'
    
            const newX = e.currentTarget.offsetLeft - (itemToolTipElem.getBoundingClientRect().width / 2)
            itemToolTipElem.style.left = newX + 'px'
    
        }

    }

    const hideItemToolTip = e => {
        itemToolTipRef.current.style.display = 'none'
    }

    return (
        <>
            {matchHistoryDetailInfo && (
                <div className={css.wrapper}>
                    {matchHistoryDetailInfo.games.map((v,i)=> {

                        const peakList = v.peak

                        const passedTime = calculatePassedTime(v)

                        const {gamePlaySeconds, gamePlayMinutes, gamePlayHour} = calculatePlayaTime(v)
                        
                        const championEngName = v.champion.imageUrl.split('/').at(-1).split('.')[0]
                        // l('championEngName', championEngName)
                        const kill = v.stats.general.kill
                        const death = v.stats.general.death
                        const assist = v.stats.general.assist 
                        const kda =  ((kill + assist) / death).toFixed(2)
                        const largestMultiKill = v.stats.general.largestMultiKillString
                        const opScoreBadge = v.stats.general.opScoreBadge
                        const cs = v.stats.general.cs
                        const csPerMin = v.stats.general.csPerMin
                        const contributionForKillRate = v.stats.general.contributionForKillRate
                        const visionWardsBought = v.stats.ward.visionWardsBought
                        // matchHistoryDetailInfo.gameDetailInfosById
                        const blankItemNumber = 7 -v.items.length
                        const CSSbattleResultType = v.isWin ? css.typeWin : css.typeLose 
                        const CSSStatsBtn = v.isWin ? css.statsBtnWin : css.statsBtnLose

                        return (
                            <div className={css.detailGameInfo + ' ' + CSSbattleResultType } key={i}>
                                <div className={css.gameStats}>
                                    {v.gameType}
                                    <p>{passedTime}</p>
                                    <p>{booleanToWinOrLoseMapper[v.isWin]}</p>
                                    {gamePlayMinutes}분 {gamePlaySeconds}초
                                </div>
                                <div className={css.gameSettingInfoWrapper}>
                                    <div className={css.gameSettingInfo}>
                                        <div>
                                            <img className={css.championImg} src={v.champion.imageUrl}></img>
                                        </div>
                                        <div>
                                            {v.spells.map((spell,spellIdx)=> {
                                                return (
                                                    <div key={spellIdx}>
                                                        <img className={css.spellImg} src={spell.imageUrl}></img>
                                                    </div>
                                                )
                                            })}                                    
                                        </div>
                                        <div>
                                            {v.peak.map((peak, peakIdx)=> {
                                                return (
                                                    <div>
                                                        <img className={css.spellImg} src={peak}></img>                                                    
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className={css.championEngName}>{championEngName}</div>
                                </div>                   

                                <div className={css.kdaWrapper}>
                                    <div>{kill} / {death} / {assist}</div>
                                    <div>{kda}:1 평점</div>           
                                    {largestMultiKill && (
                                        <div className={css.multiKillBadge}>
                                            {largestMultiKill}
                                        </div>
                                    )} 
                                    {opScoreBadge && (
                                        <div className={css.aceBadge}>
                                            {opScoreBadge}
                                        </div>
                                    )}                                                            
                                </div>
                                <div className={css.statsWrapper}>
                                    <div>레벨{v.champion.level}</div>
                                    <div>{cs} ({csPerMin}) CS</div>
                                    <div>킬관여 {contributionForKillRate}</div>
                                </div>
                                <div className={css.itemsWrapper}>
                                    <div className={css.items}>
                                        {v.items.map((item,itemIdx)=> {
                                            const itemNumber = item.imageUrl.split('/').at(-1).split('.png')[0]
                                            // l('itemNumber', itemNumber)
                                            return (
                                                <div key={itemIdx}  onMouseEnter={showItemToolTip} onMouseLeave={hideItemToolTip} itemnumber={itemNumber}>
                                                    <img  className={css.itemImg} src={item.imageUrl}></img>
                                                </div>
                                            )   
                                        })}
                                        {
                                            [...Array(blankItemNumber)].map((blankItem, blankItemIdx)=> {
                                                return (
                                                    <div key={blankItemIdx}>
                                                        <img  className={css.itemImg} src="./item_blank_icon.png"></img>                                                    
                                                    </div>
                                                )
                                            })
                                        }
                                        <img className={css.itemImg} src="//opgg-static.akamaized.net/css3/sprite/images/icon-buildred-p.png" ></img>
                                    </div>
                                    <div className={css.visionWardWrapper}>
                                        <img className={css.itemImg} src="//opgg-static.akamaized.net/images/site/summoner/icon-ward-red.png"></img> 
                                        제어 와드 {visionWardsBought}
                                    </div>
                                </div>                                        
                                <div className={css.followPlayers}>
                                    <div>
                                        {v.detailInfos.red.players.map((player, playerIdx) => {
                                            const playerName = player.summonerName.replace(/[\\+]/g,'')
                                            const playerNameMod = playerName.length > 5 ? playerName.substring(0,5) + '...' :  playerName
                                            return (
                                                <div className={css.teamMemberWrapper} key={playerIdx}>
                                                    <div>
                                                        <img className={css.teamMemberImg} src={player.champion.imageUrl}></img>
                                                    </div>                                                    
                                                    <div className={css.teamMemberName}>{playerName}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div >
                                        {v.detailInfos.blue.players.map((player, playerIdx) => {
                                            const playerName = player.summonerName.replace(/[\\+]/g,'')
                                            return (
                                                <div className={css.teamMemberWrapper} key={playerIdx}>
                                                    <div >
                                                        <img className={css.teamMemberImg} src={player.champion.imageUrl}></img>
                                                    </div>                                                    
                                                    <div className={css.teamMemberName}>{playerName}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>                                        
                                <div className={CSSStatsBtn}>
                                    
                                    <img  src={v.isWin ? "detail_btn_for_win.png" : "detail_btn_for_lose.png"}></img>
                                </div>                             
                            </div>
                        )
                    })}
                </div>
            )}
            <div className={css.itemToolTipWrapper} ref={itemToolTipRef}>
                    asdf
            </div>
            <div className='itemToolTipWrapper'></div>
        </>
    )
}