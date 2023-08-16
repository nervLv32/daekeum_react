const CheckValidate = obj => {
  let flag = false

  console.log(obj)

  Object.entries(obj).forEach(([key, value]) => {
    if(value) flag = true
  })

  return flag
}

export default CheckValidate
