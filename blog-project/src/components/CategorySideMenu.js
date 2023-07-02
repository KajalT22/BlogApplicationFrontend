import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useEffect, useState } from "react";
import { loadAllCategories } from "../services/category-service";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';

function CategorySideMenu() {
  const [categories, setCategories] = useState([]);
  //load all the categories
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data);

        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Loading Category!!");
      });
  }, []);
  return (
    <div>
      <ListGroup>
        <ListGroupItem style={{background:'orange'}} tag={Link} to="/" action={true} className="border-0">
          <b>All Blogs</b>
        </ListGroupItem>
        {/* show loaded categores one by one */}
        {categories &&
          categories.map((cat, index) => {
            return (
                // getSingle Category by id - categories/'+categoryId  - 
                //Category compo get render for this url
              <ListGroupItem tag={Link} to={'/categories/'+cat.categoryId} action={true} className="border-0 shadow-0 mt-1" key={index}>
                {cat.catTitle}
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </div>
  );
}

export default CategorySideMenu;
