import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { Link } from "react-router-dom";
import "../../styles/CM.css";
function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

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

  // const handleClick = (name) => {
  //     console.log(name)
  //     switch (name) {
  //       case 'Light Roast':
  //         window.location.assign('/LightRoast');
  //         console.log('you clicked lightroast');
  //         break;
  //       case 'Medium Roast':
  //         console.log('you clicked medium');
  //         window.location.assign('/MediumRoast');
  //         break;
  //       case 'Dark Roast':
  //         window.location.assign('/DarkRoast');
  //         console.log('clicked dark');
  //         break;
  //       default:
  //         console.log(' is not available right now');
  //       }
  //   };
  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Sort by Category:</h2>
      <div className="Catdiv">
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
