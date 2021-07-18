import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Cookies from 'universal-cookie'
import Button from '../core/Button'
import InputField from '../core/InputField'
import { postUsers } from '../api/users'
import NotificationService from '../core/NotificationService'
import WrapperComponent from '../core/WrapperComponent'

export class ChangePassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }
    this.handlePassword = this.handlePassword.bind(this)
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const cookies = new Cookies()
    this.setState({ email: cookies.get('email') })
  }

  handlePassword (e) {
    this.setState({ password: e.target.value })
  }

  handleConfirmPassword (e) {
    this.setState({ confirmPassword: e.target.value })
  }

  handleSubmit () {
    const { t, history, match: { params } } = this.props
    const { language } = params
    const { email, password } = this.state
    postUsers({ password }, email)
      .then(() => {
        history.push(`/${language}/success-changed`)
      })
      .catch(() => { NotificationService.pushErrorNotification(t('password-not-changed')) })
  }

  render () {
    const { t } = this.props
    const { password, confirmPassword } = this.state
    return (
      <WrapperComponent className='text-center'>
        <p className='h6 font-weight-bold pt-5'>{t('forgot-password-title')}</p>
        <p className='pt-5'>{t('change-password')}</p>
        <InputField onChange={this.handlePassword} type='password' id='password' className='form-control mt-5'>{t('new-password')}</InputField>
        <InputField onChange={this.handleConfirmPassword} type='password' id='confirm-password' className='form-control mt-5'>{t('confirm-password')}</InputField>
        <Button
          disabled={!(password === confirmPassword && password.length > 3 && confirmPassword.length > 3) }
          onClick={this.handleSubmit} className='btn primary mt-5'>
          {t('confirm-password')}
        </Button>
      </WrapperComponent>
    )
  }
}

export default withRouter(withTranslation()(ChangePassword), ChangePassword)
