import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import "./setup"
import sinon from 'sinon'
import { WrapperComponent } from '../src/core/WrapperComponent'

describe('<WrapperComponent />', () => {
  let sandbox = null

  beforeEach(function () {
    sandbox = sinon.createSandbox()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render component', () => {
    const props = { children: '_children_' }
    const wrapper = shallow(<WrapperComponent {...props} />)
    expect(wrapper.find('StyledPageWrapper')).to.have.length(1)
    expect(wrapper.find('StyledContent')).to.have.length(1)
    expect(wrapper.find('StyledContent')).to.have.length(1)
    expect(wrapper.find('StyledContent').prop('children')).to.equal('_children_')
  })
})