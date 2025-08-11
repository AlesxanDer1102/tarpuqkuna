"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FaLeaf } from "react-icons/fa"
import Link from "next/link"

export default function Header() {
    return (
        <nav
            className="px-8 py-4.5 border-b-[1px] border-green-200 flex flex-row justify-between items-center xl:min-h-[77px] bg-gradient-to-r from-green-50 to-white"
        >
            <div className="flex items-center gap-2.5 md:gap-6">
                <Link href="/" className="flex items-center gap-1 text-green-800">
                    <FaLeaf className="h-8 w-8 text-green-600" />
                    <h1 className="font-bold text-2xl hidden md:block text-green-800">TARPUQKUNA</h1>
                </Link>
            </div>
            <h3 className="italic text-left hidden text-green-600 lg:block font-medium">
                Trazabilidad transparente de productos agrícolas
            </h3>
            <div className="flex items-center gap-4">
                <ConnectButton />
            </div>
        </nav>
    )
}
