import styled from "styled-components";

const StyledFooter = styled.footer`
  font-size: 2rem;
  text-align: center;
`;

function Footer() {
  return (
    <StyledFooter>
      <p>&copy; Copyright {new Date().getFullYear()} by Rami Sultana</p>
    </StyledFooter>
  );
}

export default Footer;
