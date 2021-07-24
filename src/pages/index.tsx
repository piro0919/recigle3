import axios from "axios";
import Head from "next/head";
import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useStorageState } from "react-storage-hooks";
import { useDebounce } from "rooks";
import sites from "./jsons/sites.json";
import Top, { TopProps } from "components/templates/Top";

function Pages(): JSX.Element {
  const defaultSite = useMemo(
    () =>
      sites.reduce(
        (previousValue, { name }) => ({
          ...previousValue,
          [name as SiteName]: "",
        }),
        {} as {
          [K in SiteName]: "";
        }
      ),
    []
  );
  const storage = useMemo<Parameters<typeof useStorageState>[0]>(
    () =>
      typeof window === "undefined"
        ? {
            getItem: () => null,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            removeItem: () => {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setItem: () => {},
          }
        : window.localStorage,
    []
  );
  const [site, setSite] = useStorageState<
    { [K in SiteName]: "false" | "true" | "" }
  >(storage, "site", defaultSite);
  const [histories, setHistories] = useStorageState<string[]>(
    storage,
    "histories",
    []
  );
  const handleSearch = useCallback<TopProps["onSubmit"]>(
    ({ q, site }) => {
      if (!q) {
        return;
      }

      const convertSiteQuery = (v: "true" | "false") =>
        Object.keys(site)
          .filter((key) => site[key as SiteName] === v)
          .map((key) => {
            const foundSite = sites.find(({ name }) => key === name);

            if (typeof foundSite !== "object") {
              return "";
            }

            const { label } = foundSite;

            return `${v === "true" ? "" : "-"}${label}`;
          })
          .join(" ");
      const query = `${convertSiteQuery("true") || "レシピ"} ${convertSiteQuery(
        "false"
      )} ${q}`.replace(/\s+/g, " ");

      setHistories(
        Array.from(
          new Set(
            [q, ...histories]
              .filter((_, index) => index < 10)
              .map((v) => v.trim().replace(/\s+/g, " "))
          )
        )
      );

      window.open(`http://www.google.co.jp/search?num=100&q=${query}`);
    },
    [histories, setHistories]
  );
  const [topSites, setTopSites] = useState<TopProps["sites"]>([]);
  const [suggestions, setSuggestions] = useState<TopProps["suggestions"]>([]);
  const setInitialSuggestions = useCallback(() => {
    setSuggestions(
      histories.map((value) => ({
        value,
        type: "history",
      }))
    );
  }, [histories]);
  const handleSuggestionsFetchRequested = useCallback<
    TopProps["onSuggestionsFetchRequested"]
  >(
    async ({ reason, value }) => {
      if (!value.trim()) {
        setInitialSuggestions();

        return;
      }

      if (reason !== "input-changed") {
        return;
      }

      const { data } = await axios.get("/api/search", {
        params: {
          q: `レシピ ${value}`,
        },
      });
      const suggestions = data
        .map(({ suggestion }: never) => {
          const { data } = suggestion[0]["$"];

          return data;
        })
        .map((value: string) => ({
          type: "search",
          value: value.replace("レシピ", "").trim(),
        }));

      setSuggestions(
        [
          ...histories
            .filter((history) =>
              history.startsWith(value.trim().replace(/\s+/g, " "))
            )
            .map((history) => ({
              type: "history",
              value: history,
            })),
          ...suggestions.filter(
            ({ value }: { value: string }) =>
              !histories.find((history) => value === history)
          ),
        ].filter((_, index) => index < 10)
      );
    },
    [histories, setInitialSuggestions]
  );
  const handleSuggestionsFetchRequestedDebounce = useDebounce(
    handleSuggestionsFetchRequested,
    500
  ) as typeof handleSuggestionsFetchRequested;
  const handleRemoveHistory = useCallback<TopProps["onClickRemoveHistory"]>(
    ({
      currentTarget: {
        dataset: { history },
      },
    }) => {
      setHistories(histories.filter((value) => history !== value));
    },
    [histories, setHistories]
  );

  useEffect(() => {
    setInitialSuggestions();
  }, [setInitialSuggestions]);

  useEffect(() => {
    if (
      JSON.stringify(site) ===
      JSON.stringify(
        topSites.reduce(
          (previousValue, { initialValue, name }) => ({
            ...previousValue,
            [name]: initialValue,
          }),
          {}
        )
      )
    ) {
      return;
    }

    setTopSites(
      sites.map(({ label, name }) => ({
        label,
        initialValue: site[name as SiteName],
        name: name as SiteName,
        onChange: (value) => {
          setSite((prevSite) => ({
            ...prevSite,
            [name]: value,
          }));
        },
      }))
    );
  }, [setSite, site, topSites]);

  return (
    <>
      <Head>
        <title>レシグル | レシピをGoogle検索する</title>
      </Head>
      <Top
        onClickRemoveHistory={handleRemoveHistory}
        onSubmit={handleSearch}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequestedDebounce}
        sites={topSites}
        suggestions={suggestions}
      />
    </>
  );
}

export default Pages;
