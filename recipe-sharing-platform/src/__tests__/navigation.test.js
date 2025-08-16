import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('renders recipe links', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  const linkElements = screen.getAllByText(/view recipe/i);
  expect(linkElements.length).toBeGreaterThan(0);
  linkElements.forEach(link => {
    expect(link).toHaveAttribute('href');
  });
});
