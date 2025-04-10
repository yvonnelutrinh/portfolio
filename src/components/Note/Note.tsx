export default function Notes() {

    return (
        < section className="relative px-4 py-12 border border-brutalist/20 mb-16" >
            <div>
                <div className="absolute -top-3 left-4 bg-background px-2 font-mono text-xs text-brutalist/50">
                    HANDWRITTEN NOTES
                </div>

                <div className="max-w-3xl mx-auto relative">
                    {/* annotation lines */}
                    <div className="absolute -left-8 top-1/3 w-16 border-t border-neon/30"></div>
                    <div className="absolute -right-8 top-2/3 w-16 border-t border-neon/30"></div>

                    <div className="font-mono text-sm italic text-brutalist/80 mb-8 leading-relaxed">
                        Remember that the most interesting design happens at the intersection of opposing forces. Don't resolve the tension—exploit it. Let the opposing qualities fight each other in a productive way.
                    </div>

                    <div className="font-mono text-sm italic text-brutalist/80 leading-relaxed">
                        When in doubt, remove rather than add. Negative space speaks just as loudly as the content. Trust the viewer to engage with the work if given the right amount of tension to resolve themselves.
                    </div>
                </div>
            </div>
        </section >)
}