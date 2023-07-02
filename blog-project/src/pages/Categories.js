import React from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
import { loadPostByCategory,deletePostAxios } from "../services/post-service";
import { toast } from "react-toastify";
import Post from "../components/Post";

function Categories() {
  const [posts, setPosts] = useState([]);

  //get categoryId
  const { categoryId } = useParams();
  useEffect(() => {
    console.log(categoryId);
    loadPostByCategory(categoryId)
      .then((data) => {
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading posts!");
      });
  }, [categoryId]);

  //delete post
  const deletePost = (post)=>{
    deletePostAxios(post.postId).then(data=>{
      console.log(data);
      toast.success("Post deleted sucess !!")
     let newPostData =  posts.filter(p=>p.postId != post.postId)
     setPosts([...newPostData])
     
    }).catch(error=>{
      console.log(error);
      toast.error("Error in post deletion !! ")
    })
  }

  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-3">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <h2>Blogs Count ({posts.length})</h2>
            {posts &&
              posts.map((post, index) => {
                return <Post key={index} post={post}  deletePost={deletePost}/>;
              })}

            {posts.length<=0 ?<h1>No Post in this Category !</h1> : ""}
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Categories;
