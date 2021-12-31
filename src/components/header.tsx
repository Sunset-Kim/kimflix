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

const Logo = styled.div`
  margin-right: auto;
`;

const Svg = styled(motion.svg)`
  width: 100%;
  height: 100%;
  fill: ${({ theme }) => theme.color.primary.default};
`;

const Nav = styled.nav``;

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
    backdropFilter: "",
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
        <Logo>
          <SLink to="/">
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 196 59"
              variants={logoVariants}
              initial="normal"
              whileHover="active"
            >
              <path d="M42.2501 0.757812L39.3521 42.2067L38.5733 42.2466L31.6807 12.9224H23.164L18.0078 43.3072L16.9027 43.3639L12.2862 12.9224H0.414062L11.2151 58.2397L23.2891 57.4557L27.2173 29.3268L28.3694 29.2653L33.6295 56.7761L45.1855 56.0206L54.3625 0.757812H42.2501Z" />
              <path d="M78.2713 12.9184V20.771H86.0946V56.1956H95.8432V20.771H103.218V12.9184H78.2713ZM153.464 29.6389H146.004V12.9763H136.285V56.2532H146.004V37.4912H153.464V56.2532H163.183V12.9763H153.464V29.6389ZM119.613 12.4527H117.92C109.142 12.4527 105.631 16.9316 105.631 24.203V44.8521C105.631 52.1239 109.142 56.777 118.108 56.777H119.801C128.704 56.777 131.839 51.4252 131.839 45.3763V37.9891H122.309V44.8521C122.309 47.4123 121.431 48.9826 118.923 48.9826C116.477 48.9826 115.663 47.5286 115.663 44.7946V24.1446C115.663 21.4105 116.477 20.015 118.923 20.015C121.493 20.015 122.309 21.5269 122.309 24.1446V29.147H131.839V23.621C131.839 16.4087 128.453 12.4527 119.613 12.4527ZM68.782 41.4224L65.9558 23.3316H64.2841L61.4576 41.4224H68.782ZM72.3262 12.9184L79.9759 56.1956H71.0902L70.009 49.2753H60.2308L59.1493 56.1956H50.2636L57.9136 12.9184H72.3262ZM184.391 41.4224L181.564 23.3316H179.893L177.066 41.4224H184.391ZM187.935 12.9184L195.585 56.1956H186.699L185.618 49.2753H175.84L174.759 56.1956H165.873L173.522 12.9184H187.935Z" />
            </Svg>
          </SLink>
        </Logo>

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
