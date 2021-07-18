import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import styled from 'styled-components'
import Logo from '../assets/images/keleya-logo.png'
import { FiX } from 'react-icons/fi'

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  display: table;
`
StyledContent.displayName = 'StyledContent'

const StyledMessage = styled.div`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`
StyledMessage.displayName = 'StyledMessage'

const StyledIcon = styled(FiX)`
  font-size: 50px;
  position: absolute;
  right: 30px;
  top: 10px;
`
StyledIcon.displayName = 'StyledIcon'

export class EmailSent extends React.Component {
  constructor (props) {
    super(props)
    this.goBack = this.goBack.bind(this)
  }

  goBack () {
    const { history } = this.props
    history.goBack()
  }

  render () {
    const { t } = this.props
    return (
      <StyledContent className='text-center'>
        <StyledIcon type='button' onClick={this.goBack}/>
        <StyledMessage>
          <img src={Logo} alt="keleya" width="150" height="200" />
          <p className='h6 font-weight-bold pt-5'>{t('email-sent-title')}</p>
          <p className='pt-1'>{t('email-sent-copy')}</p>
        </StyledMessage>
      </StyledContent>
    )
  }
}

export default withRouter(withTranslation()(EmailSent), EmailSent)
