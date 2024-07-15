import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../quill-custom.css";

import axiosService from "../../services/axios";
import { getUser } from "../../hooks/useLocalStorageState";
import { Context } from "../../ui/AppLayout";
import { modules, formats, configureHighlightJS } from "../../utils/helpers";

function UpdatePost({ post, refresh }) {
  useEffect(() => {
    configureHighlightJS(); // Configure highlight.js on component mount
  }, []);

  const [show, setShow] = useState(false);
  const [body, setBody] = useState(post.body);
  const quillRef = useRef(null);

  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const handleShow = () => {
    setBody(post.body); // Set the body state to the current post body
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (quillRef.current) {

    const quillEditor = quillRef.current.getEditor();
    const formattedBody = quillEditor.root.innerHTML;

    const data = {
      author: user.id,
      body: formattedBody,
    };

    axiosService
      .put(`/post/${post.id}/`, data)
      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Post updated successfully 🚀",
          show: true,
          title: "Update Success",
        });
        setBody("");
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "An error occurred.",
          show: true,
          title: "Update Error",
        });
      });
    }
  };

  return (
    <>
      <Dropdown.Item donClick={handleShow}>
        Edit
        </Dropdown.Item>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 py-0 my-0 ">
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0" >
          <ReactQuill
            ref={quillRef}
            value={body}
            onChange={setBody}
            modules={modules}
            formats={formats}
            bounds="#editor"
            placeholder="Edit your post..."
            className="w-full h-[100%] mt-10 bg-white"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="border-0 py-0 my-0"
            variant="primary"
            onClick={handleSubmit}
            disabled={body === ""}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePost;