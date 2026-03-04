import { CustomPixelHeader } from '@/components/CustomPixelHeader'
import { ContactInfo } from '@/components/ContactInfo'

export default function Contact() {
  return (
    <main className="min-h-screen px-4 lg:px-6">
      <div className="mr-auto max-w-7xl">
        <CustomPixelHeader>contact</CustomPixelHeader>
        <ContactInfo />
      </div>
    </main>
  )
}
