import React from "react";
import Base from "../components/Base";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Input,
  Button,
} from "reactstrap";
import { useEffect, useState } from "react";
import { loadSinglePost,createComment } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn } from "../services/auth";

const PostPage = () => {
  //get post id that we are passing through url
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({
    content: "",
  });

  //load the post as per respective postId
  useEffect(() => {
    loadSinglePost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading the post !");
      });
  }, []);

  //we are getting date in the number format have to show it in date format
  const printDate = (numbers) => {
    return new Date(numbers).toLocaleString();
  };
  //submit the comment
  const submitComment = () => {
    if (!isLoggedIn()) {
      toast.error("You need to Login First !");
      return;
    }
    //avoid getting posted empty comment
    if (comment.content.trim() === "") {
      return;
    }
    createComment(comment, post.postId)
      .then((data) => {
        console.log(data);
        //save comments to post 
        setPost({
            ...post,
            comments:[...post.comments,data.data]
        })
        setComment({
            content:''
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home</Link> / {post && <Link to="">{post.title}</Link>}
        <Row>
          <Col md={{ size: 12 }}>
            <Card className="mt-3 ps-2">
              {
              (post) && (
                <CardBody>
                  <CardText>
                    Posted By <b>{post.user.name}</b> on{" "}
                    <b>{printDate(post.addedDate)}</b>
                  </CardText>
                  <CardText>
                    <span className="text-muted">{post.category.catTitle}</span>
                  </CardText>
                  <div
                    className="divider"
                    style={{
                      width: "100%",
                      height: "2px",
                      background: "#e2e2e2",
                    }}
                  ></div>
                  <CardText className="mt-3">
                    <h3>{post.title}</h3>
                  </CardText>
                  <div
                    className="img-container mt-4 shadow"
                    style={{ maxWidth: "50%" }}
                  >
                    <img
                      className="img-fluid"
                      src={BASE_URL + "/api/posts/image/" + post.imageName}
                      alt=""
                    />
                  </div>
                  <CardText
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        {/* for comments section*/}
        <Row className="my-4">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
           <h3>Comments ({post ? post.comments.length : 0})</h3>
              
            {
            (post) &&
              post.comments.map((c, index) => (
                <Card className="mt-2" key={index}>
                  <CardBody>
                    <CardText>{c.content}</CardText>
                  </CardBody>
                </Card>
              ))}
            <Card className="mt-3">
              <CardBody>
                <Input
                  type="textarea"
                  placeholder="Enter Comment Here"
                  value={comment.content}
                  onChange={(event) =>
                    setComment({ content: event.target.value })
                  }
                />
                <Button
                  onClick={submitComment}
                  className="mt-2"
                  color="primary"
                >
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
