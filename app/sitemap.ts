import { MetadataRoute } from "next";

export default (): MetadataRoute.Sitemap => [
  {
    url: "https://tymg.org",
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  },
  {
    url: "https://tymg.org/main",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: "https://tymg.org/blogs",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
];
