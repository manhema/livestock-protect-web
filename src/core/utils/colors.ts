const colors: Array<string> = [
  'var(--secondary-tree-green)',
  'var(--secondary-sunset-orange)',
  'var(--secondary-sky-blue)',
  'var(--secondary-sun-yellow)',
  'var(--secondary-tree-green)',
  'var(--secondary-sunset-orange)',
  'var(--secondary-sky-blue)',
  'var(--secondary-sun-yellow)',
  'var(--secondary-tree-green)',
  'var(--secondary-sunset-orange)',
  'var(--secondary-sky-blue)',
  'var(--secondary-sun-yellow)',
];

const _getColor = (index: number) => colors[index % colors.length];
const _getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

export default colors;
export const getColor = _getColor;
export const getRandomColor = _getRandomColor;
