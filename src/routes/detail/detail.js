import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "components/loading";
import { Helmet } from "react-helmet";
import { moviesApi, tvApi } from "api";
import PropType from "prop-types";
import DetailTab from "components/detail_tab";
import SlideContents from "components/slide_contents";
import SlideYoutube from "components/slide_youtube";

const Container = styled.div`
position: relative;
padding: 50px;
`;

const BackDrop = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${props => props.bgBack});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(3px);
  opacity: 0.7;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ContentImg = styled.div`
flex: 2;
width: 40%;
margin-right: 2rem;
`;

const Cover = styled.div`
width: 100%;
padding-top: 150%;
background-position: center top;
background-size: contain;
background-repeat: no-repeat;
background-image: url(${props => props.bgPoster});
`;

const Data = styled.div`
  flex: 3;
  width: 60%;
`;

const Title = styled.div`
margin-bottom: 1rem;
h2 {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: .5rem;
}
span {
  font-size: 1.2rem;
}
`;

const InfoContainer = styled.div`
  display: flex;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Info = styled.div``;

const Divider = styled.div`
margin: 0 1rem;
`;

const Imdb = styled.button`
background: #E2B616;
font-weight: bold;
padding: 0.2rem 0.4rem;
border-radius: 5px;
`

const Overview = styled.p`
font-size: 1rem;
line-height: 1.3rem;

`;

const ProductContainer = styled.div`
  flex: 1;
  min-width: 80px;
  max-width: 120px;
  margin: 0 5px;
  span {
    line-height: 1rem;
  }
`;

const ProductItem = styled.div`
  padding-top: 100%;
  background: no-repeat url(${props => props.bgImg});
  background-position: center center;
  background-size: contain;
  margin-bottom: 0.5rem;
`;

const Detail = (props) => {

  const { location: { pathname } } = props

  // state
  const [result, setResult] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMovie, setIsMovie] = useState(pathname.includes("/movie/"));

  const getDetail = async (id) => {
    try {
      if (isMovie) {
        const [{ data: result }, { data: { results: similar } }] = await Promise.all([moviesApi.movieDetail(id), moviesApi.movieSimilar(id)]);

        setResult(result);
        setSimilar(similar);

      } else {
        const [{ data: result }, { data: { results: similar } }] = await Promise.all([tvApi.tvDetail(id), tvApi.tvSimilar(id)]);

        setResult(result);
        setSimilar(similar);
      }

    }
    catch {
      setError("결과가 존재하지 않습니다")
    }
    finally {
      setLoading(false)
    }
  }



  useEffect(async () => {
    const {
      match: { params: { id } },
      history: { push }
    } = props
    const parsedId = parseInt(id);
    // id가 숫자가 아니면 home으로 보내기
    if (isNaN(parsedId)) {
      return push('/');
    }
    getDetail(parsedId);

  }, [pathname])



  return (
    <>
      {loading ? (<>
        <Helmet>
          <title>
            Loading... | Kimflix
          </title>
        </Helmet>
        <Loading /></>) :
        (result && <Container>
          <Helmet>
            <title>
              {isMovie ? result.title : result.name} | Kimflix
            </title>
          </Helmet>
          <BackDrop bgBack={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`} />
          <Content>
            <ContentImg>
              <Cover bgPoster={result.poster_path ? `https://image.tmdb.org/t/p/original/${result.poster_path}` : null} />
            </ContentImg>

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

                {
                  result.imdb_id && (<><Divider>|</Divider>
                    <Info>
                      <Imdb onClick={() => { window.open(`https://www.imdb.com/title/${result.imdb_id}`) }} >
                        IMDb
                      </Imdb>
                    </Info></>)
                }
              </InfoContainer>

              <DetailTab>
                <Overview>
                  {result.overview}
                </Overview>
              </DetailTab>

              {
                // 제작사
                result.production_companies &&
                <DetailTab title="제작사">
                  {result.production_companies.map(company =>
                    <ProductContainer key={company.id}>
                      <ProductItem bgImg={`https://image.tmdb.org/t/p/w200/${company.logo_path}`} />
                      <span>{company.name}</span>
                    </ProductContainer>)}
                </DetailTab>
              }

              {
                // 유사영화
                <DetailTab title="유사한영화">
                  {
                    similar ?
                      (
                        similar.length > 0 &&
                        <SlideContents data={similar} isMovie={isMovie} />
                      )
                      : ("현재영화와 유사한 영화를 찾지 못했습니다")
                  }
                </DetailTab>
              }


            </Data>


          </Content>

          {
            // 시리즈 시즌
            result.seasons &&
            result.seasons.length > 0 &&
            <DetailTab title="시즌">
              <SlideContents data={result.seasons} isMovie={isMovie} loop={false} link={false} />
            </DetailTab>
          }

          {
            // 관련영상
            result.videos.results &&
            result.videos.results.length > 0 &&
            <DetailTab title="관련영상">
              {
                <SlideYoutube data={result.videos.results} />
              }
            </DetailTab>
          }



        </Container >)}
    </>
  )

}

export default Detail;