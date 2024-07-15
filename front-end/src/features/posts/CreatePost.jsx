import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../quill-custom.css";

import axiosService from "../../services/axios";
import { getUser } from "../../hooks/useLocalStorageState";
import { Context } from "../../ui/AppLayout";
import { modules, formats, configureHighlightJS } from "../../utils/helpers";

function CreatePost(props) {
  useEffect(() => {
    configureHighlightJS(); // Configure highlight.js on component mount
  }, []);

  const { refresh } = props;
  const [show, setShow] = useState(false);
  
  const [body, setBody] = useState("");
  const quillRef = useRef(null);

  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const quillEditor = quillRef.current.getEditor();
    const formattedBody = quillEditor.root.innerHTML;

    const data = {
      author: user.id,
      body: formattedBody,
    };

    axiosService
      .post("/post/", data)
      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Successfully created 🚀",
          show: true,
          title: "Post Success",
        });
        setBody("");
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "An error occurred.",
          show: true,
          title: "Post Error",
        });
      });
  };

  return (
    <>
      <Form.Group className="my-3 w-80">
        <Form.Control
          className="py-1 rounded-pill border-primary text-primary"
          type="text"
          placeholder="Start a post"
          onClick={handleShow}
        />
      </Form.Group>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 py-0 my-0 ">
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <ReactQuill
            ref={quillRef}
            value={body}
            onChange={setBody}
            modules={modules}
            formats={formats}
            bounds="#editor"
            placeholder="Write something..."
            // className="text-black dark:text-white"
            className="w-full h-[100%] mt-10 bg-white "
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="border-0 py-0 my-0 "
            variant="primary"
            onClick={handleSubmit}
            disabled={body === ""}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreatePost;