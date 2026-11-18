/**
 * Skill inventory. `projects` lists the slugs of projects on this site where
 * the technology is verifiably used (and, for team projects, where it was
 * part of my own contribution). Skills with no slug are ones I work with
 * outside the projects featured here.
 */

export type Skill = { name: string; projects?: string[] }

export type SkillGroup = { id: string; label: string; blurb: string; skills: Skill[] }

const CC = 'ai-career-coach'
const HP = 'housing-price-predictor'
const BC = 'rally-for-big-cats'
const IC = 'image-classification-system'

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Programming',
    blurb: 'The languages I think and build in.',
    skills: [
      { name: 'Python', projects: [CC, HP, IC] },
      { name: 'JavaScript', projects: [CC, BC] },
      { name: 'SQL', projects: [CC] },
      { name: 'C' },
      { name: 'C++' },
    ],
  },
  {
    id: 'ml',
    label: 'AI / Machine Learning',
    blurb: 'Data, models and the maths underneath them.',
    skills: [
      { name: 'Machine Learning', projects: [HP] },
      { name: 'Deep Learning', projects: [IC] },
      { name: 'Neural Networks', projects: [IC] },
      { name: 'CNN', projects: [IC] },
      { name: 'NumPy', projects: [HP, IC] },
      { name: 'Pandas', projects: [HP] },
      { name: 'Scikit-learn', projects: [HP] },
      { name: 'XGBoost', projects: [HP] },
      { name: 'TensorFlow / Keras', projects: [IC] },
      { name: 'PyTorch' },
      { name: 'LLM integration', projects: [CC] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    blurb: 'Interfaces that make the system usable.',
    skills: [
      { name: 'React', projects: [CC, BC] },
      { name: 'HTML', projects: [CC, BC] },
      { name: 'CSS', projects: [CC, BC] },
      { name: 'Tailwind CSS', projects: [CC, BC] },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    blurb: 'APIs and services that connect models to products.',
    skills: [
      { name: 'FastAPI', projects: [CC] },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'JWT auth', projects: [CC] },
    ],
  },
  {
    id: 'data',
    label: 'Databases',
    blurb: 'Where state lives.',
    skills: [
      { name: 'PostgreSQL', projects: [CC] },
      { name: 'SQLAlchemy', projects: [CC] },
      { name: 'MySQL' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    blurb: 'The workflow around the code.',
    skills: [
      { name: 'Git', projects: [CC, HP, BC, IC] },
      { name: 'GitHub', projects: [CC, HP, BC, IC] },
      { name: 'Streamlit', projects: [HP, IC] },
      { name: 'Alembic', projects: [CC] },
      { name: 'pytest', projects: [CC] },
      { name: 'Postman' },
    ],
  },
]
