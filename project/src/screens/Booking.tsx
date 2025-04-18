import { useState } from 'react';
import { Button } from "../components/ui/button";
import { useNavigate } from 'react-router-dom';

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

type Stylist = {
  id: number;
  name: string;
  specialty: string;
  image: string;
};

export const Booking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedStylist, setSelectedStylist] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  
  // Sample data
  const services = [
    { id: 'haircut', name: "Haircut", price: "$35-55" },
    { id: 'color', name: "Hair Coloring", price: "$85+" },
    { id: 'highlights', name: "Highlights", price: "$95+" },
    { id: 'treatment', name: "Hair Treatment", price: "$35-150" },
    { id: 'styling', name: "Styling", price: "$45-75" },
  ];
  
  const stylists: Stylist[] = [
    { id: 1, name: "Alex Johnson", specialty: "Coloring Expert", image: "/stylists/alex.jpg" },
    { id: 2, name: "Jamie Smith", specialty: "Cutting Specialist", image: "/stylists/jamie.jpg" },
    { id: 3, name: "Taylor Wilson", specialty: "Styling Professional", image: "/stylists/taylor.jpg" },
    { id: 4, name: "Jordan Lee", specialty: "Treatment Specialist", image: "/stylists/jordan.jpg" },
  ];
  
  const timeSlots: TimeSlot[] = [
    { id: '9am', time: '9:00 AM', available: true },
    { id: '10am', time: '10:00 AM', available: true },
    { id: '11am', time: '11:00 AM', available: false },
    { id: '1pm', time: '1:00 PM', available: true },
    { id: '2pm', time: '2:00 PM', available: true },
    { id: '3pm', time: '3:00 PM', available: true },
    { id: '4pm', time: '4:00 PM', available: false },
    { id: '5pm', time: '5:00 PM', available: true },
  ];
  
  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit booking
      alert('Booking successful! We will see you soon.');
      navigate('/');
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      const formattedDate = new Intl.DateTimeFormat('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }).format(date);
      
      dates.push({ value: dateString, label: formattedDate });
    }
    
    return dates;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative bg-[url(/booking-hero.jpg)] bg-cover bg-center h-48">
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Book Your Appointment</h1>
          </div>
        </div>
      </div>
      
      {/* Booking Form */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-gray-700 -z-10"></div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i <= step ? "bg-[#fbb034] text-black" : "bg-gray-700 text-gray-400"
                }`}
              >
                {i}
              </div>
              <span className="mt-2 text-sm text-gray-400">
                {i === 1 ? "Service" : i === 2 ? "Stylist" : i === 3 ? "Date" : "Time"}
              </span>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-800 p-6 md:p-8">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6">Select a Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-4 border cursor-pointer transition-colors ${
                      selectedService === service.id 
                        ? "border-[#fbb034] bg-[#fbb034]/10" 
                        : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <h3 className="font-bold">{service.name}</h3>
                    <p className="text-sm text-gray-400">Starting from {service.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 2: Select Stylist */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6">Choose Your Stylist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stylists.map((stylist) => (
                  <div 
                    key={stylist.id}
                    onClick={() => setSelectedStylist(stylist.id)}
                    className={`flex items-center p-4 border cursor-pointer transition-colors ${
                      selectedStylist === stylist.id 
                        ? "border-[#fbb034] bg-[#fbb034]/10" 
                        : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 mr-4">
                      <img src="/api/placeholder/100/100" alt={stylist.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold">{stylist.name}</h3>
                      <p className="text-sm text-gray-400">{stylist.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 3: Select Date */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6">Select a Date</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {generateDateOptions().map((date) => (
                  <div 
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    className={`p-3 border text-center cursor-pointer transition-colors ${
                      selectedDate === date.value 
                        ? "border-[#fbb034] bg-[#fbb034]/10" 
                        : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <p className="font-medium">{date.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 4: Select Time */}
          {step === 4 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6">Select a Time</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((slot) => (
                  <div 
                    key={slot.id}
                    onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
                    className={`
                      p-3 border text-center cursor-pointer transition-colors
                      ${!slot.available && "opacity-50 cursor-not-allowed"}
                      ${slot.available && selectedTimeSlot === slot.id 
                        ? "border-[#fbb034] bg-[#fbb034]/10" 
                        : slot.available ? "border-gray-700 hover:border-gray-500" : "border-gray-800"}
                    `}
                  >
                    <p className="font-medium">{slot.time}</p>
                    {!slot.available && <p className="text-xs text-gray-500">Unavailable</p>}
                  </div>
                ))}
              </div>
              
              {/* Booking Summary */}
              {selectedTimeSlot && (
                <div className="mt-8 p-4 border border-gray-700 bg-gray-900">
                  <h3 className="font-bold text-lg mb-2">Booking Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-gray-400">Service:</p>
                    <p>{services.find(s => s.id === selectedService)?.name}</p>
                    <p className="text-gray-400">Stylist:</p>
                    <p>{stylists.find(s => s.id === selectedStylist)?.name}</p>
                    <p className="text-gray-400">Date:</p>
                    <p>{new Date(selectedDate).toLocaleDateString()}</p>
                    <p className="text-gray-400">Time:</p>
                    <p>{timeSlots.find(t => t.id === selectedTimeSlot)?.time}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button 
              onClick={handlePrevStep}
              variant="outline" 
              className={`text-white border-white hover:bg-white/10 rounded-none ${
                step === 1 ? 'invisible' : ''
              }`}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNextStep}
              disabled={
                (step === 1 && !selectedService) ||
                (step === 2 && selectedStylist === null) ||
                (step === 3 && !selectedDate) ||
                (step === 4 && !selectedTimeSlot)
              }
              className="bg-[#fbb034] hover:bg-[#fbb034]/90 text-black rounded-none disabled:opacity-50"
            >
              {step === 4 ? 'Confirm Booking' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};