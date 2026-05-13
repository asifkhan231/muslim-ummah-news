import React, { useState, useEffect } from 'react';
import './NamazTimer.css';
import { API_BASE_URL } from '../config/api';

const NamazTimer = () => {
  const [prayerTimes, setPrayerTimes] = useState({
    Fajr: '05:42 AM',
    Sunrise: '06:57 AM',
    Dhuhr: '12:10 PM',
    Asr: '03:24 PM',
    Maghrib: '05:42 PM',
    Isha: '07:02 PM'
  });
  
  const [nextPrayer, setNextPrayer] = useState('Asr');
  const [timeRemaining, setTimeRemaining] = useState('2h 24m');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('Loading...');

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user location and fetch prayer times
    fetchPrayerTimes();

    return () => clearInterval(timer);
  }, []);

  // Recalculate next prayer every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (prayerTimes.Fajr !== '05:42 AM') { // Only if we have real times
        const timings = {
          Fajr: convertTo24Hour(prayerTimes.Fajr),
          Sunrise: convertTo24Hour(prayerTimes.Sunrise),
          Dhuhr: convertTo24Hour(prayerTimes.Dhuhr),
          Asr: convertTo24Hour(prayerTimes.Asr),
          Maghrib: convertTo24Hour(prayerTimes.Maghrib),
          Isha: convertTo24Hour(prayerTimes.Isha)
        };
        calculateNextPrayer(timings);
      }
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [prayerTimes]);

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    
    return `${hours}:${minutes}`;
  };

  const fetchPrayerTimes = async () => {
    try {
      // Get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
              // Try backend API first
              const response = await fetch(
                `${API_BASE_URL}/features/prayer-times?lat=${latitude}&lng=${longitude}&method=2`,
                { timeout: 5000 }
              );
              
              const data = await response.json();
              
              if (data.code === 200 && data.data && data.data.timings) {
                const timings = data.data.timings;
                setPrayerTimes({
                  Fajr: formatTime(timings.Fajr),
                  Sunrise: formatTime(timings.Sunrise),
                  Dhuhr: formatTime(timings.Dhuhr),
                  Asr: formatTime(timings.Asr),
                  Maghrib: formatTime(timings.Maghrib),
                  Isha: formatTime(timings.Isha)
                });
                
                setLocation(data.data.meta.timezone || 'Local Time');
                calculateNextPrayer(timings);
                return;
              }
            } catch (backendError) {
              console.log('Backend API failed, trying direct API:', backendError);
            }
            
            // Fallback to direct Aladhan API
            const date = new Date();
            const directResponse = await fetch(
              `https://api.aladhan.com/v1/timings/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?latitude=${latitude}&longitude=${longitude}&method=2`
            );
            
            const directData = await directResponse.json();
            
            if (directData.code === 200 && directData.data && directData.data.timings) {
              const timings = directData.data.timings;
              setPrayerTimes({
                Fajr: formatTime(timings.Fajr),
                Sunrise: formatTime(timings.Sunrise),
                Dhuhr: formatTime(timings.Dhuhr),
                Asr: formatTime(timings.Asr),
                Maghrib: formatTime(timings.Maghrib),
                Isha: formatTime(timings.Isha)
              });
              
              setLocation(directData.data.meta.timezone || 'Local Time');
              calculateNextPrayer(timings);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            setLocation('Location unavailable - Please enable location access');
            // Keep default times if location is denied
          }
        );
      } else {
        setLocation('Geolocation not supported');
      }
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      setLocation('Error loading times');
    }
  };

  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const calculateNextPrayer = (timings) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
      { name: 'Fajr', time: timings.Fajr },
      { name: 'Sunrise', time: timings.Sunrise },
      { name: 'Dhuhr', time: timings.Dhuhr },
      { name: 'Asr', time: timings.Asr },
      { name: 'Maghrib', time: timings.Maghrib },
      { name: 'Isha', time: timings.Isha }
    ];

    for (let prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':');
      const prayerMinutes = parseInt(hours) * 60 + parseInt(minutes);
      
      if (prayerMinutes > currentMinutes) {
        setNextPrayer(prayer.name);
        const diff = prayerMinutes - currentMinutes;
        const hours = Math.floor(diff / 60);
        const mins = diff % 60;
        setTimeRemaining(`${hours}h ${mins}m`);
        return;
      }
    }
    
    // If no prayer found today, next is Fajr tomorrow
    setNextPrayer('Fajr');
  };

  return (
    <div className="namaz-timer-card">
      <div className="namaz-header">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="mb-0 fw-bold">
            LIVE TIMINGS
          </h5>
          <div className="text-end">
            <small className="text-muted d-block" style={{ fontSize: '11px' }}>
              <i className="bi bi-geo-alt"></i> {location}
            </small>
          </div>
        </div>
        <div className="next-prayer-info">
          <span className="next-prayer-label">Next Prayer</span>
          <div>
            <span className="next-prayer-name">{nextPrayer}</span>
            <span className="time-remaining">in {timeRemaining}</span>
          </div>
        </div>
      </div>

      <div className="prayer-times-list">
        {Object.entries(prayerTimes).map(([prayer, time]) => (
          <div 
            key={prayer} 
            className={`prayer-time-item ${prayer === nextPrayer ? 'active' : ''}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className="prayer-name">{prayer}</span>
              <span className="prayer-time">{time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="prayer-footer">
        <button className="prayer-action-btn">
          <i className="bi bi-sliders"></i>
          Adjust
        </button>
        <button className="prayer-action-btn">
          <i className="bi bi-download"></i>
          Export
        </button>
        <button className="prayer-action-btn">
          <i className="bi bi-bell"></i>
          Remind
        </button>
      </div>

      <div className="prayer-source-text">
        Pray time source: Islamic Relief Worldwide
      </div>
    </div>
  );
};

export default NamazTimer;
