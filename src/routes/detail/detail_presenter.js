import React from "react";
import PropType from "prop-types"
import styled from "styled-components";
import Loading from "components/loading";
import { Helmet } from "react-helmet";


const Container = styled.div`
height: calc(100vh - 50px);
width: 100%;
position: relative;
padding: 50px;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
`;

const Cover = styled.div`
flex: 2;
height: 100%;
margin-right: 2rem;
background-position: center top;
background-size: contain;
background-repeat: no-repeat;
background-image: url(${props => props.bgPoster});
`;

const Data = styled.div`
flex: 3;

`;

const Title = styled.div`
h2 {
  font-size: 2rem;
  margin-bottom: .5rem;
}

span {
  font-size: 1.2rem;
}

margin-bottom: 1rem;
`;

const InfoContainer = styled.div`
  display: flex;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Info = styled.div`
`

const Divider = styled.div`
margin: 0 1rem;
`;

const Overview = styled.p`
font-size: 1rem;
line-height: 1.3rem;
`;

const AdultLabel = styled.div`
width: 15px;
height: 15px;
background-color: ${props => props.adult ? "red" : "gray"};
color: white;
position: relative;
border-radius: 50%;

&:before {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  content: "19";
  font-size: 0.8rem;
  text-decoration: ${props => props.adult ? "none" : "line-through"};
}

`;


const BackDrop = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgBack});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.7;
`;


const DetailPresenter = ({
  result,
  error,
  loading,

}) => {

  return (
    <>


      {loading ? (<>
        <Helmet>
          <title>
            Loading... | Kimflix
          </title>
        </Helmet>
        <Loading /></>) :
        (<Container>
          <Helmet>
            <title>
              {result.title ? result.title : result.name} | Kimflix
            </title>
          </Helmet>
          <BackDrop bgBack={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`} />
          <Content>
            <Cover bgPoster={result.poster_path ? `https://image.tmdb.org/t/p/original/${result.poster_path}` : null} />
            <Data>
              <Title>
                <h2>{result.title ? result.title : result.name}</h2>
                <span>{result.original_title ? result.original_title : result.original_name}</span>
              </Title>
              <InfoContainer>
                <Info>
                  {result.release_date ?
                    result.release_date :
                    result.first_air_date}
                </Info>
                <Divider>|</Divider>
                <Info>
                  {
                    result.runtime ?
                      result.runtime :
                      result.episode_run_time[0]
                  } min
                </Info>
                <Divider>|</Divider>
                <Info>
                  {
                    result.genres &&
                    result.genres.map((genre, index) => index === result.genres.length - 1 ?
                      genre.name : `${genre.name} / `
                    )
                  }
                </Info>
                <Divider>|</Divider>
                <AdultLabel isAdult={result.adult} />
              </InfoContainer>
              <Overview>
                {result.overview}
              </Overview>
            </Data>

          </Content>


        </Container >)}
    </>
  )
};

DetailPresenter.prototype = {
  result: PropType.object,
  loading: PropType.string,
  error: PropType.bool.isRequired,
}


export default DetailPresenter;