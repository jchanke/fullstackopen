import { useState } from "react"

export const useField = (type) => {
  const [value, setValue] = useState(null)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetTo = (value) => {
    setValue(value)
  }

  return { type, value, onChange, resetTo }
}