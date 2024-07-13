import React, { useContext } from "react";
import { format } from "timeago.js";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Image, Card, Dropdown } from "react-bootstrap";

import axiosService from "../../services/axios";
import { getUser } from "../../hooks/useLocalStorageState";
import UpdatePost from "./UpdatePost";
import { Context } from "../../ui/AppLayout";
import MoreToggleIcon from "../../ui/MoreToggleIcon";
import { randomAvatar } from "../../utils/randomAvatar";


import { HiHandThumbUp, HiChatBubbleLeft } from "react-icons/hi2";

import DOMPurify from 'dompurify';


function Post(props) {
  const { post, refresh, isSinglePost } = props;
  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleLikeClick = (action) => {
    axiosService
      .post(`/post/${post.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    axiosService
      .delete(`/post/${post.id}/`)
      .then(() => {
        setToaster({
          type: "warning",
          title: "Post Deleted",
          message: "Post deleted 🚀",
          show: true,
        });
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
      <Card className="rounded-3 my-1">
        <Card.Body className="py-0 my-1">
          <Card.Title className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <Image
                src={randomAvatar()}
                roundedCircle
                width={48}
                height={48}
                className="me-2 border border-primary border-2"
              />
              <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                <p className="fs-6 m-0">{post.author.name}</p>
                <p className="fs-6 fw-lighter">
                  <small>{format(post.created)}</small>
                </p>
              </div>
            </div>
            {user.name === post.author.name && (
              <div>
                <Dropdown>
                  <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <UpdatePost post={post} refresh={refresh} />
                    <Dropdown.Item
                      onClick={handleDelete}
                      className="text-danger"
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Card.Title>
          {/* <Card.Text>{post.body}</Card.Text> */}
          {/* <Card.Text dangerouslySetInnerHTML={{ __html: post.body }} /> */}
          <Card.Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body), }} />
          
        </Card.Body>
        <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
          <div className="d-flex flex-row">
            {/* <LikeOutlined
              style={{
                width: "24px",
                height: "24px",
                padding: "2px",
                fontSize: "20px",
                color: post.liked ? "#0D6EFD" : "#C4C4C4",
              }}
              onClick={() => {
                if (post.liked) {
                  handleLikeClick("remove_like");
                } else {
                  handleLikeClick("like");
                }
              }}
            /> */}
            <HiHandThumbUp 
            style={{
              width: "24px",
              height: "24px",
              padding: "2px",
              fontSize: "1.5em",
              color: post.liked ? "#0D6EFD" : "#C4C4C4",
            }}
            onClick={() => {
              if (post.liked) {
                handleLikeClick("remove_like");
              } else {
                handleLikeClick("like");
              }
            }}/>
            <p className="ms-1 fs-6">
                <small>{post.likes_count}</small>
            </p>
          </div>
          {!isSinglePost && (
            <div className="d-flex flex-row">
              <Link to={`/post/${post.id}/`}>
              <HiChatBubbleLeft 
              style={{
                width: "24px",
                height: "24px",
                padding: "1px",
                fontSize: "1.5em",
                color: "#C4C4C4",
              }}/>
              {/* <CommentOutlined
                style={{
                  width: "24px",
                  height: "24px",
                  padding: "1px",
                  fontSize: "20px",
                  color: "#C4C4C4",
                }}
              /> */}
              </Link>
              <p className="ms-1 mb-0">
                <small>
                  {post.comments_count}
                </small>
              </p>
            </div>
          )}
        </Card.Footer>
      </Card>
    </>
  );
}

export default Post;