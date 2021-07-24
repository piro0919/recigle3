import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { NextApiRequest, NextApiResponse } from "next";
import { parseStringPromise } from "xml2js";

const handler = async (
  { method, ...req }: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (method === "GET") {
    const {
      query: { q },
    } = req;
    const { data } = await axios.get("http://www.google.com/complete/search", {
      params: {
        q,
        output: "toolbar",
      },
    });
    const jsData = await parseStringPromise(data);
    const { toplevel } = camelcaseKeys(jsData, { deep: true });

    if (typeof toplevel !== "object") {
      res.send([]);
      res.end();

      return;
    }

    const { completeSuggestion } = toplevel;

    res.send(completeSuggestion);
    res.end();

    return;
  }

  res.end();

  return;
};

export default handler;
