import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dashboard } from './dashboard';
import '@testing-library/jest-dom';

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  BarChart: () => <div data-testid="mocked-bar-chart" />,
  PieChart: () => <div data-testid="mocked-pie-chart" />,
  Bar: () => <div data-testid="mocked-bar" />,
  Pie: () => <div data-testid="mocked-pie" />,
  XAxis: () => <div data-testid="mocked-x-axis" />,
  YAxis: () => <div data-testid="mocked-y-axis" />,
  CartesianGrid: () => <div data-testid="mocked-cartesian-grid" />,
  Label: () => <div data-testid="mocked-label" />,
}));

jest.mock('features/dashboard', () => ({
  CircularProgress: () => <div data-testid="mocked-circular-progress" />,
}));

describe('Dashboard Component', () => {
  test('renders the dashboard title', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard (Design Only)')).toBeInTheDocument();
  });

  test('renders the system usage overview card', () => {
    render(<Dashboard />);
    expect(screen.getByText('System usage overview')).toBeInTheDocument();
    expect(screen.getAllByTestId('mocked-circular-progress').length).toBe(3);
  });
});
