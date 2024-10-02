import { createContext, useContext } from "react";
import styled from "styled-components";
const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  width: auto;
  font-size: 1.6rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  margin-left: 1rem;
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.cols};
  /* grid-template-columns: 0.6fr 0.6fr 1fr; */
  //column-gap: 1rem;
  align-items: center;
  //transition: none;
  //padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  text-align: center;
  @media screen and (max-width: 900px) {
    font-size: 1.6rem;
  }
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.cols};
  /* grid-template-columns: 0.6fr 0.6fr 1fr; */
  //column-gap: 1rem;
  align-items: center;
  //transition: none;
  //padding: 1.2rem 2.4rem;
  text-align: center;
  //border: 2px solid red;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  @media screen and (max-width: 900px) {
    font-size: 1.4rem;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
const TableContext = createContext();
function Table({ cols, children }) {
  return (
    <TableContext.Provider value={cols}>
      <StyledTable role="row">{children}</StyledTable>
    </TableContext.Provider>
  );
}
function Header({ children }) {
  const cols = useContext(TableContext);
  return (
    <StyledHeader role="row" cols={cols}>
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const cols = useContext(TableContext);
  return (
    <StyledRow role="row" cols={cols}>
      {children}
    </StyledRow>
  );
}
function Body({ data, render }) {
  if (!data?.length) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
