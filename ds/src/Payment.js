import React, { useState } from "react";
import "./Payment.css";

const Payment = (props) => {
  const [mobileCash, setMobileCash] = useState(false);
  const [creditCard, setCreditCard] = useState(false);
  
  const[phoneNumber,setPhoneNumber] = useState(null)
  const[name,setName] = useState('')
  const[creditCardNumber,setCreditCardNumber] = useState(null)
  const[expMonth,setExpMonth] = useState(null)
  const[expYear,setExpYear] = useState(null)
  const[cvv,setCvv] = useState(null)


  const paymentTypeHandler = (id, event) => {
    if (id == 1) {
      mobileCash ? setMobileCash(false) : setMobileCash(true);
      creditCard && setCreditCard(false);
    } else {
      creditCard ? setCreditCard(false) : setCreditCard(true);
      mobileCash && setMobileCash(false);
      console.log(creditCard);
    }
  };


const mobilePaymentHandler = () =>{


    console.log(phoneNumber)


}
const cardPaymentHandler = () =>{

    const cardDetails = {
        name,
        creditCardNumber,
        expMonth,
        expYear,
        cvv
    }

    console.log(cardDetails)
}





  return (
    <div class="paymentSelectBox">
      <center>
        <form>
          <h1>Select Payment Type</h1>
          <input
            type="radio"
            name="payment"
            value={mobileCash}
            onChange={(event) => paymentTypeHandler(1, event)}
          />
          Mobile Cash
          <br />
          <input
            type="radio"
            name="payment"
            value={creditCard}
            onChange={(event) => paymentTypeHandler(2, event)}
          />
          Credit Card
          <br />
          <br />
        </form>
      </center>

      {mobileCash && (
        <center>
          <br />
          <br />
          <label for="phone">Enter a phone number:</label>
          <input
            type="tel"
            placeholder="077-4567884"
            pattern="[0-9]{3}-[0-9]{7}"
            required
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <br />
          <br />
          <small>Format: 077-4567884</small>
          <br />
          <br />
          <input type="submit" onClick={mobilePaymentHandler}/>
        </center>
      )}

      {creditCard && (
        <center>
          <div class="col-50">
            <h3>Payment</h3>

            <label >Name on Card</label>
            <input type="text" placeholder="John More Doe" value={name} onChange={(event) => setName(event.target.value)}/>
            <label >Credit card number</label>
            <input
              type="text"
              placeholder="1111-2222-3333-4444"
              value={creditCardNumber}
              onChange={(event) => setCreditCardNumber(event.target.value)}
            />
            <label >Exp Month</label>
            <input type="text" placeholder="September" value={expMonth} onChange={event => setExpMonth(event.target.value)}/>
            <div class="row">
              <div class="col-50">
                <label >Exp Year</label>
                <input type="text" placeholder="2018" value={expYear} onChange={event => setExpYear(event.target.value)}/>
              </div>
              <div class="col-50">
                <label >CVV</label>
                <input type="text"   placeholder="352" value={cvv} onChange={event => setCvv(event.target.value)} />
              </div>
              <input type="submit" onClick={cardPaymentHandler} />
            </div>
          </div>
        </center>
      )}
    </div>
  );
};

export default Payment;
