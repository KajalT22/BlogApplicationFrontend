import React from "react";
import { useEffect, useState } from "react";
import { loadAllPosts, deletePostAxios } from "../services/post-service";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";

function NewFeed() {
  const [posts, setPosts] = useState({
    postContent: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  //load all the posts from the server
  useEffect(() => {
    changePage(0);
  }, []);

  //change page
  const changePage = (pageNumber = 0, pageSize = 5) => {
    //checking conditions to move page to next prev
    if (pageNumber > posts.pageNumber && posts.lastPage) {
      return;
    }
    //prev
    if (pageNumber < posts.pageNumber && posts.pageNumber == 0) {
      return;
    }
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPosts(data);
        window.scroll(0, 0);
      })
      .catch((error) => {
        toast.error("Error in loading posts!");
      });
  };

  const deletePost = (post)=>{
    deletePostAxios(post.postId).then(data=>{
      console.log(data);
      toast.success("Post deleted sucess !!")
      let newPostContents=  posts.postContent.filter(p=>p.postId != post.postId)
      setPosts({...posts, postContent: newPostContents})
     
    }).catch(error=>{
      console.log(error);
      toast.error("Error in post deletion !! ")
    })
  }

  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 12 }}>
          <h1>Blog Count ({posts?.totalElements})</h1>
          {/* fetch all the posts */}
          {posts.postContent.map((post) => (
            // pass everything from post
            <Post post={post} deletePost={deletePost} key={post.postId} />
          ))}

          {/* pagination */}
          <Container className="mt-2">
            <Pagination size="lg">
              <PaginationItem
                onClick={() => changePage(posts.pageNumber - 1)}
                disabled={posts.pageNumber == 0}
              >
                <PaginationLink previous></PaginationLink>
              </PaginationItem>
              {/* dynamically fect page numbers */}
              {[...Array(posts.totalPages)].map((item, index) => (
                <PaginationItem
                  onClick={() => changePage(index)}
                  active={index == posts.pageNumber}
                  key={index}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem
                onClick={() => changePage(posts.pageNumber + 1)}
                disabled={posts.lastPage}
              >
                <PaginationLink next></PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
