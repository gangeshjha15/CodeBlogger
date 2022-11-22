// API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading:{
        title: "Loading...",
        message: "Data is being loaded, please wait"
    },
    success:{
        title: "Success",
        message: "Data successfully loaded"
    },
     responseFailure: {
        title: "Error",
        message: "An error occured while fetching response from the server, Please try again"
     },
     requestFailure:{
        title:"Error",
        message:"An error occured while parsing request data"
     },
     networkError:{
        title:"Error",
        message:"Unable to connect with the server. Please check internet connectivity and try again later"
     }
}

// API SERVICE CALL
// SAMPLE REQUEST
// NEED SERVICE CALL : {url: '/', method: 'POST/GET/PUT/DELETE', params: true/false, query: true/false}

export const SERVICE_URLS = {
    // api for signup user
    userSignup: {url: '/signup', method:'POST'},
    // api for login user
    userLogin: {url: '/login', method:'POST'},
    // api for image file uploading
    fileUpload: {url: '/file/upload', method:'POST'},
    // api for craeting post and saving to database
    createPost: {url: '/create', method: 'POST'},
    //Get all posts
    getAllPosts: {url:'/posts', method: 'GET', query: true},
    //Get post by id
    getPostById: {url: '/post', method: 'GET', params: true},
    //Update post
    updatePost: {url: '/update', method: 'PUT', params: true},
    //Delete post
    deletePost: {url: '/delete/post', method: 'DELETE', params: true},
    //Send Comment
    sendComment: {url: '/comment', method: 'POST'},
    //Send Comment
    getAllComments: {url: '/post/comments', method: 'GET', params: true},
    //delete Comment
    deleteComment: {url: '/delete/comments', method: 'DELETE', params: true},
    //Add Like
    likePost: {url:'/like', method:'PUT'},
    //Add Like
    disLikePost: {url:'/dislike', method:'PUT'}
}