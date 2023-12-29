import { ReactNode } from 'react'

interface ContainerProps {
  children?: ReactNode
  additionalStyle?: string
}

const PageContainer: React.FC<ContainerProps> = ({ children, additionalStyle }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center  sm:bg-white md:bg-gray-100 lg:bg-gray-100 ${additionalStyle}`} >
      {children}
    </div >
  )
}

export default PageContainer