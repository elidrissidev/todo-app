function reorder<TList>(
  list: TList[],
  startIndex: number,
  endIndex: number
): TList[] {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default reorder
