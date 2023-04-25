import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers';

const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),
  store,
  history,
});

export default renderWithRouterAndRedux;
