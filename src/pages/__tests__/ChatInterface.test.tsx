// src/components/__tests__/ChatInterface.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import ChatInterface from '../ChatInterface';

describe('ChatInterface', () => {
  it('renders input and button', () => {
    render(<ChatInterface />);
    expect(screen.getByPlaceholderText(/enter your query/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ask oracle/i })).toBeInTheDocument();
  });

  it('does not call API on empty input', () => {
    render(<ChatInterface />);
    const button = screen.getByRole('button', { name: /ask oracle/i });
    fireEvent.click(button);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});
