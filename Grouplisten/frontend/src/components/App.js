import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import Routers from "./Routers"

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HomePage />
            </div>
        );
    }
}

// const appDiv = document.getElementById("app");
// render(<App />, appDiv);




// import React, { Component } from "react";
// import { render } from "react-dom";
// // import HomePage from "./HomePage";

// export default class App extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (<div >
//             <h1 > hi this is tinku</h1>
//             <p>this is the test of
//                 the react </p>
//         </div>
//         );
//     }
// }
