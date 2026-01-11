import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContentSection } from '@/components/sections/ContentSection';
import { CTASection } from '@/components/sections/CTASection';
import { ComparisonSection } from '@/components/sections/ComparisonSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { StudentProjectsSection } from '@/components/sections/StudentProjectsSection';
import { CurriculumSection } from '@/components/sections/CurriculumSection';
import { api } from '@/lib/api';

// Map section types to components
const SECTION_COMPONENTS: Record<string, any> = {
    hero: HeroSection,
    stats: StatsSection,
    features: BenefitsSection, // Mapped to Benefits
    benefits: BenefitsSection,
    testimonials: TestimonialsSection,
    content: ContentSection,
    cta: CTASection,
    comparison: ComparisonSection,
    process: ProcessSection,
    studentProjects: StudentProjectsSection,
    curriculum: CurriculumSection,
};

async function getLandingPage(slug: string) {
    try {
        // In a real implementation, use the API client to fetch data
        // const page = await api.get(`/landing-pages/${slug}`);
        // return page;

        // For now, fetch from the new API endpoint we just created
        // We can't use the 'api' helper if it's client-side only or requires auth headers we don't have yet SS/
        // So we fetch directly from absolute URL or use a server-side helper

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/landing-pages/${slug}`, {
            next: { revalidate: 60 } // Revalidate every minute
        });

        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error('Failed to fetch landing page:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const page = await getLandingPage(params.slug);
    if (!page) return {};

    return {
        title: page.title,
        description: page.description || `Chi tiết về ${page.title}`,
    };
}

export default async function DynamicLandingPage({ params }: { params: { slug: string } }) {
    const page = await getLandingPage(params.slug);

    if (!page) {
        notFound();
    }

    // Parse sections if it's a string (API might return object or string depending on implementation)
    const sections = typeof page.sections === 'string' ? JSON.parse(page.sections) : page.sections;

    if (!sections || !Array.isArray(sections)) {
        return <div className="py-20 text-center">Trang chưa có nội dung.</div>;
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            {sections.map((section: any, index: number) => {
                const Component = SECTION_COMPONENTS[section.type];
                if (!Component) {
                    console.warn(`Unknown section type: ${section.type}`);
                    return null;
                }
                return <Component key={section.id || index} section={section} />;
            })}
        </main>
    );
}
