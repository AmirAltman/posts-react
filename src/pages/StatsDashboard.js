import React from "react";
import {useQuery} from 'react-query'
import Loader from "../components/Loader";
import {getter} from "../utils";
import {Link} from "react-router-dom";

const StatsDashboard = () => {
    const {status: creatorStatus, data: topCreators, error: CreatorError} = useQuery('topCreators', getter('topCreators', 'topCreators'),
        {refetchOnWindowFocus: false})
    const {status: runTimeStatus, data: runTimes, error: runTimeError} = useQuery('avgRunTime', getter('avgRunTime', 'runTimes'),
        {refetchOnWindowFocus: false})

    if (creatorStatus === 'loading' || runTimeStatus === "loading") {
        return <Loader/>
    }
    if (CreatorError === 'error' || runTimeError === "error") {
        return <span>Error occurred</span>
    }


    return (
        <div className="post-stats-container">
        <span>
            the top creators are {topCreators.map(name => <li key={name}>{name}</li>)}
        </span>
            <span>
            The avg run time are
                {
                    runTimes.map(runTimeData =>
                        <li key={runTimeData._id}>  {runTimeData._id} is {runTimeData.avgRunTime}</li>
                    )
                }
        </span>
            <Link to="/">Posts</Link>
        </div>
    )

}

export default StatsDashboard