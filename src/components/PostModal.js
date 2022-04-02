import React, {useState} from "react";
import {Modal, Button, Form} from 'react-bootstrap'
import {useAddPost} from "../utils";

const PostModal = ({show, setShow}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const handleClose = () => {
        setShow(false)
        setErrorMessage('')
    };

    const {mutate} = useAddPost()

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.elements.Title.value
        const creator = e.target.elements.Creator.value
        const body = e.target.elements.Body.value
        if (!title || !creator || !body) {
            setErrorMessage('All fields are required');
            return
        }
        setErrorMessage('')
        mutate({title,creator,body})
        handleClose()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <span style={{color: 'red'}}>{errorMessage}</span>
                        <Form.Group className="mb-3" controlId="Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Creator">
                            <Form.Label>Creator</Form.Label>
                            <Form.Control type="text" placeholder="Creator"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Body">
                            <Form.Label>Body</Form.Label>
                            <Form.Control type="text" placeholder="Body"/>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}
export default PostModal