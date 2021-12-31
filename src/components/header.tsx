import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import {
  motion,
  Variants,
  useAnimation,
  useViewportScroll,
} from "framer-motion";

const Container = styled(motion.header)`
  color: white;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 40px;
`;

const Col = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 0;
  align-items: center;
`;

const Logo = styled.div``;

const Svg = styled(motion.svg)`
  max-width: 60%;
  min-width: 120px;
  width: 100%;
  height: 100%;
  fill: ${({ theme }) => theme.color.primary.default};
`;

const Nav = styled.nav`
  margin-left: auto;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li<{ current: boolean }>`
  position: relative;
  margin-right: 24px;
  font-size: 1rem;

  &:last-child {
    margin-right: 0;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  top: 5px;
  left: -5px;

  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.primary.light};
`;

const SLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  text-transform: uppercase;
  font-size: 15px;
`;

const Search = styled.div`
  margin-left: auto;
  justify-self: flex-end;
  position: relative;
`;

const Input = styled(motion.input)`
  position: absolute;
  height: 36px;
  width: 230px;
  top: -6px;
  right: 0;
  padding-left: 36px;
  transform-origin: right center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid white;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Icon = styled(motion.svg)`
  width: 24px;
  height: 24px;
  position: relative;
  z-index: 1;
  fill: white;
`;

// motion variants
const logoVariants: Variants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [1, 0, 1],

    transition: {
      repeat: Infinity,
      type: "spring",
      duration: 1.5,
    },
  },
};

const headerVariants: Variants = {
  top: {
    backgroundColor: "rgb(28, 28, 28, 0)",
    backdropFilter: "blur(0px)",
  },
  scroll: {
    backgroundColor: "rgb(28, 28, 28, 0.5)",
    backdropFilter: "blur(10px)",
  },
};

const Header = () => {
  const { pathname } = useLocation();
  const { color } = useTheme();
  const headerAnimation = useAnimation();
  const inputAnimation = useAnimation();
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useViewportScroll();

  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({ scaleX: 0 });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }

    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      console.log(scrollY.get());
      if (scrollY.get() > 80) {
        headerAnimation.start("scroll");
      } else {
        headerAnimation.start("top");
      }
    });

    return () => {};
  }, [scrollY]);

  return (
    <Container
      variants={headerVariants}
      initial="top"
      animate={headerAnimation}
    >
      {/* 1열 : nav */}
      <Col>
        {/* logo */}

        <SLink to="/">
          <Logo>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.18 31.03">
              <g>
                <path d="M11.16,19.19l-4.22,4.88v6.96H0V0h6.93v14.63L19.34,0h8.49L15.65,14.05l12.84,16.99h-8.65L11.16,19.19z" />
                <path d="M38.39,0v31.05h-6.93V0H38.39z" />
                <path d="M43.87,0h5.52l10.7,17.37L70.79,0h5.52v31.05h-6.93V14.02l-7.19,11.92H58L50.8,14.02v17.03h-6.93   C43.87,31.05,43.87,0,43.87,0z" />
                <path d="M81.81,0h22.77v6.09H88.74v7.04h14.09v6.01H88.74v11.89h-6.93V0z" />
                <path d="M115.33,0v31.05h-6.93V0H115.33z" />
                <path d="M127.74,0v24.91h15.5v6.13h-22.43V0H127.74z" />
                <path d="M154.98,15.38l-9.94-15.39h8.23l6.24,10.13l6.44-10.13h7.88l-9.98,15.16l10.33,15.88h-8.11l-6.67-10.7l-6.82,10.7h-7.88   L154.98,15.38z" />
              </g>
            </Svg>
          </Logo>
        </SLink>

        {/* nav */}
        <Nav>
          <List>
            <Item current={pathname === "/movie"}>
              <SLink to="/movie">Movies</SLink>
              {pathname === "/movie" ? <Circle layoutId="path" /> : null}
            </Item>
            <Item current={pathname === "/tv"}>
              <SLink to="/tv">TV</SLink>
              {pathname === "/tv" ? <Circle layoutId="path" /> : null}
            </Item>
            <Item current={pathname === "/search"}>
              <SLink to="/search">Search</SLink>
              {pathname === "/search" ? <Circle layoutId="path" /> : null}
            </Item>
          </List>
        </Nav>
      </Col>

      {/* 2열 : 검색 */}
      <Col>
        <Search onClick={toggleSearch}>
          <Input
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{
              type: "linear",
            }}
            placeholder="Search for movie or tvShow"
          />
          <Icon
            animate={{
              x: searchOpen ? -200 : 0,
            }}
            transition={{
              type: "linear",
            }}
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </Icon>
        </Search>
      </Col>
    </Container>
  );
};

export default Header;
