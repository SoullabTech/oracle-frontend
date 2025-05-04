// src/components/__tests__/MemoryInsights.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import MemoryInsights from '../MemoryInsights';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: ['Insight 1', 'Insight 2'] })),
}));

test('renders insights correctly', async () => {
  render(<MemoryInsights />);

  // Wait for the insights to be loaded
  await waitFor(() => screen.getByText('Insight 1'));

  expect(screen.getByText('Insight 1')).toBeInTheDocument();
  expect(screen.getByText('Insight 2')).toBeInTheDocument();
});
