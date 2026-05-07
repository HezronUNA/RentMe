import AdminCTAFinal from '@/components/admin/CTAFinal'
import AdminHero from '@/components/admin/Hero'
import Plan1 from '@/components/admin/Plan1'
import Plan2 from '@/components/admin/Plan2'
import Plan3 from '@/components/admin/Plan3'

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f6f7f6] to-white">
      <AdminHero />
      <Plan1 />
      <Plan2 />
      <Plan3 />
      <AdminCTAFinal />
    </main>
  )
}
