import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import PageContainer from "@/components/pageContainer"
import DatePicker from "@/components/dateInput"
import TextInput from '@/components/textInput'

export interface FormData {
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
            <TextInput
              name="namaLengkap"
              labelText="Nama Lengkap"
              methods={methods}
              validationRule={{ required: "Nama lengkap is required" }}
            />
            <TextInput
              name="noHP"
              labelText="Nomor HP"
              methods={methods}
              validationRule={{
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid 10-digit phone number.",
                }
              }}
            />
            <TextInput
              name="lineID"
              labelText="Line ID"
              methods={methods}
              validationRule={{ required: "Line ID is required" }}
            />
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
