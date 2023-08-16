const CheckValidate = obj => {
  let flag = true

  console.log(obj)

  Object.entries(obj).forEach(([key, value]) => {
    if(!value) flag = false
  })

  return flag
}

export default CheckValidate
