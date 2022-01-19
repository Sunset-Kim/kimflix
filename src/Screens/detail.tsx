import React, { useState } from "react";
import styled from "styled-components";
import Loading from "components/loading";
import { Helmet } from "react-helmet";
import {
  MovieDetail,
  TvDetail,
  moviesApi,
  tvApi,
  IGetMovie,
  IGetTV,
} from "services/api";
import DetailTab from "components/detail-tab";
import SlideContents from "components/slide-contents";
import SlideYoutube from "components/slide-youtube";
import { useMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { createImgPath } from "Utils/imgpath";

const Container = styled.div`
  position: relative;
  padding: 110px 40px 0;
`;

const BackDrop = styled.div<{ img: string }>`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${(props) => props.img});
  background-position: left center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(5px);
  opacity: 0.7;
`;

const Contents = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  ${(props) => props.theme.media.tablet`
  flex-direction: row;
  `}
`;

const ContentsInfo = styled.div`
  flex: 1;
  width: 100%;

  ${(props) => props.theme.media.tablet`
  width: 60%;
  flex: 3;
  `}
`;

const ContentImg = styled.div`
  flex: 1;
  margin-bottom: 2rem;

  ${(props) => props.theme.media.tablet`
    margin-bottom: 0;
  margin-right: 2rem;
  flex: 2;
  `}
`;

const Cover = styled.img`
  width: 100%;
  max-width: 640px;
  object-fit: cover;
  object-position: center top;
`;

const Title = styled.div`
  margin-bottom: 1rem;
  h2 {
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 0.5rem;
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
  background: #e2b616;
  font-weight: bold;
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
`;

const Overview = styled.p`
  font-size: 1rem;
  line-height: 1.3rem;
`;

const Detail: React.FC = () => {
  // router info
  const location = useMatch("/:category/detail/:id");
  const isMovie = location?.params.category === "movie" ? true : false;
  const id = Number(location?.params.id);

  // # react-query
  // ## detail query
  const { isLoading, data, isError } = useQuery<MovieDetail | TvDetail>(
    isMovie ? ["movie", "detail", id] : ["tv", "detail", id],
    isMovie ? () => moviesApi.getMovie(id) : () => tvApi.getTv(id)
  );

  // ## similar query
  const {
    isLoading: similarLoading,
    data: similarData,
    isError: similarError,
  } = useQuery<IGetTV | IGetMovie>(
    isMovie ? ["movie", "similar", id] : ["tv", "similar", id],
    isMovie ? () => moviesApi.movieSimilar(id) : () => tvApi.tvSimilar(id)
  );

  // func

  return (
    <>
      <Helmet>
        <title>Loading... | Kimflix</title>
      </Helmet>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Helmet>
            <title>
              {isMovie ? (data as MovieDetail).title : (data as TvDetail).name}{" "}
              | Kimflix
            </title>
          </Helmet>
          {data && (
            <Container>
              <BackDrop
                img={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
              />
              <Contents>
                <ContentImg>
                  <Cover
                    src={createImgPath(data.poster_path, "w500")}
                    alt={
                      isMovie
                        ? (data as MovieDetail).title
                        : (data as TvDetail).name
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = "/images/ready.jpeg";
                    }}
                  />
                </ContentImg>

                <ContentsInfo>
                  <Title>
                    <h2>
                      {isMovie
                        ? (data as MovieDetail).title
                        : (data as TvDetail).name}
                    </h2>
                    <span>
                      {isMovie
                        ? (data as MovieDetail).original_title
                        : (data as TvDetail).original_name}
                    </span>
                  </Title>
                  <InfoContainer>
                    <Info>
                      {isMovie
                        ? (data as MovieDetail).release_date
                        : (data as TvDetail).first_air_date}
                    </Info>
                    <Divider>|</Divider>
                    <Info>
                      {isMovie
                        ? (data as MovieDetail).runtime
                        : (data as TvDetail).episode_run_time[0]}{" "}
                      min
                    </Info>
                    <Divider>|</Divider>
                    <Info>
                      {data.genres.map(
                        (
                          genre: {
                            name: string;
                            id: number;
                          },
                          index: number
                        ) =>
                          index === data.genres.length - 1 ? (
                            <span key={genre.id}>{genre.name}</span>
                          ) : (
                            <span key={genre.id}>{`${genre.name} / `}</span>
                          )
                      )}
                    </Info>

                    {isMovie ? (
                      <>
                        <Divider>|</Divider>
                        <Info>
                          <Imdb
                            onClick={() => {
                              window.open(
                                `https://www.imdb.com/title/${
                                  (data as MovieDetail).imdb_id
                                }`
                              );
                            }}
                          >
                            IMDb
                          </Imdb>
                        </Info>
                      </>
                    ) : null}
                  </InfoContainer>

                  <DetailTab title="Overview">
                    <Overview>{data.overview}</Overview>
                  </DetailTab>

                  {
                    // 제작사
                    data.production_companies && (
                      <DetailTab title="제작사">
                        <SlideContents
                          data={{
                            type: "company",
                            results: data.production_companies,
                          }}
                        />
                      </DetailTab>
                    )
                  }

                  {/* 관련영상 & 시즌 */}
                  {isMovie ? (
                    <DetailTab title="관련영상">
                      {<SlideYoutube data={(data as MovieDetail).videos} />}
                    </DetailTab>
                  ) : (
                    <DetailTab title="시즌">
                      <SlideContents
                        data={{
                          type: "season",
                          results: (data as TvDetail).seasons,
                        }}
                      />
                    </DetailTab>
                  )}
                </ContentsInfo>
              </Contents>
              {
                // 유사영화
                <DetailTab title="유사한 작품">
                  {similarData ? (
                    <SlideContents
                      data={{
                        type: "similar",
                        results: similarData.results,
                      }}
                    />
                  ) : (
                    "유사한 작품이 없습니다!"
                  )}
                </DetailTab>
              }
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default Detail;
