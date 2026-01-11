import { Section } from '@/types/sections';
import { BookOpen, CheckCircle, Clock, Video } from 'lucide-react';

export const CurriculumSection = ({ section }: { section: Section }) => {
    const modules = section.items || [
        {
            title: "Module 1: Nền tảng & Tư duy",
            description: "Xây dựng tư duy lập trình đúng đắn và nắm vững kiến thức cốt lõi.",
            lessons: [
                "Tư duy lập trình hiện đại",
                "Cấu trúc dữ liệu & Giải thuật ứng dụng",
                "Clean Code & Best Practices",
                "Git & Quy trình làm việc nhóm"
            ]
        },
        {
            title: "Module 2: Frontend Chuyên sâu",
            description: "Thành thạo xây dựng giao diện người dùng hiện đại, responsive.",
            lessons: [
                "ReactJS: Hooks, Context, State Management",
                "Next.js 14: App Router & Server Components",
                "Tailwind CSS & UI Libraries",
                "Performance Optimization"
            ]
        },
        {
            title: "Module 3: Backend & Database",
            description: "Xây dựng API mạnh mẽ, bảo mật và thiết kế cơ sở dữ liệu.",
            lessons: [
                "Node.js & Express/NestJS",
                "PostgreSQL & Prisma ORM",
                "Authentication & Authorization (JWT)",
                "Deploy & DevOps cơ bản"
            ]
        },
        {
            title: "Module 4: Dự án thực tế",
            description: "Áp dụng kiến thức xây dựng sản phẩm hoàn chỉnh.",
            lessons: [
                "Phân tích yêu cầu & Thiết kế hệ thống",
                "Triển khai dự án MVP",
                "Testing & Debugging",
                "Bảo vệ đồ án tốt nghiệp"
            ]
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                        <BookOpen size={14} />
                        Lộ trình chi tiết
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{section.title || "Bạn sẽ học những gì?"}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {section.subtitle || "Chương trình được thiết kế bài bản, đi từ cơ bản đến nâng cao, tập trung vào thực chiến."}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                    {modules.map((module: any, index: number) => (
                        <div key={index} className="group relative overflow-hidden rounded-2xl border bg-card/50 p-6 hover:bg-card hover:shadow-lg transition-all">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <span className="text-xl font-bold">{index + 1}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                                        {module.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {module.description}
                                    </p>

                                    <div className="space-y-2">
                                        {module.lessons?.map((lesson: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                                                <CheckCircle size={14} className="text-green-500 shrink-0" />
                                                <span>{lesson}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
