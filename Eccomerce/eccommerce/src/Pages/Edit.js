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
        const obj = {
            item_name: this.state.item_name,
            item_description: this.state.item_description,
            item_quantity: this.state.item_quantity,
            item_url: this.state.item_url
        };
        console.log(obj);
        axios.post('http://localhost:4000/item/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        window.location.replace("http://localhost:3000/view");
        
    }

    render() {
        return (
            <div  style={{ width:"40%",  border: '2px solid black' ,  borderRadius: "25px"}}>
            <div style={{margin:"10%"}}>
            <form>
            <div class="form-group">
            <label form="F1">Name</label>
              <input style={{width:"90%"}}type="text" className="form-control" id="name" placeholder="this.state.item_name" value={this.state.item_name} onChange={this.onChangeName}/>
             
              <label form="F1">Description</label>
              <input style={{width:"90%"}}type="text" className="form-control" id="desccrriptiomn" placeholder="description" value={this.state.item_description} onChange={this.onChangeDescription}/>
              <label form="F2">Quantity</label>
              <input style={{width:"90%"}}type="text" className="form-control" id="desccrriptiomrn"  value={this.state.item_quantity} onChange={this.onChangeQuantity}/>
              <label ><img src = {this.state.item_url} alt="idk" {... console.log(this.state.item_url)}></img></label>
              <label for="exampleFormControlFile1">Upload Item</label>
              <input type="file" class="form-control-file" id="exampleFormControlFile1"  onChange={this.onChangePicture}/>  
            </div>
            <Button onClick={this.onSubmit}>Upload</Button>
          </form>
          </div>
          </div>
        )
    }
}