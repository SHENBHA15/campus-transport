import { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Status from '../components/Elements/Status'
import Map from '../components/Elements/Map'
import { GeolocationPosition, SocketStatus, LocationStatus } from '../types'
import { ref, onValue } from "firebase/database";
import { db } from "../components/fb"
import TransportFeatures from './TransportFeatures'

export default function Home() {
  const [socketStatus, setSocketStatus] = useState<SocketStatus>('disconnected')
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('unknown')
  const [position, setPosition] = useState<GeolocationPosition | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>('')

  useEffect(() => {
    const starCountRef = ref(db, '/loc/');
    const o = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data.coords);
      const { longitude, latitude } = data.coords;
      setPosition({ lat: latitude, lng: longitude })
      setSocketStatus('connected');
      setLocationStatus('active');
      setLastUpdated(new Date().toLocaleTimeString());
    });

    return () => o();
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-950-900 to-lime-800 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Real-Time Tracking for Efficient Public Transport Systems</h1>
        
        <section className='pb-3'>
          <article className='bg-slate-800 shadow-lg border border-slate-700 rounded-lg p-4 flex flex-wrap gap-3 justify-between items-center w-full'>
            <div className="flex items-center gap-4">
              <Status socketStatus={socketStatus} />
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs">Location Status</span>
                <span className={`text-sm font-medium ${locationStatus === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {locationStatus === 'active' ? 'Active' : 'Unknown'}
                </span>
              </div>
            </div>
            
            {position && (
              <div className='flex flex-col md:flex-row gap-4 justify-end'>
                <div className='flex flex-col text-right'>
                  <span className='text-gray-400 text-xs'>Last Updated</span>
                  <span className='text-gray-200 text-sm'>{lastUpdated}</span>
                </div>
                <div className='flex gap-6 justify-end text-gray-200 bg-slate-700 p-3 rounded-md'>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-xs text-gray-400'>Latitude</span>
                    <span className='text-lg font-bold text-blue-300'>{position.lat.toFixed(6)}</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-xs text-gray-400'>Longitude</span>
                    <span className='text-lg font-bold text-blue-300'>{position.lng.toFixed(6)}</span>
                  </div>
                </div>
              </div>
            )}
          </article>
        </section>
        
        <section className='w-full'>
          {position ? (
            <div className='flex flex-col gap-4'>
              <article className='bg-slate-800 border border-slate-700 rounded-lg overflow-hidden w-full shadow-lg h-96 md:h-[500px]'>
                <Map location={position} />
              </article>
              <div className='bg-slate-800 border border-slate-700 rounded-lg p-4 text-gray-300'>
                <h2 className='text-xl font-semibold mb-2'>Current Location</h2>
                <p className='text-sm'>Tracking active device at coordinates: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}</p>
              </div>
            </div>
          ) : (
            <div className='bg-slate-800 border border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center h-96 md:h-[500px] text-center'>
              <div className='animate-pulse text-blue-400 text-5xl mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              </div>
              <h2 className='text-xl font-semibold text-gray-300 mb-2'>Waiting for location data...</h2>
              <p className='text-gray-400 max-w-md'>Please ensure your device is connected and sharing location information.</p>
            </div>
          )}
        </section>

        <TransportFeatures />
      </div>
    </div>
  )
}