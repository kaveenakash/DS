import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [addProductStatus, setAddProductStatus] = useState(false);
  const [updateProductStatus,setUpdateProductStatus] = useState(false)
  const [refreshState, setRefreshState] = useState(false);
  const [adminEmail, setEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [sellerProductData, setSellerProductData] = useState([]);
  const [updateItemId,setUpdateItemId] = useState('')
  const [updateItem,setUpdateItem] = useState('')
  const [updateItemPrice,setUpdateItemPrice] = useState('')

  const loginHandler = () => {
    axios
      .post("http://localhost:8000/api/admin-login", {
        adminEmail,
        adminPassword,
      })
      .then((response) => {
        response.status === 200 &&
          response.data.login_status &&
          setLoginStatus(response.data.login_status);
        setRefreshState(!refreshState);
      })
      .catch((error) => {
        console.log(error);
        alert("Login Failed");
      });
  };

  const addProductHandler = () => {
    const data = {
      id: productId,
      sellerEmail: adminEmail,
      product: productName,
      price: productPrice,
    };
    axios
      .post("http://localhost:8000/api/addProducts", data)
      .then((res) => {
        console.log(res);
        alert("Product Added");
        setRefreshState(!refreshState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const data = {
      sellerEmail: adminEmail,
    };
    const newData = JSON.stringify(data);

    axios
      .post("http://localhost:8000/api/getProductsBySeller", newData)
      .then((res) => {
        setSellerProductData(res.data.data);
        console.log(sellerProductData);
      })
      .catch((err) => {});
  }, [refreshState]);

  const updateProductHandler = (e) => {
    e.preventDefault()
    const data = {
      id: updateItemId,
      product: updateItem,
      price:updateItemPrice,
      sellerEmail:adminEmail
    };
    const newData = JSON.stringify(data)
    axios.put('http://localhost:8000/api/update-product',newData)
    .then(res =>{
      alert("Updated Product")
      setRefreshState(!refreshState)
    })
    .catch(err =>[

    ])
    console.log(data);
  };

  const deleteProductHandler = (e,id) => {

    const deleteData = {
      data:{
        id:id,
        sellerEmail:adminEmail
      }
    }
    console.log(productId)
    e.preventDefault();
    axios.delete("http://localhost:8000/api/deleteProducts",deleteData)
    .then(res =>{
      console.log(res.data.data)
      alert("Deleted")
      setRefreshState(!refreshState)
    })
    .catch(err =>{

    })

  };
  const updateFormHandler = (id,product,price) => {
    setUpdateItemId(id)
    setUpdateItem(product)
    setUpdateItemPrice(price)
  }

  const loginForm = (
    <center>
      {" "}
      <div>
        <label>
          <b>Email</b>
        </label>
        <input
          placeholder="Enter Email "
          value={adminEmail}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label>
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          value={adminPassword}
          onChange={(event) => setAdminPassword(event.target.value)}
          required
        />
        <br />
        <br />

        <button type="submit" onClick={loginHandler}>
          Login
        </button>
      </div>
    </center>
  );

  const addProductForm = (
    <center>
      <form>
        <h2>Add Product Form</h2>
        <label>Product ID</label>
        <input
          value={productId}
          onChange={(event) => setProductId(event.target.value)}
        />
        <label>Product Name</label>
        <input
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        />
        <label>Product price</label>
        <input
          value={productPrice}
          onChange={(event) => setProductPrice(event.target.value)}
        />
        <br />
        <br />
        <button
          onClick={(e) => {
            addProductHandler();
            e.preventDefault();
          }}
          type="submit"
        >
          Add Product
        </button>
      </form>
    </center>
  );

  const productTable = (
    <center>
      <div id="cart">
        <h2>Your Items</h2>

        <table>
          <tbody>
            <tr>
              <th>Item</th>
              <th>price</th>
              <th></th>
              <th></th>
            </tr>
            {sellerProductData.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.product}</td>
                  <td>Rs.{item.price}</td>
                  <td>
                    <button onClick={(e) => {e.preventDefault();setUpdateProductStatus(!updateProductStatus);updateFormHandler(item.id,item.product,item.price)}}>update</button>
                  </td>
                  <td>
                    <button onClick={(e) => {deleteProductHandler(e,item.id)}}>delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </center>
  );


  const updateProductForm = (
    <center>
    <form>
      <h2>Update Product Form</h2>
      <label>Product ID</label>
      <input
       value={updateItemId}
       onChange={e => setUpdateItemId(e.target.value)}
      />
      <label>Product Name</label>
      <input
      value={updateItem}
      onChange={e => setUpdateItem(e.target.value)}
      />
      <label>Product price</label>
      <input
        value={updateItemPrice}
        onChange={e => setUpdateItemPrice(e.target.value)}
      />
      <br />
      <br />
      <button
        onClick={(e) => updateProductHandler(e)}
        type="submit"
      >
        update Product
      </button>
    </form>
  </center>
  )

  return (
    <div>
      <center>
        {" "}
        <h3>Admin Panel</h3>
      </center>
      <center>
        {" "}
        <button
          onClick={(e) => {
            setAddProductStatus(!addProductStatus);
            e.preventDefault();
          }}
          type="submit"
        >
          Add Product
        </button>
      </center>

      {!loginStatus && loginForm}
      {loginStatus && !addProductStatus && addProductForm}
      {loginStatus && productTable}
      {loginStatus && updateProductStatus && updateProductForm}
    </div>
  );
};

export default Admin;
