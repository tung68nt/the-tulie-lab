
import { Section } from '@/types/sections';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const CTASection = ({ section }: { section: Section }) => {
    return (
        <section className="py-12 md:py-16 bg-foreground text-background relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
            </div>

            <div className="container text-center max-w-3xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    {section.title}
                </h2>
                <p className="text-lg md:text-xl text-background/80 mb-8 max-w-2xl mx-auto">
                    {section.subtitle}
                </p>
                {section.ctaLink && (
                    <Link href={section.ctaLink}>
                        <Button
                            variant="light"
                            size="lg"
                            className="text-lg px-8 py-6 font-semibold"
                        >
                            {section.ctaText || 'Bắt đầu ngay'}
                        </Button>
                    </Link>
                )}
            </div>
        </section>
    );
};
