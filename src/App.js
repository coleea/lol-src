// import logo from './logo.svg';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import css from './App.module.scss';
import Header from './components/Header';
import UserHeader from './components/UserHeader';
import UserMain from './components/UserMain';
import UserSidebar from './components/UserSidebar';

function App() {

  const initLocalStorage = _ => {
    localStorage.queryHistory = localStorage.queryHistory || '[]'
    localStorage.favoriteUsers = localStorage.favoriteUsers || '[]'
  }
  
  useEffect(() => {
    initLocalStorage()
  }, [])

  return (
    <RecoilRoot>
        <div className={css.app}>
            <Header />
            <div className={css.body}>
              <UserHeader/>
              <div className={css.main}>
                <UserSidebar/>
                <UserMain/>
              </div>      
            </div>       
        </div>
    </RecoilRoot>
  );
}

export default App;
