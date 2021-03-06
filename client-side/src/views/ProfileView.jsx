import React from "react";
import { API_BASE_URL } from "../config/variables";
import secureImage from "./images/secure.svg";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FadeIn from 'react-fade-in';

import LoginView from "./LoginView";
import RegisterView from "./RegisterView";
import Table from "../components/Table";

export default class ProfileView extends React.Component {
  state = {
    isLogin: false,
    isRegister: false,

    errMsg: "",
  };
  constructor(props) {
    super(props);
  }
  _fetchLogout = async () => {
    const bearer = "Bearer " + localStorage.getItem("jwt");
    await fetch(API_BASE_URL + "/customer/logout", {
      method: "POST",
      body: JSON.stringify({
        userID: this.props.user.id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.errorMsg) {
          this._updateErrMsg(responseData.errorMsg);
        } else {
          localStorage.setItem("jwt", null);
          this.props.updateUser(null);
        }
      });
  };
  // _fetchDeleteAccount = async() =>{
  //   const bearer = "Bearer " + localStorage.getItem("jwt");
  //   await fetch(API_BASE_URL + "/customer/delete-account", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       userID: this.props.user.id,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: bearer,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       if (responseData.errorMsg) {
  //         this._updateErrMsg(responseData.errorMsg);
  //       } else {
  //         localStorage.setItem("jwt", null);
  //         this.props.updateUser(null);
  //       }
  //     });
  // }
  _selectRegister = () => {
    let newState = this.state;
    newState.isRegister = true;
    newState.isLogin = false;
    this.setState(newState);
  };
  _selectLogin = () => {
    let newState = this.state;
    newState.isRegister = false;
    newState.isLogin = true;
    this.setState(newState);
  };
  _selectProfile = () => {
    let newState = this.state;
    newState.isRegister = false;
    newState.isLogin = false;
    this.setState(newState);
  };
  _updateErrMsg = (msg) => {
    if (typeof msg == "object") {
      msg = JSON.stringify(msg);
    }
    let newState = this.state;
    newState.errMsg = msg;
    this.setState(newState);
  };
  _renderOptions = () => {
    return (
      <FadeIn>
      <div className="col-lg-12 card p-card" style={{ minHeight: "30em" }}>
        <div className="row">
          <div className="col-lg-6 h-100">
            <img src={secureImage} style={{ width: "100%" }} />
          </div>
          <div className="col-lg-6 h-100 text-center">
            <div className="col-lg-12">
              <h4 style={{ marginBottom: "150px" }}>
                Please select one of the following:
              </h4>
            </div>
            <div className="col-lg-12 d-inline" style={{ marginTop: "30%" }}>
              <button
                onClick={this._selectLogin}
                className="btn btn-primary btn-lg"
              >
                Login
              </button>
              <p
                style={{
                  display: "inline",
                  marginRight: "30px",
                  marginLeft: "30px",
                }}
              >
                Or
              </p>
              <button
                onClick={this._selectRegister}
                className="btn btn-primary btn-lg"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      </FadeIn>
    );
  };
  _renderLogin = () => {
    return (
      <LoginView
        toggleBack={this._selectProfile}
        updateErrMsg={this._updateErrMsg}
        updateUser={this.props.updateUser}
      />
    );
  };
  _renderRegister = () => {
    return (
      <RegisterView
        toggleBack={this._selectProfile}
        updateErrMsg={this._updateErrMsg}
        updateUser={this.props.updateUser}
      />
    );
  };
  _calculateInfo = () =>{
    var total = 0;
    var itemsLen = 0;
    var orderLength = this.props.user.orders.length;
    for(var i=0;i<this.props.user.orders.length;++i){
      total = total + this.props.user.orders[i].totalPrice;
      for(var ix=0;ix<this.props.user.orders[i].items.length;++ix){
        itemsLen = itemsLen + this.props.user.orders[i].items[ix].quantity;
      }
    }
    var obj = {
      total:total,
      itemsLen:itemsLen,
      orderLength:orderLength
    }
    return obj;
  }
  _renderProfile = () => {
    var infoObj = this._calculateInfo();
    var date = new Date(this.props.user.dateCreated);
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    var formattedDate = month + "/" + day + "/" + year;
    return (
      <FadeIn>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card p-card" style={{maxHeight:"100%" }}>
              <div className="row">
                <div className="col-lg-8">
                  <h6 style={{ fontWeight: "bold" }}>My Profile:</h6>
                </div>
                <div className="col-lg-4">
                  <FontAwesomeIcon
                    className="dropdown-toggle"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    icon={faEllipsisV}
                    style={{
                      float: "right",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  />
                  <div
                    class="dropdown-menu"
                    style={{ minWidth: "6rem" }}
                    aria-labelledby="dropdownMenuButton"
                  >
                    <p
                      onClick={this._fetchLogout}
                      class="dropdown-item"
                      style={{
                        color: "black",
                        marginBottom: 0,
                        cursor: "pointer",
                      }}
                    >
                      Logout
                    </p>
                    {/* <div class="dropdown-divider"></div>
                    <p
                      onClick={this._fetchDeleteAccount}
                      class="dropdown-item"
                      style={{
                        color: "#E25950",
                        marginBottom: 0,
                        cursor: "pointer",
                      }}
                    >
                      Delete Account
                    </p> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-12 text-center">
                <img
                  src="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  className="img-fluid"
                  style={{
                    width: "150px",
                    borderRadius: "50%",
                    marginTop: "30px",
                  }}
                />
              </div>
              <div className="row" style={{ marginTop: "2em", flex: "1" }}>
                <div className="col-lg-12 text-center">
                <h7 style={{ fontWeight: "bold" }}>{this.props.user.name}</h7>
                </div>
                <div className="col-lg-12 text-center">
                <h7 style={{ color: "#9b9b9b" }}>{this.props.user.username}</h7>
                </div>
                <div className="col-lg-12 text-center">
                  <h7 style={{ color: "#9b9b9b" }}>Joined: {formattedDate}</h7>
                </div>

                <div
                  style={{ marginTop: "30px" }}
                  className="col-lg-4 text-center"
                >
                  <h7 style={{ color: "#9b9b9b" }}>Spent:</h7>
                </div>
                <div
                  style={{ marginTop: "30px" }}
                  className="col-lg-4 text-center"
                >
                  <h7 style={{ color: "#9b9b9b" }}>Items:</h7>
                </div>
                <div
                  style={{ marginTop: "30px" }}
                  className="col-lg-4 text-center"
                >
                  <h7 style={{ color: "#9b9b9b" }}>Orders:</h7>
                </div>

                <div
                  style={{ marginTop: "10px" }}
                  className="col-lg-4 text-center"
                >
                  <h7 style={{ fontWeight: "bold" }}>${infoObj.total.toFixed(2)}</h7>
                </div>
                <div
                  style={{ marginTop: "10px" }}
                  className="col-lg-4 text-center"
                >
                  <h7 style={{ fontWeight: "bold" }}>{infoObj.itemsLen}</h7>
                </div>
                <div
                  style={{ marginTop: "10px" }}
                  className="col-lg-4 text-center"
                >
                  <h7 style={{ fontWeight: "bold" }}>{infoObj.orderLength}</h7>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card p-card" style={{marginBottom:"5rem" }}>
              <div className="col-lg-12">
                <h6 style={{ fontWeight: "bold", marginBottom:'1rem'}}>My Orders:</h6>
              </div>
              <div className="col-lg-12">
                <Table orders={this.props.user.orders}/>
              </div>
            </div>
            {/* <div className="card p-card">
<div className="col-lg-12">
<h5 style={{ fontWeight: "bold" }}>Billing Info:</h5>
</div>
</div> */}
          </div>
        </div>
      </div>
      </FadeIn>
    );
  };
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div
            className={
              "alert alert-danger " +
              (this.state.errMsg.length == 0 ? "my-hide" : "")
            }
            role="alert"
          >
            {this.state.errMsg}
          </div>
        </div>
        {this.props.user
          ? 
            this._renderProfile()
          : !this.props.user && this.state.isLogin
          ? this._renderLogin()
          : !this.props.user && this.state.isRegister
          ? this._renderRegister()
          : this._renderOptions()}
      </div>
    );
  }
}