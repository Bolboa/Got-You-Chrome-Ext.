import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'

import Layout from "./components/layout";
import Login from "./components/login";

require('./styles.css');

const store = createStore(allReducers);

const app = document.getElementById('app');
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/src/index.html' component={ Layout } />
			<Route path='/src/index.html/login' component={ Login } />
		</Router>
	</Provider>
	, app);