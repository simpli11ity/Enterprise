import React, { Component } from 'react';
import { Button,Toast , Alert, variant} from 'react-bootstrap';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";
import fire from '../../cofigFile/firebase';

class Upload extends Component {
    // Get a reference to the database service
    constructor(props){
      super(props)
      this.onChangeName=this.onChangeName.bind(this);
      this.onChangeDescription=this.onChangeDescription.bind(this);
      this.onChangeQuantity=this.onChangeQuantity.bind(this);
      this.onChangePicture=this.onChangeSelectedFile.bind(this);
      this.onSubmitForm=this.onSubmitForm.bind(this);

    this.state = {
      name: "",
      descriptionx: "",
      item_quantity:"",
      item_url:"",
      selectedFile : null,
      error:null

    };
    }

//    fileSelectedHandler  = event => {
 //     this.setState({
  //      selectedFile: event.target.files[0],
   //   })
    //}

    onChangeDescription(e){
      this.setState({
        descriptionx : e.target.value
      });

    }

    onChangeQuantity(e){
      this.setState({
        item_quantity : e.target.value
      });

    }

    onChangeName(e){
      this.setState({
        name : e.target.value
      });

    }

    
    onChangeSelectedFile(e){
        this.setState({
          selectedFile : e.target.files[0]
        });

    }




    onSubmitForm() { //start

      try {


      //submit logic lol
      console.log("Name  "+this.state.name)
      console.log("Description  "+this.state.descriptionx)
      console.log("Quanity  " +this.state.item_quantity)
      console.log("Picture  " +this.state.selectedFile.name)

      var name = this.state.name;
      var desccrriptiomn=this.state.descriptionx;
      var Quanitya=this.state.item_quantity;
      var url = this.state.selectedFile;
      //firebase storage to store image return url
      //TODO
      var image = this.state.selectedFile;
      var user = fire.auth().currentUser;
      var filename = this.state.selectedFile.name;
      var storageRef = fire.storage().ref('/pictures/' + filename);
      var uploadTask = storageRef.put(this.state.selectedFile);
      //create new item object to submit
      uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        
      }, function(error) {
        console.log(error)
        // Handle unsuccessful uploads
        console.log('Upload was unsuccessful')
        
      }, function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          //consoleconsoleconsoleconsole.log('File available at', downloadURL);
          //console.log("Name: " +filename)

          if (image) {
            //change satate to include url
              console.log(downloadURL)
              const newItemObject = {
                item_name: name,
                item_description: desccrriptiomn, 
                item_quantity: Quanitya,
                item_url: downloadURL
            }

          // post moethord from axios to add data
            axios.post("http://localhost:4000/item/add", newItemObject).then(
              res => {
                console.log(res.data);
              }
          )
            
            
          }else{
            console.log("get ur shit together")
          }

        });
      });



      this.setState({
          name : "",
          descriptionx : "",
          item_quantity : "",
          item_url:"",
          selectedFile : null,
          error : (  <Alert variant="success" style={{borderRadius:"25px", margin:"5%"}}>
          Item has been added
        </Alert>)
      });

    }

    catch {
      this.setState({
        error : (  <Alert variant="danger" style={{borderRadius:"25px", margin:"5%"}}>
          Sorry the item has not been added
        </Alert>)
    })
    }

    }//end



    render(){
  return (
    <div  style={{ width:"40%",  border: '2px solid black' ,  borderRadius: "25px", margin:"auto", marginTop:"8%"}}>
      <div style={{margin:"10%"}}>
      <form>
      <h3>New Item</h3>
      <div class="form-group">
      <label form="F1">Name</label>
        <input style={{width:"90%"}}type="text" className="form-control" id="name" placeholder="description" value={this.state.name} onChange={this.onChangeName}/>
       
        <label form="F1">Description</label>
        <input style={{width:"90%"}}type="text" className="form-control" id="desccrriptiomn" placeholder="description" value={this.state.descriptionx} onChange={this.onChangeDescription}/>
        <label form="F2">Quantity</label>
        <input style={{width:"90%"}}type="text" className="form-control" id="quantity" placeholder="Quantity" value={this.state.item_quantity} onChange={this.onChangeQuantity}/>
        <label for="exampleFormControlFile1">Upload Item</label>
        <input type="file" className="form-control-file" id="exampleFormControlFile1"  onChange={this.onChangePicture}/>  
      </div>
     




      <Button onClick={this.onSubmitForm}>Upload</Button>
    </form>
    </div>
    {this.state.error ? (
      <div>{this.state.error}</div>
    ) : (
    <div> </div>
    )}
    
    </div>
    
  );
}}

export default Upload;
