import "./App.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Home = (props) => {
  const [cartData, setCartData] = useState([]);
  const [totalBill, setTotalBill] = useState(null);
  const [order, serOrder] = useState(null);
  const [productData, setProductData] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:8000/api/getProducts").then((response) => {
      setProductData(response.data.data);
    });
  }, []);

  const cartHandler = (id, product, price) => {
    const indexPlace = cartData.findIndex((item) => item.id == id);

    setTotalBill((prev) => prev + price);

    if (indexPlace === -1) {
      setCartData([
        ...cartData,
        { id: id, product: product, items: 1, price: price },
      ]);

      // console.log(cartData)
    } else {
      let myData = [...cartData];

      let totalItems = myData[indexPlace].items + 1;
      let totalPrice = myData[indexPlace].price + price;

      myData[indexPlace] = {
        id: id,
        product: product,
        items: totalItems,
        price: totalPrice,
      };

      setCartData(myData);
    }
  };

  const orderHandler = () => {
    if (!(cartData[0] == undefined)) {
      history.push("/delivery");
    }
  };

  return (
    <div className="App">
      <button  onClick={() => history.push("/admin-panel")}>
          Admin Panel Login
        </button>
      <button  onClick={() => history.push("/registration")}>
          Admin Registration
        </button>
      <table id="products">
        <tbody>
        <tr>
          <th>
            <center>Product</center>
          </th>
          <th>
            <center>Price</center>
          </th>
          <th>
            <center></center>
          </th>
        </tr>
        {productData.map((item) => {
          return (
            <tr key={item.product}>
              <td>{item.product} - ({item.id})</td>
              <td>Rs.{item.price}/=</td>
              <td>
                <button
                  onClick={() => cartHandler(item.id, item.product, item.price)}
                >
                  Add to cart
                </button>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
      <div id="cart">
        <h2>Cart</h2>

        <table>
          <tbody>
          <tr>
            <th>Product/</th>
            <th>No of items</th>
            <th>/price</th>
          </tr>
          {cartData.map((item) => {
            return (
              <tr key={item.product}>
                <td>{item.product}</td>
                <td>{item.items}</td>
                <td>Rs.{item.price}/=</td>
              </tr>
            );
          })}
          </tbody>
        </table>
        <p>==========================</p>
        <p>Total Bill : Rs.{totalBill}/=</p>
        <button  onClick={() => orderHandler()}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Home;
