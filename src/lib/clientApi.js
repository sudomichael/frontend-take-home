import axios from "axios";

export const queryNpm = async (query, forceFetchFailure) => {
  try {
    const endpoint = forceFetchFailure ? "nonExistentEndpoint" : "suggestions";
    const res = await axios.get(`https://api.npms.io/v2/search/${endpoint}`, {
      params: {
        q: query || "",
      },
    });
    return { results: res.data, error: null };
  } catch (e) {
    console.log("error", e);
    return {
      results: [],
      error: "There was an error fetching the package data.",
    };
  }
};
