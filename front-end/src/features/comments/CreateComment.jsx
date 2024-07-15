import React, { useState, useContext } from "react";
import { Button, Form, Image } from "react-bootstrap";
import axiosService from "../../services/axios";
import { getUser } from "../../hooks/useLocalStorageState";
// import { randomAvatar } from "../../utils/randomAvatar";

import { Context } from "../../ui/AppLayout";

function CreateComment(props) {
  const { postId, refresh } = props;
  // const [avatar, setAvatar] = useState(randomAvatar());
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({});

  const { toaster, setToaster } = useContext(Context);

  const user = getUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const createCommentForm = e.currentTarget;

    if (createCommentForm.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: user.id,
      body: form.body,
      post: postId,
    };

    axiosService
      .post(`/post/${postId}/comment/`, data)
      .then(() => {
        setForm({ ...form, body: "" });
        setToaster({
          type: "success",
          message: "Comment posted successfully 🚀",
          show: true,
          title: "Comment!",
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
    <Form
      className="d-flex flex-row justify-content-between"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Image
        src={user.image}
        roundedCircle
        width={48}
        height={48}
        className="my-2"
      />
      <Form.Group className="m-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary"
          type="text"
          placeholder="Start a comment"
          value={form.body}
          name="body"
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
      </Form.Group>
      <div className="m-auto">
        <Button
          variant="primary"
          data-testid="create-comment-submit"
          onClick={handleSubmit}
          disabled={form.body === undefined}
          size="small"
        >
          Comment
        </Button>
      </div>
    </Form>
  );
}

export default CreateComment;