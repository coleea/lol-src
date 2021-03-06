import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import css from './App.module.scss';
import Header from './components/Header';
import UserHeader from './components/UserHeader';
import UserMain from './components/UserMain';
import UserSidebar from './components/UserSidebar';
import Footer from './components/Footer';

const l = console.log 

function App() {

  const initLocalStorage = _ => {
    localStorage.queryHistory = localStorage.queryHistory || '[]'
    localStorage.favoriteUsers = localStorage.favoriteUsers || '[]'
  }
  
  useEffect(() => {
    initLocalStorage()
  }, [])

  return (
    <>
        <RecoilRoot>        
            <div id={css.app}>
                <Header />
                <div id={css.body} >
                  <UserHeader/>
                  <div id={css.main}>
                    <UserSidebar/>
                    <UserMain/>
                  </div>      
                </div>       
                <Footer/>
            </div>
        </RecoilRoot>
    </>
  );
}

export default App;