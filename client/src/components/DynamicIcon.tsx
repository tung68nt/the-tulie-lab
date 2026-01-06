import { icons } from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
    name: string;
}

export const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
    // Cast strict string to keyof typeof icons type check
    const Icon = icons[name as keyof typeof icons];

    if (!Icon) {
        return null;
    }

    return <Icon {...props} />;
};
