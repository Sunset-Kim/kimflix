import React, { useState } from "react";
import styled from "styled-components";
import { createImgPath } from "Utils/imgpath";
import { motion, Variants } from "framer-motion";
import { IPerson, IMovie, ITV } from "services/api";
import dayjs from "dayjs";

const Image = styled.img`
  object-fit: cover;
  object-position: top center;
  width: 100%;
  pointer-events: none;
`;

const InfoContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 5px;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;

  h3 {
    font-size: 14px;
    margin-bottom: 0.3em;
  }

  ul {
    display: flex;
    font-size: 12px;
    span {
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;

const infoVariants: Variants = {
  hover: {
    opacity: 1,
  },
};

const Poster = <ItemTypes extends IMovie | ITV | IPerson>({
  data,
}: {
  data: ItemTypes;
}) => {
  const [loading, setLoading] = useState(true);
  // custom var
  // api 종류의 key로 타입 판별
  const type = Object.keys(data).includes("title")
    ? "movie"
    : Object.keys(data).includes("first_air_date")
    ? "tv"
    : "person";

  // 타입에 따른 컴포넌트 구조 리턴
  if (type === "movie") {
    const Data = data as IMovie;
    return (
      <>
        <Image
          src={
            loading
              ? require("assets/spinner.svg").default
              : createImgPath(Data.poster_path, "w300")
          }
          alt={Data.title}
          onLoad={() => setLoading(false)}
        />
        <InfoContainer variants={infoVariants}>
          <h3>{Data.title}</h3>
          <ul>
            <li>{dayjs(Data.release_date).get("year")}</li>
            <span>•</span>
            <li>{"⭐️" + Data.vote_average + " / 10"}</li>
          </ul>
        </InfoContainer>
      </>
    );
  } else if (type === "tv") {
    const Data = data as ITV;
    return (
      <>
        <Image src={createImgPath(Data.poster_path, "w300")} alt={Data.name} />
        <InfoContainer variants={infoVariants}>
          <h3>{Data.name}</h3>
          <ul>
            <li>{dayjs(Data.first_air_date).get("year")}</li>
            <span>•</span>
            <li>{"⭐️" + Data.vote_average + " / 10"}</li>
          </ul>
        </InfoContainer>
      </>
    );
  } else {
    const Data = data as IPerson;
    return (
      <>
        <Image src={createImgPath(Data.profile_path, "w300")} alt={Data.name} />
        <InfoContainer variants={infoVariants}>
          <h3>{Data.name}</h3>
          <ul>
            <li>{Data.known_for_department}</li>
            <span>•</span>
            <li>{"😎" + data.popularity}</li>
          </ul>
        </InfoContainer>
      </>
    );
  }
};

export default Poster;
