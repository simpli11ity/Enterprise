import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import axios from 'axios';

export default class ItemUpdate extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            item_name: "",
            item_description: "",
            item_quantity:"",
            item_url:""
          };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/item/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    item_name: response.data.item_name,
                    item_description: response.data.item_description,
                    item_quantity: response.data.item_quantity,
                    item_url: response.data.item_url
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeName(e) {
        this.setState({
            item_name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            item_description: e.target.value
        });
    }

    onChangeQuantity(e) {
        this.setState({
            item_quantity: e.target.value
        });
    }

    onChangeUrl(e) {
        this.setState({
            item_url:  e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        axios.delete('http://localhost:4000/item/delete/'+this.props.match.params.id)
            .then(res => console.log(res));
        
        window.location.href = "http://localhost:3000/View" }

    render() {
        return (
            <div  style={{  width:"40%", border: '2px solid black' ,  borderRadius: "25px",  
            margin: "0 auto"}}>   
            <Button style={{borderRadius: "25px", width:"100%"}}onClick={this.onSubmit}>Are you sure?</Button>
            </div>
    
      
        )
    }
}