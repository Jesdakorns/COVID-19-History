import { request } from "./request";
import { IHistoricalAll, IWorldwideAll } from "./response";

export const covitHistoricalAll = (params?: any) =>
  request<IHistoricalAll>({
    method: "get",
    url: "historical/all",
    params,
  });

export const covitWorldwideAll = (params?: any) =>
  request<IWorldwideAll>({
    method: "get",
    url: "all",
    params,
  });
