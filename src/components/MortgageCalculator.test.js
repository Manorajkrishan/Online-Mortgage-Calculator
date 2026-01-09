import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MortgageCalculator from './MortgageCalculator';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('MortgageCalculator', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test('renders calculator with header', () => {
    render(<MortgageCalculator />);
    expect(screen.getByRole('heading', { name: /mortgage calculator/i })).toBeInTheDocument();
    expect(screen.getByText(/calculate your monthly mortgage payments/i)).toBeInTheDocument();
  });

  test('displays progress indicator with 4 steps', () => {
    render(<MortgageCalculator />);
    expect(screen.getByRole('navigation', { name: /progress/i })).toBeInTheDocument();
    expect(screen.getByText(/property details/i)).toBeInTheDocument();
    expect(screen.getByText(/loan details/i)).toBeInTheDocument();
    expect(screen.getByText(/mortgage type/i)).toBeInTheDocument();
    expect(screen.getByText(/results/i)).toBeInTheDocument();
  });

  test('shows step 1 (Property Details) by default', () => {
    render(<MortgageCalculator />);
    expect(screen.getByRole('region', { name: /property details/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/property value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/deposit amount/i)).toBeInTheDocument();
  });

  test('validates property value is required', async () => {
    render(<MortgageCalculator />);
    const nextButton = screen.getByRole('button', { name: /next/i });
    
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText(/property value is required/i)).toBeInTheDocument();
    });
  });

  test('validates property value is a positive number', async () => {
    render(<MortgageCalculator />);
    const propertyValueInput = screen.getByLabelText(/property value/i);
    
    fireEvent.change(propertyValueInput, { target: { value: '-1000' } });
    fireEvent.blur(propertyValueInput);
    
    await waitFor(() => {
      expect(screen.getByText(/property value must be a positive number/i)).toBeInTheDocument();
    });
  });

  test('validates property value minimum', async () => {
    render(<MortgageCalculator />);
    const propertyValueInput = screen.getByLabelText(/property value/i);
    
    fireEvent.change(propertyValueInput, { target: { value: '5000' } });
    fireEvent.blur(propertyValueInput);
    
    await waitFor(() => {
      expect(screen.getByText(/property value must be at least £10,000/i)).toBeInTheDocument();
    });
  });

  test('validates deposit is less than property value', async () => {
    render(<MortgageCalculator />);
    const propertyValueInput = screen.getByLabelText(/property value/i);
    const depositInput = screen.getByLabelText(/deposit amount/i);
    
    fireEvent.change(propertyValueInput, { target: { value: '200000' } });
    fireEvent.change(depositInput, { target: { value: '250000' } });
    fireEvent.blur(depositInput);
    
    await waitFor(() => {
      expect(screen.getByText(/deposit must be less than property value/i)).toBeInTheDocument();
    });
  });

  test('navigates to step 2 when step 1 is valid', async () => {
    render(<MortgageCalculator />);
    const propertyValueInput = screen.getByLabelText(/property value/i);
    const depositInput = screen.getByLabelText(/deposit amount/i);
    const nextButton = screen.getByRole('button', { name: /next/i });
    
    fireEvent.change(propertyValueInput, { target: { value: '250000' } });
    fireEvent.change(depositInput, { target: { value: '50000' } });
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByRole('region', { name: /loan details/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/annual interest rate/i)).toBeInTheDocument();
    });
  });

  test('navigates back to step 1 from step 2', async () => {
    render(<MortgageCalculator />);
    const propertyValueInput = screen.getByLabelText(/property value/i);
    const depositInput = screen.getByLabelText(/deposit amount/i);
    const nextButton = screen.getByRole('button', { name: /next/i });
    
    // Go to step 2
    fireEvent.change(propertyValueInput, { target: { value: '250000' } });
    fireEvent.change(depositInput, { target: { value: '50000' } });
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByRole('region', { name: /loan details/i })).toBeInTheDocument();
    });
    
    // Go back
    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);
    
    await waitFor(() => {
      expect(screen.getByRole('region', { name: /property details/i })).toBeInTheDocument();
    });
  });

  test('validates interest rate is between 0.1% and 20%', async () => {
    render(<MortgageCalculator />);
    
    // Navigate to step 2
    const propertyValueInput = screen.getByLabelText(/property value/i);
    const depositInput = screen.getByLabelText(/deposit amount/i);
    fireEvent.change(propertyValueInput, { target: { value: '250000' } });
    fireEvent.change(depositInput, { target: { value: '50000' } });
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    
    await waitFor(() => {
      const interestRateInput = screen.getByLabelText(/annual interest rate/i);
      fireEvent.change(interestRateInput, { target: { value: '25' } });
      fireEvent.blur(interestRateInput);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/interest rate cannot exceed 20%/i)).toBeInTheDocument();
    });
  });

  test('calculates repayment mortgage correctly', async () => {
    render(<MortgageCalculator />);
    const user = userEvent.setup();
    
    // Step 1: Property Details
    const propertyValueInput = screen.getByLabelText(/property value/i);
    const depositInput = screen.getByLabelText(/deposit amount/i);
    await user.type(propertyValueInput, '250000');
    await user.type(depositInput, '50000');
    await user.click(screen.getByRole('button', { name: /next/i }));
    
    // Step 2: Loan Details
    await waitFor(() => {
      expect(screen.getByLabelText(/annual interest rate/i)).toBeInTheDocument();
    });
    
    const interestRateInput = screen.getByLabelText(/annual interest rate/i);
    const loanTermInput = screen.getByLabelText(/loan term/i);
    await user.clear(interestRateInput);
    await user.type(interestRateInput, '4.5');
    await user.clear(loanTermInput);
    await user.type(loanTermInput, '25');
    await user.click(screen.getByRole('button', { name: /next/i }));
    
    // Step 3: Mortgage Type
    await waitFor(() => {
      expect(screen.getByLabelText(/mortgage type/i)).toBeInTheDocument();
    });
    
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    
    // Step 4: Results
    await waitFor(() => {
      expect(screen.getByText(/your mortgage calculation results/i)).toBeInTheDocument();
    });
    
    // Check results are displayed
    expect(screen.getByText(/£200,000.00/i)).toBeInTheDocument(); // Loan amount
    expect(screen.getByText(/monthly payment/i)).toBeInTheDocument();
  });

  test('saves data to localStorage', async () => {
    render(<MortgageCalculator />);
    const propertyValueInput = screen.getByLabelText(/property value/i);
    
    fireEvent.change(propertyValueInput, { target: { value: '250000' } });
    
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });

  test('shows resume prompt when saved data exists', () => {
    const savedData = {
      propertyValue: '250000',
      deposit: '50000',
      interestRate: '4.5',
      loanTerm: '25',
      mortgageType: 'repayment'
    };
    
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'mortgageCalculatorData') {
        return JSON.stringify(savedData);
      }
      if (key === 'mortgageCalculatorTimestamp') {
        return Date.now().toString(); // Recent timestamp
      }
      return null;
    });
    
    render(<MortgageCalculator />);
    
    expect(screen.getByText(/resume your calculation/i)).toBeInTheDocument();
  });

  test('resumes calculation when resume button is clicked', () => {
    const savedData = {
      propertyValue: '250000',
      deposit: '50000',
      interestRate: '4.5',
      loanTerm: '25',
      mortgageType: 'repayment'
    };
    
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'mortgageCalculatorData') {
        return JSON.stringify(savedData);
      }
      if (key === 'mortgageCalculatorStep') {
        return '2';
      }
      if (key === 'mortgageCalculatorTimestamp') {
        return Date.now().toString();
      }
      return null;
    });
    
    render(<MortgageCalculator />);
    
    const resumeButton = screen.getByRole('button', { name: /resume/i });
    fireEvent.click(resumeButton);
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('mortgageCalculatorData');
  });

  test('starts fresh when start fresh button is clicked', () => {
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'mortgageCalculatorData') {
        return JSON.stringify({ propertyValue: '250000' });
      }
      if (key === 'mortgageCalculatorTimestamp') {
        return Date.now().toString();
      }
      return null;
    });
    
    render(<MortgageCalculator />);
    
    const startFreshButton = screen.getByRole('button', { name: /start fresh/i });
    fireEvent.click(startFreshButton);
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('mortgageCalculatorData');
  });

  test('back button is disabled on step 1', () => {
    render(<MortgageCalculator />);
    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeDisabled();
  });

  test('accessibility: has proper ARIA labels', () => {
    render(<MortgageCalculator />);
    
    // Check progress indicator has proper ARIA
    const progressNav = screen.getByRole('navigation', { name: /progress/i });
    expect(progressNav).toBeInTheDocument();
    
    // Check form fields have labels
    const propertyValueInput = screen.getByLabelText(/property value/i);
    expect(propertyValueInput).toHaveAttribute('aria-required', 'true');
  });

  test('accessibility: tooltips are keyboard accessible', async () => {
    render(<MortgageCalculator />);
    const tooltipButton = screen.getByRole('button', { name: /more information about property value/i });
    
    expect(tooltipButton).toBeInTheDocument();
    
    tooltipButton.focus();
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });
});
