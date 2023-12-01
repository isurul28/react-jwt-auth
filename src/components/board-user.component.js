import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      persondata: ""
    };
  }

  // componentDidMount() {
  //   axios.get(`http://localhost:8080/person`)
  //   .then(function (response){
  //     console.log(response)
  //     console.log(response.data[0].City)
  //     this.state.persondata = response;
     
  //   })    
  componentDidMount() { 
    
   UserService.getPerson().then(
     response => {
       this.setState({
         content: response.data
        });
      },
      error => {
       this.setState({
         content:
           (error.response &&
             error.response.data &&
              error.response.data.message) ||
           error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
         EventBus.dispatch("logout");
        }
      }
   );
  }
 
  render(){
    return(
     <div>
          <h2><u>Member List</u></h2>
            {
                this.state.content && 
                this.state.content.map(  person =>{
                    return(
                        <div class="row">
                            <div class="col s12 m7">
                            <div class="card blue-grey darken-1">
                                                             
                                    <div class="card-content white-text">
                                    <span class="card-title">{person.FirstName}</span>
                                   
                                     <p>   </p>
                                     <p> Member Number      : {person.PersonID}     </p>
                                     <p> Member Last Name: {person.LastName}  </p>
                                     <p> Member First Name      : {person.FirstName}   </p>
                                     <p> Member Address      : {person.Address}   </p>
                                     <p> Member City      : {person.City}   </p>
                                            </div>
                                   
                                    </div>
                                    </div>
                                </div>                
                    )
                })
            }
        </div>
    )
}

}

