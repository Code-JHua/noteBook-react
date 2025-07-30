export function formateDate(date) {  // date 是时间戳字符串
  const dateObj = new Date(Number(date))
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  
  return `${year}-${month}-${day}`
}