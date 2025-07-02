import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: fetchAnecdotes,
    retry: 1,
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id
          ? updatedAnecdote
          : anecdote
      ))
    }
  })

  const [_, dispatchNotification] = useContext(NotificationContext)
  const displayNotification = (message, timeInSeconds) => {
    dispatchNotification({ type: 'notification-set', payload: message })
    setTimeout(() => {
      dispatchNotification({ type: 'notification-clear' })
    }, timeInSeconds * 1000)
  }

  if (result.isPending) {
    return <span>loading data...</span>
  }

  if (result.isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdoteMutation.mutate(updatedAnecdote)

    // display notification for 5 seconds
    displayNotification(`voted for anecdote '${anecdote.content}'`, 5)
  }

  return (
    <>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default App
