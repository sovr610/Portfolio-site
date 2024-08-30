// React Date Picker (src/react-date-picker.js)
import React, { useState, useRef, useEffect } from 'react';

const cyberpunkStyle = {
  container: {
    position: 'relative',
    width: '250px',
    fontFamily: "'Courier New', monospace",
  },
  input: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0a0a0a',
    border: '2px solid #00ff00',
    color: '#00ff00',
    fontSize: '16px',
    outline: 'none',
    cursor: 'pointer',
  },
  neonGlow: {
    position: 'absolute',
    top: '-5px',
    left: '-5px',
    right: '-5px',
    bottom: '-5px',
    border: '2px solid #00ff00',
    filter: 'blur(5px)',
    pointerEvents: 'none',
  },
  calendarIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    backgroundColor: '#00ff00',
    maskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'/%3E%3Cline x1='16' y1='2' x2='16' y2='6'/%3E%3Cline x1='8' y1='2' x2='8' y2='6'/%3E%3Cline x1='3' y1='10' x2='21' y2='10'/%3E%3C/svg%3E\")",
    maskSize: 'cover',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    cursor: 'pointer',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    width: '300px',
    backgroundColor: '#0a0a0a',
    border: '2px solid #00ff00',
    boxShadow: '0 0 10px #00ff00',
    zIndex: 1000,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #00ff00',
  },
  headerButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#00ff00',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '5px 10px',
  },
  monthYear: {
    color: '#00ff00',
    fontSize: '16px',
  },
  daysHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '5px',
    padding: '10px',
    borderBottom: '1px solid #00ff00',
  },
  dayHeader: {
    color: '#00ff00',
    textAlign: 'center',
    fontSize: '14px',
  },
  days: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '5px',
    padding: '10px',
  },
  day: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#00ff00',
    cursor: 'pointer',
    padding: '8px',
    textAlign: 'center',
    fontSize: '14px',
    '&:hover': {
      backgroundColor: '#003300',
    },
  },
  selectedDay: {
    backgroundColor: '#00ff00',
    color: '#0a0a0a',
  },
  otherMonthDay: {
    opacity: 0.5,
  },
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const ReactDatePicker = ({ onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
    onDateChange(date.toISOString().split('T')[0]);
  };

  const renderCalendar = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const calendar = [];
    let day = new Date(startDate);

    while (day <= endDate) {
      calendar.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }

    return calendar;
  };

  return (
    <div ref={containerRef} style={cyberpunkStyle.container}>
      <input
        type="text"
        style={cyberpunkStyle.input}
        value={selectedDate.toISOString().split('T')[0]}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
      />
      <div style={cyberpunkStyle.neonGlow}></div>
      <div style={cyberpunkStyle.calendarIcon} onClick={() => setIsOpen(!isOpen)}></div>
      {isOpen && (
        <div style={cyberpunkStyle.dropdown}>
          <div style={cyberpunkStyle.header}>
            <button
              style={cyberpunkStyle.headerButton}
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            >
              &lt;
            </button>
            <span style={cyberpunkStyle.monthYear}>{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
            <button
              style={cyberpunkStyle.headerButton}
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            >
              &gt;
            </button>
          </div>
          <div style={cyberpunkStyle.daysHeader}>
            {DAYS.map(day => (
              <div key={day} style={cyberpunkStyle.dayHeader}>{day}</div>
            ))}
          </div>
          <div style={cyberpunkStyle.days}>
            {renderCalendar().map((date, index) => (
              <button
                key={index}
                style={{
                  ...cyberpunkStyle.day,
                  ...(date.getMonth() !== currentDate.getMonth() ? cyberpunkStyle.otherMonthDay : {}),
                  ...(date.toDateString() === selectedDate.toDateString() ? cyberpunkStyle.selectedDay : {}),
                }}
                onClick={() => handleDateClick(date)}
              >
                {date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// The Angular Date Picker and other components remain the same as in the previous artifact