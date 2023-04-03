//import necessary methods/ components/ hooks /utils /actions /querys / styling etc
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import "../../styles/CM.css";
//Exportin Category menu function that handles displaying certain products based on category selection
function CategoryMenu() {
  //declare variables from global state
  const [state, dispatch] = useStoreContext();
  // set state to category object
  const { categories } = state;
  //query categorys that gets all categories
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  //use effects that updates categorys for each catefory found in the query
  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);
  //onclik event that  that updates current category based on what button was clicked
  // if view all was clicked id is set to empty and all items are shown.
  //else run dispatch to update current_category
  const handleClick = (id) => {
    if (id == "") {
      dispatch({
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: "",
      });
    }

    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };


  return (
    <div>
      <h1>Sort by Category:</h1>
      <div className="Catdiv">

        <button className="btn btn-dark m-2" onClick={() => {
          handleClick("");
        }}> View All </button>

        {categories.map((item) => (

          <button

            className="btn btn-dark m-2"
            key={item._id}
            onClick={() => {
              handleClick(item._id);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryMenu;
