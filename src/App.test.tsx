// src/App.test.tsx
import { render, screen, within } from '@testing-library/react';
import React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import App from './App';

test('renders navigation links', () => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
      },
    ],
    { initialEntries: ['/'] },
  );

  render(<RouterProvider router={router} />);

  const nav = screen.getByRole('navigation');
  expect(within(nav).getByText(/home/i)).toBeInTheDocument();
  expect(within(nav).getByText(/about/i)).toBeInTheDocument();
  expect(within(nav).getByText(/chat/i)).toBeInTheDocument();
  expect(within(nav).getByText(/transcripts/i)).toBeInTheDocument(); // ✅ Added test
});
