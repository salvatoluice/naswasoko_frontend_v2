import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <h1 className="text-7xl font-serif mb-4">404</h1>
            <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
            <p className="text-neutral-600 mb-8">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium inline-block"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;