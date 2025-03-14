import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedTransition from "./AnimatedTransition";

interface StepTwoProps {
  onNext: (dateTime: Date) => void;
}

const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const times = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

const StepTwo: React.FC<StepTwoProps> = ({ onNext }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isCalendarInteracting, setIsCalendarInteracting] = useState(false);

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const dateTime = new Date(selectedDate);
      dateTime.setHours(hours, minutes);
      onNext(dateTime);
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = daysInMonth(currentMonth, currentYear);
    
    // Add empty days for first week
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Add actual days
    for (let day = 1; day <= totalDays; day++) {
      const isSelected = selectedDate?.getDate() === day && 
                        selectedDate.getMonth() === currentMonth;
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
          className={`p-2 rounded-full hover:bg-gray-100 ${
            isSelected ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="step-container px-4">
      <h1 className="step-title animate-slide-up text-center text-2xl sm:text-3xl">
        When are you free?
      </h1>
      <p
        className="step-subtitle animate-slide-up text-center text-sm sm:text-base mb-6"
        style={{ animationDelay: "100ms" }}
      >
        Pick a date and time for our adventure
      </p>

      {/* GIF Container */}
      <AnimatedTransition
        show={isCalendarInteracting}
        animateIn="animate-scale-in"
        className="gif-container w-full max-w-md mx-auto mb-6"
      >
        <div className="bg-white shadow-md rounded-lg p-2">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGpqb2N1dHBpemhmZnN1YzQxNzA2bTZtdXA5MHpkcjQ4ZHkxbDIwayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DPznISmq0hLRQqG71g/giphy.gif"
            alt="Calendar animation"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      </AnimatedTransition>

      {/* Custom Calendar */}
      <div
        className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-4 animate-slide-up"
        style={{ animationDelay: "200ms" }}
        onMouseEnter={() => setIsCalendarInteracting(true)}
        onMouseLeave={() => setIsCalendarInteracting(false)}
      >
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}
            >
              ←
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}
            >
              →
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Date Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="p-1 font-medium text-gray-500">{day}</div>
              ))}
              {generateCalendarDays()}
            </div>
          </div>

          {/* Time Picker */}
          <div className="md:w-32 border-l md:pl-4">
            <div className="text-sm font-medium mb-2 text-gray-700">Time</div>
            <div className="h-48 overflow-y-auto">
              {times.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`w-full p-1.5 text-sm rounded-md hover:bg-gray-100 ${
                    selectedTime === time ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div
        className="w-full flex justify-center mt-6 animate-slide-up"
        style={{ animationDelay: "300ms" }}
      >
        <Button
          onClick={handleContinue}
          className="btn-primary flex items-center gap-2 text-sm sm:text-base px-6 py-3"
          disabled={!selectedDate || !selectedTime}
        >
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;