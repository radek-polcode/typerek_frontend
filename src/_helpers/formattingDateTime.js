import moment from 'moment'

export const formattingDateTime = {
  formatDate,
  toIsoFormat
}

function formatDate(date) {
  return moment(date).format("DD-MM-YYYY")
}

function toIsoFormat(date) {
  const isoDate = moment(date).toISOString(true)
  return moment(isoDate).format("YYYY-MM-DDT00:00:00.000");
}