"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatTranslationKey } from "@/utils/format-translation-key";

interface ListHeaderProps {
  title: string;
  link?: string;
  container?: boolean;
  marginBottom?: boolean;
  extra?: React.ReactElement;
}

export const ListHeader = ({
  title,
  link,
  container,
  extra,
  marginBottom = true,
}: ListHeaderProps) => {
  const { t } = useTranslation();
  const translatedTitle = t(title);
  // If translation returns the same key (translation not found), format it
  const displayTitle = translatedTitle === title ? formatTranslationKey(title) : translatedTitle;
  
  return (
    <div
      className={clsx(
        "flex items-center justify-between",
        container && "xl:container px-2 md:px-4",
        marginBottom && "mb-4"
      )}
    >
      <div className={clsx("flex items-center gap-3")}>
        <span className={clsx("md:text-[26px] text-xl font-semibold")}>{displayTitle}</span>
        {extra}
      </div>
      {!!link && (
        <Link href={link} className="text-sm font-medium text-blue-link">
          {t("see.all")}
        </Link>
      )}
    </div>
  );
};
