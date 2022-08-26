import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

export const baseQuery = (path: string) =>
  fetchBaseQuery({
    baseUrl: String(process.env.API_URL || 'http://localhost:3000/api').concat(path),
  });

export const providesList = <R extends { _id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T,
) => {
  return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map(({ _id }) => ({ type: tagType, id: _id })),
      ]
    : [{ type: tagType, id: 'LIST' }];
};
