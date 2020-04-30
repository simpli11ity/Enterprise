import React, { Component } from 'react';
import {Form,Button} from 'react-bootstrap'
import fire from '../cofigFile/firebase'

class login extends Component {

    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup=this.signup.bind(this);
        this.state= {
            email : "",
            password : ""
        }

    }

    login(e){
        e.preventDefault();
        console.log(this.state.email)
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((userd) => {
        }).catch((error) => { console.log(error)});
    }

    signup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((i)=>{

        }).catch((error) => {
            console.log(error);
        });
    }


    handleChange(e){
        this.setState({ [e.target.name] : e.target.value} );
    }

    render(){
    return (
        
      
    

            <div style={{height:"100vh",width:"100%"}}>
            
            <div style={{width:"40%", margin:"auto",marginTop:"30vh",border:"solid", padding:"2%", borderRadius:"25px"}}>
                <h1>Inventory</h1>
                <Form>
                        <h1 >Login</h1>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" value={this.state.email} onChange={this.handleChange}/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />

                        </Form.Group>

                        <Button className="Button" onClick={this.login}  variant="primary" type="submit">
                            Login
                        </Button>
                        <Button className="Button" onClick={this.login}  variant="primary" type="submit" style={{margin:"5%"}}>
                            signup
                        </Button>


                        </Form>
            </div>
            </div>
        
           
        
    );
};
}
export default login;
        
