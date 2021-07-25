import axios from "axios";
import { GetServerSideProps } from "next";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useStorageState } from "react-storage-hooks";
import { useDebounce } from "rooks";
import { i18n } from "../../next-i18next.config";
import sitesEn from "./jsons/en/sites.json";
import sitesJa from "./jsons/ja/sites.json";
import Top, { TopProps } from "components/templates/Top";

export type PagesProps = SSRConfig;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Pages(_: PagesProps): JSX.Element {
  const {
    t,
    i18n: { language },
  } = useTranslation("common");
  const sites = useMemo(
    () => (language === "ja" ? sitesJa : sitesEn),
    [language]
  );
  const defaultSite = useMemo(
    () =>
      sites.reduce(
        (previousValue, { name }) => ({
          ...previousValue,
          [name]: "",
        }),
        {}
      ),
    [sites]
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
  const [siteKey, historiesKey] = useMemo(
    () =>
      language === "ja" ? ["site", "histories"] : ["siteEn", "historiesEn"],
    [language]
  );
  const [site, setSite] = useStorageState<
    { [K in string]: "false" | "true" | "" }
  >(storage, siteKey, defaultSite);
  const [histories, setHistories] = useStorageState<string[]>(
    storage,
    historiesKey,
    []
  );
  const handleSearch = useCallback<TopProps["onSubmit"]>(
    ({ q, site }) => {
      if (!q) {
        return;
      }

      const convertSiteQuery = (v: "true" | "false") =>
        Object.keys(site)
          .filter((key) => site[key] === v)
          .map((key) => {
            const foundSite = sites.find(({ name }) => key === name);

            if (typeof foundSite !== "object") {
              return "";
            }

            const { label } = foundSite;

            return `${v === "true" ? "" : "-"}${label}`;
          })
          .join(" ");
      const query = `${
        convertSiteQuery("true") || t("レシピ")
      } ${convertSiteQuery("false")} ${q}`.replace(/\s+/g, " ");

      setHistories(
        Array.from(
          new Set(
            [q, ...histories]
              .filter((_, index) => index < 10)
              .map((v) => v.trim().replace(/\s+/g, " "))
          )
        )
      );

      window.open(
        `http://www.google.${
          language === "ja" ? "co.jp" : "com"
        }/search?num=100&q=${query}`
      );
    },
    [histories, language, setHistories, sites, t]
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
          q: `${t("レシピ")} ${value}`,
        },
      });
      const suggestions = data
        .map(({ suggestion }: never) => {
          const { data } = suggestion[0]["$"];

          return data;
        })
        .map((value: string) => ({
          type: "search",
          value: value.replace(t("レシピ"), "").trim(),
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
    [histories, setInitialSuggestions, t]
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

      setInitialSuggestions();

      setTimeout(() => {
        if (!window.document.activeElement) {
          return;
        }

        (window.document.activeElement as HTMLElement).blur();
      }, 250);
    },
    [histories, setHistories, setInitialSuggestions]
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
        name,
        initialValue: site[name],
        onChange: (value) => {
          setSite((prevSite) => ({
            ...prevSite,
            [name]: value as never,
          }));
        },
      }))
    );
  }, [setSite, site, sites, topSites]);

  return (
    <>
      <Head>
        <meta content={t("レシグル")} name="application-name" />
        <meta content={t("レシグル")} name="apple-mobile-web-app-title" />
        <meta content={t("レシピをGoogle検索する")} name="description" />
        <meta content={t("レシグル")} name="twitter:title" />
        <meta
          content={t("レシピをGoogle検索する")}
          name="twitter:description"
        />
        <meta content={t("レシグル")} property="og:title" />
        <meta content={t("レシピをGoogle検索する")} property="og:description" />
        <meta content={t("レシグル")} property="og:site_name" />
        <title>{`${t("レシグル")} | ${t("レシピをGoogle検索する")}`}</title>
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

export type ServerSideProps = PagesProps;

export const getStaticProps: GetServerSideProps<ServerSideProps> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale || i18n.defaultLocale, ["common"])),
  },
});

export default Pages;
