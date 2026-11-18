/**
 * Project content.
 *
 * Every statement here was checked against the public repositories (README,
 * file tree and source) at github.com/AKASHgeralt. Claims we could not verify
 * are either omitted or explicitly labelled (see `notes`).
 */

export type VisualKind = 'career' | 'housing' | 'donation' | 'cnn'

export type ProjectLink = { github: string; live?: string }

export type Feature = { title: string; body: string }

export type ArchitectureLayer = { layer: string; items: string[] }

export type Fact = { value: string; label: string }

export type Project = {
  slug: string
  index: string
  name: string
  title: string
  category: string
  summary: string
  visual: VisualKind
  links: ProjectLink
  stack: string[]
  /** Short label shown on the overview, e.g. "Team project". */
  context: string
  /** Present when the project was collaborative: what I personally did. */
  role?: { heading: string; points: string[]; team: string }
  problem: string
  built: string[]
  features: Feature[]
  architecture: ArchitectureLayer[]
  concepts: string[]
  explore: string[]
  facts: Fact[]
  notes: string[]
}

export const projects: Project[] = [
  {
    slug: 'ai-career-coach',
    index: '01',
    name: 'AI Career Coach',
    title: 'AI Career Coach — AI-Powered Career Intelligence Platform',
    category: 'Applied AI · Full-stack',
    summary:
      'A career intelligence platform that helps people understand how ready they are for a target role, see exactly which skills they are missing, and decide what to do next.',
    visual: 'career',
    links: {
      github: 'https://github.com/AKASHgeralt/ai-career-coach',
      live: 'https://ai-career-coach-theta-one.vercel.app/',
    },
    stack: [
      'React 19',
      'Vite',
      'Tailwind CSS',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'Alembic',
      'Groq LLM',
      'JWT',
      'pytest',
    ],
    context: 'Flagship · Live product',
    problem:
      'Career feedback is scattered. A résumé checker, a skills list, interview practice and a GitHub profile each tell a different story, and none of them says how ready you are for a specific role or what to work on next. AI Career Coach brings those signals into one place and turns them into a single, explainable readiness score.',
    built: [
      'A React 19 single-page app with dedicated views for résumés, skill gaps, interviews, GitHub analysis, the roadmap and settings.',
      'A FastAPI backend organised as routers → services → models, with Pydantic v2 validating requests and responses.',
      'A deterministic readiness engine. The score doesn’t depend on an LLM, and a missing signal is excluded and its weight redistributed instead of being counted as zero.',
      'LLM features (learning roadmaps and mock interviews) through Groq, kept separate from the scoring logic.',
      'PostgreSQL persistence via SQLAlchemy 2.0 with Alembic migrations, plus JWT authentication with bcrypt password hashing.',
      'A pytest suite covering authentication, per-user data isolation, rate limiting, upload security, readiness scoring and LLM reliability.',
    ],
    features: [
      {
        title: 'Résumé analysis & ATS scoring',
        body: 'Extracts text from PDF résumés, detects skills and produces a six-category ATS score with suggestions. Versions are numbered and can be compared side by side.',
      },
      {
        title: 'Skill-gap engine',
        body: 'Classifies each required skill as matched, partial or missing for the chosen role, using exact matching plus a precomputed similarity table.',
      },
      {
        title: 'Readiness score',
        body: 'A weighted 0–100 score: résumé 25%, skills 35%, interview 20%, GitHub 20%. Each score comes with an explanation of how it was calculated.',
      },
      {
        title: 'Next best action',
        body: 'A rule-based engine that recommends one concrete step and cites the user’s own numbers.',
      },
      {
        title: 'Personalised roadmap',
        body: 'An LLM-generated weekly learning plan with tasks you can tick off.',
      },
      {
        title: 'Mock interviews',
        body: 'AI-generated questions that don’t repeat, with each answer scored and given written feedback.',
      },
      {
        title: 'GitHub analyzer',
        body: 'A developer score backed by evidence from public repositories, cached to stay within GitHub API rate limits.',
      },
    ],
    architecture: [
      { layer: 'Client', items: ['React 19 + Vite', 'React Router', 'Tailwind CSS', 'Framer Motion', 'Recharts'] },
      { layer: 'API', items: ['FastAPI', 'Pydantic v2', 'JWT (Bearer)', 'bcrypt'] },
      { layer: 'Intelligence', items: ['Deterministic readiness engine', 'Skill similarity table', 'Groq LLM'] },
      { layer: 'Data', items: ['PostgreSQL', 'SQLAlchemy 2.0', 'Alembic migrations'] },
      { layer: 'External', items: ['GitHub REST API', 'PyMuPDF (PDF parsing)'] },
    ],
    concepts: [
      'Explainable, deterministic scoring',
      'Weight renormalisation for missing data',
      'LLM integration with reliability safeguards',
      'Layered API architecture',
      'Relational schema design & migrations',
      'Token-based authentication',
      'Per-user data isolation',
      'Rate limiting & upload hardening',
    ],
    explore: [
      'The live application on Vercel',
      'The FastAPI backend, its services and Alembic migrations',
      'The pytest suite under backend/tests',
    ],
    facts: [
      { value: '7', label: 'target roles supported' },
      { value: '4', label: 'signals in the readiness score' },
      { value: '8', label: 'PostgreSQL tables' },
      { value: '15', label: 'backend test modules' },
    ],
    notes: [
      'The repository README gives several different totals for the number of tests, so this page counts the test modules in the repository rather than quoting a figure.',
      'The README hasn’t published any screenshots yet. The visuals on this page are illustrations of the product’s concepts, not captures of the app. The live demo shows the real interface.',
    ],
  },
  {
    slug: 'housing-price-predictor',
    index: '02',
    name: 'Housing Price Predictor',
    title: 'Machine Learning Housing Price Prediction',
    category: 'Machine Learning · Regression',
    summary:
      'A regression project that compares linear and ensemble models on the California Housing dataset, then serves the tuned model through an interactive Streamlit app.',
    visual: 'housing',
    links: { github: 'https://github.com/AKASHgeralt/Housing-Price-Predictor' },
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'GridSearchCV', 'Streamlit'],
    context: 'Machine learning',
    problem:
      'House prices depend on several interacting factors, including income, location, the age of the housing stock and how crowded an area is. This project asks how much of that variation a model can explain, and whether ensemble methods do meaningfully better than a linear baseline.',
    built: [
      'A feature-scaling step fitted on the training data and saved with the model, so the app applies exactly the same transformation at prediction time.',
      'A comparison of Linear Regression, Random Forest and XGBoost regressors.',
      'Hyperparameter tuning with GridSearchCV.',
      'A Streamlit interface that takes the eight dataset features, scales them, runs the trained model and returns an estimated price.',
    ],
    features: [
      {
        title: 'Model comparison',
        body: 'Linear Regression sets the baseline, and Random Forest and XGBoost show what non-linear ensemble methods add.',
      },
      {
        title: 'Optimisation',
        body: 'GridSearchCV searches the hyperparameter space of the chosen model.',
      },
      {
        title: 'Consistent preprocessing',
        body: 'The fitted scaler is serialised next to the model (scaler.pkl and housing_model.pkl), which prevents a mismatch between how data is scaled in training and in the app.',
      },
      {
        title: 'Prediction interface',
        body: 'Eight numeric inputs (median income, house age, average rooms, average bedrooms, population, average occupancy, latitude and longitude) return an estimated price in dollars.',
      },
    ],
    architecture: [
      { layer: 'Data', items: ['California Housing dataset', '8 numeric features'] },
      { layer: 'Preparation', items: ['Pandas', 'NumPy', 'Feature scaling'] },
      { layer: 'Models', items: ['Linear Regression', 'Random Forest', 'XGBoost', 'GridSearchCV'] },
      { layer: 'Serving', items: ['Pickled model + scaler', 'Streamlit app'] },
    ],
    concepts: [
      'Supervised regression',
      'Feature scaling',
      'Ensemble learning (bagging vs. boosting)',
      'Hyperparameter search',
      'R² as an evaluation metric',
      'Model serialisation',
    ],
    explore: ['The Streamlit app source (app.py)', 'The serialised model and scaler', 'Setup instructions in the README'],
    facts: [
      { value: '8', label: 'input features' },
      { value: '3', label: 'models compared' },
    ],
    notes: [
      'The README reports R² ≈ 0.60 for Linear Regression, ≈ 0.82 for Random Forest and ≈ 0.85 or higher for XGBoost. It doesn’t document the evaluation split, so treat these figures as indicative rather than benchmarked results.',
      'The repository contains the inference app and trained artefacts. The training notebook isn’t published there.',
    ],
  },
  {
    slug: 'rally-for-big-cats',
    index: '03',
    name: 'Rally for Big Cats',
    title: 'Rally for Big Cats — Donation Platform',
    category: 'Social impact · Frontend',
    summary:
      'A donation platform for the Rally for Big Cats 2026 conservation campaign. I built the donation interface and the payment experience on the frontend.',
    visual: 'donation',
    links: { github: 'https://github.com/AKASHgeralt/finalproject' },
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Razorpay', 'Express', 'MongoDB'],
    context: 'Team project',
    role: {
      heading: 'My contribution',
      team: 'Built collaboratively. The repository lists four contributors, and the backend services were a team effort.',
      points: [
        'Frontend development of the campaign site.',
        'The donation interface, from choosing an amount to confirmation.',
        'The payment portal and the payment experience around the Razorpay checkout.',
      ],
    },
    problem:
      'Conservation campaigns depend on public support, and a confusing donation flow loses donors at the last step. The goal was a clear, trustworthy path from learning about the campaign to completing a donation.',
    built: [
      'Donation and fundraiser modals that guide a donor through each step of the flow.',
      'The frontend payment journey that connects to the Razorpay order and verification endpoints.',
      'Campaign pages built with React, Tailwind CSS and Framer Motion.',
    ],
    features: [
      {
        title: 'Guided donation flow',
        body: 'A modal-based journey that keeps donors in context instead of sending them to a separate page.',
      },
      {
        title: 'Payment integration',
        body: 'Razorpay order creation and payment verification, plus a UPI QR option, all exposed by the project’s Express API.',
      },
      {
        title: 'Donation certificate',
        body: 'A certificate component that recognises a donor’s contribution.',
      },
      {
        title: 'Hardened API (team)',
        body: 'Rate limiting with a stricter limit on payment routes, input validation, security headers and request logging.',
      },
    ],
    architecture: [
      { layer: 'Frontend (my focus)', items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Donation & payment UI'] },
      { layer: 'Payments', items: ['Razorpay checkout', 'Order verification', 'UPI QR orders'] },
      { layer: 'Backend (team)', items: ['Express.js', 'MongoDB', 'Nodemailer'] },
    ],
    concepts: [
      'Payment UX and trust signals',
      'Third-party payment gateway integration',
      'Component-driven React UI',
      'Collaborative development',
    ],
    explore: ['The React components for the donation and payment flows', 'The Express payment routes', 'Setup notes in the README'],
    facts: [
      { value: '4', label: 'contributors' },
      { value: '3', label: 'payment endpoints' },
    ],
    notes: [
      'This was a collaborative project. I don’t claim to have built the backend or the whole platform myself.',
      'The visual on this page illustrates the donation flow. It isn’t a screenshot of the production site.',
    ],
  },
  {
    slug: 'image-classification-system',
    index: '04',
    name: 'Image Classification System',
    title: 'CNN Image Classification System',
    category: 'Deep Learning · Computer vision',
    summary:
      'A convolutional neural network trained on CIFAR-10 to recognise ten everyday object classes, served through a Streamlit app that classifies uploaded images.',
    visual: 'cnn',
    links: { github: 'https://github.com/AKASHgeralt/Image-Classification-System' },
    stack: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Pillow', 'Streamlit'],
    context: 'Deep learning',
    problem:
      'Recognising objects in images is a core computer-vision task. Fully connected networks ignore the spatial structure of pixels, so this project uses a CNN to learn local features such as edges, textures and shapes, and combines them into class predictions.',
    built: [
      'A CNN in TensorFlow/Keras built from convolution, max-pooling, dropout and dense layers.',
      'Training on CIFAR-10: 32×32 RGB images across ten classes.',
      'A saved Keras model (image_classifier.keras) that loads once when the app starts.',
      'A Streamlit app that accepts a JPG or PNG, converts it to RGB, resizes it to 32×32, scales pixels to 0–1 and returns the predicted class.',
    ],
    features: [
      {
        title: 'Dataset',
        body: 'CIFAR-10 has ten classes: airplane, automobile, bird, cat, deer, dog, frog, horse, ship and truck.',
      },
      {
        title: 'Architecture',
        body: 'Stacked Conv2D layers extract features, MaxPooling reduces spatial resolution, Dropout regularises the network and Dense layers classify.',
      },
      {
        title: 'Inference pipeline',
        body: 'The app applies the same preprocessing used in training (RGB, 32×32, 0–1 scaling, batch dimension) before calling the model.',
      },
      {
        title: 'Interactive demo',
        body: 'Upload an image and the app shows the resized input with the predicted label.',
      },
    ],
    architecture: [
      { layer: 'Input', items: ['JPG / PNG upload', 'RGB conversion', 'Resize to 32×32', 'Normalise 0–1'] },
      { layer: 'Model', items: ['Conv2D', 'MaxPooling', 'Dropout', 'Dense', 'Softmax over 10 classes'] },
      { layer: 'Serving', items: ['Keras model file', 'Streamlit'] },
    ],
    concepts: [
      'Convolutional feature extraction',
      'Pooling and spatial downsampling',
      'Dropout regularisation',
      'Multi-class classification',
      'Train/inference preprocessing parity',
    ],
    explore: ['The Streamlit inference app', 'The trained Keras model', 'Setup instructions in the README'],
    facts: [
      { value: '10', label: 'object classes' },
      { value: '32×32', label: 'RGB input' },
    ],
    notes: ['The repository doesn’t publish evaluation metrics such as test accuracy yet, so none are quoted here.'],
  },
]

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)
