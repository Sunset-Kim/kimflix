import React, { memo, useEffect } from "react";
import { motion } from "framer-motion";
import { useMatch, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { IMovie, ITV, moviesApi, tvApi } from "services/api";
import { useQuery } from "react-query";
import { TvDetail, MovieDetail } from "services/api";
import { createImgPath } from "Utils/imgpath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTimes } from "@fortawesome/free-solid-svg-icons";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99;
  max-width: 480px;
  width: 60vw;
  height: 60vh;
  border-radius: 10px;
  background: ${(props) => props.theme.color.background.default};
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const BtnGrop = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;

  button {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const PopupTop = styled.div<{ backImg: string }>`
  position: relative;
  padding-top: 45%;
  background-image: url(${({ backImg }) => createImgPath(backImg, "w500")});
`;

const PopupOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 1)
  );
`;

const PopupBottom = styled.div`
  position: relative;
  margin-top: -20px;
  padding: 0 10px 20px 10px;
`;

const BtnClose = styled.button`
  ${(props) => props.theme.button?.size.sm}
  ${(props) => props.theme.button?.style.primary}
`;
const BtnMore = styled(BtnClose)``;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const Genres = styled.div`
  margin-bottom: 0.3em;
  > span {
    font-size: 13px;
    margin-right: 0.5em;
  }
`;

const Dates = styled(Genres)``;

const OverView = styled.p`
  font-size: 14px;
  line-height: 1.25em;
  margin-bottom: 0.5em;
`;
const YoutubeContainer = styled.section`
  padding: 10px 0;
  h5 {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;
const Youtube = styled.article`
  position: relative;
  width: 100%;
  padding-top: 50%;
  margin-bottom: 10px;
  iframe {
    top: 0;
    left: 0;
    position: absolute;
  }
`;

interface PopupProps {
  data?: IMovie | ITV;
}

const Popup: React.FC<PopupProps> = ({ data }) => {
  const isMovie = data && "title" in data ? true : false;
  const navigate = useNavigate();
  const match = useMatch(isMovie ? "/movie/:id" : "/tv/:id");
  const id = match?.params.id;

  const {
    isLoading,
    data: detailData,
    isError,
  } = useQuery<MovieDetail | TvDetail>(
    [isMovie ? "movie" : "tv", "detail", id],
    isMovie
      ? () => moviesApi.getMovie(Number(id))
      : () => tvApi.getTv(Number(id)),
    {
      enabled: !!id,
    }
  );

  const onClose = () => {
    isMovie ? navigate("/movie") : navigate("/tv");
  };

  const onMore = () =>
    isMovie ? navigate(`/movie/detail/${id}`) : navigate(`/tv/detail/${id}`);

  return (
    <>
      {match?.params && (
        <>
          <Overlay onClick={onClose} />
          <Container
            layoutId={match.params.id + ""}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {data && (
              <>
                <BtnGrop>
                  <BtnMore onClick={onMore}>
                    <FontAwesomeIcon icon={faEllipsisH} color="white" />
                  </BtnMore>
                  <BtnClose onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} color="white" />
                  </BtnClose>
                </BtnGrop>

                <PopupTop backImg={data.backdrop_path}>
                  <PopupOverlay />
                </PopupTop>
                <PopupBottom>
                  <Title>{(data as IMovie).title || (data as ITV).name}</Title>
                  <Dates>
                    {isMovie
                      ? (detailData as MovieDetail)?.release_date
                      : (detailData as TvDetail)?.last_air_date}
                  </Dates>

                  <Genres>
                    {detailData?.genres.map(
                      (genre, i, genres) =>
                        `${genre.name}${genres.length - 1 === i ? "" : " | "} `
                    )}
                  </Genres>

                  <OverView>{data.overview}</OverView>

                  <YoutubeContainer>
                    <h5>🖥 관련영상</h5>
                    {(detailData as MovieDetail)?.videos?.results.length > 0
                      ? (detailData as MovieDetail)?.videos?.results.map(
                          (item) => (
                            <Youtube>
                              <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${item.key}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </Youtube>
                          )
                        )
                      : "관련영상이 아직 준비되지 않았습니다."}
                  </YoutubeContainer>
                </PopupBottom>
              </>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default memo(Popup);
