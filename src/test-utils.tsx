import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// Create a custom render function that wraps components with necessary providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    route?: string;
    initialEntries?: string[];
  },
) => {
  const { route, initialEntries, ...renderOptions } = options || {};

  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    // For routing tests, use MemoryRouter with optional initial entries
    if (initialEntries) {
      return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;
    }

    // For regular tests, use BrowserRouter
    return <BrowserRouter>{children}</BrowserRouter>;
  };

  return render(ui, { wrapper: AllProviders, ...renderOptions });
};

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override the render method
export { customRender as render };
