// src/components/_tests_/Header.test.tsx
import { screen } from '@testing-library/react';

test('renders My App brand', () => {
  expect(screen.getByText(/My App/i)).toBeInTheDocument(); // <-- match the real text
});
