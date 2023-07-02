import React from "react";
import Base from "../../components/Base";
import AddPost from "../../components/AddPost";
import { Container } from "reactstrap";
import {useState,useEffect} from 'react'
import { getCurrentUser } from "../../services/auth";
import {loadPostByUser, deletePostAxios} from '../../services/post-service'
import { toast } from "react-toastify";
import Post from "../../components/Post";

const UserDashboard = () => {

  const [user,setUser] = useState({})
  const [posts,setPosts] = useState([])

  useEffect(() => {
    console.log(getCurrentUser());
    
    setUser(getCurrentUser())
    loadedPostData()
  }, [])

  function loadedPostData(){
    loadPostByUser(getCurrentUser().id).then(data=>{
      console.log(data);
      setPosts([...data]);
    }).catch(error=>{
      console.log(error);
      toast.error("Error in Loading user Posts !")
      
    })
  }

  //delete post func have to passed as props for Post compo
  // -- /api/posts/{postId}
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
      <Container>
        <AddPost />
        <h1 className="my-3">Post Count: {posts.length}</h1>
        {
          posts.map( (post,index)=>{
            return (
              <Post post={post} deletePost={deletePost} key={index}/>
            )
          })
        }
      </Container>
    </Base>
  );
};

export default UserDashboard;
