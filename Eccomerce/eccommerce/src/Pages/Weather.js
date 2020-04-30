import React, { Component } from 'react';
import { Button,Toast,Alert } from 'react-bootstrap';
import axios from 'axios';

class Weather extends Component{
  
    constructor(props){
        super(props)
        this.onChangeLocation=this.onChangeLocation.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
  
      this.state = {
        city: "",
        data:{},
        main:"",
        description:"",
        error: null,
        alert:null

      }
      }

      onChangeLocation(e){
        this.setState({
          city : e.target.value
        });
  
      }

      onSubmit(e) {
        e.preventDefault();
        this.getWeather();


      }
  

  getWeather = async () => 
  {
      try {
          console.log("trying")
      const api = await fetch("http://api.openweathermap.org/data/2.5/weather?q="+this.state.city+"&appid=5bc1af2f0ece90619d3d7525233411a8")
      const response = await api.json();
      console.log("res  " + JSON.stringify(response.cod))
      if (response.cod == "200")
      {

        this.setState({
            data : response.weather,
            main:response.weather[0].main,
            description:response.weather[0].description,
            alert:null
        });

        console.log(JSON.stringify(response.weather[0].main))
      }
      else
      {
        this.setState({
            alert : (<Alert variant="danger" style={{borderRadius:"25px", margin:"5%"}}>
            City doesnt exist
          </Alert>)
        });
      }

    }
    catch(error) {
        this.setState({
            error : (<Toast style={{margin:"auto"}}>
            
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Error</strong>
                    <small>1 second ago</small>
                </Toast.Header>
                <Toast.Body>Hey, the city or api doesn not exist, please try again.</Toast.Body>
            </Toast>)
        });
    }
  }


  render() {
    return (
        <div>
        <div  style={{ width:"40%",  border: '2px solid black' ,  borderRadius: "25px", margin:"auto", marginTop:"5%"}}>
        <div style={{margin:"10%"}}>
        <form>
        <h3>Select city</h3>
        <div class="form-group">
        <label form="F1">City</label>
          <input style={{width:"90%"}}type="text" className="form-control" id="name" placeholder="city" value={this.state.city} onChange={this.onChangeLocation}/>
        </div>
       
  
  
  
  
        <Button onClick={this.onSubmit}>Upload</Button>
      </form>
      </div>
      </div>
        {
        this.state.main ? (
            <div style={{ width:"40%",  border: '2px solid black' ,  borderRadius: "25px", margin:"auto", marginTop:"5%"}} >
                <div style={{margin:"10%"}}>
                    <h2>Weather Forcast today</h2>
                    <p>the main weather today will mostly be {this.state.main}</p>
                    <p>more detail about the upcoming {this.state.main}, is that it will most likely be {this.state.description} </p>
                </div>
            </div>
                )
                :
                (
                    <div >{this.state.error}</div>
                )

                
        }
        {
            this.state.alert ? (
                <div>{this.state.alert}</div>
            ) :
            (
                <div></div>
            )
            }
        
      </div>
        
    )
  }
}

export default Weather