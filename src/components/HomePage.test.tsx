// src/components/HomePage.test.tsx
import { render, screen } from '../test-utils';
import HomePage from './HomePage';

test('renders Home Page content', () => {
  render(<HomePage />);
  expect(screen.getByRole('heading', { name: /home page/i })).toBeInTheDocument();
});
