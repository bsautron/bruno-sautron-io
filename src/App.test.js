import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the masthead name', () => {
  render(<App />);
  expect(screen.getByText('Sautron')).toBeInTheDocument();
});

test('renders the employment history section', () => {
  render(<App />);
  expect(screen.getByText('Employment History')).toBeInTheDocument();
});
