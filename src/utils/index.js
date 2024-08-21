import { useTranslation } from "react-i18next";

export const localeSort = (a, b) => {
  const { t, i18n } = useTranslation();
  return a.localeCompare(b, t("locale"));
};
