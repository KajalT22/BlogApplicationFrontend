import {privateAxios,myAxios} from './helper';

export const createPost=(postData)=>{
   // console.log(postData);
    
    return privateAxios.post(`/api/user/${postData.userId}/category/${postData.categoryId}/posts`,postData)
    .then(response=>response.data)
}

//get ALL posts //as per pagenumber size
export const loadAllPosts=(pageNumber,pageSize)=>{
    return myAxios.get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response=>response.data)
}

//get single post as per postId to show the if user want to click read more about that post
export const loadSinglePost = (postId)=>{
    return myAxios.get("/api/posts/"+postId).then(response=>response.data)
}

//create comment /api/post/{postId}/comments
export const createComment= (comment,postId)=>{
    return privateAxios.post(`/api/post/${postId}/comments`,comment)
}

//upload post image /api/posts/image/upload/{postId}
//@RequestParam("image") MultipartFile image, have to send image in params form key is immage
export const uploadPostImage=(image,postId)=>{
    let formData = new FormData();
    formData.append("image",image);
    return privateAxios.post(`/api/posts/image/upload/${postId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response=>response.data)
}

//get posts By categories for filtering
// -- /api/category/{categoryId}/posts
export const loadPostByCategory = (categoryId)=>{
    return myAxios.get(`/api/category/${categoryId}/posts`).then(response=>response.data)
}

//load post as per user for deleting a post of particular user
// /api/user/{userId}/posts

export const loadPostByUser = (userId)=>{
    return myAxios.get(`/api/user/${userId}/posts`).then(response=>response.data)
}

//delete post -- /api/posts/{postId}
export const deletePostAxios = (postId)=>{
    return privateAxios.delete(`/api/posts/${postId}`).then(response=>response.data)
}

//update post
export function updatePost(post, postId) {
    console.log(post);
    return privateAxios.put(`/api/posts/${postId}`, post).then((resp) => resp.data);
  }