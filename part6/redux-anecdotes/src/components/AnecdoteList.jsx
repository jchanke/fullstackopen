import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"


const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div className="anecdote">
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div >
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote => {
      return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })
  })
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(voteFor(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes
        .sort((a0, a1) => a1.votes - a0.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => handleVote(anecdote)} />
        )}
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  handleVote: PropTypes.func.isRequired,
}

export default AnecdoteList