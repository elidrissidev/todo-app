import reorderArray from './reorderArray'

describe('reorderArray', () => {
  it('reorders an item', () => {
    const todos = [
      'Complete Todo app challenge',
      'Pick up groceries',
      'Meditate',
      'Read for 1 hour',
    ]

    expect(reorderArray<string>(todos, 3, 1)).toEqual([
      'Complete Todo app challenge',
      'Read for 1 hour',
      'Pick up groceries',
      'Meditate',
    ])

    expect(reorderArray<string>(todos, 0, 2)).toEqual([
      'Pick up groceries',
      'Meditate',
      'Complete Todo app challenge',
      'Read for 1 hour',
    ])
  })
})
