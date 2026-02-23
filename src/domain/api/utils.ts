export const responseToJson = (res: Response) => {
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }
  return res.json();
};
