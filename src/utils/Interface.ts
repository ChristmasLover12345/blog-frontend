export interface IBlogItems {
    id: number
    userId: number
    publisherName: string
    date: string
    title: string
    image: string
    description: string
    category: string
    isPublished: boolean
    isDeleted: boolean
}

// This wiil be used for our login and create account fetch
export interface IUserInfo {
    username: string
    password: string
}

// This will be used to fetch our user data id and name
export interface IUserData {
    id: number
    username: string
}

// interface for getting our Token
export interface IToken {
    token:string
}