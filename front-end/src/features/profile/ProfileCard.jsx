import React from "react";
import { Card, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { randomAvatar } from "../../utils/randomAvatar";


function ProfileCard(props) {
  const navigate = useNavigate();
  const { user } = props;

  const handleNavigateToProfile = () => {
    navigate(`/profile/${user.id}/`);
  };

  return (
    <Card className="border-1 border-bottom pt-1 mb-1 rounded-0"
          data-testid="profile-card">
      <div className="d-flex flex-column align-items-center">
        <Image
          src={user.image}
          roundedCircle
          width={48}
          height={48}
          className="border border-primary border-2"
        />
        <Card.Body className="text-center">
          <Card.Title className="fs-6">{user.name}</Card.Title>
          <Button className="p-0" variant="primary" onClick={handleNavigateToProfile}>
            See profile
          </Button>
        </Card.Body>
      </div>
    </Card>
  );
}

export default ProfileCard;