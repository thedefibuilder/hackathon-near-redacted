'use client';

import { usePathname } from 'next/navigation';

export default function PageTitle() {
    const pathname = usePathname();
    const formatPathname = pathname === '/' ? 'Dashboard' : pathname.charAt(1).toUpperCase() + pathname.slice(2);

    return (
        <div>
            <h1 className="text-white text-3xl font-medium">{formatPathname}</h1>
            <div className="h-2" />
            <p className="text-muted italic text-sm">Updated on 23 May 2023</p>
        </div>
    );
}
