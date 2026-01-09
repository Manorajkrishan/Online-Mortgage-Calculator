import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResultsDisplay from './ResultsDisplay';

describe('ResultsDisplay', () => {
  const mockResults = {
    monthlyPayment: '1109.00',
    loanAmount: '200000.00',
    totalAmount: '332700.00',
    totalInterest: '132700.00',
    numberOfPayments: 300
  };

  const mockFormData = {
    propertyValue: '250000',
    deposit: '50000',
    interestRate: '4.5',
    loanTerm: '25',
    mortgageType: 'repayment'
  };

  const defaultProps = {
    results: mockResults,
    formData: mockFormData,
    onReset: jest.fn(),
    onRecalculate: jest.fn()
  };

  test('renders results display', () => {
    render(<ResultsDisplay {...defaultProps} />);
    
    expect(screen.getByText(/your mortgage calculation results/i)).toBeInTheDocument();
    expect(screen.getByText(/here is a breakdown/i)).toBeInTheDocument();
  });

  test('displays monthly payment prominently', () => {
    render(<ResultsDisplay {...defaultProps} />);
    
    expect(screen.getByText(/your monthly payment/i)).toBeInTheDocument();
    expect(screen.getByText(/£1,109.00/i)).toBeInTheDocument();
  });

  test('displays all calculation breakdowns', () => {
    render(<ResultsDisplay {...defaultProps} />);
    
    expect(screen.getByText(/loan amount/i)).toBeInTheDocument();
    expect(screen.getByText(/£200,000.00/i)).toBeInTheDocument();
    expect(screen.getByText(/monthly payment/i)).toBeInTheDocument();
    expect(screen.getByText(/total interest/i)).toBeInTheDocument();
    expect(screen.getByText(/£132,700.00/i)).toBeInTheDocument();
    expect(screen.getByText(/total amount/i)).toBeInTheDocument();
    expect(screen.getByText(/£332,700.00/i)).toBeInTheDocument();
  });

  test('displays result explanations', () => {
    render(<ResultsDisplay {...defaultProps} />);
    
    expect(screen.getByText(/the amount you are borrowing/i)).toBeInTheDocument();
    expect(screen.getByText(/what you will pay each month/i)).toBeInTheDocument();
    expect(screen.getByText(/total interest paid over 25 years/i)).toBeInTheDocument();
  });

  test('displays warning for interest-only mortgages', () => {
    const interestOnlyFormData = {
      ...mockFormData,
      mortgageType: 'interest-only'
    };
    
    render(<ResultsDisplay {...defaultProps} formData={interestOnlyFormData} />);
    
    expect(screen.getByText(/important: interest-only mortgage/i)).toBeInTheDocument();
    expect(screen.getByText(/you are only paying the interest each month/i)).toBeInTheDocument();
  });

  test('does not display warning for repayment mortgages', () => {
    render(<ResultsDisplay {...defaultProps} />);
    
    expect(screen.queryByText(/important: interest-only mortgage/i)).not.toBeInTheDocument();
  });

  test('calls onRecalculate when Calculate Again button is clicked', () => {
    const handleRecalculate = jest.fn();
    render(<ResultsDisplay {...defaultProps} onRecalculate={handleRecalculate} />);
    
    const calculateAgainButton = screen.getByRole('button', { name: /calculate again/i });
    fireEvent.click(calculateAgainButton);
    
    expect(handleRecalculate).toHaveBeenCalledTimes(1);
  });

  test('calls onReset when Start Over button is clicked', () => {
    const handleReset = jest.fn();
    render(<ResultsDisplay {...defaultProps} onReset={handleReset} />);
    
    const startOverButton = screen.getByRole('button', { name: /start over/i });
    fireEvent.click(startOverButton);
    
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  test('displays disclaimer', () => {
    render(<ResultsDisplay {...defaultProps} />);
    
    expect(screen.getByText(/disclaimer/i)).toBeInTheDocument();
    expect(screen.getByText(/these calculations are estimates only/i)).toBeInTheDocument();
  });

  test('formats currency correctly', () => {
    render(<ResultsDisplay {...defaultProps} />);
    
    // Check for properly formatted currency values
    expect(screen.getByText(/£1,109.00/i)).toBeInTheDocument();
    expect(screen.getByText(/£200,000.00/i)).toBeInTheDocument();
  });

  test('includes mortgage type in description', () => {
    render(<ResultsDisplay {...defaultProps} />);
    
    expect(screen.getByText(/repayment mortgage/i)).toBeInTheDocument();
  });

  test('includes loan term in description', () => {
    render(<ResultsDisplay {...defaultProps} />);
    
    expect(screen.getByText(/over 25 years/i)).toBeInTheDocument();
  });
});
