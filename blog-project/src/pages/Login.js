import { useState,useContext } from "react";
import { toast } from "react-toastify";
import { loginUsingAxios } from "../services/user-service";
import {isLoggedIn, doLogin} from '../services/auth';
import {
  Label,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
} from "reactstrap";
import Base from "../components/Base";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {

  const userContextData = useContext(userContext)

  //to re-direct user to dashboard after sucess login 
  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetail);
    //validation
    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("Username or Password is required!!");
      return;
    }

    //send data to the server to genrate a token
    loginUsingAxios(loginDetail)
      //upon sucess login we get token we have to store that in localstorage in auth folder
      .then((data) => {
        console.log(data);
        //saving data to the localstorage
        doLogin(data,()=>{
            console.log("login details saved to local storage");

            userContextData.setUser({
              data:data.user,
              login:true
            })
            //re direct user to dashboard page
            navigate("/user/dashboard");

            
        })
        toast.success("Login Sucess !!")
      })
      .catch((error) => {
        console.log(error);
        //checking with status code
        if(error.response.status===400 || error.response.status===404){
            toast.error(error.response.data.msg);
        }else{
            toast.error("Something went Wrong on server !!");
        }
        
      });

    //on sucess submit set this to blanck
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
          >
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Login Here !!</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Email field */}

                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="text"
                      id="email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>

                  {/* password field */}

                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="light" outline>
                      Login
                    </Button>
                    <Button
                      onClick={handleReset}
                      className="ms-2"
                      outline
                      color="secondary"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
