import userContext from "../context/userContext"
import Base from "../components/Base"

const Services = () => {
    return (
        <userContext.Consumer>
            {
                (user) => (

                    <Base>
                        <h1>
                            This is services page
                        </h1>
                        <h3>Welcome !!!!! </h3>
                        <p>This page is under construction!!!! Sorry for the inconvenience
                            <h6>We will update our services soon....</h6>
                        </p>

                    </Base>
                )
            }
        </userContext.Consumer>
    )
}

export default Services