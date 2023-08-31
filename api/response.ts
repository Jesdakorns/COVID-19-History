import {PROBLEM_CODE} from 'apisauce';

//-------- API ---------//

export interface IResponse<T> {
  errorMessage?: string;
  httpStatusCode?: number;
  problem?: PROBLEM_CODE;
  data?: T;
}

export interface Status {
  code: string;
  description?: string;
}

export interface ApiBaseResponse<T> {
  description?: string;
  data?: T;
}

export interface IWorldwideAll {
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  affectedCountries: number;
}
export interface IHistoricalAll {
  cases: {
    date: number;
  };
  deaths: {
    date: number;
  };
  recovered: {
    date: number;
  };
}
