export const addQueryParams = (url: string, params: Record<string, string>) => {
  const urlObj = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.append(key, value);
  });

  return urlObj.toString();
};

export const responseToJson = (res: Response) => {
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  return res.json();
};

export const responseToBlob = async (res: Response) => {
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  return res.blob();
};
