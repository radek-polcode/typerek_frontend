export const listPosition = {
  count
}

function count(index, page, perPage) {
  if (page <= 1) {
    return index + 1
  }
  else {
    return index + (perPage * (page - 1)) + 1
  }
}