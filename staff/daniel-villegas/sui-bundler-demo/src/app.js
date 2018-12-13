import React from 'react'
import ReactDOM from 'react-dom'
import Domain from '../../domain-demo/src'
// import App from './components/App'
import Router from 'react-router/lib/Router'
import {browserHistory} from 'react-router'
import routes from './routes'
import './index.scss'
// import(/* webpackChunkName: "my-chunk-name" */ './foo').then(
//   ({default: foo}) => {
//     console.log('loaded async chunk') //eslint-disable-line
//     foo()
//   }
// )
import {register} from '@s-ui/bundler/registerServiceWorker'

const domain = new Domain()

domain
  .get('list_students_use_case')
  .execute()
  .then(console.log) //eslint-disable-line

register({
  first: () => window.alert('Content is cached for offline use.'),
  renovate: () => window.alert('New content is available; please refresh.')
})()

// console.log('yep') //eslint-disable-line
// debugger //eslint-disable-line

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('⚛️')
)
