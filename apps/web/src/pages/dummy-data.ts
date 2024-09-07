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
    name: "Business Consulting",
    description:
      "A consulting session to discuss strategies for business growth and scaling.",
    cost: 150,
    duration: 90,
    rule: "DTSTART:20240105T090000Z\nRRULE:FREQ=WEEKLY;COUNT=4",
  },
  {
    name: "Guitar Lessons",
    description:
      "An interactive session for learning advanced guitar techniques and music theory.",
    cost: 80,
    duration: 60,
    rule: "DTSTART:20240110T150000Z\nRRULE:FREQ=MONTHLY;COUNT=6",
  },
  {
    name: "Legal Advice Session",
    description:
      "Consultation on legal matters related to corporate law and contract drafting.",
    cost: 200,
    duration: 120,
    rule: "DTSTART:20240120T110000Z\nRRULE:FREQ=DAILY;COUNT=2",
  },
  {
    name: "Career Coaching",
    description:
      "Professional coaching session on personal development and career growth strategies.",
    cost: 100,
    duration: 75,
    rule: "DTSTART:20240112T140000Z\nRRULE:FREQ=MONTHLY;COUNT=3",
  },
  {
    name: "Vocal Training with Professional Singer",
    description:
      "A one-on-one vocal coaching session with techniques to improve singing range and clarity.",
    cost: 70,
    duration: 90,
    rule: "DTSTART:20240118T160000Z\nRRULE:FREQ=WEEKLY;COUNT=8",
  },
  {
    name: "Fitness and Wellness Coaching",
    description:
      "Personalized fitness and nutrition session to optimize health and wellness.",
    cost: 60,
    duration: 45,
    rule: "DTSTART:20240125T070000Z\nRRULE:FREQ=WEEKLY;COUNT=5",
  },
];
