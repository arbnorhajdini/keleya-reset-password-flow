import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import "./setup"
import sinon from 'sinon'
import { Button } from '../src/core/Button'

describe('<Button />', () => {
  let sandbox = null
  const t = t => t

  beforeEach(function () {
    sandbox = sinon.createSandbox()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render component', () => {
    const props = { t, disabled: false, className: 'foo', onClick: sandbox.spy() }
    const wrapper = shallow(<Button {...props} />)
    expect(wrapper.find('StyledButton').prop('disabled')).to.equal(false)
    expect(wrapper.find('StyledButton').prop('className')).to.equal('foo')
    expect(wrapper.find('StyledButton').prop('onClick')).to.deep.equal(props.onClick)
  })
})