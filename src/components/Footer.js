import css from './Footer.module.scss'

export default function Footer() {
    
    return (
        <>
            <div className={css.footerWrapper}>
                <div className={css.menuWrapper}>
                    <div>About LeeKB</div>              
                    <div>로고 히스토리</div>              
                    <div><strong>개인정보처리방침</strong></div>              
                    <div>도움말</div>              
                    <div>제휴</div>              
                    <div>광고</div>              
                    <div>문의/피드백</div>              
                    <div>채용</div>              
                </div>
                <div>
                    © 2022 LeeKB. LeeKB isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
                </div>
                <div className={css.snsWrapper}>
                    <div><img src="./facebook_icon.png"></img></div>
                    <div><img src="./instagram_icon.png"></img></div>
                    <div><img src="./twitter_icon.png"></img></div>
                </div>            
            </div>    
        </>
    )
}