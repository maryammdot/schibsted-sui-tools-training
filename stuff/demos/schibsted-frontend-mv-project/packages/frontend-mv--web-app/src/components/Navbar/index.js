/* eslint-disable */
import React, {Component} from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import {LanguageContainer} from '../../state'

import {
  NavbarItem,
  NavbarBrand,
  Navbar,
  Icon,
  NavbarMenu,
  NavbarEnd,
  NavbarDivider
} from 'bloomer'

import AtomButton from '@schibstedspain/sui-atom-button'

import Link from 'react-router/lib/Link'

const BASE_CLASS = `MoviesApp`
const CLASS_TOOLBAR = `${BASE_CLASS}-toolbar`
const CLASS_TOOLBAR_LANGUAGES = `${CLASS_TOOLBAR}-languages`

class NavbarApp extends Component {
  constructor() {
    super()
    this.changeLanguageES = this.changeLanguage.bind(null, {locale: 'es'})
    this.changeLanguageEN = this.changeLanguage.bind(null, {locale: 'en'})
    this.language = new LanguageContainer()
  }

  changeLanguage = ({locale}) => {
    const {i18n, domain, router} = this.context
    let {
      location: {pathname: currentPath}
    } = router

    const localeConfig = domain.get('config').get('locale')
    const {language: lang} = localeConfig[locale]

    console.log(`changing language to ${lang}`) // eslint-disable-line
    if (currentPath[0] !== '/') currentPath = '/' + currentPath
    const hasLocale = /^\/(es|en)/.test(currentPath)
    const pathRedirect = hasLocale
    ? currentPath.replace(/^\/(es|en)/, `/${locale}`)
    : `/${locale}${currentPath}`
    
    i18n.setCulture(lang)
    this.language.changeLanguage({lang})
    router.push(pathRedirect)
  }

  loginWithGoogle = async () => {
    const {domain, router} = this.context
    const {
      location: {pathname: currentPath}
    } = router
    await domain.get('login_with_google_use_case').execute()
    router.push(currentPath)
  }

  logout = async () => {
    const {domain, router} = this.context
    const {
      location: {pathname: currentPath}
    } = router
    await domain.get('logout_use_case').execute()
    router.push(currentPath)
  }

  render() {
    const {i18n} = this.context
    const {user} = this.props
    const {changeLanguageES, changeLanguageEN, loginWithGoogle, logout} = this
    return (
      <div className="Navbar">
        <Navbar
          style={{
            border: 'solid 1px #00D1B2',
            margin: '0',
            width: '100%'
          }}
        >
          <NavbarBrand>
            <NavbarItem>
              <Link to="/">{i18n.t('HOME')}</Link>
              <Icon isSize="medium" className="mdi mdi-home mdi-24px" />
            </NavbarItem>
            <NavbarItem isHidden="desktop">
              <Icon className="fa fa-github" />
            </NavbarItem>
            <NavbarItem isHidden="desktop">
              <Icon className="fa fa-twitter" style={{color: '#55acee'}} />
            </NavbarItem>
          </NavbarBrand>
          <NavbarMenu>
            <NavbarEnd>
              <NavbarItem>
                <Link to="/popular">{i18n.t('POPULAR_MOVIES_TITLE')}</Link>
              </NavbarItem>
            </NavbarEnd>
          </NavbarMenu>
          <NavbarDivider />
          <NavbarItem className={CLASS_TOOLBAR_LANGUAGES}>
            <a onClick={changeLanguageEN}>EN</a>
            |
            <a onClick={changeLanguageES}>ES</a>
          </NavbarItem>
          <NavbarDivider />
          <NavbarItem>
            {user ? (
              <AtomButton type="tertiary" onClick={logout}>
                <span>{i18n.t('SIGNOUT')}</span>&nbsp;<strong>
                  ({user.name})
                </strong>
              </AtomButton>
            ) : (
              <button
                className="loginBtn loginBtn--google"
                onClick={loginWithGoogle}
              >
                {i18n.t('LOGIN_WITH_GOOGLE')}
              </button>
            )}
          </NavbarItem>
        </Navbar>
      </div>
    )
  }
}

NavbarApp.propTypes = {children: PropTypes.element, user: PropTypes.object}
NavbarApp.contextTypes = {
  i18n: PropTypes.object,
  router: PropTypes.object,
  domain: PropTypes.object,
  state: PropTypes.object
}

NavbarApp.renderLoading = () => <h1>Loading...</h1>

export default NavbarApp
