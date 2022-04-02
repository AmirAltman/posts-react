import React from "react";
import {useQuery} from 'react-query'
import Loader from "../components/Loader";
import Post from "../components/Post";
import {getter,fillerPosts} from "../utils";

const PostList = ({page})=>{
    const { status, data:posts, error } = useQuery(['posts',page], getter('getPosts','posts', {page}),
        {refetchOnWindowFocus:false})

    if (status === 'loading') {
        return <Loader/>
    }
    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }
    const useFillerPosts = 5- posts?.length // used to fill posts to 5

    return (
        <>
            {
                posts.map(post => <Post key={post._id} postData={post}/>)
            }
            {
                useFillerPosts>0 && fillerPosts.slice(0,useFillerPosts).map(post => <Post key={post._id} postData={post}/>)
            }
        </>
    )

}

export default PostList