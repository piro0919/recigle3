import { useTranslation } from "next-i18next";
import React, {
  useCallback,
  useMemo,
  useEffect,
  KeyboardEventHandler,
} from "react";
import Autosuggest, {
  AutosuggestProps,
  InputProps,
  OnSuggestionsClearRequested,
} from "react-autosuggest";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import swal from "sweetalert";
import usePwa from "use-pwa";
import styles from "./style.module.scss";
import Button from "components/atoms/Button";
import SearchInput, {
  SearchInputProps,
} from "components/molecules/SearchInput";
import SiteFieldset, {
  SiteFieldsetProps,
} from "components/molecules/SiteFieldset";
import Suggestion, { SuggestionProps } from "components/molecules/Suggestion";
import SuggestionsContainer from "components/molecules/SuggestionsContainer";

type FieldValues = {
  q: string;
  site: Record<string, "false" | "true" | "">;
};

export type SearchFormProps = Pick<SiteFieldsetProps, "sites"> &
  Pick<
    AutosuggestProps<Suggestion, Suggestion>,
    "onSuggestionsFetchRequested" | "suggestions"
  > &
  Pick<SuggestionProps[2], "onClickRemoveHistory"> & {
    onSubmit: SubmitHandler<FieldValues>;
  };

function SearchForm({
  onClickRemoveHistory,
  onSubmit,
  onSuggestionsFetchRequested,
  sites,
  suggestions,
}: SearchFormProps): JSX.Element {
  const { t } = useTranslation("common");
  const site = useMemo(
    () =>
      sites.reduce(
        (previousValue, { initialValue, name }) => ({
          ...previousValue,
          [name]: initialValue,
        }),
        {} as FieldValues["site"]
      ),
    [sites]
  );
  const [siteValues, siteStyleList] = useMemo<
    [SiteFieldsetProps["values"], SiteFieldsetProps["styleList"]]
  >(
    () => [
      ["false", "", "true"],
      [
        {
          selectedStyle: {
            background: "#ea4335",
          },
        },
        {
          selectedStyle: {
            background: "#fbbc05",
          },
        },
        {
          selectedStyle: {
            background: "#34a853",
          },
        },
      ],
    ],
    []
  );
  const { control, handleSubmit, setValue } = useForm<FieldValues>({
    defaultValues: {
      site,
      q: "",
    },
  });
  const handleChange = useCallback<InputProps<Suggestion>["onChange"]>(
    ({ target }, { newValue, method }) => {
      const {
        dataset: { history, search },
      } = target as HTMLElement;

      if (history) {
        setValue("q", "");

        return;
      }

      setValue("q", newValue);

      if (!search || method !== "click") {
        return;
      }

      handleSubmit(onSubmit)();
    },
    [handleSubmit, onSubmit, setValue]
  );
  const handleReset = useCallback<SearchInputProps["onReset"]>(() => {
    setValue("q", "");
  }, [setValue]);
  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLElement>>(
    (event) => {
      const { key } = event;

      if (key !== "Enter") {
        return;
      }

      event.preventDefault();

      handleSubmit(onSubmit)();
    },
    [handleSubmit, onSubmit]
  );
  const {
    appinstalled,
    canInstallprompt,
    enabledPwa,
    enabledUpdate,
    isPwa,
    showInstallPrompt,
    unregister,
  } = usePwa();
  const handleUpdate = useCallback(async () => {
    const result = await unregister();

    if (result) {
      await swal(
        t("アップデートが完了しました"),
        t("このページを再読み込みします。"),
        "success"
      );

      window.location.reload();

      return;
    }

    await swal(
      t("アップデートに失敗しました"),
      t("アップデート中にエラーが起きました。"),
      "error"
    );
  }, [t, unregister]);
  const handleSuggestionsClearRequested =
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useCallback<OnSuggestionsClearRequested>(() => {}, []);
  const handleClickRemoveHistory = useCallback<
    SuggestionProps[2]["onClickRemoveHistory"]
  >(
    (e) => {
      onClickRemoveHistory(e);

      setValue("q", "");
    },
    [onClickRemoveHistory, setValue]
  );

  useEffect(() => {
    setValue("site", site);
  }, [setValue, site]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="q"
        render={({ field: { value, onBlur } }) => (
          <Autosuggest
            alwaysRenderSuggestions={false}
            getSuggestionValue={({ value }) => value}
            inputProps={{
              onBlur,
              value,
              onChange: handleChange,
              onKeyDown: handleKeyDown,
              placeholder: t("料理名や食材で検索"),
              type: "search",
            }}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            renderInputComponent={({ ref, ...props }) => (
              <SearchInput {...props} inputRef={ref} onReset={handleReset} />
            )}
            renderSuggestion={(suggestion, params) =>
              Suggestion(suggestion, params, {
                onClickRemoveHistory: handleClickRemoveHistory,
              })
            }
            renderSuggestionsContainer={SuggestionsContainer}
            shouldRenderSuggestions={() => true}
            suggestions={suggestions}
          />
        )}
      />
      <div className={styles.fieldsetWrapper}>
        <SiteFieldset
          sites={sites}
          styleList={siteStyleList}
          values={siteValues}
        />
      </div>
      <div className={styles.buttonsWrapper}>
        <Button type="submit">{t("レシグル 検索")}</Button>
        {!appinstalled && canInstallprompt && enabledPwa && !isPwa ? (
          <Button onClick={showInstallPrompt}>
            {t("レシグル インストール")}
          </Button>
        ) : null}
        {enabledUpdate && isPwa ? (
          <Button onClick={handleUpdate}>{t("レシグル アップデート")}</Button>
        ) : null}
      </div>
    </form>
  );
}

export default SearchForm;
