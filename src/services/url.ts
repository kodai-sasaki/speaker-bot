export const addQueryParams = (url: string, params: Record<string, string>) => {
  const urlObj = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.append(key, value);
  });
  return urlObj.toString();
};
