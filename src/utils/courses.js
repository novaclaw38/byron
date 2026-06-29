export const COURSES = [
  {
    id: 'gardening',
    title: 'Gardening for Kids',
    emoji: '🌱',
    color: ['#14532d', '#166534'],
    description: 'Learn to grow your own food and care for plants',
    lessons: [
      {
        id: 'seeds',
        title: 'How Seeds Grow',
        emoji: '🌰',
        prompt: 'You are teaching a child about seed germination. Explain in simple, exciting terms how a tiny seed turns into a plant — the seed coat, the embryo, how water and warmth wake it up. Ask the child questions along the way to check understanding. Keep responses under 60 words each.',
      },
      {
        id: 'soil',
        title: 'What Plants Need',
        emoji: '☀️',
        prompt: 'You are teaching a child about what plants need to grow: sunlight, water, soil nutrients, and air. Use fun analogies (plants eat sunlight like we eat food). Ask quiz-style questions as you go. Keep responses under 60 words.',
      },
      {
        id: 'grow',
        title: 'Grow Your First Plant',
        emoji: '🪴',
        prompt: 'Guide the child step-by-step through planting a bean seed at home. List the materials they need, then walk through each step conversationally. Encourage them to try it. Keep responses under 60 words and be enthusiastic.',
      },
      {
        id: 'bugs',
        title: 'Garden Helpers & Bugs',
        emoji: '🐛',
        prompt: 'Teach the child about helpful garden insects — bees pollinating flowers, earthworms improving soil, ladybugs eating pests. Make it fun and interactive. Ask "which bug is your favourite?" type questions. Keep responses under 60 words.',
      },
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics for Kids',
    emoji: '🤖',
    color: ['#1e3a8a', '#1e40af'],
    description: 'Discover how robots work and learn to think like an engineer',
    lessons: [
      {
        id: 'what',
        title: 'What is a Robot?',
        emoji: '🦾',
        prompt: 'Teach the child what a robot is — a machine that can sense, think, and act. Give fun examples (robot vacuum, car factory robots, Mars rovers). Ask the child to name a robot they know. Keep responses under 60 words.',
      },
      {
        id: 'sensors',
        title: 'How Robots See & Feel',
        emoji: '👁️',
        prompt: 'Explain sensors to the child — cameras (eyes), microphones (ears), touch sensors (skin). Compare to human senses. Ask "what sensor would help a robot cook food?" type questions. Keep responses under 60 words and be playful.',
      },
      {
        id: 'code',
        title: 'Giving Robots Instructions',
        emoji: '💻',
        prompt: 'Introduce the concept of coding to the child using a robot analogy. Explain that code is like a recipe — step by step instructions. Walk through a simple "robot morning routine" algorithm together. Keep responses under 60 words.',
      },
      {
        id: 'build',
        title: 'Design Your Own Robot',
        emoji: '🔧',
        prompt: 'Guide the child to imagine and design their own robot. Ask: what problem does it solve? What sensors does it need? What does it look like? Be enthusiastic about their ideas and build on them. Keep responses under 60 words.',
      },
    ],
  },
  {
    id: 'science',
    title: 'Science Experiments',
    emoji: '🔬',
    color: ['#7c2d12', '#9a3412'],
    description: 'Do fun experiments and discover how the world works',
    lessons: [
      {
        id: 'volcano',
        title: 'Baking Soda Volcano',
        emoji: '🌋',
        prompt: 'Walk the child through making a baking soda and vinegar volcano at home. Explain WHY it fizzes (acid + base reaction) in simple terms. List the materials first. Keep responses under 60 words and build excitement.',
      },
      {
        id: 'rainbow',
        title: 'Make a Rainbow',
        emoji: '🌈',
        prompt: 'Teach the child how to make a rainbow with a glass of water and sunlight, and explain that white light contains all colours. Keep it magical and curious in tone. Ask questions to check understanding. Under 60 words.',
      },
      {
        id: 'float',
        title: 'Why Things Float',
        emoji: '🚢',
        prompt: 'Explain buoyancy to the child using a boat analogy. Why does a heavy ship float but a coin sinks? Guide them to test objects at home. Keep responses under 60 words and interactive.',
      },
    ],
  },
]
