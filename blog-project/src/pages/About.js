import userContext from "../context/userContext";
import Base from "../components/Base";

const About = () => {
  return (
    <userContext.Consumer>
      {(object) => (
        <Base>
        
          <h1>This is about page</h1>
          <p>we are building blog website</p>
          
          <h3>
            Welcome!!!!! 
          </h3>
        </Base>
      )}
    </userContext.Consumer>
  );
};

export default About;
