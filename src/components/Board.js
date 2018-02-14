import React from 'react';

export default class Board extends React.Component {

    render() {
        let rank = this.props.rank;
        return (
            <table className='board'>
            <tbody>
                <tr className='board__row'>
                    <th className='board__header'>#</th>
                    <th className='board__header'>Camper Username</th>
                    <th
                    className={'board__header ' + (this.props.displayRecent?'header--active':'header--inactive')}
                    onClick={this.props.handleToggleData}>Points in past 30 days
                    </th>
                    <th
                    className={'board__header ' + (this.props.displayRecent?'header--inactive':'header--active')}
                    onClick={this.props.handleToggleData}>All time points
                    </th>
                </tr>
                {this.props.data.length > 0 && (
                this.props.data.map((value, index) => {
                    return (
                    <tr className='board__row' key={index}>
                        <td className='board__data'>{++rank}</td>
                        <td className='board__data'>
                        <a 
                            href={'https://www.freecodecamp.org/'+value.username}
                            className='img-container' target='_blank'>
                            <img src={value.img} />
                            <label className='img-container__txt'>{value.username}</label>
                        </a>
                        </td>
                        <td className='board__data'>{value.recent}</td>
                        <td className='board__data'>{value.alltime}</td>
                    </tr>
                        )
                    })
                    )
                }
                </tbody>
            </table>
        )
    } 
}
