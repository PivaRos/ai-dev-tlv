'use client';


export function FlightBookingLoader() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md flex-grow overflow-y-auto p-4">
        <div>Loading flight information...</div>
      </div>
    </div>
  );
}

export function FlightBookingMealLoader() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md flex-grow overflow-y-auto p-4">
        <div>Loading meal information...</div>
      </div>
    </div>
  );
}

export function FlightBookingSelectSeats() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md flex-grow overflow-y-auto p-4">
        <div>Select seats</div>
      </div>
    </div>
  );
}


export function FlightBookingConfirmation()  {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md flex-grow overflow-y-auto p-4">
        <div>Confirmation</div>
      </div>
    </div>
  );
}

export function FlightBookingSelectMeal() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md flex-grow overflow-y-auto p-4">
        <div>Select meal</div>
      </div>
    </div>
  );
}
