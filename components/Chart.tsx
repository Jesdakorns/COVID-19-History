import { Box, Skeleton, useMediaQuery } from "@mui/material";
import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTooltip,
} from "victory";
import dayjs from "dayjs";
import numeral from "numeral";
import { useFormContext } from "react-hook-form";
import { IForm } from "../pages";


const Chart = () => {
  const matches = useMediaQuery("(max-width:1800px)");
  const { watch } = useFormContext<IForm>();
  const dataChart = watch("dataChart");
  const dateInput = watch("dateInput");
  const loadingChart = watch("loadingChart");
  const dateDiff = dayjs().diff(dateInput, "day");

  if (loadingChart) {
    return (
      <Box p={{ xs: 1, md: 9 }}>
        <Skeleton variant="rectangular" width={"100%"} height={700} />
      </Box>
    );
  }

  return (
    <>
  
      <Box position={"relative"}>
        <Box className={`${matches && "box-victory-container"}`}>
          <VictoryChart
            theme={VictoryTheme.material}
            width={matches ? 1400 : undefined}
            height={matches ? 700 : 250}
            domainPadding={{ x: 10 }}
            containerComponent={
              <VictoryVoronoiContainer
                // mouseFollowTooltips
                voronoiDimension="x"
                labels={({ datum }) => {
                  const scoreNumeral = numeral(datum.y).format("0.0a");
                  return `${
                    datum.labelTooltip
                  }: ${scoreNumeral.toLocaleUpperCase()}`;
                }}
                className={`${matches && "victory-container"}`}
                responsive={!matches}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={5}
                    pointerLength={1}
                    centerOffset={{ y: -10 }}
                    flyoutStyle={{
                      fill: "white",
                      strokeWidth: 0.5,
                      stroke: "#bfbfbf",
                    }}
                  />
                }
                voronoiBlacklist={["victory-graph-scatter"]}
              />
            }
          >
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: "#939393" },
                axisLabel: { fontSize: 4, marginTop: 5, padding: 1 },
                ticks: { stroke: "none", size: 2 },
                tickLabels: { fontSize: matches ? 12 : 4, padding: 3 },
              }}
              tickFormat={(t) => {
                const scoreNumeral = numeral(t).format("0.0a");
                return scoreNumeral.toLocaleUpperCase();
              }}
            />

            <VictoryAxis
              style={{
                axis: { stroke: "#939393" },
                axisLabel: { fontSize: 4, marginTop: 5, padding: 1 },
                ticks: { stroke: "#fff", size: 2 },
                tickLabels: { fontSize: matches ? 12 : 4, padding: 5 },
              }}
              crossAxis={false}
              tickFormat={(t, idx) => {
                const M = dayjs(t).format("MMM");
                const Y = dayjs(t).get("y");
                return idx % (dateDiff > 220 || dateDiff === 0 ? 6 : 3) === 0
                  ? `${M}\n${Y}`
                  : "";
              }}
            />

            <VictoryLine
              interpolation="natural"
              data={dataChart?.deaths || []}
              y="y"
              style={{
                data: {
                  stroke: "#fd7676",
                  width: `20px`,
                  padding: 5,
                  strokeWidth: matches ? 2 : 0.5,
                },
                labels: {
                  fill: "#fd7676",
                  fontSize: matches ? 10 : 4,
                },
              }}
            />
            <VictoryLine
              interpolation="natural"
              data={dataChart?.recovered || []}
              y="y"
              style={{
                data: {
                  stroke: "#22a985",
                  width: `20px`,
                  padding: 5,
                  strokeWidth: matches ? 2 : 0.5,
                },
                labels: {
                  fill: "#22a985",
                  fontSize: matches ? 10 : 4,
                  paddingBottom: 2,
                },
              }}
            />
            <VictoryLine
              interpolation="natural"
              data={dataChart?.infected || []}
              y="y"
              style={{
                data: {
                  stroke: "#71e3dc",
                  width: `20px`,
                  padding: 5,
                  strokeWidth: matches ? 2 : 0.5,
                },
                labels: {
                  fill: "#71e3dc",
                  fontSize: matches ? 10 : 4,
                },
              }}
            />
          </VictoryChart>
        </Box>
      </Box>
    </>
  );
};

export default Chart;
