import React from 'react';
import { Bus, Clock, Map } from 'lucide-react';

const TransportFeatures = () => {
  const features = [
    {
      title: "Real-Time Vehicle Tracking",
      description: "Monitor your entire fleet in real-time with precise GPS tracking. Get instant updates on vehicle locations, speed, and route adherence.",
      icon: <Bus className="w-12 h-12 text-blue-600" />
    },
    {
      title: "Smart Schedule Management",
      description: "Optimize route schedules based on real-time traffic data and passenger demand. Reduce wait times and improve service reliability.",
      icon: <Clock className="w-12 h-12 text-green-600" />
    },
    {
      title: "Interactive Route Mapping",
      description: "Visualize all active routes and stops on an interactive map. Track deviation alerts and manage route changes efficiently.",
      icon: <Map className="w-12 h-12 text-purple-600" />
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-slate-200">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportFeatures;
