import { render, screen } from '@testing-library/react';
import App from './App';

test('renders mortgage calculator app', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /mortgage calculator/i });
  expect(heading).toBeInTheDocument();
});

test('app has skip link for accessibility', () => {
  render(<App />);
  const skipLink = screen.getByRole('link', { name: /skip to main content/i });
  expect(skipLink).toBeInTheDocument();
});
