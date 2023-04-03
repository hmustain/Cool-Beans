
import React from "react";

import Products from "../components/Products";

import Nav from "../components/NavTabs";
import sith from "../styles/images/adminimg.jpg"
import feild from "../styles/images/profileimg.jpg"
import { redirect } from 'react-router-dom';

// import CategoryMenu from "../components/CategoryMenu";

// import Cart from "../components/Cart";

import "../styles/Profile.css";

import { QUERY_ME } from "../utils/queries";

import { useQuery } from "@apollo/client";

const Profile = () => {


    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me;


    console.log(user);

    if (!user && !loading) {

        window.location.assign('/login');

    }
    function isadmin() {
        if (user.role == "admin") {
            return (
                <div className="admindiv">
                    <div className="card">
                        <img src={sith} alt="sith lord" width="100%" height="100%"></img>
                        <div className="card-body">
                            <h5 className="card-title">Admin Details</h5>
                            <p className="card-text"></p>

                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">FirstName: {user.firstName}</li>
                            <li className="list-group-item">lastName: {user.lastName}</li>
                            <li className="list-group-item">Email: {user.email}</li>
                        </ul>
                    </div>

                    <form className="card1">
                        <div className="row">
                            <h5>Add a Product</h5>
                            <div className="col-25">
                                <label>Product Name</label>
                            </div>
                            <div className="col-75">
                                <input type="text" placeholder="name.."></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label type="int">Price</label>
                            </div>
                            <div className="col-75">
                                <div className="input-group">
                                    <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)"></input>
                                    <span class="input-group-text">$</span>
                                    <span class="input-group-text">0.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Category</label>
                            </div>
                            <div className="col-75">
                                <select id="country" name="country">
                                    <option value="australia">Light Roast</option>
                                    <option value="canada">Medium Roast</option>
                                    <option value="usa">Dark Roast</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Description</label>
                            </div>
                            <div className="col-75">
                                <textarea id="subject" name="subject" placeholder="Write something.."></textarea>
                            </div>
                        </div>
                        <label>Upload Product Image Below</label>
                        <div class="input-group mb-3">
  <input type="file" class="form-control" id="inputGroupFile02"></input>
  <label class="input-group-text" for="inputGroupFile02">Upload</label>
</div>
                        <div className="row">
                           <button className="btn btn-dark w-50 mx-auto">Submit</button>
                        </div>
                    </form>

                    <div className="card">
                        <div className="card-header">
                            Reviews
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">{user.firstName}</footer>
                                <button>edit</button> <button>delete</button>
                            </blockquote><br></br>
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">{user.firstName}</footer>
                                <button>edit</button> <button>delete</button>
                            </blockquote><br></br>
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">{user.firstName}</footer>
                                <button>edit</button> <button>delete</button>
                            </blockquote><br></br>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="admindiv">
                    <div className="card">
                        <img src={feild} alt="not sith lord" width="100%" height="100%"></img>
                        <div className="card-body">
                            <h5 className="card-title">User Details</h5>
                            <p className="card-text"></p>

                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">FirstName: {user.firstName}</li>
                            <li className="list-group-item">lastName: {user.lastName}</li>
                            <li className="list-group-item">Email: {user.email}</li>
                        </ul>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            Your Reviews
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">{user.firstName}</footer>
                                <button>edit</button> <button>delete</button>
                            </blockquote><br></br>
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">{user.firstName}</footer>
                                <button>edit</button> <button>delete</button>
                            </blockquote><br></br>
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">{user.firstName}</footer>
                                <button>edit</button> <button>delete</button>
                            </blockquote><br></br>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (

        <div className="profilediv">

            <Nav />
            
            <h1 id="profilehead">leave me here</h1>
            <h2>Welcome to your profile {loading ? <p>loading...</p> : user.firstName}</h2>
            <div className="Profilediv">
                {loading ? <p>...</p> : isadmin()}
            </div>
        </div>

    );

};


export default Profile;
// reviews template


/* <div>
<h2>I see your an admin...</h2>

<div className="card">
<img src={sith} alt="sith lord" width="100%" height="100%"></img>
<div class="card-body">
<h5 class="card-title">Admin Info</h5>
<p>hi</p>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item">An item</li>
<li class="list-group-item">A second item</li>
<li class="list-group-item">A third item</li>
</ul>
</div>
    </div> */