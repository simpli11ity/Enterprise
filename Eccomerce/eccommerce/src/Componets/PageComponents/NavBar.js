import React, { Component } from 'react';
import { Button, Navbar,Form,Nav,FormControl,NavDropdown } from 'react-bootstrap'
import fire from '../../cofigFile/firebase';



export default class cnavbar extends Component {


    logout(){
        fire.auth().signOut();
    }

    render() {
        return (
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">InventoryLand</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/Home">Add</Nav.Link>
      <Nav.Link href="/View">View</Nav.Link>
      <Nav.Link href="/Weather">Weather</Nav.Link>
    </Nav>
    <Form inline>
      <Button variant="outline-success" onClick={this.logout}>SignOut</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
        )
    }
}