import { IHistoricalAll } from "@/api/response";
import { IForm } from "@/pages";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { FieldValue, FieldValues, UseFormReturn } from "react-hook-form";

type IProps = {
  methodsForm: UseFormReturn<IForm, any, undefined>;
};

export interface IChart {
  x: string;
  y: number;
  labelTooltip: string;
}

export interface ITable {
  x: string;
  infected: number;
  recovered: number;
  deaths: number;
}

const useConvertData = ({ methodsForm }: IProps) => {
  const { setValue, watch } = methodsForm;
  const dataCovitHistoricalAll = watch("dataCovitHistoricalAll");

  const convertTableAndChart = (reqDate?: IHistoricalAll) => {
    try {
      setValue("loadingChart", true);
      const infected: IChart[] = [];
      const recovered: IChart[] = [];
      const deaths: IChart[] = [];
      const data: ITable[] = [];
      const objDataCovitHistoricalAll = Object.entries(reqDate || {});

      for (const [
        keyCovitHistorical,
        valueCovitHistorical,
      ] of objDataCovitHistoricalAll) {
        let startM = 0;
        let startY = 0;
        let _value: number = 0;
        let _date: string = "";
        let countItem: number = 0;
        const itemLength = Object.keys(valueCovitHistorical).length;

        for (const [key, value] of Object.entries(valueCovitHistorical)) {
          const M = dayjs(key).get("M") + 1;
          const Y = dayjs(key).get("y");
          if (!startM && !startY) {
            startM = M;
            startY = Y;
          }
          if ((startM != M && startY === Y) || startY !== Y) {
            const filter = data.findIndex((val) => val.x === _date);
            if (keyCovitHistorical === "cases") {
              if (filter < 0) {
                data.push({
                  x: _date,
                  infected: _value,
                  recovered: 0,
                  deaths: 0,
                });
              } else {
                const converMap = data.find((val, idx) => idx === filter);
                if (converMap) {
                  converMap.infected = _value;
                }
              }
              infected.push({
                x: _date,
                y: _value,
                labelTooltip: "Cases",
              });
            } else if (keyCovitHistorical === "recovered") {
              if (filter < 0) {
                data.push({
                  x: _date,
                  infected: 0,
                  recovered: _value,
                  deaths: 0,
                });
              } else {
                const converMap = data.find((val, idx) => idx === filter);
                if (converMap) {
                  converMap.recovered = _value;
                }
              }

              recovered.push({
                x: _date,
                y: _value,
                labelTooltip: "Recovered",
              });
            } else if (keyCovitHistorical === "deaths") {
              if (filter < 0) {
                data.push({
                  x: _date,
                  infected: 0,
                  recovered: 0,
                  deaths: _value,
                });
              } else {
                const converMap = data.find((val, idx) => idx === filter);
                if (converMap) {
                  converMap.deaths = _value;
                }
              }
              deaths.push({
                x: _date,
                y: _value,
                labelTooltip: "Deaths",
              });
            }
            startM = M;
            startY = Y;
          }
          _value = value as number;
          _date = key;
          countItem++;

          if (countItem === itemLength) {
            const filter = data.findIndex((val) => val.x === _date);
            const converMap = data.find((val, idx) => idx === filter);
            if (keyCovitHistorical === "cases") {
              data.push({
                x: _date,
                infected: _value,
                recovered: 0,
                deaths: 0,
              });
              infected.push({
                x: _date,
                y: _value,
                labelTooltip: "Cases",
              });
            } else if (keyCovitHistorical === "recovered") {
              if (filter < 0) {
                data.push({
                  x: _date,
                  infected: 0,

                  recovered: _value,

                  deaths: 0,
                });
              } else {
                if (converMap) {
                  converMap.recovered = _value;
                }
              }
              recovered.push({
                x: _date,
                y: _value,
                labelTooltip: "Recovered",
              });
            } else if (keyCovitHistorical === "deaths") {
              if (filter < 0) {
                data.push({
                  x: _date,
                  infected: 0,
                  recovered: 0,
                  deaths: _value,
                });
              } else {
                if (converMap) {
                  converMap.deaths = _value;
                }
              }
              deaths.push({
                x: _date,
                y: _value,
                labelTooltip: "Deaths",
              });
            }
          }
        }
      }
      setValue("dataChart", {
        infected: infected,
        recovered: recovered,
        deaths: deaths,
      });
      setValue("dataTable", data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    convertTableAndChart(dataCovitHistoricalAll);
  }, [dataCovitHistoricalAll]);

  return { convertTableAndChart };
};

export default useConvertData;
