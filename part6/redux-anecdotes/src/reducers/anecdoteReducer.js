const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action: ', action)
  switch (action.type) {
    case 'NEW_QUOTE': 
      return state.concat(action.data)

    case 'VOTE': {
      const id = action.data.id
      const quoteToChange = state.find(n => n.id === id)
      const changeQuote = {
        ...quoteToChange,
        votes: quoteToChange.votes + 1
      }
      return state.map(quote =>
        quote.id !== id ? quote : changeQuote)
    }

    case 'INIT_QUOTES':
      return action.data

    default: return state
  }
}

export const voteUp = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  }
}

export const createQuote = (quote) => {
  return {
    type: 'NEW_QUOTE',
    data: quote
  }
}

export const initializeQuotes = (quotes) => {
  return {
    type: 'INIT_QUOTES',
    data: quotes,
  }
}
export default reducer