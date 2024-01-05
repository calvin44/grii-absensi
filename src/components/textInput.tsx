import { FormData } from '@/pages/addJemaatBaru'
import { RegisterOptions, UseFormReturn } from 'react-hook-form'

interface TextInputProps {
  name: keyof FormData
  labelText: string
  methods: UseFormReturn<FormData>,
  validationRule?: RegisterOptions<FormData, keyof FormData>
  defaultValue?: string
}

const TextInput: React.FC<TextInputProps> = ({ methods, labelText, name, validationRule, defaultValue = "" }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {labelText}
      </label>
      <input
        type="text"
        className="mt-1 p-3 w-full rounded-md border focus:outline-none focus:border-teal-300"
        defaultValue={defaultValue}
        placeholder={labelText}
        {...methods.register(name, validationRule)}
        onBlur={() => methods.trigger(name)}
      />
      {methods.formState.errors?.[name] && <p className="text-red-500 text-sm mt-1">{methods.formState.errors?.[name]?.message}</p>}
    </div>
  )
}

export default TextInput