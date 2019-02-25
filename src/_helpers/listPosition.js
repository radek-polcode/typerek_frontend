export const listPosition = {
  count
}

function count(index, page) {
  if (page <= 1) {
    return index + 1
  }
  else {
    return index + (20 * (page - 1)) + 1
  }
}