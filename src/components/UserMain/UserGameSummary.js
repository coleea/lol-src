import { useRecoilState } from 'recoil'
import css from './UserGameSummary.module.scss'
import { latest20SummaryInfoAtom } from '../../recoil/summonerInfo'
import { useEffect, useState } from 'react'
// import * as d3 from "https://cdn.skypack.dev/d3@7";
import * as d3 from 'd3';

const l = console.log 

const positionNameEngToKorMapper = {
    'Top' : '탑',
    'Mid' : '미드',
    'Jungle' : '정글',
    'Bottom' : '원딜',
    'Support' : '서포터',
}

const positionImgUrlMapper = {
    'Top' : './top_icon.png',
    'Mid' : './mid_icon.png',
    'Jungle' : './jungle_icon.png',
    'Bottom' : './onedeal_icon.png',
    'Support' : './supporter_icon.png',
}

export default function UserMain() {

    const [latest20SummaryInfo, setLatest20SummaryInfo]  = useRecoilState(latest20SummaryInfoAtom)
    const [emptyChampionCount, setEmptyChampionCount] = useState(0)

    useEffect(() => {    

        if(latest20SummaryInfo){
            
            drawWinRatioCircle(latest20SummaryInfo)

            if(latest20SummaryInfo.champions.length < 3) {
                const emptyChampionCount = 3 - latest20SummaryInfo.champions.length
                setEmptyChampionCount(emptyChampionCount)
            }
        }
    }, [latest20SummaryInfo])

    // const kda = latest20SummaryInfo.kills / latest20SummaryInfo.assists / latest20SummaryInfo.deaths

    function drawWinRatioCircle(latest20SummaryInfo){    

        const color = d3.scaleOrdinal()
                        .range(['#ee5a52', '#1f8ecd'])

        const pie = d3.pie()
                        .value((d) => d)  

        var svg = d3.select(".forDrawing")    
                    .append("svg")
                    .attr("width", 90)
                    .attr("height", 90)
  
        const group = svg.append('g')
                          .attr('transform', 'translate(45, 45)')
  
        const arc = d3.arc()
                        .innerRadius(33)
                        .outerRadius(45)
                
        const winRatio = latest20SummaryInfo.wins / latest20SummaryInfo.totalMatch * 100
        const loseRatio = latest20SummaryInfo.losses / latest20SummaryInfo.totalMatch * 100
        const arcs = group.selectAll('arc')
                            .data(pie([winRatio,loseRatio]))
                            .enter()
                            .append('g')
                            .attr('class', 'arc')
                    
        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data))
    }

    return (
        <>
            {latest20SummaryInfo && (
                <div className={css.wrapper}>
                    <div className={css.gameSummary}>
                        <div className={css.winLoseStats}>
                            <div>
                                {latest20SummaryInfo.totalMatch}전 {latest20SummaryInfo.wins}승 {latest20SummaryInfo.losses}패
                                <div className='forDrawing'>
                                </div>
                                <div className='winRate'>
                                    {(latest20SummaryInfo.wins / latest20SummaryInfo.totalMatch * 100).toFixed(0) } %
                                </div>
                            </div>
                        </div>
                        <div className={css.kda}>
                            <div  className={css.kdaUpperInfo}>                                
                                {latest20SummaryInfo.kills} / {latest20SummaryInfo.assists} / {latest20SummaryInfo.deaths}
                            </div>                            
                            <div className={css.kdaBottomInfo}>                            
                                <div>
                                    {latest20SummaryInfo.kda.toFixed(2)} : 1 
                                </div>
                                <div className={css.winRatio}>
                                    (58%)
                                </div>
                            </div>                            
                        </div>
                        <div className={css.favoriteChampions}>
                            {latest20SummaryInfo.champions.map((v,i)=> {
                                const kda = ((v.kills + v.assists) / v.deaths).toFixed(0)
                                const winRatio = (v.wins / (v.wins + v.losses) * 100).toFixed(0)
                                return (
                                    <div key={i}>
                                        <img className={css.championImg} src={v.imageUrl}></img>
                                        {v.name}
                                        {winRatio}% ({v.wins}승 {v.losses}패)
                                        {kda} 평점
                                    </div>
                                )
                            })}
                            {
                                emptyChampionCount > 0 && [...Array(emptyChampionCount)].map((_, i)=> {
                                    return (
                                        <div key={i}>
                                            <div>
                                                <img width="34px" height="34px" src="./emptyChampion.png"></img>
                                                챔피언 정보가 없습니다.
                                            </div>
                                        </div>                                        
                                    )
                                })
                            }
                        </div>                
                        <div className={css.favoritePosition}>
                            <p>선호 포지션 (랭크)</p>
                            {latest20SummaryInfo.positions.map((position,positionIdx)=> {

                                const positionNameKor = positionNameEngToKorMapper[position.positionName]
                                const positionImgUrl = positionImgUrlMapper[position.positionName]
                                const roleRate= (position.games / latest20SummaryInfo.totalMatch * 100).toFixed(0)
                                const winRate = (position.wins / (position.wins + position.losses) * 100).toFixed(0)

                                return (
                                    <div className={css.positionInfoWrapper} key={positionIdx}>
                                        <div>
                                            <img src={positionImgUrl}></img>                                        
                                        </div>
                                        <div>
                                            <div>{positionNameKor}</div> 
                                            <div className={css.PositionStatContent}>
                                                <div>{roleRate}%</div>
                                                <div>승률 {winRate} % </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}       
        </>
    )
}

/* 
games: 15
losses: 0
position: "ADC"
positionName: "Bottom"
wins: 15 */


/* 
미리보기
3:16
[롤 이론강의]라인?포지션?/
탑/
정글/
미드/
원딜/
서폿
*/