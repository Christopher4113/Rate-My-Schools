import {useState} from 'react'

import BarChartCard from '@/components/custom/BarChartCard';

const serverURL = import.meta.env.VITE_SERVER_URL
const chartConfigs = [
    { title: "Athletics", endpoint: `${serverURL}/auth/getAllSchoolsAthleticsAverage` },
    { title: "Clubs", endpoint: `${serverURL}/auth/getAllSchoolsClubsAverage` },
    { title: "Housing", endpoint: `${serverURL}/auth/getAllSchoolsHousingAverage` },
    { title: "Jobs", endpoint: `${serverURL}/auth/getAllSchoolsJobsAverage` },
    { title: "Lifestyle", endpoint: `${serverURL}/auth/getAllSchoolsLifeStyleAverage` },
    { title: "Majors", endpoint: `${serverURL}/auth/getAllSchoolsMajorsAverage` },
    { title: "Others", endpoint: `${serverURL}/auth/getAllSchoolsOthersAverage` },
];
const Leaderboard = () => {
    const [current, setCurrent] = useState(0);

    const nextChart = () => setCurrent((current + 1) % chartConfigs.length);
    const prevChart = () => setCurrent((current - 1 + chartConfigs.length) % chartConfigs.length);
  
    const { title, endpoint } = chartConfigs[current];
  
    return (
      <div className="p-4 flex flex-col items-center">
        <BarChartCard title={title} endpoint={endpoint} />
        <div className="mt-4 flex gap-4">
          <button onClick={prevChart} className="bg-gray-200 px-4 py-2 rounded-lg">Previous</button>
          <button onClick={nextChart} className="bg-gray-800 text-white px-4 py-2 rounded-lg">Next</button>
        </div>
      </div>
    );
}

export default Leaderboard