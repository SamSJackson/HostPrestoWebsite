import React, { useState, useEffect } from 'react';

import Timezone from './components/Timezone';
import Updates from './components/Updates';
import { Status } from './constants/Status';
import { getStatuses } from './api';
import { hslFormat } from './util/colour';
import StatusContext from './contexts/StatusContext';
import TimeContext from './contexts/TimeContex';

import './App.scss';

const londonTimezone = 'Europe/London';
const vancouverTimezone = 'America/Vancouver';

const App : React.FC = () => {
  const [status, setStatus] = useState<Status[]>([]);
  const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const appNode = document.getElementById("app-container-primary");
  const starsNode = document.getElementById('stars');
  const vhPixel = window.innerHeight / 100;
  let lightness = 40.8;

  const handleScrollChange = (event : React.WheelEvent<HTMLDivElement>) => {
    console.log("Wheel event");
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
        <div id="app-container-primary" className="app-container" onWheel={event => handleScrollChange(event)}>
          <div id="stars" className="star-container">
            <div className="background-container">
              <div className="flex-grid">
                <div className="col">
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
                <div className="col">
                  <Updates onSubmit={handleAddStatus} onRemove={handleRemoveStatus}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StatusContext.Provider>
    </TimeContext.Provider>
  )
};

export default App;
