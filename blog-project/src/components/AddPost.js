import {
  Card,
  CardBody,
  Input,
  Label,
  Form,
  Button,
  Container,
} from "reactstrap";
import { useState, useEffect, useRef } from "react";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { createPost, uploadPostImage } from "../services/post-service";
import { getCurrentUser } from "../services/auth";

const AddPost = () => {
  const editor = useRef(null);

  //save state of all the categories
  const [categories, setcategories] = useState([]);
  //save user details to pass userid to url
  const [user, setUser] = useState(undefined);

  //save all the i/p fields to post
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  //for image uploading feild
  const [image,setImage] = useState(null)

  //it will get load exactly once as no depndancies []
  useEffect(() => {
    //set the user by getting current userdetails
    setUser(getCurrentUser());
    //all categories from db get load exactly once
    loadAllCategories()
      .then((data) => {
        //console.log(data);
        //save/set all categories state
        setcategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //feildchange func
  const fieldChanged = (event) => {
    //console.log(event);
    //set post state for every change
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const contentChanged = (data) => {
    //console.log(event);
    setPost({
      ...post,
      content: data,
    });
  };
  //reset
  const resetData = () => {
    setPost({
      title: "",
      content: "",
      categoryId: "",
    });
  };

  //form submission
  const submitPost = (event) => {
    event.preventDefault();
    //console.log(post);
    //check validations
    if (post.title.trim() === "") {
      toast.error("Post Title is required !!");
      return;
    }
    if (post.content.trim() === "") {
      toast.error("Post Content is required !!");
      return;
    }
    if (post.categoryId.trim() === "") {
      toast.error("Post Category is required !!");
      return;
    }

    //submit the form on server /user/{userId}/category/{categoryId}/posts
    //add userId in the post as the same req in the url
    post["userId"] = user.id;
    createPost(post)
      .then((data) => {
        //call upload image method which will call backend api to upoad on db as well
        uploadPostImage(image,data.postId).then(data=>{
          toast.success("Image uploaded !!");
        }).catch(error=>{
          toast.error("Error in uploading Image !");
          console.log(error);
          
        })
        toast.success("Post created !!");
      })
      .catch((error) => {
        toast.error("Something went wrong Post creation failed!!");
      });
  };

  //handling file change event 
  const handleFileChange = (event)=>{
    console.log(event.target.files);
    setImage(event.target.files[0])
    
  }

  return (
    <div className="wrapper">
      <Card className="shadow border-0 mt-2">
        <CardBody>
          {/* {JSON.stringify(post)} */}
          <h3>What you want to Post ?</h3>
          <Form onSubmit={submitPost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                name="title"
                onChange={fieldChanged}
              />
            </div>

            <div className="my-3">
              <Label for="content">Post Content</Label>
              {/* <Input
                type="textarea"
                id="content"
                placeholder="Enter here"
                className="rounded-0"
                style={{ height: "250px" }}
              /> */}

              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={(newContent) => contentChanged(newContent)}
              />
            </div>

            {/* file/image uploading field */}

            <div className="mt-4">
              <Label for="image">Select Post Banner</Label>
              <Input id="image" type="file" onChange={handleFileChange} />
            </div>

            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                className="rounded-0"
                name="categoryId"
                onChange={fieldChanged}
                defaultValue={0}
              >
                <option disabled value={0}>
                  --Select Category--
                </option>
                {/* fetch categories dynamically from db used javascript here */}
                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.catTitle}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button type="submit" className="rounded-0" color="primary">
                Create Post
              </Button>
              <Button
                className="rounded-0 ms-2"
                color="danger"
                onClick={resetData}
              >
                Reset Post
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
