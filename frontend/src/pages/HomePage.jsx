import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('/api/jobs')
            .then(res => res.json())
            .then(data => setJobs(data))
            .catch(err => console.error('Error fetching jobs:', err));
    }, []);

    return (
        <div className="min-h-screen bg-background pb-12">
            {/* Hero Section */}
            <div className="bg-primary text-white py-20 px-6 text-center">
                <h1 className="text-5xl font-extrabold mb-4">Find Your Dream Job</h1>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                    Explore thousands of job listings from top companies and take the next step in your career.
                </p>
                <Link to="/search" className="bg-white text-primary font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition">
                    Start Searching
                </Link>
            </div>

            {/* Job Listings Grid */}
            <div className="max-w-7xl mx-auto px-6 mt-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Opportunities</h2>

                {jobs.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">No jobs found. Please check back later.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map(job => (
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

export default HomePage;
