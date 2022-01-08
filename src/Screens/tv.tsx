import { IGetTV, tvApi } from "services/api";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loading from "components/loading";
import Section from "components/section";
import Message from "components/message";
import { useInfiniteQuery, useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import Popup from "components/popup";
import { useMatch } from "react-router-dom";

const Container = styled.div`
  padding: 0 10px;
`;

const TV = () => {
  const TVIdMatch = useMatch("/tv/:id");
  const {
    isLoading: popularLoading,
    data: popularData,
    isError: popularError,
  } = useInfiniteQuery<IGetTV>(["tv", "list", "popular"], () =>
    tvApi.popular()
  );

  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isError: topRatedError,
  } = useInfiniteQuery<IGetTV>(["tv", "list", "toprated"], () =>
    tvApi.topRated()
  );

  const {
    isLoading: airingTodayLoading,
    data: airingTodayData,
    isError: airingTodayError,
  } = useInfiniteQuery<IGetTV>(["tv", "list", "airingtoday"], () =>
    tvApi.airingToday()
  );

  const isLoading = popularLoading && topRatedLoading && airingTodayLoading;
  const isError = popularError && topRatedError && airingTodayError;

  const filteredTopRateData = topRatedData?.pages[0].results.filter((tv) => {
    const id = tv.id;
    const idArray = popularData?.pages[0].results.map((item) => item.id);
    if (!idArray?.includes(id)) return tv;
  });

  const filteredAiringToday = airingTodayData?.pages[0].results.filter((tv) => {
    const id = tv.id;
    const idArray = popularData?.pages[0].results.map((item) => item.id);
    if (!idArray?.includes(id)) return tv;
  });

  const clickedTV =
    TVIdMatch?.params.id &&
    popularData?.pages[0].results &&
    topRatedData?.pages[0].results &&
    airingTodayData?.pages[0].results &&
    popularData.pages[0].results
      .concat(topRatedData.pages[0].results, airingTodayData.pages[0].results)
      .find((tv) => tv.id + "" === TVIdMatch.params.id);

  return (
    <>
      <Helmet>
        <title>TV | Kimflix</title>
      </Helmet>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Container>
          {popularData?.pages[0].results && (
            <Section
              title="Popular"
              data={popularData.pages[0].results}
              background={true}
            />
          )}

          {filteredTopRateData && (
            <Section title="Top Rated" data={filteredTopRateData} />
          )}

          {filteredAiringToday && (
            <Section title="Airing Today" data={filteredAiringToday} />
          )}

          {isError && <Message text={"error"} color="crimson"></Message>}

          <AnimatePresence>
            <Popup data={clickedTV || undefined} />
          </AnimatePresence>
        </Container>
      )}
    </>
  );
};

export default TV;
