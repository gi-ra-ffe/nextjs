import { Button } from "@/app/ui/button"
import { register } from "module"
import Link from "next/link"
// import 
export default function Home(){
  return(
    <main>
      <p className="mb-[40px]">面接日程調整アプリです</p>
      <div className="flex">
        <Button><Link href={'./register'}>登録する</Link></Button>
        <Button className="ml-[8px]"><Link href={'./login'}>ログインする</Link></Button>
      </div>
    </main>
  )
}