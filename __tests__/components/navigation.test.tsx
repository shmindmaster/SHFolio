import { render, screen } from '@testing-library/react';
import { Navigation } from '@/components/navigation';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<Navigation />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Speaking')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('includes correct href attributes', () => {
    render(<Navigation />);
    
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Experience').closest('a')).toHaveAttribute('href', '/experience');
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '/projects');
  });

  it('renders theme toggle button', () => {
    render(<Navigation />);
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });
});