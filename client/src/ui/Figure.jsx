import styled from "styled-components";
const Figuree = styled.figure`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  column-gap: 2rem;
`;
const Img = styled.img`
  width: 6.4rem;
  border-radius: 50%;
  margin-bottom: 2rem;
  grid-row: 1/3;
  justify-self: end;
`;
const BlockQuote = styled.blockquote`
  align-self: end;
  font-size: 1.8rem;
  font-weight: 400;
  color: #555;
  line-height: 1.5;
`;
const P = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: #767676;
`;
function Figure({ person }) {
  return (
    <Figuree>
      <Img src={`${person.url}`} alt={person.name} />
      <div>
        <BlockQuote>{person.text}</BlockQuote>
        <P>{person.name}</P>
        <p>⭐️⭐️⭐️⭐️⭐️</p>
      </div>
    </Figuree>
  );
}

export default Figure;
