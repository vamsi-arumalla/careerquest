import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function JobDetailsPage() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/jobs/${id}`)
            .then(res => res.json())
            .then(data => {
                setJob(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching job:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-background">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (!job) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found</h2>
            <Link to="/jobs" className="text-primary hover:underline font-medium">Back to Jobs</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-background py-12 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                        <p className="text-lg text-secondary font-medium">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {job.location}
                    </div>
                </div>

                <div className="p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-8">{job.description}</p>

                    <button
                        className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-0.5"
                        onClick={() => alert('Application feature coming soon!')}
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JobDetailsPage;
