import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Select = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Choose a Category</h2>

        <div className="flex flex-col gap-4">
          <CategoryLink to={`/AA/${id}`} label="Athletics" color="from-blue-500 to-pink-500" description="Rate and review sports programs, facilities, and game experiences" />
          <CategoryLink to={`/AC/${id}`} label="Clubs" color="from-blue-500 to-red-500" description="Explore and rate student organizations and extracurricular activities" />
          <CategoryLink to={`/AH/${id}`} label="Housing" color="from-blue-500 to-purple-500" description="Reviews of on-campus residences and off-campus housing options" />
          <CategoryLink to={`/AJ/${id}`} label="Jobs" color="from-blue-500 to-yellow-500" description="Information about campus employment and career opportunities" />
          <CategoryLink to={`/AL/${id}`} label="LifeStyles" color="from-blue-500 to-green-500" description="Reviews about campus life, culture, and social experiences" />
          <CategoryLink to={`/AM/${id}`} label="Majors" color="from-blue-500 to-orange-500" description="Ratings and reviews of academic programs and departments" />
          <CategoryLink to={`/AO/${id}`} label="Other" color="from-blue-500 to-cyan-500" description="Additional categories and miscellaneous reviews" />
        </div>
      </div>
    </div>
  );
};

// Reusable category link block
const CategoryLink = ({ to, label, color, description }: { to: string, label: string, color: string, description: string }) => (
  <div className="flex items-center">
    <Link to={to} className={`hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r ${color} text-white w-32 text-center`}>
      {label}
    </Link>
    <p className="ml-4 text-gray-700">{description}</p>
  </div>
);

export default Select;
