import { render, screen } from '~/utils/test-utils'
import { Markdown } from './Markdown'

describe('test markdown', () => {
  it('should render markdown', () => {
    render(<Markdown />)
  })
})
