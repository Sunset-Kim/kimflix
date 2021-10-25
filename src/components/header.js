import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 10px 0px;
  background: rgba(20,20,20,0.8);
  box-shadow: 0px 1px 5px 2px rgba(0,0,0,0.8);
`;


const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
width: 60px;
height: 60px;
border-bottom: 5px solid ${props => props.current ? "#349689" : "transparent"};
transition: border 300ms ease-in-out;
`;

const SLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;


export default withRouter(({ location: { pathname } }) => (
  (
    <Header>
      {console.log(pathname)}
      <List>
        <Item current={pathname === '/'}><SLink to="/">Movies</SLink></Item>
        <Item current={pathname === '/tv'}><SLink to="/tv">TV</SLink></Item>
        <Item current={pathname === '/search'}><SLink to="/search">Search</SLink></Item>
      </List>
    </Header >
  )
))