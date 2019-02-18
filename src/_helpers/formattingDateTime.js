import moment from 'moment'

export const formattingDateTime = {
  formatDate,
  toIsoFormat
}

function formatDate(date) {
  return moment(date).format("DD-MM-YYYY")
}

function toIsoFormat(date) {
  return moment(date).toISOString();
}