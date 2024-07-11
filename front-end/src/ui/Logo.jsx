import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  margin:0;
  padding: 0;
`;

const Img = styled.img`
  height: 12.6rem;
  width: auto;
  margin:0;
  padding: 0;
`;

function Logo() {

  const src = "/logo1.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
