import React, { useState, useEffect } from 'react';
import Snowfall from 'react-snowfall';

import Login from './components/Login';
import Timezone from './components/Timezone';
import Updates from './components/Updates';
import { Status } from './constants/Status';
import { getStatuses } from './api';
import { hslFormat } from './util/colour';
import { getAuthId, getAuthName, UserInfo } from './util/auth';
import StatusContext from './contexts/StatusContext';
import TimeContext from './contexts/TimeContex';

import './App.scss';
import UserContext from './contexts/UserContext';

type AuthState = {
  isLoading: boolean;
  userId: string;
  authentic: boolean;
}

const londonTimezone = 'Europe/London';
const vancouverTimezone = 'America/Vancouver';

const App : React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({isLoading: true, userId : getAuthName(), authentic: false});
  const [status, setStatus] = useState<Status[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({username: "", auth_id: ""});
  const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const appNode = document.getElementById("app-container-primary");
  const starsNode = document.getElementById('stars');
  const vhPixel = window.innerHeight / 100;
  let lightness = 40.8;
  window.addEventListener("wheel", handleScrollChange);

  function handleScrollChange (event : WheelEvent) {
    const target = event.target as HTMLDivElement;
    if (document.getElementById("update-container-primary")?.contains(target)) { return; }
    
    const scrollDifference = event.deltaY;
    if (Math.abs(scrollDifference) < 5 || appNode == null || starsNode == null) return;
    const currentPosition = parseInt(window.getComputedStyle(appNode).backgroundPositionY);
    const starsPosition = parseInt(window.getComputedStyle(starsNode).backgroundPositionY);
    if (scrollDifference < 0) {
      if (currentPosition > window.innerHeight - 5*vhPixel) return;
      appNode.style.backgroundPositionY = (currentPosition + 4*vhPixel) + "px";
      starsNode.style.backgroundPositionY = (starsPosition - 4*vhPixel) + "px"
      lightness = Math.max(lightness - 2, 5);
    } else {
      if (currentPosition < 0 - 40*vhPixel) return;
      appNode.style.backgroundPositionY = (currentPosition - 4*vhPixel) + "px";
      starsNode.style.backgroundPositionY = (starsPosition + 4*vhPixel) + "px"
      lightness = Math.min(lightness + 2, 45.8);
    }
    appNode.style.backgroundColor = hslFormat(190, 100, lightness);
  };
  
  useEffect(() => {
    const statusesPromise = getStatuses();
    statusesPromise.then((statusArray) => {
      setStatus([...statusArray]);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    getAuthId().then((response) => {
      if (response !== "") {
        setAuthState({isLoading: false, userId: response.auth_id, authentic: true});
        setUserInfo({username : response.username, auth_id: response.auth_id});
      } else {
        setAuthState({isLoading: false, userId: "", authentic: false});
      }
    })
  }, []);

  const handleLogin = (stringId : string, username: string) => {
    window.localStorage.setItem("auth_id", stringId);
    setAuthState({isLoading: false, userId : stringId, authentic: true});
    setUserInfo({username : username, auth_id: stringId});
  }

  const handleAddStatus = (newStatus: Status) => {
    if (status.indexOf(newStatus) > -1) {
      return;
    } 
    setStatus([newStatus, ...status]);
  };

  const handleRemoveStatus = async (statusId: number) => {
    setStatus(statuses => statuses.filter((status) => status._id !== statusId));
  }

  return (
    <TimeContext.Provider value={tzid} >
      <StatusContext.Provider value={status}>
        <UserContext.Provider value={userInfo}>
          <div className="snow-fall">
          <Snowfall snowflakeCount={700}/>
          </div>
          <div id="app-container-primary" className="app-container">
            <div id="stars" className="star-container">
              <div className="background-container">
                {!authState.authentic ? 
                  (
                    <>
                      {authState.userId === "" 
                      ? (<Login onSuccessfulLogin={handleLogin}/>) 
                      : (<>{/*Make spinner*/}</>)
                      }
                    </>
                  ) : (
                  <div className="flex-grid">
                    <div className="timezone-col">
                      <div className="timezone-container">
                        <div className="london-timezone">
                          <h2>London Timezone</h2>
                          <Timezone timeZone={londonTimezone} />
                        </div>
                        <div className="vancouver-timezone">
                          <h2>Vancouver Timezone</h2>
                          <Timezone timeZone={vancouverTimezone} />
                        </div>
                      </div>
                    </div>
                    <div className="updates-col">
                      <Updates onSubmit={handleAddStatus} onRemove={handleRemoveStatus}/>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </UserContext.Provider>
      </StatusContext.Provider>
    </TimeContext.Provider>
  )
};

export default App;
