import classNames from './classNames'

describe('classNames', () => {
  it('concatenates given classes into one string', () => {
    expect(classNames('TodoItem', 'TodoItem--complete')).toBe(
      'TodoItem TodoItem--complete'
    )
  })

  it('removes empty classes', () => {
    expect(classNames('', 'TodoItem', undefined)).toBe('TodoItem')
  })
})
