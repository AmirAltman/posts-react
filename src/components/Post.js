import Card from 'react-bootstrap/Card'
import React from "react";

const Post =({postData})=>{
    const {title,creator,body} = postData;

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">created by {creator}</Card.Subtitle>
                <Card.Text>
                    {body}
                </Card.Text>
            </Card.Body>
        </Card>
    )

}

export default Post