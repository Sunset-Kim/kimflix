import React from "react";
import PropType from "prop-types"
import styled from "styled-components";

const DetailPresenter = ({
  result,
  error,
  loading,

}) => null;

DetailPresenter.prototype = {
  result: PropType.object,
  loading: PropType.string,
  error: PropType.bool.isRequired,
}


export default DetailPresenter;