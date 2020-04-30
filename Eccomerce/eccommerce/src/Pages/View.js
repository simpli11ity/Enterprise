import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Item = props => (
    // ccreate table prop to display items, last one needs image url -> issue is size of picture
    <tr>
        <td>{props.item.item_name}</td>
        <td>{props.item.item_description}</td>
        <td>{props.item.item_quantity}</td>
        <td style={{width:"40%"}}><img style={{width:"40%"}} src={props.item.item_url} alt="Flowers in Chania"/> </td>
        {console.log("URL"+props.item.item_url)}
        <td><Link to={"/edit/"+props.item._id}>Edit</Link></td>
        <td><Link to={"/delete/"+props.item._id}>delete</Link></td>
    </tr>
)




export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.peak=this.peak.bind(this);
        this.state = {item: []};
    }


    peak() {
        console.log("speak")
    }
    componentDidMount() {
        axios.get('http://localhost:4000/item/')
            .then(response => {
                this.setState({item: response.data});
                console.log("res"+JSON.stringify(response))
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    inventory() {
        return this.state.item.map(function(currentTodo, i) {

            return <Item item={currentTodo} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <label style={{backgroundColor:"white"}}><h2>Inventory</h2></label>
                <table className="table table-striped" style={{ marginTop: 20 }}>
          
                    <thead>
                        <tr>
                            <th><h3>Name</h3></th>
                            <th><h3>description</h3></th>
                            <th><h3>quantity</h3></th>
                            <th><h3>Image</h3></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        { this.inventory() }
                    </tbody>
                </table>


                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit</h4>
                        </div>
                        <div class="modal-body">
                        <div  style={{ width:"40%",  border: '2px solid black' ,  borderRadius: "25px"}}>
      <div style={{margin:"10%"}}>
      <form>
      <div class="form-group">
      <label form="F1">Name</label>
        <input style={{width:"90%"}}type="text" className="form-control" id="name" placeholder="description" value={this.state.name} onChange={this.onChangeName}/>
       
        <label form="F1">Description</label>
        <input style={{width:"90%"}}type="text" className="form-control" id="desccrriptiomn" placeholder="description" value={this.state.descriptionx} onChange={this.onChangeDescription}/>
        <label form="F2">Quantity</label>
        <input style={{width:"90%"}}type="text" className="form-control" id="desccrriptiomn" placeholder="Quantity" value={this.state.Quantity} onChange={this.onChangeQuantity}/>
        <label for="exampleFormControlFile1">Upload Item</label>
        <input type="file" class="form-control-file" id="exampleFormControlFile1"  onChange={this.onChangePicture}/>  
      </div>
     




      <Button onClick={this.onSubmitForm}>Upload</Button>
    </form>
    </div>
    </div>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
            </div>
      
    </div>
  </div>
      

      
            </div>
        )
    }
}