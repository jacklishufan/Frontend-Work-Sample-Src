import react, { useEffect, useRef, useState,    checkResponse,
    recordResponse } from 'react'
import {    fetchPosts,
    respondPosts,
    postStory,
    postComment,getPost} from './BackendProvider'
import {Container,Row,Col,Button} from 'react-bootstrap'
import bg from '../assets/images/bg.jpg'
import {VOTES_ICON,RESP_EMOJI,getRandName} from './constants'
import { useHistory } from "react-router-dom";
import refresh from "../assets/images/refresh_icon.gif";
import paperplane from "../assets/images/paper_plane.gif";
import SunEditor, {buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS Fi

function PostCard(
    {post,onChange,isCounselor,changeCounselor}
) {
    const[name,setName] = useState(getRandName())
    const [expand,setExpand] = useState(false)

    const getChildren = ()=>{
        if (expand) {
            return post.comments.slice(0,2)
        }
        return post.comments
    }
    const ref = useRef();
    let responses = post.reactions || {};
    let keys = Object.keys(responses);
    keys = keys.filter(e=>responses[e]>0)
    let num_responses = 0
    keys = keys.filter(e=>!(['upvote','downvote'].includes(e)))
    if (keys.length){
        keys = keys.sort((a,b)=>responses[a]-responses[b]).reverse()
        num_responses = keys.map(e=>responses[e]).reduce((a,b)=>a+b)
    } 
    
    let num_votes = ( responses['upvote'] || 0) - ( responses['downvote'] || 0) 
    return (
        <Row div className="mood-post-card">
            
            <div className="mood-post-row-1">
                <div className="mood-avatar"></div>
                <span>  {post.username}</span></div>
                <div className="mood-post-row-1">
    
                <span>  {post.title}</span></div>
            <div className="mood-post-row-2">
                {post.type=='html'?
                <div dangerouslySetInnerHTML={{ __html:post.content }} />
                :post.content}
            </div>
            <div className="mood-post-row-3">
                
                {keys.map(e=><div>{RESP_EMOJI[e]}</div>)}
                
                <div>  {num_responses} responses </div>
                <div style={{flexGrow:1}}></div>
                <div>  {num_votes>0?'+'+num_votes:num_votes} votes </div>
                {
                        Object.entries(VOTES_ICON  ).map(
                            ([k,v])=><div className="respond-icon" onClick={
                                ()=>respondPosts(post.uuid,k).then(
                                    e=>{
                                        // recordResponse(post.uuid)
                                        onChange()

                                    }
                                )
                            }>{v}</div>
                        )
                    }

                <div style={{flexGrow:1}}></div>
                {
                        Object.entries(RESP_EMOJI).map(
                            ([k,v])=><div className="respond-icon" onClick={
                                ()=>respondPosts(post.uuid,k).then(
                                    e=>{
                                        // recordResponse(post.uuid)
                                        onChange()

                                    }
                                )
                            }>{v}</div>
                        )
                    }
                </div>
                <div className="mood-post-row-4">
                    <input type="text" ref={ref} placeholder="Enter your comments" />
                    <img className="comment-ico" src={paperplane} onClick={()=>{
                        //postComment(name,ref.current.value,post.emotion,post.uuid).then(onChange);
                        postComment(name,ref.current.value,post.uuid).then(()=>{
                            onChange()
                            ref.current.value=''
                        });
                        }} />
                </div>
                <div className="mood-post-row-5">
                <div>Select Your display name {name} <img className="refresh-ico" onClick={()=>setName(getRandName())} src={refresh} />
                   </div>
                   <span style={{flexGrow:1}}></span>
                </div> 
                <hr/>
                {/* <div className="mood-post-row-6">
                 {JSON.stringify(getChildren())}
                </div>  */}
                <div className="mood-post-row-6">
                 {getChildren().map(comment=><div>
                    <div className="mood-post-row-1">
                <div className="mood-avatar"></div>
                <span>  {comment.username}</span> <span>: {comment.content}</span>
                
                </div>
                 </div>)}
                </div> 
                {post.comments.length>2?<div className="mood-post-collapse" onClick={()=>setExpand(!expand)}>
                    {expand?"Collapse Comments":"More Comments"}
                </div>:""}
               
        </Row>
    )

}
function MoodDetail ({match}) {
    let params = match.params
    let emotion = params.emotion
    const [story,setStory] = useState([])
    const [exercise,setExercise] = useState()
    const [draft,setDraft] = useState()
    const [title,setTitle] = useState('')
    const[name,setName] = useState(getRandName())
    const [isCounselor,setisCounselor] = useState(false)

    // const [] = {};
    let history = useHistory()
    useEffect(
        ()=>{
            window.t = story;
            window.m = PostCard;
            fetchPosts().then(res=>setStory(res.data));
            //queryExerciseByEmotion(emotion).then(res=>setExercise(res.data));
        },
        [match]
    )
    const updatePost = (id)=>{
        getPost(id).then(
            (d)=>{
                let data = d;
                setStory( (story)=>story.map(
                    e=>e.uuid==data.uuid?data:e
                ))
            }
        )
    }
    const reloadAll = ()=>{
        fetchPosts().then(res=>setStory(res.data));
        alert("Success")
    }
    const handleDraftChange = (content)=> {
            console.log(content); 
            setDraft(content);
    }
    return (
        <Container className={["moodboard-container","mood-detail-container"]}>

            <Row>
                            
                <img src={bg} className="moodboard-bg"/>
                <Row className="mooddetail-header-row">
                                 <span className="moodboard-text">Demo</span>
                    
                    
                </Row>
                </Row>

            <Row className="mooddetail-head">
                <h2> Posts</h2>
            </Row>
            <Row className="moodpost-container">
                {story.length?story.map(
                    e=><PostCard post={e} onChange={()=>updatePost(e.uuid)}
                    
                    isCounselor={isCounselor}
                    changeCounselor={setisCounselor}/>
                    ):""}
            </Row>
            <Row className="editor-title">
            <input type='text' onChange={e=>setTitle(e.target.value)}
                    value = {title}
                    placeholder='input title here'/>
                    </Row>
            <Row>
                
                <div className="editor-container"> 
                < SunEditor height="300px" width="80%"
                setOptions={{
					buttonList: buttonList.complex
			}}
            onChange={handleDraftChange}
                />
                
                </div>
                
                </Row>
                <Row>

                    </Row>
                <Row>
                <div className='name-selc'>Select Your display name {name} <img className="refresh-ico" onClick={()=>setName(getRandName())} src={refresh} /></div>

                             </Row>
                             <Row className="submission">
                             <Button onClick={
                                 ()=>{
                                    postStory(name,draft,'html',title).then(
                                        ()=>{
                                            setDraft('')
                                            setTitle('')
                                            reloadAll()
                                        }
                                    )

                                 }
                             }>
POST
                </Button>
                </Row>
        </Container>
   )
}

export default MoodDetail;