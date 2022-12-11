const { useState, useEffect } = require("react");

//This custom hook can be used in other projects.

const getLocalValue = (key, initValue) => {
  //SSR check (Next.js for example)
  if (typeof window === "undefined") return initValue

  const localValue = JSON.parse(localStorage.getItem(key))
  if (localValue) return localValue

  if (initValue instanceof Function) return initValue()

  return initValue
} 

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => getLocalValue(key, initValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage