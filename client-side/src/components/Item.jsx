import React from "react";

export default class Item extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="card">
                <img className="card-img-top" 
                    src={this.props.data.imageURL}/>
                <div className="card-body">
                    <h4 className="card-title">{this.props.data.title}</h4>
                    <h5 className="card-title">${this.props.data.price.toFixed(2)}</h5>
                    <p className="card-text" style={{minHeight:'200px'}}>{this.props.data.description}</p>
                    <button onClick={()=>{this.props.addItemToCart(this.props.data)}} className="btn btn-primary w-100">Add to Cart</button>
                </div>
            </div>
        );
    }
}