const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mock functions
const shiftTime = ({ hour, minutes = 0 }, day = 0) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + day);
    currentDate.setHours(hour, minutes, 0, 0);
    return currentDate.getTime();
};

const createMockShift = ({ area, startTime, endTime }) => ({
    id: uuidv4(),
    area,
    booked: false,
    startTime,
    endTime
});

// Sample data
const shifts = [
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 12 }),
    endTime: shiftTime({ hour: 14 }),
  }),
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 10 }),
    endTime: shiftTime({ hour: 12 }),
  }),
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 16 }),
    endTime: shiftTime({ hour: 17, minutes: 30 }),
  }),
  createMockShift({
    area: 'Turku',
    startTime: shiftTime({ hour: 16 }),
    endTime: shiftTime({ hour: 17, minutes: 30 }),
  }),
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 11 }),
    endTime: shiftTime({ hour: 13 }),
  }),
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 10 }),
    endTime: shiftTime({ hour: 15 }),
  }),
  createMockShift({
    area: 'Turku',
    startTime: shiftTime({ hour: 10 }),
    endTime: shiftTime({ hour: 11, minutes: 30 }),
  }),
  createMockShift({
    area: 'Turku',
    startTime: shiftTime({ hour: 11 }),
    endTime: shiftTime({ hour: 13 }),
  }),
  createMockShift({
    area: 'Turku',
    startTime: shiftTime({ hour: 10 }),
    endTime: shiftTime({ hour: 12 }),
  }),
  createMockShift({
    area: 'Turku',
    startTime: shiftTime({ hour: 18 }),
    endTime: shiftTime({ hour: 20 }),
  }),
  createMockShift({
    area: 'Tampere',
    startTime: shiftTime({ hour: 9 }),
    endTime: shiftTime({ hour: 12 }),
  }),
  createMockShift({
    area: 'Tampere',
    startTime: shiftTime({ hour: 10 }),
    endTime: shiftTime({ hour: 12 }),
  }),
  createMockShift({
    area: 'Tampere',
    startTime: shiftTime({ hour: 12 }),
    endTime: shiftTime({ hour: 14 }),
  }),
  createMockShift({
    area: 'Tampere',
    startTime: shiftTime({ hour: 14 }),
    endTime: shiftTime({ hour: 16, minutes: 30 }),
  }),

  // Second set of data with different timings
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 12 }, 1),
    endTime: shiftTime({ hour: 14 }, 1),
  }),
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 14 }, 1),
    endTime: shiftTime({ hour: 16, minutes: 30 }, 1),
  }),
  createMockShift({
    area: 'Turku',
    startTime: shiftTime({ hour: 12 }, 1),
    endTime: shiftTime({ hour: 14 }, 1),
  }),
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 14 }, 1),
    endTime: shiftTime({ hour: 16, minutes: 30 }, 1),
  }),

  // Third set of data with different timings
  createMockShift({
    area: 'Turku',
    startTime: shiftTime({ hour: 9 }, 3),
    endTime: shiftTime({ hour: 10 }, 3),
  }),
  createMockShift({
    area: 'Turku',
    startTime: shiftTime({ hour: 10 }, 3),
    endTime: shiftTime({ hour: 12, minutes: 30 }, 3),
  }),
  createMockShift({
    area: 'Turku',
    startTime: shiftTime({ hour: 12, minutes: 30 }, 3),
    endTime: shiftTime({ hour: 15 }, 3),
  }),
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 10 }, 3),
    endTime: shiftTime({ hour: 14, minutes: 30 }, 3),
  }),
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 14 }, 3),
    endTime: shiftTime({ hour: 16, minutes: 30 }, 3),
  }),
  createMockShift({
    area: 'Tampere',
    startTime: shiftTime({ hour: 10 }, 3),
    endTime: shiftTime({ hour: 12 }, 3),
  }),
  createMockShift({
    area: 'Tampere',
    startTime: shiftTime({ hour: 12 }, 3),
    endTime: shiftTime({ hour: 14 }, 3),
  }),
  createMockShift({
    area: 'Tampere',
    startTime: shiftTime({ hour: 13 }, 3),
    endTime: shiftTime({ hour: 15 }, 3),
  }),

  // Fourth set of data with different timings
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 9 }, 4),
    endTime: shiftTime({ hour: 11 }, 4),
  }),
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 11 }, 4),
    endTime: shiftTime({ hour: 13, minutes: 30 }, 4),
  }),
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 12 }, 4),
    endTime: shiftTime({ hour: 15 }, 4),
  }),
  createMockShift({
    area: 'Helsinki',
    startTime: shiftTime({ hour: 18 }, 4),
    endTime: shiftTime({ hour: 21 }, 4),
  }),
  createMockShift({
    area: 'Tampere',
    startTime: shiftTime({ hour: 9 }, 4),
    endTime: shiftTime({ hour: 12 }, 4),
  }),
  createMockShift({
    area: 'Tampere',
    startTime: shiftTime({ hour: 12 }, 4),
    endTime: shiftTime({ hour: 15, minutes: 30 },4),
  }),
    createMockShift({
      area: 'Tampere',
      startTime: shiftTime({ hour: 15 }, 4),
      endTime: shiftTime({ hour: 18 }, 4),
    }),
    createMockShift({
      area: 'Tampere',
      startTime: shiftTime({ hour: 17 }, 4),
      endTime: shiftTime({ hour: 20 }, 4),
    }),
  ];
  
  // Middleware for checking if shift exists
  const checkShiftExists = (req, res, next) => {
      const shiftId = req.params.id;
      const shift = shifts.find(shift => shift.id === shiftId);
      if (!shift) {
          return res.status(404).json({ error: 'Shift not found' });
      }
      req.shift = shift;
      next();
  };
  
  // Middleware for checking if shift is not booked
  const checkShiftNotBooked = (req, res, next) => {
      if (req.shift.booked) {
          return res.status(400).json({ error: 'Shift is already booked' });
      }
      next();
  };
  
  // Middleware for checking if shift is not started
  const checkShiftNotStarted = (req, res, next) => {
      const currentTime = Date.now();
      if (req.shift.startTime <= currentTime) {
          return res.status(400).json({ error: 'Shift has already started' });
      }
      next();
  };
  
  // Middleware for checking overlapping times
  const checkOverlappingTimes = (req, res, next) => {
      const { startTime, endTime } = req.body;
      const overlappingShift = shifts.find(shift => {
          return shift.id !== req.shift.id &&
              ((startTime >= shift.startTime && startTime < shift.endTime) ||
                  (endTime > shift.startTime && endTime <= shift.endTime));
      });
      if (overlappingShift) {
          return res.status(400).json({ error: 'Shift time overlaps with an existing shift' });
      }
      next();
  };
  
  // Get all shifts
  app.get('/shifts', (req, res) => {
      res.json(shifts);
  });
  
  // Get single shift by ID
  app.get('/shifts/:id', checkShiftExists, (req, res) => {
      res.json(req.shift);
  });
  
  // Book a shift by ID
  app.post('/shifts/:id/book', checkShiftExists, checkShiftNotBooked, checkShiftNotStarted, checkOverlappingTimes, (req, res) => {
      req.shift.booked = true;
      res.json(req.shift);
  });
  
  // Cancel a shift by ID
  app.post('/shifts/:id/cancel', checkShiftExists, (req, res) => {
      if (!req.shift.booked) {
          return res.status(400).json({ error: 'Shift is not booked' });
      }
      req.shift.booked = false;
      res.json(req.shift);
  });
  
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
  
