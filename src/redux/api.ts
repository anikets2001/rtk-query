import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ['Posts'],

  endpoints: (builder) => ({
    // builder has two options query (for get request) and mutation for others(deletion, update etx...)
    getPosts: builder.query<Post[], string>({ query: () => "posts", providesTags: ['Posts'] }),

    // Post api (to add new data in post data)
    newPost: builder.mutation<Post, Post>({
      query: (posts) => ({
        url: "posts",
        method: "POST",
        body: posts,
      }),
      invalidatesTags: ["Posts"]
    }),
  }),
});

export const { useGetPostsQuery, useNewPostMutation } = myApi;
