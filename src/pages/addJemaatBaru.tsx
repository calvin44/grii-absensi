import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import PageContainer from "@/components/pageContainer"
import DatePicker from "@/components/dateInput"
import TextInput from '@/components/textInput'

interface FormData {
  tanggalDatang: string
  namaLengkap: string
  noHP: string
  lineID: string
}

const AddJemaatBaru: React.FC = () => {
  const methods = useForm<FormData>()
  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <PageContainer>
        <div className="bg-white p-8 rounded-lg md:shadow-lg w-full sm:w-96">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Add Jemaat Baru</h2>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <DatePicker name="tanggalDatang" title="Tanggal datang gereja" placeholderText="Pilih tanggal datang gereja" />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="mt-1 p-3 w-full rounded-md border focus:outline-none focus:border-teal-300"
                placeholder="Nama Lengkap"
                {...methods.register("namaLengkap", { required: "Nama Lengkap is required" })}
                onBlur={() => methods.trigger("namaLengkap")}
              />
              {methods.formState.errors?.namaLengkap && <p className="text-red-500 text-sm mt-1">{methods.formState.errors?.namaLengkap?.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                No HP
              </label>
              <input
                type="text"
                className="mt-1 p-3 w-full rounded-md border focus:outline-none focus:border-teal-300"
                placeholder="No HP"
                {...methods.register("noHP", {
                  required: "No HP is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please enter a valid 10-digit phone number.",
                  }
                })}
                onBlur={() => methods.trigger("noHP")}
              />
              {methods.formState.errors?.noHP && <p className="text-red-500 text-sm mt-1">{methods.formState.errors?.noHP?.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-3 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300"
            >
              Add Record
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">© Copyright ProjectGajelas.com.</p>
          </div>
        </div>
      </PageContainer>
    </FormProvider>
  )
}

export default AddJemaatBaru
