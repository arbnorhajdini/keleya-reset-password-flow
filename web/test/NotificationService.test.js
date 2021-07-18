import { expect } from 'chai'
import "./setup"
import sinon from 'sinon'
import { NotificationService } from '../src/core/NotificationService'

describe('<NotificationService />', () => {
  let sandbox = null

  beforeEach(function () {
    sandbox = sinon.createSandbox()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render component', () => {
    expect(NotificationService.pushErrorNotification).to.have.length(1)
    expect(NotificationService.pushInfoNotification).to.have.length(1)
    expect(NotificationService.pushWarningNotification).to.have.length(1)
    expect(NotificationService.pushSuccessNotification).to.have.length(1)
  })
})