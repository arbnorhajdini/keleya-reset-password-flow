import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import "./setup"
import sinon from 'sinon'
import { ForgotPassword } from '../src/view/ForgotPassword'
import * as fetchUsers from '../src/api/users'
import * as fetchMail from '../src/api/mail'
import NotificationService from '../src/core/NotificationService'

describe('<ChangePassword />', () => {
  const t = t => t
  let sandbox = null

  beforeEach(function () {
    sandbox = sinon.createSandbox()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render component', () => {
    const props = { t }
    const wrapper = shallow(<ForgotPassword {...props} />)
    expect(wrapper.find('Button').prop('disabled')).to.equal(true)
    expect(wrapper.find('p.h6').text()).to.equal('forgot-password-title')
    expect(wrapper.find('p').at(1).text()).to.equal('forgot-password-copy')
  })

  it('should enable/disable button when email is availabe', () => {
    const props = { t }
    const wrapper = shallow(<ForgotPassword {...props} />)
    expect(wrapper.find('Button').prop('disabled')).to.equal(true)
    wrapper.instance().handleEmail({ target: { value: 'email@keleya.de' } })
    expect(wrapper.state().email).to.equal('email@keleya.de')
    expect(wrapper.find('Button').prop('disabled')).to.equal(false)
    expect(wrapper.find('Button').prop('onClick')).to.deep.equal(wrapper.instance().handleSubmit)
  })

  it('should handle error when submiting email', (done) => {
    const props = {
      t,
      match: {
        params: {
          language: sinon.spy()
        }
      }
    }
    const wrapper = shallow(<ForgotPassword {...props} />)
    const notificationStub = sandbox.stub(NotificationService, 'pushErrorNotification')
    sandbox.stub(fetchUsers, 'fetchUsers').returns(Promise.reject())
    expect(wrapper.find('Button').prop('disabled')).to.equal(true)
    wrapper.instance().handleEmail({ target: { value: 'email@keleya.de' } })
    expect(wrapper.state().email).to.equal('email@keleya.de')
    wrapper.find('Button').simulate('click')
    setTimeout(() => {
      expect(notificationStub.calledOnce).to.equal(true)
      expect(notificationStub.getCall(0).args[0]).to.equal('email-not-found')
      done()
    })
  })

  it('should handle success when submiting email', (done) => {
    const props = {
      t,
      history: { push: sandbox.spy() },
      match: {
        params: {
          language: sinon.spy()
        }
      }
    }
    const wrapper = shallow(<ForgotPassword {...props} />)
    sandbox.stub(fetchUsers, 'fetchUsers').returns(Promise.resolve({ email: 'email@keleya.de' }))
    sandbox.stub(fetchMail, 'fetchMail').returns(Promise.resolve({}))
    expect(wrapper.find('Button').prop('disabled')).to.equal(true)
    wrapper.instance().handleMessage = sandbox.spy()
    wrapper.instance().handleCookie = sandbox.spy()
    wrapper.instance().handleEmail({ target: { value: 'email@keleya.de' } })
    expect(wrapper.state().email).to.equal('email@keleya.de')
    wrapper.find('Button').simulate('click')
    setTimeout(() => {
      expect(wrapper.instance().handleMessage.calledOnce).to.equal(true)
      expect(wrapper.instance().handleCookie.calledOnce).to.equal(true)
      expect(props.history.push.calledOnce).to.equal(true)
      expect(props.history.push.getCall(0).args[0]).to.equal('/spy/email-sent')
      done()
    })
  })

  it('should handle catch in handleEmail', done => {
    const props = {
      t,
      history: { push: sandbox.spy() },
      match: {
        params: {
          language: sinon.spy()
        }
      }
    }
    const wrapper = shallow(<ForgotPassword {...props} />)
    sandbox.stub(fetchUsers, 'fetchUsers').returns(Promise.resolve({ email: 'email@keleya.de' }))
    sandbox.stub(fetchMail, 'fetchMail').returns(Promise.reject({}))
    const notificationStub = sandbox.stub(NotificationService, 'pushErrorNotification')
    wrapper.instance().handleMessage()
    setTimeout(() => {
      expect(notificationStub.calledOnce).to.equal(true)
      done()
    })
  })

  it('should handle handleEmail', done => {
    const props = {
      t,
      history: { push: sandbox.spy() },
      match: {
        params: {
          language: sinon.spy()
        }
      }
    }
    window.open = sandbox.spy()
    const wrapper = shallow(<ForgotPassword {...props} />)
    sandbox.stub(fetchUsers, 'fetchUsers').returns(Promise.resolve({ email: 'email@keleya.de' }))
    sandbox.stub(fetchMail, 'fetchMail').returns(Promise.resolve({}))
    wrapper.instance().handleMessage()
    setTimeout(() => {
      expect(window.open.calledOnce).to.equal(true)
      done()
    })
  })
})