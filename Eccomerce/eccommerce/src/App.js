import React, { Component } from 'react';
import Home from "./Pages/Home"
import View from "./Pages/View"
import firebase from "./cofigFile/firebase"
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from "./Pages/Login"
import NavBar from "./Componets/PageComponents/NavBar"
import Edit from "./Pages/Edit"
import Delete from "./Pages/delete"
import Weather from "./Pages/Weather"


class App extends Component{

    constructor (props){
      super(props);
      this.state={
        user:{},
      }
    }

    componentDidMount(){
        this.authListener();
      }

    authListener() {
      firebase.auth().onAuthStateChanged((user) =>{
        if (user) {
          console.log(user)
          this.setState({user});
        }
        else {
          this.setState({user : null});
          console.log("not signed in")
  
        }
      });
    }

    test(){
      console.log("TEST");
    }


  render() {
    return (
          <div>
            { //check user state send them to home else to
              this.state.user ? (
              <div  className="App">
              
                <Router>
                   <NavBar/>
                   <Route exact path="/" component={Home} />
                   <Route path="/Home" component={Home} />
                   <Route path="/View" component={View} />
                   <Route path="/Edit/:id" component={Edit} />
                   <Route  path="/delete/:id" component={Delete} />
                   <Route  path="/Weather" component={Weather} />
                
                
                </Router>
              </div>
              )
              :
              (
                <Router>
                     <Route exact path="/Login" component={Login} />
                     <Route exact path="/" component={Login} />
                      <Route exact path="/Home" component={Login} />
                      <Route exact path="/View" component={Login} />
                      <Route exact path="/Edit/:id" component={Login} />
                      <Route  exact path="/delete/:id" component={Login} />
                      <Route  exact path="/Weather" component={Login} />
                </Router>
              )
            }

          </div>
    );
  }
}


export default App;
