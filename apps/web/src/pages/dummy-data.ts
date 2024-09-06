// Dummy data for the user and sessions
export const dummyUser = {
  id: "c56f6e7f-0f82-4e3f-8f1d-0e3d0f1b8e0b",
  username: "pawanmkr",
  firstName: "Pawan",
  lastName: "Kumar",
  email: "pawan.kumar@gmail.com",
  avatar: "https://i.pravatar.cc/300",
  dob: "1990-01-01",
  phoneCode: "91",
  phoneNumber: "9876543210",
  role: "user",
};

export const dummySessions = [
  {
    name: "Mathematics Tutoring",
    description: "A detailed session on algebra and calculus.",
    cost: 50,
    duration: 60,
    rule: "DTSTART:20240101T123000Z\nRRULE:FREQ=MONTHLY;COUNT=5",
  },
  {
    name: "Physics Class",
    description: "A session focusing on the laws of motion and thermodynamics.",
    cost: 45,
    duration: 90,
    rule: "DTSTART:20240115T103000Z\nRRULE:FREQ=WEEKLY;COUNT=10",
  },
  {
    name: "Chemistry Lab",
    description: "Practical chemistry session on organic reactions.",
    cost: 60,
    duration: 120,
    rule: "DTSTART:20240201T140000Z\nRRULE:FREQ=DAILY;COUNT=3",
  },
];
