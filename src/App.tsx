import { useState } from 'react';
import './index.css';
import Input from './Components/Input';

interface DrivingTime {
  mph: number;
  time: string;
  timeSaved: string;
}

const calculateDrivingTimes = (miles: number, speedLimit: number, desiredSpeed: number): { savedTime: string; drivingTimes: DrivingTime[] } => {
  const timeAtSpeedLimit = miles / speedLimit;
  const timeAtDesiredSpeed = miles / desiredSpeed;

  const timeSavedInHours = timeAtSpeedLimit - timeAtDesiredSpeed;
  const savedHours = Math.floor(timeSavedInHours);
  const savedMinutes = Math.floor((timeSavedInHours - savedHours) * 60);
  const savedSeconds = Math.round((((timeSavedInHours - savedHours) * 60) - savedMinutes) * 60);
  const savedTime = `${savedHours}h ${savedMinutes}m ${savedSeconds}s`;

  const drivingTimes: DrivingTime[] = [];
  for (let i = 0; i < 31; i++) {
    const mph = speedLimit + i;
    const timeInHours = miles / mph;
    const hours = Math.floor(timeInHours);
    const minutes = Math.floor((timeInHours - hours) * 60);
    const seconds = Math.round((((timeInHours - hours) * 60) - minutes) * 60);
    const time = `${hours}h ${minutes}m ${seconds}s`;

    const timeSavedInHoursForMph = timeAtSpeedLimit - timeInHours;
    const savedHoursForMph = Math.floor(timeSavedInHoursForMph);
    const savedMinutesForMph = Math.floor((timeSavedInHoursForMph - savedHoursForMph) * 60);
    const savedSecondsForMph = Math.round((((timeSavedInHoursForMph - savedHoursForMph) * 60) - savedMinutesForMph) * 60);
    const timeSaved = `${savedHoursForMph}h ${savedMinutesForMph}m ${savedSecondsForMph}s`;

    drivingTimes.push({ mph, time, timeSaved });
  }

  return { savedTime, drivingTimes };
};

function App() {
  const [miles, setMiles] = useState<number>(0);
  const [speedLimit, setSpeedLimit] = useState<number>(0);
  const [desiredSpeed, setDesiredSpeed] = useState<number>(0);
  const [savedTime, setSavedTime] = useState<string>('');
  const [drivingTimes, setDrivingTimes] = useState<DrivingTime[]>([]);

  const handleSubmit = () => {
    const { savedTime, drivingTimes } = calculateDrivingTimes(miles, speedLimit, desiredSpeed);
    setSavedTime(savedTime);
    setDrivingTimes(drivingTimes);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-stone-950 text-gray-100">
      <div className="background-image"></div>
      <div className="w-full max-w-md p-4 bg-gray-900 rounded shadow-lg z-10">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Speeding</h1>
        <p className="text-lg mb-4">Let's calculate the time saved by speeding!</p>
        <Input
          value={miles}
          onChange={(e) => setMiles(Number(e.target.value))}
          onKeyPress={handleKeyPress}
          placeholder="Total miles to drive"
          gradientClass="input-gradient-1"
        />
        <Input
          value={speedLimit}
          onChange={(e) => setSpeedLimit(Number(e.target.value))}
          onKeyPress={handleKeyPress}
          placeholder="Current speed limit (mph)"
          gradientClass="input-gradient-2"
        />
        <Input
          value={desiredSpeed}
          onChange={(e) => setDesiredSpeed(Number(e.target.value))}
          onKeyPress={handleKeyPress}
          placeholder="Desired speed (mph)"
          gradientClass="input-gradient-3"
        />
        <button
          onClick={handleSubmit}
          className="w-full mt-4 px-4 py-2 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
        >
          Submit
        </button>
        {savedTime && (
          <>
            <div className="my-8 text-2xl text-center">
              Time Saved by Speeding?
            </div>
            <div className="text-7xl gradient-text mb-16 text-center">{savedTime}</div>
          </>
        )}
        {drivingTimes.length > 0 && (
          <div className="table-wrapper">
            <table className="min-w-full bg-gray-800">
              <thead>
                <tr className="bg-gray-900">
                  <th className="py-2 px-4 font-bold gradient-text">MPH</th>
                  <th className="py-2 px-4 font-bold gradient-text">Time</th>
                  <th className="py-2 px-4 font-bold gradient-text">Time Saved</th>
                </tr>
              </thead>
              <tbody>
                {drivingTimes.map((time, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition-colors duration-200 bg-zinc-900">
                    <td className="table-cell hide-left-border">{time.mph}</td>
                    <td className="table-cell">{time.time}</td>
                    <td className="table-cell hide-right-border">{time.timeSaved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;