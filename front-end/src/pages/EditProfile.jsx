import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import AppLayout from "../ui/AppLayout"; 
import UpdateProfileForm from "../features/profile/UpdateProfileForm";
import { fetcher } from "../services/axios";
import { Row, Col } from "react-bootstrap";


function EditProfile() {
  const { profileId } = useParams();

  const profile = useSWR(`/user/${profileId}/`, fetcher);

  return (
    <AppLayout hasNavigationBack>
      {profile.data ? (
        <Row className="justify-content-evenly">
          <Col sm={9}>
            <UpdateProfileForm profile={profile.data} />
          </Col>
        </Row>
      ) : (
        <div>Loading...</div>
      )}
    </AppLayout>
  );
}

export default EditProfile;