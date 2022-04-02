import React from "react";
import Button from 'react-bootstrap/Button'

const PageNavigation = ({page, total,setPage}) => {
    const numPages = Math.ceil(total / 5);
    return (
        <div>
            <Button variant="outline-primary" disabled={page === 0} onClick={() =>setPage(page-1)}>Prev</Button>
            <span style={{marginRight:10, marginLeft:10}}>Page {page+1} out of {numPages}</span>
            <Button variant="outline-primary" disabled={page+1 === numPages} onClick={() =>setPage(page+1)}>Next</Button>
        </div>
    )
}

export default PageNavigation