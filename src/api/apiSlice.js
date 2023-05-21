import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://25.53.18.59:5000/api',
});

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    getCards: builder.query({
      query: () => '/Products',
      providesTags: ['Products']
    }),
    getOneCard: builder.query({
      query: (id) => `/Products/${id}`,
      providesTags: ['Products']
    }),
    updateCard: builder.mutation({
      query: (updatedCard) => ({
        url: `/cards/${updatedCard.id}`,
        method: 'PUT',
        body: updatedCard,
      }),
    }),
    deleteBookmark: builder.mutation({
      query: ({userId, id}) =>{
        return {
          url: `/Bookmarks/${userId}`,
          method: 'DELETE',
          body: {id:id}
        }},
      invalidatesTags: ['Bookmarks']
    }),
    getUserBookmarks: builder.query({
        query: (userId ) => {
          return `/Bookmarks/${userId}`
        },
        providesTags: ['Bookmarks'],
    }),
    setBookMark: builder.mutation({
        query: ({userId, id}) => {
          return ({
              url: `/Bookmarks/${userId}`,
              method: 'POST',
              body: {id:id}
            });
      },
      invalidatesTags: ['Bookmarks']
      }),
    getShops: builder.query({
      query: () => '/Shop',
      providesTags: ['Shops']
    }),
    getShopsArr: builder.query({
      query: () => '/Shop/arr',
    }), 
    providesTags: ['Shops']
  }),
});

export const {
    useGetCardsQuery,
    useGetOneCardQuery,
    useGetUserBookmarksQuery,
    useSetBookMarkMutation,
    useUpdateCardMutation,
    useDeleteBookmarkMutation,
    useGetShopsQuery,
    useGetShopsArrQuery
} = apiSlice;


export default apiSlice;