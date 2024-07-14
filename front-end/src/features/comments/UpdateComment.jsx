import React, { useState, useContext } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../services/axios";

import { Context } from "../../ui/AppLayout";

function UpdateComment(props) {
  const { postId, comment, refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    author: comment.author.id,
    body: comment.body,
    post: postId,
  });

  const { setToaster } = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateCommentForm = e.currentTarget;

    if (updateCommentForm.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: form.author,
      body: form.body,
      post: postId,
    };

    axiosService
      .put(`/post/${postId}/comment/${comment.id}/`, data)
      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Comment updated 🚀",
          show: true,
          title: "Success!",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "An error occurred.",
          show: true,
          title: "Comment Error",
        });
      });
  };

  return (
    <>
      <Dropdown.Item data-testid="show-modal-form" onClick={handleShow}>
        Update
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form
              data-testid="update-comment-test" 
              noValidate 
              validated={validated} 
              onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                value={form.body}
                data-testid="comment-body-field"
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button data-testid="update-comment-submit"
                  variant="primary" 
                  onClick={handleSubmit}>
            Modify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateComment;