import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"

// SHA-256 hash of the site password — the plaintext never ships in the bundle.
// Generate a new hash with:
//   node -e "crypto.subtle.digest('SHA-256', new TextEncoder().encode('your-password')).then(b => console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))"
// Override at build time with VITE_SITE_PASSWORD_HASH.
const PASSWORD_HASH =
    import.meta.env.VITE_SITE_PASSWORD_HASH ||
    "d7af17b1fbb6969d29147b27685f1340437dc5e3daf4c3268e855c7384247fc5"

const STORAGE_KEY = "site-unlocked"

async function hashPassword(value: string): Promise<string> {
    const data = new TextEncoder().encode(value)
    const digest = await crypto.subtle.digest("SHA-256", data)
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
    const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(STORAGE_KEY) === "true")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [checking, setChecking] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!unlocked) inputRef.current?.focus()
    }, [unlocked])

    if (unlocked) return <>{children}</>

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!password) {
            setError("Please enter a password.")
            return
        }
        setChecking(true)
        const hash = await hashPassword(password)
        setChecking(false)
        if (hash === PASSWORD_HASH) {
            sessionStorage.setItem(STORAGE_KEY, "true")
            setUnlocked(true)
        } else {
            setError("Incorrect password. Please try again.")
            setPassword("")
            inputRef.current?.focus()
        }
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <motion.main
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="font-display text-4xl md:text-6xl mb-4">YVONNE LU TRINH</h1>
                <p className="font-mono text-sm text-gray-300 mb-8">
                    This portfolio is password protected. Enter the password to continue, or{" "}
                    <a
                        href="mailto:yvonnelutrinh@gmail.com"
                        className="text-white underline hover:text-gray-400 transition-colors"
                    >
                        email me
                    </a>{" "}
                    to request access.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                    <label htmlFor="site-password" className="block font-mono text-sm mb-2">
                        PASSWORD
                    </label>
                    <input
                        ref={inputRef}
                        id="site-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError("")
                        }}
                        aria-describedby={error ? "password-error" : undefined}
                        aria-invalid={error ? true : undefined}
                        className="w-full bg-transparent border border-gray-600 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 px-4 py-3 font-mono text-white mb-4"
                    />
                    {error && (
                        <p id="password-error" role="alert" className="font-mono text-sm text-red-400 mb-4">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={checking}
                        className="w-full border border-white px-4 py-3 font-mono text-sm tracking-wider hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black transition-colors disabled:opacity-50"
                        data-cursor-hover
                    >
                        {checking ? "CHECKING…" : "ENTER →"}
                    </button>
                </form>
            </motion.main>
        </div>
    )
}
