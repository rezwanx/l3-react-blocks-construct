import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dashboard } from './dashboard';

jest.mock('@components/ui/button', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

jest.mock('features/dashboard', () => ({
  DashboardOverview: () => <div data-testid="dashboard-overview" />,
  DashboardSystemOverview: () => <div data-testid="dashboard-system-overview" />,
  DashboardUserActivityGraph: () => <div data-testid="dashboard-user-activity-graph" />,
  DashboardUserPlatform: () => <div data-testid="dashboard-user-platform" />,
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    render(<Dashboard />);
  });

  test('renders the dashboard title', () => {
    expect(screen.getByText('Dashboard (Design Only)')).toBeInTheDocument();
  });

  test('renders the Sync and Export buttons', () => {
    expect(screen.getByText('Sync')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  test('renders all child components', () => {
    expect(screen.getByTestId('dashboard-overview')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-user-platform')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-user-activity-graph')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-system-overview')).toBeInTheDocument();
  });
});
