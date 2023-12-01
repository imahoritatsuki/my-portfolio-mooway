import type { Metadata } from 'next'
import { Inter, Zen_Maru_Gothic } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const Zen_Maru_400 = Zen_Maru_Gothic({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'MOOWAY!',
  description: 'my portfolio MOOWAY!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={Zen_Maru_400.className}>{children}</body>
    </html>
  )
}
