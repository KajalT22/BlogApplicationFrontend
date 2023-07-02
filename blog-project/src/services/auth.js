//check where user is logged in or not 
//if data/token is there in localstrogare that means it is loggedin
export const isLoggedIn=()=>{
    let data = localStorage.getItem("data") //as we stringyfy 
    if(data!=null)
        return true;
    else
        return false;
}

//doLogin=> set data to localstorage
export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    next(); //if we want to use callback func thats why use this here called
}


//doLogout=> remove data/token to localstorage
export const doLogout=(next)=>{
    localStorage.removeItem("data")
    next();
}

//get current user

export const getCurrentUser=()=>{
    if(isLoggedIn())
        return JSON.parse(localStorage.getItem("data")).user; //get user data in obj as we stored in string in localstorage
    else
        return undefined;
}

//get token to pass in header of post url request
export const getToken = ()=>{
    if(isLoggedIn){
        return JSON.parse(localStorage.getItem("data")).token
    }else{
        return null;
    }
}

