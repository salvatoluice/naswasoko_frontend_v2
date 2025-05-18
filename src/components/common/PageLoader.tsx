import { Zap } from 'lucide-react';

const PageLoader = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center">
            <div className="relative">
                <div className="w-16 h-16 bg-primary/10 rounded-full animate-pulse"></div>
                <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary w-8 h-8" />
            </div>
            <div className="mt-4 text-neutral-800 font-medium">Loading...</div>
        </div>
    </div>
);

export default PageLoader;