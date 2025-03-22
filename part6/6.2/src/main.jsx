import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const actionTypes = {
    good : 'GOOD',
    ok : 'OK',
    bad : 'BAD',
    reset : 'ZERO'
  }
  const dispatchAction = (actionType) => {
    store.dispatch({
      type: actionType
    })
  }

  return (
    <div>
      <button onClick={() => dispatchAction(actionTypes.good)}>good</button> 
      <button onClick={() => dispatchAction(actionTypes.ok)}>ok</button> 
      <button onClick={() => dispatchAction(actionTypes.bad)}>bad</button>
      <button onClick={() => dispatchAction(actionTypes.reset)}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
