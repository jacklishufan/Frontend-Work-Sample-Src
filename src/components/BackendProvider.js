import axios from 'axios'
const host = 'https://worker-typescript-template.jacklishufan.workers.dev/'
//const host = 'http://127.0.0.1:8000/'

const getUrl = (url)=>host + url

const fetchPosts = () => {
    let url = getUrl(`posts/`)
    return axios.get(url)
}



const respondPosts = (uuid,key) => {
    let payload = { uuid, key }
    let url = getUrl(`react/`)
    return axios.post(url,payload)
}

const postStory = (username,content,type,title) => {
    let payload = { username,content,type,title}
    let url = getUrl(`posts/`)
    return axios.post(url,payload)
}

const postComment = (username,content,uuid) => {
    let url = getUrl(`comments/`)
    let payload = { username,content,type:"text",title:"response",uuid}
    return axios.post(url,payload)
}
const getResponseHistory = ()=>{
    let responses = []
    try {
        responses =JSON.parse( localStorage.getItem('responses')) || []
    } catch {

    }
    return responses
}
const recordResponse = (id)=>{
    let responses = getResponseHistory()
    responses.push(id)
    localStorage.setItem('responses',JSON.stringify(responses))
    return
}
const getPost = async (uuid)=> {
    let responses = await fetchPosts()
    return responses.data.filter(e=>e.uuid==uuid)[0]
}

const checkResponse = (id)=>{
    let responses = getResponseHistory()
    return responses.includes(id)
}

export{
    fetchPosts,
    respondPosts,
    postStory,
    postComment,
    checkResponse,
    recordResponse,
    getPost
};

