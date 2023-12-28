interface TextInputParameters {
  labelText: string
  placeholderText: string
  input: string
  setInput: (text: string) => void
}

const TextInput: React.FC<TextInputParameters> = ({ labelText, placeholderText, input, setInput }) => {
  return (
    <div className="mb-4">
      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
        {labelText}
      </label>
      <input
        type="text"
        className="mt-1 p-3 w-full rounded-md border focus:outline-none focus:border-teal-300"
        placeholder={placeholderText}
        value={input}
        onChange={e => setInput(e.target.value)}
      />
    </div>
  )
}

export default TextInput