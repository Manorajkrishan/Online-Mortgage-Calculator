import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputField from './InputField';

describe('InputField', () => {
  const defaultProps = {
    label: 'Test Field',
    name: 'testField',
    value: '',
    onChange: jest.fn(),
  };

  test('renders input field with label', () => {
    render(<InputField {...defaultProps} />);
    expect(screen.getByLabelText(/test field/i)).toBeInTheDocument();
  });

  test('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<InputField {...defaultProps} onChange={handleChange} />);
    
    const input = screen.getByLabelText(/test field/i);
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(handleChange).toHaveBeenCalledWith('testField', 'test value');
  });

  test('calls onBlur when field is blurred', () => {
    const handleBlur = jest.fn();
    render(<InputField {...defaultProps} onBlur={handleBlur} />);
    
    const input = screen.getByLabelText(/test field/i);
    fireEvent.blur(input, { target: { value: 'test value' } });
    
    expect(handleBlur).toHaveBeenCalledWith('testField', 'test value');
  });

  test('displays error message when error prop is provided', () => {
    render(<InputField {...defaultProps} error="This field is required" />);
    
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('shows required indicator when required', () => {
    render(<InputField {...defaultProps} required />);
    
    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
  });

  test('displays prefix when provided', () => {
    render(<InputField {...defaultProps} prefix="£" />);
    
    expect(screen.getByText('£')).toBeInTheDocument();
  });

  test('displays suffix when provided', () => {
    render(<InputField {...defaultProps} suffix="%" />);
    
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  test('shows tooltip when tooltip prop is provided', async () => {
    render(<InputField {...defaultProps} tooltip="This is a helpful tooltip" />);
    
    const tooltipButton = screen.getByRole('button', { name: /more information about test field/i });
    expect(tooltipButton).toBeInTheDocument();
    
    tooltipButton.focus();
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText(/this is a helpful tooltip/i)).toBeInTheDocument();
    });
  });

  test('tooltip can be toggled with button click', async () => {
    render(<InputField {...defaultProps} tooltip="Help text" />);
    
    const tooltipButton = screen.getByRole('button');
    
    // Click to open
    fireEvent.click(tooltipButton);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    // Click to close
    fireEvent.click(tooltipButton);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  test('has proper ARIA attributes when error exists', () => {
    render(<InputField {...defaultProps} error="Error message" />);
    
    const input = screen.getByLabelText(/test field/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'testField-error');
  });

  test('has proper ARIA attributes when tooltip exists', () => {
    render(<InputField {...defaultProps} tooltip="Help text" />);
    
    const tooltipButton = screen.getByRole('button');
    expect(tooltipButton).toHaveAttribute('aria-label');
    expect(tooltipButton).toHaveAttribute('aria-expanded');
  });

  test('supports number input type', () => {
    render(<InputField {...defaultProps} type="number" />);
    
    const input = screen.getByLabelText(/test field/i);
    expect(input).toHaveAttribute('type', 'number');
  });

  test('applies placeholder when provided', () => {
    render(<InputField {...defaultProps} placeholder="Enter value" />);
    
    const input = screen.getByPlaceholderText(/enter value/i);
    expect(input).toBeInTheDocument();
  });
});
