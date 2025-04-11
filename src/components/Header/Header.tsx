import { Link, useParams } from "react-router-dom"
import TextDistortion from "../TextDistortion/TextDistortion"
import { HeaderNav } from "../Navigation/Navigation"
import { ArrowLeft } from "lucide-react"

export default function Header() {
    const params = useParams()

    return (
        <>
            <header>
                {params.id ? (
                    <Link
                        to="/work"
                        className="fixed top-8 left-8 z-30 flex items-center text-sm font-mono hover:text-gray-400 text-white"
                        data-cursor-hover
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        BACK TO WORK
                    </Link>)
                    : (<Link to="/" >
                        <TextDistortion text="YVONNE LU TRINH" className="fixed top-8 left-8 z-30 flex items-center text-sm font-display hover:text-gray-400 transition-colors text-white" />
                    </Link>
                    )}
                <HeaderNav />
            </header>
        </>
    )
}