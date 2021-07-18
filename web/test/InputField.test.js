import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import "./setup"
import sinon from 'sinon'
import { InputField } from '../src/core/InputField'

describe('<InputField />', () => {
  let sandbox = null
  const t = t => t

  beforeEach(function () {
    sandbox = sinon.createSandbox()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render component', () => {
    const props = { t, type: 'text', className: 'foo', onChange: sandbox.spy(), id: 'id' }
    const wrapper = shallow(<InputField {...props} />)
    expect(wrapper.find('StyledInputField').prop('type')).to.equal('text')
    expect(wrapper.find('StyledInputField').prop('className')).to.equal('foo')
    expect(wrapper.find('StyledInputField').prop('id')).to.equal('id')
    expect(wrapper.find('StyledInputField').prop('onChange'))
      .to.deep.equal(props.onChange)
  })
})