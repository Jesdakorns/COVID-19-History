import { ApiResponse, create } from "apisauce";

import { IResponse } from "./response";

interface IRequest {
  method: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  params?: object;
  axiosConfig?: object;
  aadToken?: string;
}

const DEFAULT_API_CONFIG = {
  url: `https://disease.sh/v3/covid-19/`,
  timeout: 180000,
};

const Api = create({
  baseURL: DEFAULT_API_CONFIG.url,
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: {
    Accept: "application/json",
    credentials: true,
  },
});

export const request = async <T>({
  method,
  url,
  params,
  axiosConfig,
}: IRequest): Promise<IResponse<T>> => {
  try {
    // eslint-disable-next-line no-console
    console.log(
      {
        url,
        method,
        params,
        axiosConfig,
      },
      "Request"
    );

    const response: ApiResponse<T> = await Api[method](
      url,
      params,
      axiosConfig
    );
    const responseData = {
      data: response?.data,
      httpStatusCode: response?.status,
    };
    // eslint-disable-next-line no-console
    console.log(
      {
        ...responseData,
      },
      "Response"
    );
    if (responseData.httpStatusCode !== 200) {
      return Promise.reject({
        responseData,
      });
    }

    return Promise.resolve(responseData);
  } catch (error: any) {
    return Promise.reject({
      error,
    });
  }
};
