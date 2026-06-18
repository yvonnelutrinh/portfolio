import { createContext, useCallback, useContext, useState } from "react"

// Shared unlock state for the gated design-portfolio section. Persisted to
// sessionStorage so it survives navigation within a session but resets when
// the tab closes. Consumed by both the Work list (to hide gated projects) and
// the project pages (to gate their content).
const STORAGE_KEY = "design-portfolio-unlocked"

interface DesignGateValue {
    unlocked: boolean
    unlock: () => void
}

const DesignGateContext = createContext<DesignGateValue>({
    unlocked: false,
    unlock: () => {},
})

export function DesignGateProvider({ children }: { children: React.ReactNode }) {
    const [unlocked, setUnlocked] = useState(
        () => sessionStorage.getItem(STORAGE_KEY) === "true"
    )

    const unlock = useCallback(() => {
        sessionStorage.setItem(STORAGE_KEY, "true")
        setUnlocked(true)
    }, [])

    return (
        <DesignGateContext.Provider value={{ unlocked, unlock }}>
            {children}
        </DesignGateContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDesignGate() {
    return useContext(DesignGateContext)
}
