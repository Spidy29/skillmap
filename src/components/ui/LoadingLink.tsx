"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface LoadingLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

/**
 * A Link component that shows a loading spinner while navigating
 */
export function LoadingLink({ href, children, className = "" }: LoadingLinkProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsLoading(true);

        startTransition(() => {
            router.push(href);
        });
    };

    const loading = isLoading || isPending;

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={`${className} ${loading ? "pointer-events-none opacity-80" : ""}`}
        >
            {loading ? (
                <span className="flex items-center gap-3">
                    {/* Spinner */}
                    <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Loading...
                </span>
            ) : (
                children
            )}
        </Link>
    );
}
