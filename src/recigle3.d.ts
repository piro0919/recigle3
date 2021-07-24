type SiteName =
  | "ajinomoto"
  | "cookpad"
  | "delishkitchen"
  | "erecipe"
  | "kikkoman"
  | "kurashiru"
  | "lettuceclub"
  | "nadia"
  | "orangepage"
  | "rakuten"
  | "sirogohan";

type Suggestion = {
  type: "history" | "search";
  value: string;
};

declare module "react-ios-pwa-prompt";
