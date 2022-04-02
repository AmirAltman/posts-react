import React, {useState} from "react";
import {useQuery} from 'react-query'
import Loader from "../components/Loader";
import PostList from "../components/PostList";
import PageNavigation from "../components/PageNavigation";
import {getter} from "../utils";
import {Link} from "react-router-dom";


const PostDashboard = () => {
    const [page, setPage] = useState(0)
    const {status, data: postCount, error} = useQuery('countPosts', getter('getPostCount', 'postCount'),
        {refetchOnWindowFocus:false})

    if (status === 'loading') {
        return <Loader/>
    }
    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }
    return (
        <div className="post-dashboard-container">
            <PageNavigation page={page} total={postCount} setPage={setPage}/>
            <PostList page={page}/>
            <Link to="/stats">Stats</Link>
        </div>
    )

}

export default PostDashboard