import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Cookies from 'universal-cookie'
import Button from '../core/Button'
import InputField from '../core/InputField'
import { fetchUsers } from '../api/users'
import { fetchMail } from '../api/mail'
import NotificationService from '../core/NotificationService'
import WrapperComponent from '../core/WrapperComponent'

export class ForgotPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
    this.handleEmail = this.handleEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
    this.handleCookie = this.handleCookie.bind(this)
  }

  handleEmail (e) {
    this.setState({ email: e.target.value })
  }

  handleSubmit () {
    const { t, history, match: { params } } = this.props
    const { language } = params
    const { email } = this.state
    fetchUsers(email)
      .then((data) => {
        if (data.email === email) {
          this.handleMessage(language)
          this.handleCookie()
          history.push(`/${language}/email-sent`)
        }
      })
      .catch(() => {
        NotificationService.pushErrorNotification(t('email-not-found'))
      })
  }

  handleMessage (language) {
    const { email } = this.state
    fetchMail({ email, language })
      .then((mail) => {
        window.open(mail, '_blank', 'noopener,noreferrer')
      })
      .catch((err) => { NotificationService.pushErrorNotification(err) })
  }

  handleCookie () {
    const { email } = this.state
    const cookies = new Cookies()
    cookies.set('email', email, { path: '/' })
  }

  render () {
    const { t } = this.props
    const { email } = this.state
    return (
      <WrapperComponent>
        <p className='h6 font-weight-bold pt-5'>{t('forgot-password-title')}</p>
        <p className='pt-5'>{t('forgot-password-copy')}</p>
        <InputField onChange={this.handleEmail} type='email' id='email' className='form-control mt-5'>{t('e-mail-address')}</InputField>
        <Button disabled={!email} onClick={this.handleSubmit} className='btn primary mt-5'>{t('send-reset-link')}</Button>
      </WrapperComponent>
    )
  }
}

export default withRouter(withTranslation()(ForgotPassword), ForgotPassword)
