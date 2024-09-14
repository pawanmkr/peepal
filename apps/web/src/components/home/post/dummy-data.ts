export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    dob: string;
    phoneCode: string;
    phoneNumber: string;
    role: string;
}

export interface Professional {
    id: string;
    description: string;
    experience: number;
    skills: string;
    rating: number;
    video: string;
    location: string;
    languages: string;
    availability: string;
    currency: string;
    charge: number;
    chargeType: string;
    days: string;
    startTime: string;
    endTime: string;
    user: User;
}

export interface Post {
    id: string;
    title: string;
    description: string; // Post description field
    date: string;
    views: number;
    professional: Professional;
}

export const users: User[] = [
    {
        id: "user1",
        username: "anita_sharma",
        firstName: "Anita",
        lastName: "Sharma",
        email: "anita.sharma@gmail.com",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        dob: "1985-04-23",
        phoneCode: "+91",
        phoneNumber: "1234567890",
        role: "Professional",
    },
    {
        id: "user2",
        username: "ravi_patel",
        firstName: "Ravi",
        lastName: "Patel",
        email: "ravi.patel@gmail.com",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        dob: "1990-03-18",
        phoneCode: "+91",
        phoneNumber: "9876543210",
        role: "Professional",
    },
    // Add more users as needed
];

export const professionals: Professional[] = [
    {
        id: "1",
        description:
            "Experienced professional specializing in problem-solving skills.",
        experience: 10,
        skills: "Problem solving, Communication",
        rating: 4.8,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        location: "Delhi, India",
        languages: "English, Hindi",
        availability: "Weekdays",
        currency: "INR",
        charge: 40,
        chargeType: "hourly",
        days: "Monday, Wednesday, Friday",
        startTime: "09:15:00",
        endTime: "17:00:00",
        user: users[0],
    },
    {
        id: "2",
        description: "Expert in mathematics with a passion for teaching.",
        experience: 5,
        skills: "Mathematical concepts, Analytical thinking",
        rating: 4.5,
        video: "https://www.youtube.com/embed/tgbNymZ7vqY",
        location: "Mumbai, India",
        languages: "Hindi, English",
        availability: "Weekends",
        currency: "INR",
        charge: 50,
        chargeType: "hourly",
        days: "Saturday, Sunday",
        startTime: "10:00:00",
        endTime: "18:00:00",
        user: users[1],
    },
    // Add more professionals as needed
];

export const posts: Post[] = [
    {
        id: "post1",
        title: "Master Problem Solving Skills",
        description:
            "Join this session to enhance your problem-solving techniques.",
        date: "2024-09-04",
        views: 1200,
        professional: professionals[0],
    },
    {
        id: "post2",
        title: "Advanced Math Concepts",
        description: "Get a deep dive into advanced mathematical concepts.",
        date: "2024-08-12",
        views: 1500,
        professional: professionals[1],
    },
    {
        id: "post3",
        title: "Beginner's Guide to Data Science",
        description:
            "An introductory session to start your journey in Data Science.",
        date: "2024-07-15",
        views: 980,
        professional: professionals[0],
    },
    {
        id: "post4",
        title: "Effective Communication Skills",
        description:
            "Learn the art of effective communication in professional environments.",
        date: "2024-06-21",
        views: 1100,
        professional: professionals[1],
    },
    {
        id: "post5",
        title: "Understanding Basic Algorithms",
        description:
            "A session focused on understanding and solving basic algorithms.",
        date: "2024-08-30",
        views: 1350,
        professional: professionals[0],
    },
    {
        id: "post6",
        title: "Introduction to Calculus",
        description:
            "Get familiar with basic calculus concepts in this session.",
        date: "2024-07-10",
        views: 920,
        professional: professionals[1],
    },
    {
        id: "post7",
        title: "Improve Problem-Solving Speed",
        description:
            "Develop techniques to improve your speed in solving problems.",
        date: "2024-08-22",
        views: 1600,
        professional: professionals[0],
    },
    {
        id: "post8",
        title: "Mastering Geometry",
        description:
            "Explore advanced concepts in geometry with practical examples.",
        date: "2024-09-01",
        views: 1050,
        professional: professionals[1],
    },
    {
        id: "post9",
        title: "Logical Reasoning and Puzzles",
        description:
            "Enhance your logical reasoning by solving complex puzzles.",
        date: "2024-07-20",
        views: 1450,
        professional: professionals[0],
    },
    {
        id: "post10",
        title: "Basic Arithmetic for Beginners",
        description: "Master basic arithmetic in a simple and fun way.",
        date: "2024-06-30",
        views: 750,
        professional: professionals[1],
    },
];

export interface Topic {
    name: string;
    benefits: string[];
    category: string;
    description: string;
}
export const topics: Topic[] = [
    {
        name: "Latte Art",
        benefits: [
            "Enhances coffee presentation",
            "Boosts barista skills",
            "Impresses customers",
        ],
        category: "Culinary Arts",
        description:
            "Create intricate designs on coffee using steamed milk, improving visual appeal and demonstrating advanced barista techniques.",
    },
    {
        name: "Drone Photography",
        benefits: [
            "Unique aerial perspectives",
            "Enhances videography skills",
            "Expands creative possibilities",
        ],
        category: "Photography",
        description:
            "Capture stunning aerial images and videos using drones, mastering flight controls and composition techniques.",
    },
    {
        name: "Calligraphy",
        benefits: [
            "Improves handwriting",
            "Creates beautiful art",
            "Enhances focus",
        ],
        category: "Visual Arts",
        description:
            "Master the art of beautiful handwriting, learning various styles and techniques to create stunning written pieces.",
    },
    {
        name: "Podcasting",
        benefits: [
            "Improves communication skills",
            "Builds personal brand",
            "Shares knowledge",
        ],
        category: "Digital Media",
        description:
            "Learn to plan, record, edit, and publish engaging audio content on specific topics for a targeted audience.",
    },
    {
        name: "3D Printing",
        benefits: [
            "Creates custom objects",
            "Develops spatial thinking",
            "Encourages innovation",
        ],
        category: "Manufacturing",
        description:
            "Master the process of creating three-dimensional objects from digital models using additive manufacturing techniques.",
    },
    {
        name: "Bonsai Cultivation",
        benefits: [
            "Develops patience",
            "Enhances gardening skills",
            "Creates living art",
        ],
        category: "Horticulture",
        description:
            "Learn the ancient Japanese art of growing and shaping miniature trees in containers.",
    },
    {
        name: "Beatboxing",
        benefits: [
            "Improves rhythm",
            "Enhances vocal control",
            "Entertaining skill",
        ],
        category: "Music Performance",
        description:
            "Master the art of vocal percussion, creating drum sounds and music using only your mouth.",
    },
    {
        name: "Digital Illustration",
        benefits: [
            "Enhances creativity",
            "Develops digital skills",
            "Creates marketable art",
        ],
        category: "Graphic Design",
        description:
            "Learn to create stunning digital artwork using software like Procreate or Adobe Illustrator.",
    },
    {
        name: "Lockpicking",
        benefits: [
            "Understands security mechanisms",
            "Develops fine motor skills",
            "Useful in emergencies",
        ],
        category: "Security",
        description:
            "Learn the techniques of manipulating locks without keys for educational and ethical purposes.",
    },
    {
        name: "Astro-photography",
        benefits: [
            "Captures celestial beauty",
            "Improves photography skills",
            "Increases astronomy knowledge",
        ],
        category: "Photography",
        description:
            "Master the art of photographing astronomical objects and areas of the night sky.",
    },
    {
        name: "Origami",
        benefits: [
            "Enhances spatial awareness",
            "Improves concentration",
            "Creates beautiful art",
        ],
        category: "Paper Crafts",
        description:
            "Learn the Japanese art of paper folding to create intricate designs and sculptures.",
    },
    {
        name: "Speed Reading",
        benefits: [
            "Increases reading speed",
            "Improves comprehension",
            "Saves time",
        ],
        category: "Personal Development",
        description:
            "Master techniques to rapidly process written information while maintaining or improving comprehension.",
    },
    {
        name: "Hydroponics",
        benefits: [
            "Grows food without soil",
            "Conserves water",
            "Increases crop yield",
        ],
        category: "Agriculture",
        description:
            "Learn to cultivate plants using mineral nutrient solutions in water without soil.",
    },
    {
        name: "Rubik's Cube Solving",
        benefits: [
            "Enhances problem-solving skills",
            "Improves memory",
            "Impressive party trick",
        ],
        category: "Puzzle Solving",
        description:
            "Master techniques to solve the Rubik's Cube quickly and efficiently.",
    },
    {
        name: "Voice Acting",
        benefits: [
            "Improves vocal control",
            "Enhances expressiveness",
            "Opens career opportunities",
        ],
        category: "Performing Arts",
        description:
            "Learn to use your voice to bring characters to life in animations, video games, and commercials.",
    },
    {
        name: "Lego Sculpture",
        benefits: [
            "Enhances creativity",
            "Improves spatial thinking",
            "Creates unique art",
        ],
        category: "Sculpture",
        description:
            "Master the art of creating complex sculptures and models using Lego bricks.",
    },
    {
        name: "Poker Strategy",
        benefits: [
            "Improves decision-making",
            "Enhances probability understanding",
            "Develops emotional control",
        ],
        category: "Game Theory",
        description:
            "Learn advanced strategies and psychological aspects of poker for recreational or competitive play.",
    },
    {
        name: "Pen Spinning",
        benefits: ["Improves dexterity", "Reduces stress", "Impressive skill"],
        category: "Object Manipulation",
        description:
            "Master the art of manipulating a pen around the fingers and hand in visually impressive ways.",
    },
    {
        name: "Balloon Animal Making",
        benefits: [
            "Entertains children",
            "Improves manual dexterity",
            "Boosts creativity",
        ],
        category: "Entertainment",
        description:
            "Learn to create various animal shapes and objects using specially designed balloons.",
    },
    {
        name: "Crochet",
        benefits: [
            "Creates handmade items",
            "Reduces stress",
            "Improves focus",
        ],
        category: "Textile Arts",
        description:
            "Master the art of creating fabric by interlocking loops of yarn, thread, or strands with a crochet hook.",
    },
    {
        name: "Bookbinding",
        benefits: [
            "Creates custom notebooks",
            "Preserves documents",
            "Develops craftsmanship",
        ],
        category: "Paper Crafts",
        description:
            "Learn to assemble books by hand, including sewing, gluing, and creating decorative covers.",
    },
    {
        name: "Pixel Art",
        benefits: [
            "Enhances digital creativity",
            "Develops precision",
            "Creates retro-style graphics",
        ],
        category: "Digital Art",
        description:
            "Master the art of creating digital images through precise placement of individual pixels.",
    },
    {
        name: "Fermentation",
        benefits: [
            "Creates probiotic foods",
            "Enhances cooking skills",
            "Improves gut health",
        ],
        category: "Culinary Arts",
        description:
            "Learn to preserve and transform foods through controlled microbial growth, creating unique flavors and health benefits.",
    },
    {
        name: "Juggling",
        benefits: [
            "Improves hand-eye coordination",
            "Enhances concentration",
            "Entertaining skill",
        ],
        category: "Object Manipulation",
        description:
            "Master the art of keeping multiple objects in continuous motion through the air by tossing and catching.",
    },
    {
        name: "Worldbuilding",
        benefits: [
            "Enhances creativity",
            "Improves storytelling",
            "Develops logical thinking",
        ],
        category: "Creative Writing",
        description:
            "Learn to create detailed, coherent fictional universes for stories, games, or personal enjoyment.",
    },
    {
        name: "Knife Throwing",
        benefits: ["Improves aim", "Enhances focus", "Unique skill"],
        category: "Target Sports",
        description:
            "Master the technique of accurately throwing knives at targets, developing precision and control.",
    },
    {
        name: "Shorthand Writing",
        benefits: [
            "Increases note-taking speed",
            "Improves efficiency",
            "Useful for journalists",
        ],
        category: "Communication",
        description:
            "Learn abbreviated symbolic writing methods to quickly record the spoken word.",
    },
    {
        name: "Soap Making",
        benefits: [
            "Creates custom products",
            "Understands chemistry",
            "Potential business opportunity",
        ],
        category: "Crafts",
        description:
            "Learn to create various types of soap using different ingredients and techniques.",
    },
    {
        name: "Cardistry",
        benefits: [
            "Improves dexterity",
            "Enhances focus",
            "Impressive visual skill",
        ],
        category: "Object Manipulation",
        description:
            "Master the art of creating intricate displays through the manipulation of playing cards.",
    },
    {
        name: "Upcycling",
        benefits: [
            "Reduces waste",
            "Enhances creativity",
            "Creates unique items",
        ],
        category: "Sustainable Crafts",
        description:
            "Learn to transform by-products, waste materials, or unwanted products into new materials or products of better quality.",
    },
];

// Example comments for demo purpose
export const initialComments = [
    {
        id: 1,
        text: "Great post!",
        user: "User1",
        timestamp: "1d ago",
        likes: 0,
        dislikes: 0,
    },
    {
        id: 2,
        text: "Very informative.",
        user: "User2",
        timestamp: "2d ago",
        likes: 0,
        dislikes: 0,
    },
    {
        id: 3,
        text: "Thanks for sharing!",
        user: "User3",
        timestamp: "3d ago",
        likes: 0,
        dislikes: 0,
    },
    {
        id: 4,
        text: "Nice post!",
        user: "User4",
        timestamp: "4d ago",
        likes: 100,
        dislikes: 0,
    },
];
