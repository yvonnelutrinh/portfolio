export default function Window({ title, children }) {
    return (
        <div className="bg-black/80 border rounded p-4 overflow-visible w-full">
            <div className="flex items-center gap-2 mb-4 border-b border-brutalist/10 pb-2">
                <div className="h-3 w-3 rounded-full bg-red-500 opacity-70"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500 opacity-70"></div>
                <div className="h-3 w-3 rounded-full bg-green-500 opacity-70"></div>
                <div className="font-mono text-xs text-brutalist/50 ml-2">{title}</div></div>
            <div className="overflow-visible">
                {children}
            </div>
        </div>
    )
}