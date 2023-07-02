import MyNavbar from "./MyNavbar";


const Base =({title="Welcome to our website",children})=>{
    return(
        <div className="container-fuild p-0 m-0">
            <MyNavbar/>
            {children}
            {/* <h1>this is footer</h1> */}
        </div>
    )
}

export default Base;