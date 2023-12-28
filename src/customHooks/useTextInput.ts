import { useCallback, useState } from 'react'

export const useTextInput = () => {
  const [input, setInput] = useState<string>("")
  const setTextInput = useCallback((text: string) => {
    setInput(text)
  }, [])
  return {
    input,
    setTextInput
  }
}

export default useTextInput