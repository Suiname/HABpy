import React from 'react';
const ReactDOM = require('react-dom');

class UsersList extends React.Component {
    constructor() {
        super();
        this.state = { something: null };
    }
    render() {
        return(
            <div>
            <div>HELLO REACT</div>
            <div>Testing hotloading</div>
            </div>
        );
    }
}

ReactDOM.render(<UsersList url='/'/>, 
    document.getElementById('container'))