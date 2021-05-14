import React, { useState } from "react";
import "./Delivery.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Delivery = (props) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);

  let history = useHistory();
  
  const deliveryHandler = () => {
      
    if(name){
        if(address){
            if(zip){

                const deliveryDetails = {
                    name,
                    email,
                    address,
                    city,
                    state,
                    zip
                }
                history.push('/Payment') 
                console.log(deliveryDetails)
            }
        }
    }


  };

  return (
    <div class="delivery_form">
      <center>
        <div class="row">
          <div class="col-50">
            <h3>Delivery Details</h3>
            <label> Full Name *</label>
            <input
              type="text"
              placeholder="John M. Doe"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label > Email</label>
            <input
              type="text"
              
              value={email}
              placeholder="john@example.com"
              onChange={(event) => setEmail(event.target.value)}
            />
            <label > Address *</label>
            <input
              type="text"
            
              placeholder="542 W. 15th Street"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <label > City</label>
            <input
              type="text"
              
              placeholder="Colombo"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <label >State</label>
            <input type="text" placeholder="NY" value={state}onChange={((event) => setState(event.target.value))}/>
            <label >Zip *</label>
            <input type="text" placeholder="10001" value={zip} onChange={((event) => setZip(event.target.value))}/>

            <div class="row">
              <input
                type="submit"
                value="Continue to checkout"
                class="btn"
                onClick={deliveryHandler}
              ></input>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Delivery;
