import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const TAG_TYPES = { notes: 'notes' }
const http_method = { POST: 'POST', PATCH: 'PATCH', GET: 'GET', PUT: 'PUT', DELETE: 'DELETE' }

export const todoAppApi = createApi({
    reducerPath: 'todoAppApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_SERVER_API_URL}`
    }),
    tagTypes: [TAG_TYPES.notes],
    endpoints: (builder) => ({
        getAllNotes: builder.query({ query: () => 'note', providesTags: () => [TAG_TYPES.notes], transformResponse:(data)=> data?.data }),
        getNoteById: builder.query({ query: (id) => `note/${id}`, providesTags: () => [TAG_TYPES.notes] }),
        addNote: builder.mutation({ query: (data) => ({ url: 'note', method: http_method.POST, body: data }), invalidatesTags: [TAG_TYPES.notes] }),
        deleteNote: builder.mutation({ query: (id) => ({ url: `note/${id}`, method: http_method.DELETE }), invalidatesTags: [TAG_TYPES.notes] }),
        updateNote: builder.mutation({ query: (data) => ({ url: `note/${data?.id}`, method: http_method.PATCH, body: data?.data }), invalidatesTags: [TAG_TYPES.notes] }),
    }),
})

export const {
    useGetAllNotesQuery, useGetNoteByIdQuery,
    useAddNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation
} = todoAppApi;