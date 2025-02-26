import { AuthProvider } from '@/context/AuthContext'
import Main from "@/app/ui/Main"
// import 
export default function Home() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  )
}