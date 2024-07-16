import React from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../ui/AppLayout"; 
import ProfileDetails from "../features/profile/ProfileDetails";
import useSWR from "swr";
import { fetcher } from "../services/axios";
import { Post } from "../features/posts";
import { Col, Row } from "react-bootstrap";

function Profile() {
  const { profileId } = useParams();

  const user = useSWR(`/user/${profileId}/`, fetcher);
  const posts = useSWR(`/post/?author__public_id=${profileId}`, fetcher, {
    refreshInterval: 20000,
  });  

  return (
    <AppLayout hasNavigationBack>
      <Row className="justify-content-evenly">
        <Col sm={9}>
          <ProfileDetails user={user.data} />
          <div>
            <Row className="my-2">
              {posts.data?.results.filter((post) => post.author.id === profileId).map((post, index) => (
                <Post key={index} post={post} refresh={posts.mutate} />
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </AppLayout>
  );
}

export default Profile;