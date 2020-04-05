// const fmt = function (time, fmt) {
//   fmt = fmt || 'yyyy-MM-dd hh:mm'
//   let date = new Date(time)
//
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(
//       RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)
//     )
//   }
//
//   let dt = {
//     'M+': date.getMonth() + 1,
//     'd+': date.getDate(),
//     'h+': date.getHours(),
//     'm+': date.getMinutes(),
//     's+': date.getSeconds()
//   }
//
//   for (let key in dt) {
//     if (new RegExp(`(${key})`).test(fmt)) {
//       let str = dt[key] + ''
//       fmt = fmt.replace(RegExp.$1,
//         (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length)
//       )
//     }
//   }
//
//   return fmt
// }

// export default{
//   fmt
// }

export default (time, fmt) => {
  fmt = fmt || 'yyyy-MM-dd hh:mm'
  const date = new Date(time)

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }

  const dt = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (const key in dt) {
    if (new RegExp(`(${key})`).test(fmt)) {
      const str = dt[key] + ''
      fmt = fmt.replace(RegExp.$1,
        (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length)
      )
    }
  }

  return fmt
}
