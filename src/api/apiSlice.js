import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001',
});

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    getCards: builder.query({
      query: () => '/cards',
      providesTags: ['Cards']
    }),
    getOneCard: builder.query({
      query: (id) => `/cards/${id}`,
      providesTags: ['Cards']
    }),
    updateCard: builder.mutation({
      query: (updatedCard) => ({
        url: `/cards/${updatedCard.id}`,
        method: 'PUT',
        body: updatedCard,
      }),
    }),
    deleteBookmark: builder.mutation({
      query: (id) => ({
        url: `/bookmarks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookmarks']
    }),
    getUserBookmarks: builder.query({
        query: (userId) => `/bookmarks?userId=${userId}`,
        providesTags: ['Bookmarks'],
    }),
    setBookMark: builder.mutation({
        query: (data) => ({
          url: '/bookmarks',
          method: 'POST',
          body: { ...data },
        }),
        invalidatesTags: ['Bookmarks']
      }),
      getShops: builder.query({
        query: () => '/shops',
        providesTags: ['Shops']
      })
  }),
});

export const {
    useGetCardsQuery,
    useGetOneCardQuery,
    useGetUserBookmarksQuery,
    useSetBookMarkMutation,
    useUpdateCardMutation,
    useDeleteBookmarkMutation,
    useGetShopsQuery
} = apiSlice;


export default apiSlice;