// src/App.test.tsx
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

test('renders navigation links', () => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
      }
    ],
    { initialEntries: ['/'] }
  );

  render(<RouterProvider router={router} />);

  const nav = screen.getByRole('navigation');
  expect(within(nav).getByText(/home/i)).toBeInTheDocument();
  expect(within(nav).getByText(/about/i)).toBeInTheDocument();
  expect(within(nav).getByText(/chat/i)).toBeInTheDocument();
  expect(within(nav).getByText(/transcripts/i)).toBeInTheDocument(); // ✅ Added test
});
