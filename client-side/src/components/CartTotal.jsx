import React from "react";

export default class CartTotal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="card" style={{padding:"20px"}}> 
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h3>Total:</h3>
                    </div>
                    <div className="col-lg-12 text-center">
                        <h5 style={{marginTop:"30px"}}>$ {this.props.total.toFixed(2)}</h5>
                    </div>
                    <div className="col-lg-12 text-center" style={{marginTop:"10px"}}>
                        <button className="btn btn-primary" onClick={()=>{this.props.toggleCheckout()}} style={{width:"100%"}}>Checkout</button>
                    </div>
                </div>
            </div>
        );
    }
}