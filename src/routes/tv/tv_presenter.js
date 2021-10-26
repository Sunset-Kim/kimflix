import React from "react";
import PropType from "prop-types"
import styled from "styled-components";

const TVPresenter = ({ topRated,
  popular,
  airingToday,
  error,
  loading, }) => null;

TVPresenter.prototype = {
  topRated: PropType.array,
  popular: PropType.array,
  airingToday: PropType.array,
  error: PropType.string,
  loading: PropType.bool.isRequired,
}


export default TVPresenter;