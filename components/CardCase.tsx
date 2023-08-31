import { Box, styled } from "@mui/material";
import React from "react";
import numeral from "numeral";
import { screen } from "../utils/mixin";

interface IProps {
  score?: number;
  title?: string;
  color?: string;
  bg?: string;
}

const CardCase = ({ title = "", score = 0, bg, color }: IProps) => {
  const scoreNumeral = numeral(score).format("0.0a");
  return (
    <>
      <CardCaseCss sx={{ background: bg, flexDirection: "column" }}>
        <TextTitleCase sx={{ color: color }}>{title}</TextTitleCase>
        <TextScoreCase sx={{ color: color }}>{scoreNumeral}</TextScoreCase>
      </CardCaseCss>
    </>
  );
};

export default CardCase;

const CardCaseCss = styled(Box)(() => ({
  boxShadow: `1px 1px 6px 1px #e4f1f1`,
  borderRadius: `20px`,
  padding: `15px`,
  minHeight: `100px`,
  display: `flex`,
  justifyContent: `space-between`,
  fontSize: `18px`,
}));

const TextTitleCase = styled(Box)((props) => ({
  fontSize: `22px`,
  [props.theme.breakpoints.down(screen.sm)]: {
    fontSize: `18px`,
  },
}));

const TextScoreCase = styled(Box)((props) => ({
  textTransform: `uppercase`,
  display: `flex`,
  alignItems: `flex-end`,
  fontSize: `32px`,
  fontWeight: `bold`,
  justifyContent: `flex-end`,
  [props.theme.breakpoints.down(screen.sm)]: {
    fontSize: `24px`,
  },
}));
