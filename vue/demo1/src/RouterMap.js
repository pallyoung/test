import A from './components/A'
import B from './components/B'
import Index from './components/Index'
import More from './components/More'
import Show from './components/Show'
import About from './components/About'
export default {
  '/a': {
    component: A,
    subRoutes: {
      '/index': {
        component: Index
      },
      '/more': {
        component: More
      },
      '/about': {
        component: About
      }
    }
  },
  '/b': {
    component: B,
    subRoutes: {
      '/show': {
        component: Show
      }
    }
  }
}

