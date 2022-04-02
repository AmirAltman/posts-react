import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import Post from "../components/Post";
import {fillerPosts} from "../utils";

test("Resnder one post", () => {
    render(<Post postData={fillerPosts[0]}/>)
    expect(screen.getByText(fillerPosts[0].title)).toBeInTheDocument()
    expect(screen.getByText(`created by ${fillerPosts[0].creator}`)).toBeInTheDocument()
    expect(screen.getByText(fillerPosts[0].body)).toBeInTheDocument()
})

test("Render several posts", () => {
    const partialPosts  =fillerPosts.slice(0,3);
    const posts = partialPosts.map((post) =><Post key={post._id} postData={post}/>);
    render(<div>{posts}</div>)
    partialPosts.forEach((post)=>{
        expect(screen.getByText(post.title)).toBeInTheDocument()
    })
})