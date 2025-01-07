import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

const queryClient = new QueryClient()

export default function App() {
    const [isEditing, setIsEditing] = useState('')

    return (
        <QueryClientProvider client={queryClient}>
            <AddBook />
            <EditBook isEditing={isEditing} setIsEditing={setIsEditing} />
            <Books isEditing={isEditing} setIsEditing={setIsEditing} />
        </QueryClientProvider>
    )
}

type Book = {
    id: string,
    title: string,
    author: string,
}

function EditBook({ isEditing, setIsEditing }: { isEditing: string; setIsEditing: (value: string) => void }) {
    const queryClient = useQueryClient()
    const [editingTitle, setEditingTitle] = useState('')
    const [editingAuthor, setEditingAuthor] = useState('')

    const editBookMutation = useMutation({
        mutationFn: ({ id, title, author }: { id: string; title: string; author: string }) => {
            return axios.put(`http://localhost:3000/books/${id}`, {
                title,
                author,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['books']) // Refetch the books query
            setIsEditing('') // Reset editing state after success
            setEditingTitle('')
            setEditingAuthor('')
        },
    })

    const handleEditBook = () => {
        editBookMutation.mutate({
            id: isEditing,
            title: editingTitle,
            author: editingAuthor,
        })
    }

    const handleCancelEditing = () => {
        setIsEditing('')
        setEditingTitle('')
        setEditingAuthor('')
    }

    if (!isEditing) return null

    // const { isLoading, error, data } = useQuery({
    //     queryKey: ['books'],
    //     queryFn: () => axios.get('http://localhost:3000/books').then((res) => res.data),
    // })

    return (
        <div>
            <label htmlFor="edit-title">Edit title</label>
            <input type="text" id="edit-title" value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} />

            <label htmlFor="edit-author">Edit author</label>
            <input type="text" id="edit-author" value={editingAuthor} onChange={(e) => setEditingAuthor(e.target.value)} />

            <button type="submit" onClick={handleEditBook}>Save</button>
            <button onClick={handleCancelEditing}>Cancel</button>
        </div>
    )
}

function AddBook() {
    const queryClient = useQueryClient()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const addBookMutation = useMutation({
        mutationFn: ({ title, author }: { title: string; author: string }) => {
            return axios.post(`http://localhost:3000/books`, {
                title,
                author,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['books']) // Refetch the books query
            setTitle('')
            setAuthor('')
        },
    })

    const addBook = () => {
        addBookMutation.mutate({ title, author })
    }

    return (
        <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label htmlFor="author">Author</label>
            <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />

            <button type="submit" onClick={addBook}>Add book</button>
        </div>
    )
}

function Books({ isEditing, setIsEditing }: { isEditing: string; setIsEditing: (value: string) => void }) {
    const queryClient = useQueryClient()

    const deleteBookMutation = useMutation({
        mutationFn: (id: string) => {
            return axios.delete(`http://localhost:3000/books/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['books']) // Refetch the books query
        },
    })

    const { isLoading, error, data } = useQuery({
        queryKey: ['books'],
        queryFn: () => axios.get('http://localhost:3000/books').then((res) => res.data),
    })

    if (isLoading) return 'Loading...'
    if (error instanceof Error) return `An error has occurred: ${error.message}`

    return (
        <div>
            {data.map((book: Book) => (
                <div key={book.id}>
                    <h1>
                        {book.title} - {book.author}
                    </h1>
                    <button onClick={() => deleteBookMutation.mutate(book.id)}>Delete</button>
                    { !isEditing ? <button onClick={() => setIsEditing(book.id)}>Edit</button> : '' }
                </div>
            ))}
        </div>
    )
}
