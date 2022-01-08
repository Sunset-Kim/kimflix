import React from "react";
import { Company } from "services/api";
import styled from "styled-components";
import { createImgPath } from "Utils/imgpath";

const Container = styled.div`
  width: 75px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
  }
`;

interface SlideLogoProps {
  data: Company;
}
const SlideLogo: React.FC<SlideLogoProps> = ({ data }) => {
  return (
    <Container>
      <img src={createImgPath(data.logo_path, "w300")} alt={data.name} />
    </Container>
  );
};

export default SlideLogo;
