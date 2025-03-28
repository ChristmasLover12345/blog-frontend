import { IUserData, IUserInfo } from "./Interface"

const url = "https://jheredia-blog-api-h2bdfwgzcpb3hpac.westus-01.azurewebsites.net/"

// This variable will be used in our getblog by user id fetch we set them up
let userData: IUserData

// create account fetch
export const CreateAccount = async (user:IUserInfo) => {
    const res = await fetch(url + "User/CreateUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    })
    // If our response is not ok we will run this block
    if(!res.ok)
    {
        const data = await res.json();
        const message = data.message
        console.log(message)
        return data.success
    }

    const data = await res.json()
    return data.success

}
// Login fetch

export const login = async (user:IUserInfo) => {
    const res = await fetch(url + "User/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    })

    if(!res.ok)
    {
        const data = await res.json()
        const message = data.message
        console.log(message)

        return null
    }

    const data = await res.json()
    return data.token;
}

// Get Logged data fetch

export const getLoggedInUserData = async (username: string) => {
    const res = await fetch(url + `User/GetUserInfoByUsername/${username}`);

    if (!res.ok)
    {
        const data = await res.json();
        const message = data.message
        console.log(message)
        return null
    }
    userData = await res.json();
    // We're not going to use this data inside of a variable we will make a seperate function for implementation
    return userData;
}

// Get the users data

export const loggedInData = () => {
    return userData
}

// We're checking if the token is in our storage (see if we are logged in)

export const checkToken = () => {
    let result = false

    if(typeof window != null)
    {
        const IsData = localStorage.getItem("Token");

        if (IsData != null)
        {
            result = true
        }
    }
    
    return result
}

