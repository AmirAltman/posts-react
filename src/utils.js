import axios from "axios";
import API from "./API";
import {useMutation,useQueryClient } from "react-query";

export const getter = (endpoint, field, args) => {
    return async () => {
        const {data} = await axios.get(API.get(endpoint), {params: args});
        return data[field]
    }
}

export const useAddPost = () => {
    const queryClient = useQueryClient()
    return useMutation((post) => {
            return axios.post(API.get('addPost'), post)
        }, {
            onError: (error) => {
                console.log(`Error occurred when adding post ${error}`)
            },
            onSuccess: () => {
                queryClient.invalidateQueries('posts')
                queryClient.invalidateQueries('countPosts')
            },
        }
    )
}

export const fillerPosts = [
    { body: "Add posts up top", creator: "System", title: "Cool post",_id: 1},
    { body: "Add posts up top", creator: "System", title: "Wow what a post",_id: 2},
    { body: "Add posts up top", creator: "System", title: "This is a good one",_id: 3},
    { body: "Add posts up top", creator: "System", title: "Another cool post",_id: 4},
    { body: "Add posts up top", creator: "System", title: "No so cool post",_id: 5},
]