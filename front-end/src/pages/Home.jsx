import React from "react";
import AppLayout from "../ui/AppLayout";

import { Row, Col, Image } from "react-bootstrap";
import { randomAvatar } from "../utils/randomAvatar";
import useSWR from "swr";
import { fetcher } from "../services/axios";
import { getUser } from "../hooks/useLocalStorageState";
import CreatePost from "../features/posts/CreatePost";

import { Post } from "../features/posts";

function Home() {
    const posts = useSWR("post/", fetcher, {
        refreshInterval: 20000,
      });

    const user = getUser();
    
    if (!user) {
        return <div>Loading!</div>;
    }
    
    
    return (
        <AppLayout>
          <Row className="justify-content-evenly">
            <Col sm={7}>
              <Row className="border rounded  align-items-center">
                <Col className="flex-shrink-1">
                  <Image
                    src={randomAvatar()}
                    roundedCircle
                    width={52}
                    height={52}
                    className="my-1"
                  />
                </Col>
                <Col sm={10} className="flex-grow-1">
                  <CreatePost refresh={posts.mutate} />
                </Col>
              </Row>
              <Row className="my-4">
                {posts.data?.results.map((post, index) => (
                    <Post key={index} post={post}
                    refresh={posts.mutate} />
                    ))}
                </Row>
            </Col>
            <Col sm={3}>
            sugg
            </Col>
          </Row>
        </AppLayout>
      );
}

export default Home;