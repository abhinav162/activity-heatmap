import React, { useEffect, useState } from 'react';
import Timeline from './Calender/Calender';
import moment from 'moment'
import Layout from './Layout/Layout';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { handleTheme } from './store/actions/themeAction';

function App() {
  // app operations
  const [togglerLabel, setTogglerLabel] = useState("Dark Mode")

  // redux operations
  const dispatch = useDispatch(); // it will be used to call the handleDarkMode action 

  const theme = useSelector(state => state.theme.theme); // it will be used to get the isDark state from the store

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [theme])

  const toggleTheme = () => {
    if (theme === "dark") {
      dispatch(handleTheme("light"))
      setTogglerLabel("Dark Mode")
    } else {
      dispatch(handleTheme("dark"))
      setTogglerLabel("Light Mode")
    }
  }

  // calender data
  let startDate = moment().startOf('year');

  let data = Array.from(new Array(365)).map((_, index) => {
    return {
      date: moment(startDate).add(index, 'day'),
      count: Math.floor(Math.random() * 100)
    };
  });

  const year = moment().get('year');

  return (
    <div className="App">
      <h1>Activity Heatmap</h1>
      <Layout>
        <Timeline activityHistory={data} year={year} colorFunc={({ alpha }) => `rgba(20, 190, 100, ${alpha})`} />
      </Layout>
      <button className="cmode-btn" onClick={toggleTheme}>{togglerLabel}</button>
    </div>
  );
}

export default App;
