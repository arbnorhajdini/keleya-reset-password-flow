import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import WrapperComponent from '../core/WrapperComponent'
import Logo from '../assets/images/keleya-logo.png'

export class SuccessChanged extends React.Component {
  render () {
    const { t } = this.props
    return (
      <WrapperComponent className='text-center'>
        <p className='h5 font-weight-bold pt-5'>{t('success')}</p>
        <p className='pt-3'>{t('changed-password-success')}</p>
        <img width="100" height="140" className='mt-3 mb-5' src={Logo} alt="keleya" />
      </WrapperComponent>
    )
  }
}

export default withRouter(withTranslation()(SuccessChanged), SuccessChanged)
