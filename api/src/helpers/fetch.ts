import { RequestInfo, RequestInit } from "node-fetch";

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

export const fetchApi = (url: string, type?: any) => {
  return fetch(`${process.env.FOOTBALL_API_URL}${url}`, {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_TOKEN as string,
    },
  });
};

// future
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": process.env.PAID_FOOTBALL_API_KEY,
//     "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//   },
// };
