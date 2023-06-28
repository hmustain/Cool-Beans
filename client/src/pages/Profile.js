//import components/ react/usestate/usemutation/ utils to handle future addproduct./ query/ styles etc..
import React, { useState,useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/mutations";
import { QUERY_ME, QUERY_CATEGORIES } from "../utils/queries";
import Nav from "../components/NavTabs";
import sith from "../styles/images/adminimg.jpg";
import feild from "../styles/images/profileimg.jpg";
import "../styles/Profile.css";

//big profile function that displays either a Admin profile or User profile based on user.role
const Profile = () => {
    const [formState, setFormState] = useState({
        name: "",
        description: "",
        price: 0,
        image: "noimage.png",
        quantity: "",
        category: "",
      });
     
    const [AddProduct] = useMutation(ADD_PRODUCT);
    const { loading, data } = useQuery(QUERY_ME);
const { loading: categoriesLoading, data: categoriesData } = useQuery(QUERY_CATEGORIES);
useEffect(() => {
    if (categoriesData && categoriesData.categories.length > 0) {
      const defaultCategoryId = categoriesData.categories[0]._id;
      setFormState((prevState) => ({
        ...prevState,
        category: defaultCategoryId,
      }));
    }
  }, [categoriesData]);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState.category, "image on submit here");
//         const formData = new FormData();
//   formData.append("image", selectedImage);
        const mutationResponse = await AddProduct({
          variables: {
            product: {
                 name: formState.name,
             description: formState.description,
             image: formState.image,
            price: parseFloat(formState.price),
            quantity: parseInt(formState.quantity, 10),
            category: formState.category ? formState.category : null
              }
            // name: formState.name,
            // description: formState.description,
            // image: formState.image,
            // price: parseInt(formState.price),
            // quantity: parseInt(formState.quantity),
            // category: formState.category
          }
        });
        console.log(mutationResponse, "mutation here");
      };
    //handle change to update and save input feilds while user is typing
    const handleChange = (event) => {
     
        
        const { name, value } = event.target;
        console.log(name,"name")
        console.log(value,"val")
        setFormState({
            ...formState,
            [name]: value,
        });
        console.log(formState.category,"cat after")
    
    };
 
       //if statement that redirects user to home page if they arent logged in
       const user = data?.me;
       if (!user && !loading) {
   
           window.location.assign('/login');
   
       }
    //if admin display admin details
    //form for adding a new product
    //dummy card displaying all reviews user made
    function isadmin() {
        
        if (user.role == "admin") {
            if (categoriesLoading) {
                return <p>Loading categories...</p>;
              }
            const categories = categoriesData?.categories || [];
            const defaultCategoryId = categoriesData?.categories.length > 0 ? categoriesData.categories[0]._id : "";
            
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

                    <form className="card1" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <h5>Add a Product</h5>
                            <div className="col-25">
                                <label>Product Name</label>
                            </div>
                            <div className="col-75">
                                <input type="text" placeholder="name.." id="name"
                                    name="name"
                                    onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label type="int">Price</label>
                            </div>
                            <div className="col-75">
                                <div className="input-group">
                                <input type="number" className="form-control"
    id="price"
    name="price"
    aria-label="Dollar amount (with dot and two decimal places)"
    step="0.01"
    min="0.99"
    onChange={handleChange}
/>
                                    <span className="input-group-text">$</span>
                                    <span className="input-group-text">0.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>Quantity</label>
                            <input type="number" className="form-control" id="quantity" name="quantity" onChange={handleChange}></input>
                        </div>
                        <div className="row">

                            <div className="col-25">
                                <label>Category</label>
                            </div>
                            <div className="col-75">
                            <select id="category" name="category" onChange={handleChange}>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id} >
                      {category.name}
                    </option>
                  ))}
                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Description</label>
                            </div>
                            <div className="col-75">
                                <input type="text"
                                    placeholder="Write something.."
                                    id="description"
                                    name="description"

                                    onChange={handleChange}></input>
                            </div>
                        </div>
                        <label>Upload Product Image Below</label>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" id="image"
                                name="image"
                                disabled={true}
                                // accept="image/*"
                                onChange={handleChange}></input>

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
            //else return user info
            //and dummy card displaying reviews user made
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
