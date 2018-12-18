import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import MoviesPopular from '../../components/MoviesPopular'

const MoviesPopularPage = ({movies, canonical}, {i18n}) => (
  <React.Fragment>
    <Helmet>
      <link rel="canonical" href={canonical} />
    </Helmet>
    <h1>{i18n.t('LIST_TITLE')}</h1>
    <MoviesPopular movies={movies} />
  </React.Fragment>
)

MoviesPopularPage.propTypes = {
  movies: PropTypes.array,
  canonical: PropTypes.string
}
MoviesPopularPage.contextTypes = {i18n: PropTypes.object}
MoviesPopularPage.renderLoading = () => <h1>Loading...</h1>
MoviesPopularPage.getInitialProps = async ({context}) => {
  const {domain} = context
  const movies = await domain.get('get_popular_movies_use_case').execute()

  return {
    movies: movies || [],
    canonical: 'http:/spa.mock/list'
  }
}

export default MoviesPopularPage
