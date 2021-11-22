import React, {useState} from "react"; 
import Logo from './assets/snappic-logo-68aa9d703c391803363b79dc9d21ce8d.svg';

export default function App() {

  let [count, setCount] = useState(0);
  let [checked, setChecked] = useState(false);
  let [activeSessions, setActiveSessions] = useState([]);

  const times = [
    {
      start: '05:00',
      end: '12:00',
    },
    {
      start: '10:00',
      end: '16:00',
    },
    {
      start: '19:00',
      end: '22:00',
    }
  ];

  const getDate = (time) => {
    var today = new Date();
    var _t = time.split(':');
    today.setHours(_t[0], _t[1]);
    return today;
  }
  
  const calculateHours = (start, end) => {
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
  }

  const settimes = () => {
    count = 0;
    activeSessions = [];
    setActiveSessions(activeSessions);
    setCount(count);
    setTimeout(() => {
      for (let i = 0; i < times.length; i++) {
        const currentstart = getDate(times[i].start);
        const currentend = getDate(times[i].end);
  
        if (times[i + 1]) {
          const nextstart = getDate(times[i + 1].start);
          const nextend = getDate(times[i + 1].end);
          if (currentstart <= nextend && nextstart <= currentend) {
            count = count + calculateHours(currentstart, nextend);
            setCount(count);
            setActiveSessions((activeSessions) => [...activeSessions, {start: times[i].start, end: times[i + 1].end}]);
          }
        } else {
          count = count + calculateHours(currentstart, currentend);
          setCount(count);
          setActiveSessions((activeSessions) => [...activeSessions, {start: times[i].start, end: times[i].end}]);
        }
      }
    }, 10)
  }

  return (
    <div className="container">
      <img src={Logo} alt="logo" className="main-logo" />
      <h1>Hello Marco</h1>
      <p>You have a total of <strong>{times.length} viewing times</strong>. Click the button below to check your session hours.</p>
      <h3>Viewing Times</h3>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
          {
            times.map((d, ind) => {
              return (
                <tr key={ind}>
                  <td>{d.start}</td>
                  <td>{d.end}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
      <button className="snappic-button" onClick={() => {
        settimes();
        setChecked(true);
      }}>
        {
          checked ? (
            <span>Check again</span>
          ) : (
            <span>Check sessions</span>
          )
        }
      </button>
      {
        checked ? (
          <>
            <div style={{height: '50px'}}></div>
            <h3>Sessions</h3>
            <p>Your total session duration is: <strong>{count === 0 ? 'Loading' : parseInt(count).toFixed()} Hours</strong></p>
            <div className="table-container">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Start Time</th>
                    <th>End Time</th>
                  </tr>
                </thead>
                <tbody>
                {
                  activeSessions.map((d, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{d.start}</td>
                        <td>{d.end}</td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
            </div>
          </>
        ) : null
      }
    </div>
  );
}
