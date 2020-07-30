import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll.js';
// import { robots } from './robots';
// import logo from './logo.svg';
import './App.css';


// vagy class App extends React.Component, ha nem importoljuk a { Component }-et.
class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
        // console.log('constructor');
    }

    componentDidMount() {
        // console.log('check');
        // console.log('componentDidMount');
        fetch('https://jsonplaceholder.typicode.com/users')
            .then( response => response.json() )
            .then( users => this.setState({ robots: users }) );
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });        
    }

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes( searchfield.toLowerCase() );
        });
                
        if (robots.length === 0) {
            return <h1>Loading...</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );
        }
    }    
}

export default App;


/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/