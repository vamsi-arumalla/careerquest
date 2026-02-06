import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function SearchPage() {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query) {
            setLoading(true);
            fetch(`/api/search?q=${query}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error searching:', err);
                    setLoading(false);
                });
        }
    }, [query]);

    return (
        <div className="min-h-screen bg-background py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Search Results for "<span className="text-primary">{query}</span>"
                </h1>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : results.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                        <Link to="/" className="inline-block mt-4 text-primary font-medium hover:underline">Browse all jobs</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {results.map(job => (
                            <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 flex flex-col">
                                <div className="p-6 flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{job.title}</h3>
                                    <p className="text-primary font-medium mb-4">{job.company}</p>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        {job.location}
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                                    <Link
                                        to={`/jobs/${job.id}`}
                                        className="block w-full text-center bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
