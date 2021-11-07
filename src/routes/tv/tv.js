import React, { useEffect, useState } from "react";
import { tvApi } from "api";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loading from "components/loading";
import Section from "components/section";
import Message from "components/message";
import PropType from "prop-types";



const Container = styled.div`
  padding: 0 10px;
`


const TV = () => {
  const [topRated, setTopRated] = useState(null);
  const [popular, setPopular] = useState(null);
  const [airingToday, setAiringToday] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  const getTv = async () => {
    try {
      const [{ data: { results: airingToday } }, { data: { results: topRated } }, { data: { results: popular } }] = await Promise.all([tvApi.airingToday(), tvApi.topRated(), tvApi.popular()]);

      setTopRated(topRated);
      setPopular(popular);
      setAiringToday(airingToday);

    } catch (error) {
      setError({
        error: "Can't find TV infomation"
      })
    }

    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTv();
  }, [])


  return (
    <>
      <Helmet>
        <title>TV | Kimflix</title>
      </Helmet>
      {
        loading ?
          (<Loading></Loading>) :
          (<Container>
            {
              popular &&
              popular.length > 0 &&
              <Section title="Popular" data={popular} background={true} />
            }

            {
              topRated &&
              topRated.length > 0 &&
              <Section title="Top Rate" data={topRated} />
            }
            {
              airingToday &&
              airingToday.length > 0 &&
              <Section title="airingToday" data={airingToday} />
            }
            {error && <Message text={error} color="crimson"></Message>}

          </Container>
          )
      }
    </>
  )
}

export default TV;

TV.prototype = {

}