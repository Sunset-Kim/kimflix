import { IGetTV, tvApi } from "services/api";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loading from "components/loading";
import Section from "components/section";
import Message from "components/message";
import { useQuery } from "react-query";
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
  } = useQuery<IGetTV>(["tv", "popular"], () => tvApi.popular());

  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isError: topRatedError,
  } = useQuery<IGetTV>(["tv", "topRated"], () => tvApi.topRated());

  const {
    isLoading: airingTodayLoading,
    data: airingTodayData,
    isError: airingTodayError,
  } = useQuery<IGetTV>(["tv", "airingToday"], () => tvApi.airingToday());

  const isLoading = popularLoading && topRatedLoading && airingTodayLoading;
  const isError = popularError && topRatedError && airingTodayError;

  const filteredTopRateData = topRatedData?.results.filter((tv) => {
    const id = tv.id;
    const idArray = popularData?.results.map((item) => item.id);
    if (!idArray?.includes(id)) return tv;
  });

  const filteredAiringToday = airingTodayData?.results.filter((tv) => {
    const id = tv.id;
    const idArray = popularData?.results.map((item) => item.id);
    if (!idArray?.includes(id)) return tv;
  });

  const clickedTV =
    TVIdMatch?.params.id &&
    popularData?.results &&
    topRatedData?.results &&
    airingTodayData?.results &&
    popularData.results
      .concat(topRatedData.results, airingTodayData.results)
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
          {popularData?.results && (
            <Section
              title="Popular"
              data={popularData.results}
              background={true}
            />
          )}

          {filteredTopRateData && (
            <Section title="Top Rate" data={filteredTopRateData} />
          )}

          {filteredAiringToday && (
            <Section title="airingToday" data={filteredAiringToday} />
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
