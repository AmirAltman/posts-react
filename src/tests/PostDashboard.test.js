import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import 'regenerator-runtime/runtime'
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'
import PostDashboard from "../pages/PostDashboard";
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter} from "react-router-dom";
import {fillerPosts} from "../utils";
// mock server
import {rest} from 'msw'
import {setupServer} from 'msw/node'

const queryClient = new QueryClient()
const dashboardClient = <BrowserRouter> <QueryClientProvider client={queryClient}>
    <PostDashboard/>
</QueryClientProvider>
</BrowserRouter>;


const server = setupServer(
    rest.get('http://localhost/postnumber', (req, res, ctx) => {
        return res(ctx.json({
            "success": true,
            postCount: 6
        }))
    }),
    rest.get('http://localhost/posts', (req, res, ctx) => {
        return res(ctx.json({
            "success": true,
            posts: fillerPosts
        }))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test("inital render with loading", async () => {
    render(dashboardClient)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('Page 1 out of 2')).toBeInTheDocument())
})

test("inital render with posts", async () => {
    render(dashboardClient)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText(fillerPosts[0].title)).toBeInTheDocument())
})

test("check navigation buttons initial state", async () => {
    render(dashboardClient)
    await waitFor(() => expect(screen.getByText(fillerPosts[0].title)).toBeInTheDocument())
    const prevButton = screen.getByText("Prev")
    const nextButton = screen.getByText("Next")
    expect(prevButton).toHaveAttribute('disabled')
    expect(nextButton).not.toHaveAttribute('disabled')
})

test("check navigation buttons movements", async () => {
    render(dashboardClient)
    await waitFor(() => expect(screen.getByText(fillerPosts[0].title)).toBeInTheDocument())
    let nextButton = screen.getByText("Next")
    userEvent.click(nextButton);
    await waitFor(() => expect(screen.getByText('Page 2 out of 2')).toBeInTheDocument())
    const prevButton = screen.getByText("Prev")
    nextButton = screen.getByText("Next")
    expect(prevButton).not.toHaveAttribute('disabled')
    expect(nextButton).toHaveAttribute('disabled')
})