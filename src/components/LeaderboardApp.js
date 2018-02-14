import React from 'react';
import Header from './Header';
import Board from './Board';
import Pagination from 'react-js-pagination';

export default class LeaderboardApp extends React.Component {

    state = {
        recent: [],
        allTime: [],
        displayRecent: true,
        activePage: 1,
        itemsPerPage: 25,
        recentPerPage: [],
        allTimePerPage: [],
        rank: 0
    }  
      
    componentDidMount(){
        fetch(this.props.recentUrl).then((resp)=> resp.json()).then((data)=>{
            this.setState((prevState)=> {
                const recentOnPage = [];
                for(let i = 0; i < 25; i++) {
                    recentOnPage.push(data[i]);
                }
              return ({
                recent: prevState.recent.concat(data),
                recentPerPage: recentOnPage
              });     
            });
         });
        fetch(this.props.allTimeUrl).then((resp)=> resp.json()).then((data)=>{
            const allTimeOnPage = [];
            for(let i = 0; i < 25; i++) {
                allTimeOnPage.push(data[i]);
            }
            this.setState((prevState)=> {
              return ({
                allTime: prevState.allTime.concat(data),
                allTimePerPage: allTimeOnPage
              });     
            });      
        }); 
    }

    handlePageChange = (pageNumber) => {
        let startIndex = (pageNumber - 1) * this.state.itemsPerPage;
        const endIndex = startIndex + 25;
        const recentOnPage = [];
        const allTimeOnPage = [];

        while(startIndex < endIndex) {
            recentOnPage.push(this.state.recent[startIndex]);
            allTimeOnPage.push(this.state.allTime[startIndex]);
            startIndex++;
        }
        this.setState(()=>{
            return {
                recentPerPage: recentOnPage,
                allTimePerPage: allTimeOnPage,
                rank: (startIndex - 25),
                activePage: pageNumber
            }
        });

        document.documentElement.scrollTop = 0;
    }
      
    handleToggleData = () => {
        this.setState((prevState) => {
          return {
            displayRecent: !prevState.displayRecent
          }
        })
    }
         
    render(){
        return (
          <div>
            <Header />
            <Board
              data = {this.state.displayRecent ? this.state.recentPerPage : this.state.allTimePerPage}
              handleToggleData = {this.handleToggleData}
              displayRecent = {this.state.displayRecent}
              rank = {this.state.rank}
            />
            <Pagination
            innerClass='pagination'
            itemClass='pagination__item'
            linkClass='pagination__link'
            activeClass='pagination--active__item'
            activeLinkClass='pagination--active__link'
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.itemsPerPage}
            totalItemsCount={100}
            pageRangeDisplayed={4}
            onChange={this.handlePageChange}
          />
          </div>
        );
    }
}