export default function (num) {
  if (!num) return null
  return parseFloat(num.replace(/,/g, ''))
}
