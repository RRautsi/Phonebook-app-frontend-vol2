import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initValue) => {
  const [value, setValue] = useLocalStorage(key, initValue)

  const toggle = (value) => {
    setValue(prevState => {
      return typeof value === "boolean" ? value : !prevState
    })
  }

  return [value, toggle]
}

export default useToggle