import styled from "styled-components";

const Container = styled.div`
margin: 1rem 0 2rem;
overflow: hidden;
`

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
`

const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  
`;

const DetailTab = ({ title, children }) => {
  return (<Container>
    {title && <Title>{title}</Title>}
    <TabContainer>
      {children}
    </TabContainer>
  </Container>);
}

export default DetailTab;