import { getDefaultNormalizer } from '@testing-library/react'
import { useRef, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import {basicInfoAtom, mostInfoAtom, matchesAtom, 
    userHeaderInfoAtom, userSidebarInfoAtom, latest20SummaryInfoAtom, matchHistoryDetailInfoAtom} from '../recoil/summonerInfo'
import css from './Header.module.scss'

const l = console.log 

const INITIAL_USER_QUERY = 'Fake+Makeit'

const URL_TEMPLATE_BASIC_INFO = `https://codingtest.op.gg/api/summoner/USERNAME`
const URL_TEMPLATE_MOST_INFO = `https://codingtest.op.gg/api/summoner/USERNAME/mostInfo`
const URL_TEMPLATE_MATCHES = `https://codingtest.op.gg/api/summoner/USERNAME/matches`
const URL_TEMPLATE_MATCH_DETAILS = `https://codingtest.op.gg/api/summoner/USERNAME/matchDetail/`

export default function Header() {

    const [queryHistory, setQueryHistory] = useState(JSON.parse(localStorage.queryHistory || '[]'))
    const [favoriteUsers, setFavoriteUsers] = useState(JSON.parse(localStorage.favoriteUsers || '[]'))
    const [isInputExists, setIsInputExists]  = useState(false)
    const [isSearchbarFocused, setIsSearchbarFocused] = useState(false)
    const [userHistoryType, setUserHistoryType] = useState('latestSearch')
    
    const searchHistoryWrapperRef = useRef(null)
    const searcBarRef = useRef(null)
    const isSearchHistoryAreaClicked = useRef(false)

    const [basicInfo, setBasicInfo]  = useRecoilState(basicInfoAtom)
    const [mostInfo, setMostInfo]  = useRecoilState(mostInfoAtom)
    const [matches, setMatches]  = useRecoilState(matchesAtom)

    const [userHeaderInfo, setUserHeaderInfo]  = useRecoilState(userHeaderInfoAtom)
    const [userSidebarInfo, setUserSidebarInfo]  = useRecoilState(userSidebarInfoAtom)
    const [latest20SummaryInfo, setLatest20SummaryInfo]  = useRecoilState(latest20SummaryInfoAtom)
    const [matchHistoryDetailInfo, setMatchHistoryDetailInfo]  = useRecoilState(matchHistoryDetailInfoAtom)    

    useEffect(() => {
        getDataAndSetState(INITIAL_USER_QUERY) ; 
    }, [])
    
    const requestMatchHistoryDetail = async ({USER_QUERY, matches}) => {

        const matchDetailList = await Promise.all(
            matches.games.map((v, i) => {
                const URL = URL_TEMPLATE_MATCH_DETAILS.replace('USERNAME', USER_QUERY) + v.gameId
                return fetch(URL).then(r => r.json())            
            })
        )        

        const gameDetailInfosById = {}

        for (const obj of matchDetailList) {
            gameDetailInfosById[obj.gameId] = obj.teams
        }

        for (const game of matches.games) {
            const detailInfos = gameDetailInfosById[game.gameId]
            game.detailInfos = {
                red : detailInfos[0],
                blue : detailInfos[1],
            }
        }

        const matchHistoryDetailInfo = {
            games : matches.games,
        }
        return matchHistoryDetailInfo
    }

    async function getDataAndSetState(USER_QUERY) {

        const URL_BASIC_INFO = URL_TEMPLATE_BASIC_INFO.replace('USERNAME', USER_QUERY)
        const URL_MOST_INFO  = URL_TEMPLATE_MOST_INFO .replace('USERNAME', USER_QUERY)
        const URL_MATCHES    = URL_TEMPLATE_MATCHES   .replace('USERNAME', USER_QUERY)

        const [basicInfo, mostInfo, matches] = await Promise.all([
            fetch(URL_BASIC_INFO).then(r => r.json()),
            fetch(URL_MOST_INFO).then(r => r.json()),
            fetch(URL_MATCHES).then(r => r.json()),
        ])        
        
        const userHeaderInfo = {
            username : basicInfo.summoner.name.replace(/[\\+]/g,' '),
            profileImageUrl: basicInfo.summoner.profileImageUrl,
            profileBackgroundImageUrl: basicInfo.summoner.profileBackgroundImageUrl,
            profileBorderImageUrl : basicInfo.summoner.profileBorderImageUrl,
            level : basicInfo.summoner.level,
            ladderRank : basicInfo.summoner.ladderRank.rank,
            rankPercentage : basicInfo.summoner.ladderRank.rankPercentOfTop,
            prevTiers : basicInfo.summoner.previousTiers
        }

        const sidebarInfo = {
            solRank : basicInfo.summoner.leagues[0],
            _5on5Rank : basicInfo.summoner.leagues[1],
            winRatioFreeSeason : mostInfo.champions,
            winRatio7Days : mostInfo.recentWinRate,
        }

        const latest20SummaryInfo = {
            totalMatch :  Number(matches.summary.wins)  + Number(matches.summary.losses) ,
            wins : matches.summary.wins,
            losses : matches.summary.losses,
            kills: matches.summary.kills,
            deaths: matches.summary.deaths,
            assists: matches.summary.assists,
            kda : (matches.summary.kills + matches.summary.assists) / matches.summary.deaths,        
            positions : matches.positions,
            champions : matches.champions,
        }

        setUserHeaderInfo(userHeaderInfo)
        setUserSidebarInfo(sidebarInfo)
        setLatest20SummaryInfo(latest20SummaryInfo)
        
        const matchHistoryDetailInfo = await requestMatchHistoryDetail({USER_QUERY, matches})
        setMatchHistoryDetailInfo(matchHistoryDetailInfo)
    }


    const saveQueryToDB = (query) => {

        if(process.env.REACT_APP_DB_TYPE === 'localstorage'){

            const queryHistoryArrFiltered = queryHistory.filter(username => username !== query)                        
            const queryHistoryArrRenewed = [...queryHistoryArrFiltered, query]          
            const queryHistoryArrStr = JSON.stringify(queryHistoryArrRenewed)
            localStorage.queryHistory = queryHistoryArrStr 
            return queryHistoryArrRenewed

        } else {
            alert('현재 localstorage를 이용한 db저장만 가능')
        }
    }

    const processUserSearch = e => {

        e.preventDefault()

        const query = Object
                        .fromEntries(
                            new FormData(e.target))
                        .query

        getDataAndSetState(query) ; 

        const queryHistoryArrRenewed = saveQueryToDB(query)

        setQueryHistory(queryHistoryArrRenewed)
    }

    const isCharInput = e =>  {
        return e.key !== 'enter'
    }

    const doKeyInputCallback = async e => {

        if(isCharInput(e)) {
            const query = e.target.value
            query.length > 0 ? setIsInputExists(true)
                                : setIsInputExists(false)
        }            
    }

    const toggleFavorite = e => {
        const classStr = e.target.classList.value
        const username = classStr.split(' ')[0]

        if(classStr.includes('favoriteOff')) {
            l('여기')
            const favoriteUsersRenewed = [...favoriteUsers, username]
            setFavoriteUsers(favoriteUsersRenewed)
            /* 
            setFavoriteUsers(prevState => {
                const modifiedFavoriteUser = [...prevState, username]
                return modifiedFavoriteUser
            })
            */

            const favoriteUserArr = JSON.parse(localStorage.favoriteUsers)
            const favoriteUserArrClone = [...favoriteUserArr]
            favoriteUserArrClone.push(username)
            localStorage.favoriteUsers = JSON.stringify(favoriteUserArrClone)

        } else {
            l('여기2')

            const userIdx = favoriteUsers.indexOf(username)
            const favoriteUserRenewed = [...favoriteUsers.slice(0, userIdx), 
                                         ...favoriteUsers.slice(userIdx + 1)]

            updateFavoriteUser(favoriteUserRenewed)            
            localStorage.favoriteUsers = JSON.stringify(favoriteUserRenewed)
        }
    }

    const updateFavoriteUser = favoriteUserRenewed => {
        setFavoriteUsers(prevState => {            
            return [...favoriteUserRenewed]
        })
    }

    const removeUserFromHistory = e=> {
        const userName = e.target.attributes.userName.value        
        const userNameIdx = queryHistory.indexOf(userName)
        const queryHistoryClone = [...queryHistory]
        const queryHistoryReNewed = [...queryHistoryClone.slice(0, userNameIdx), ...queryHistoryClone.slice(userNameIdx + 1)]        
        setQueryHistory(prev=> [...queryHistoryReNewed])
        localStorage.queryHistory = JSON.stringify(queryHistoryReNewed)
    }

    const onFocusSearchbar = e =>  setIsSearchbarFocused(true)    

    const offFocusSearchbar = e => setIsSearchbarFocused(false)    

    const toggleHistoryType = e => {
        const viewType = e.target.attributes.viewtype.value 
        setUserHistoryType(_ => viewType)
    }

    const removeFromFavorite = e => {

        const userName = e.target.attributes.userName.value
        const userIdx =  favoriteUsers.indexOf(userName)
        const favoriteUsersRenewed = [...favoriteUsers.slice(0, userIdx), ...favoriteUsers.slice(userIdx + 1)]
        setFavoriteUsers(favoriteUsersRenewed)
        localStorage.favoriteUsers = JSON.stringify(favoriteUsersRenewed)
    }

    return (
        <>
            <div className={css.wrapper}>
                <div className={css.userInputWrapper}
                    onBlur={offFocusSearchbar}
                    onFocus={onFocusSearchbar}
                    tabIndex="0"
                >
                 
                    <InputQuery processUserSearch={processUserSearch} doKeyInputCallback={doKeyInputCallback} searcBarRef={searcBarRef} />

                    { isSearchbarFocused && ! isInputExists && (
                        <div className={css.searchHistory} ref={searchHistoryWrapperRef}>
                            <ul className={css.searchHistoryHeader}>
                                <li className={css.searchHistoryHeaderUnit} onClick={toggleHistoryType} viewtype='latestSearch'>최근검색</li>
                                <li className={css.searchHistoryHeaderUnit} onClick={toggleHistoryType} viewtype='favorite'>즐겨찾기</li>
                            </ul>
                            {
                                userHistoryType === 'latestSearch' && (
                                    <div className={css.RecentSummonerListWrap} >
                                        {queryHistory.map((userName, userIdx)=> {
                                            const isFavorite = favoriteUsers.some(favUser => favUser === userName)
                                            return (
                                                <div className={css.historyItem}>                                
                                                    <div className={css.historyItem}>
                                                        <div className={css.username}>
                                                            {userName}
                                                        </div>
                                                        <div className={css.favoriteMark} onClick={toggleFavorite} >
                                                            {isFavorite ? <img className={userName + ' ' + 'favoriteOn'} src="https://opgg-static.akamaized.net/images/site/icon-favorite-on.png"></img>
                                                            : <img className={userName + ' ' + 'favoriteOff'} src="https://opgg-static.akamaized.net/images/site/icon-favorite-off.png"></img>}
                                                        </div>
                                                        <div className={css.removeMark} onClick={removeUserFromHistory} userName={userName}>
                                                            X        
                                                        </div>
                                                    </div>
                                                </div>                                   
                                            )   
                                        })}
        
                                    </div>        
                                )
                            }
                            {
                                userHistoryType === 'favorite' && (
                                    <div>
                                        {favoriteUsers.map((user, userIdx)=> {
                                            return (
                                                <div className={css.favoriteWrapper}>
                                                    <div>
                                                        {user}
                                                    </div>
                                                    <div className={css.removeMark} onClick={removeFromFavorite} userName={user}>
                                                        X        
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )    
                            }                
                        </div>
                    )}

                    {isSearchbarFocused && isInputExists && (
                        <SearchAutocomplete />
                    )}
                </div>
            </div>
        </>
    )
}

function InputQuery({processUserSearch, doKeyInputCallback, searcBarRef}){
    return (
        <div className={css.inputQuery}>
            <form onSubmit={processUserSearch}>
                <input 
                    name='query' 
                    className={css.input_query} 
                    onKeyUp={doKeyInputCallback} 
                    placeholder='소환사명, 챔피언, ···' 
                    ref={searcBarRef}
                    autoComplete='off'>
                </input>
                <button className={css.submitBtn} type='submit'>
                    <img src="./opgg_search_submit.png"></img>
                </button>
            </form>
        </div>        
    )
}

function SearchAutocomplete({}){
    return (
        <div className={css.autoCompleteWrapper}>
            <div className={css.autoCompleteItem}>
                <div className={css.autoCompleteUserImg}>이미지</div>
                <div className={css.autoCompleteUserInfoWrapper}>
                    <div className={css.autoCompleteUserName}>유저네임</div>
                    <div className={css.autoCompleteUserLevel}>Level ?</div>
                </div>
            </div>                        
        </div>       
    )
}