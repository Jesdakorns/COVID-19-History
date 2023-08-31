import { covitHistoricalAll, covitWorldwideAll } from "@/api/api";
import { IHistoricalAll } from "@/api/response";
import { useAppContext } from "@/context/AppContext";
// import { useAppContext } from "@/context/AppContext";
import { IForm } from "@/pages";
import { NOTIFICATION_MESSAGE, NOTIFICATION_VARIANT } from "@/utils/constants";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { FieldValue, FieldValues, UseFormReturn } from "react-hook-form";

type IProps = {
  methodsForm: UseFormReturn<IForm, any, undefined>;
};

const useFetchData = ({ methodsForm }: IProps) => {
  const { setValue, watch } = methodsForm;
  const [, dispatch] = useAppContext();
  const covitWorldwide = watch("covitWorldwide");
  const dateInput = watch("dateInput");

  const getCovitWorldwideAll = async () => {
    try {
      const resWorldwide = await covitWorldwideAll();
      if (resWorldwide?.data) {
        setValue("covitWorldwide", resWorldwide?.data);
      }
    } catch (error: any) {}
  };

  const getCovitHistoricalAll = async (lastdays: string = "all") => {
    try {
      setValue("loadingChart", true);
      const resHistorical = await covitHistoricalAll({ lastdays });
      if (resHistorical?.data) {
        setValue("dataCovitHistoricalAll", resHistorical?.data);
      }
    } catch (error: any) {
      console.log(
        `🚀 ~ file: useFetchDate.tsx ~ line 36 ~ getCovitHistoricalAll ~ error`,
        error?.responseData?.data?.message
      );
      dispatch({
        toastNotification: {
          message:
            error?.responseData?.data?.message ||
            NOTIFICATION_MESSAGE.NETWORK_ERROR,
          variant: NOTIFICATION_VARIANT.DANGEROUS,
        },
      });
    } finally {
      setTimeout(() => {
        setValue("loadingChart", false);
      }, 200);
    }
  };

  const fetchDataApiAll = async (
    mode: "all" | "worldwide" | "historical" = "all"
  ) => {
    if (["all", "worldwide"].includes(mode)) {
      getCovitWorldwideAll();
    }
    if (["all", "historical"].includes(mode)) {
      console.log("dateInput", dateInput);
      getCovitHistoricalAll(
        dateInput ? `${dayjs().diff(dateInput, "day")}` : "all"
      );
    }
  };

  useEffect(() => {
    fetchDataApiAll("all");
  }, []);

  useEffect(() => {
    const time = setTimeout(() => {
      fetchDataApiAll("historical");
      // getCovitHistoricalAll(
      //   dateInput ? `${dayjs().diff(dateInput, "day")}` : "all"
      // );
    }, 1700);

    return () => {
      clearTimeout(time);
    };
  }, [dateInput]);

  return { covitWorldwide, fetchDataApiAll };
};

export default useFetchData;
