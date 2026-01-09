/**
 * Formats translation keys with dots to readable text
 * Examples:
 * - "most.sold" -> "Most Sold"
 * - "popular.categories" -> "Popular Categories"
 * - "recently.added" -> "Recently Added"
 * - "deals.of.the.day" -> "Deals Of The Day"
 */
export const formatTranslationKey = (key: string): string => {
  if (!key) return key;
  
  // If the key contains dots, format it
  if (key.includes(".")) {
    return key
      .split(".")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  
  // Otherwise, just capitalize the first letter
  return key.charAt(0).toUpperCase() + key.slice(1);
};
