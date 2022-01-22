import css from './UserMain.module.scss'
import UserGameSummary from './UserMain/UserGameSummary'
import UserDetailGameInfo from './UserMain/UserDetailGameInfo'
import { useState } from 'react'

const l = console.log 

export default function UserMain() {

    const [currentGameType, setCurrentGameType] = useState('all')

    const toogleGameType = e => {
        const gametype = e.target.attributes.type.value
        setCurrentGameType(gametype)
    }

    return (
        <>
            <div className={css.wrapper}>
                <div className={css.gameCategory}>
                    <div className={currentGameType === 'all' ? 
                                                            `${css.CategoryAll} ${css.focusdMenu}` 
                                                            : css.CategoryAll } 
                                                            onClick={toogleGameType} type="all">전체</div>
                    <div className={currentGameType === 'solo' ? 
                                                            `${css.CategorySolo} ${css.focusdMenu}` 
                                                            : css.CategorySolo } 
                                                            onClick={toogleGameType} type="solo">솔로게임</div>
                    <div className={currentGameType === 'free' ? 
                                                            `${css.CategoryFree} ${css.focusdMenu}` 
                                                            : css.CategoryFree  } 
                                                            onClick={toogleGameType} type="free">자유랭크</div>
                </div>
                <UserGameSummary/>
                <UserDetailGameInfo/>
            </div>
        </>
    )
}