import React, { Component } from 'react'
import Sidebar from './Sidebar';
import MovieContainer from './MovieContainer';

export default class Main extends Component {
    render() {
        return (
            <div>
                <div className="App-main">
                    <Sidebar />
                    <MovieContainer />
                </div>
            </div>
        )
    }
}
