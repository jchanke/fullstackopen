import { useContext } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [_, dispatch] = useContext(NotificationContext)
  const displayNotification = (message, timeInSeconds) => {
    dispatch({ type: 'notification-set', payload: message })
    setTimeout(() => {
      dispatch({ type: 'notification-clear' })
    }, timeInSeconds * 1000)
  }

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote])
      displayNotification(`anecdote '${newAnecdote.content}' created`, 5)
    },
    onError: (error) => {
      displayNotification('too short anecdote, must have length 5 or more', 5)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0, })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
