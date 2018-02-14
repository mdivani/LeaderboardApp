import React from 'react';
import ReactDOM from 'react-dom';
import LeaderboardApp from './components/LeaderboardApp';
import 'normalize.css/normalize.css';
import './styles/styles.scss';



//Api Url
const recentUrl="https://fcctop100.herokuapp.com/api/fccusers/top/recent";
const allTimeUrl="https://fcctop100.herokuapp.com/api/fccusers/top/alltime";

ReactDOM.render(<LeaderboardApp recentUrl={recentUrl} allTimeUrl={allTimeUrl}/>, document.getElementById('app'));
