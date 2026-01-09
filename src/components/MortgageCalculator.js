import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import ResultsDisplay from './ResultsDisplay';
import './MortgageCalculator.css';

const MortgageCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyValue: '',
    deposit: '',
    interestRate: '',
    loanTerm: '25',
    mortgageType: 'repayment'
  });

  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [hasLoadedSavedData, setHasLoadedSavedData] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('mortgageCalculatorData');
    const savedStep = localStorage.getItem('mortgageCalculatorStep');
    const savedTimestamp = localStorage.getItem('mortgageCalculatorTimestamp');
    
    if (savedData && !hasLoadedSavedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Check if saved data is recent (within 7 days)
        const isRecent = savedTimestamp && (Date.now() - parseInt(savedTimestamp)) < 7 * 24 * 60 * 60 * 1000;
        
        if (isRecent && Object.values(parsed).some(val => val !== '' && val !== null)) {
          setShowResumePrompt(true);
        } else {
          // Clear old data
          localStorage.removeItem('mortgageCalculatorData');
          localStorage.removeItem('mortgageCalculatorStep');
          localStorage.removeItem('mortgageCalculatorTimestamp');
        }
      } catch (e) {
        console.error('Error loading saved data:', e);
        localStorage.removeItem('mortgageCalculatorData');
      }
      setHasLoadedSavedData(true);
    }
  }, [hasLoadedSavedData]);

  // Auto-save to localStorage (debounced)
  useEffect(() => {
    if (hasLoadedSavedData) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('mortgageCalculatorData', JSON.stringify(formData));
        localStorage.setItem('mortgageCalculatorStep', currentStep.toString());
        localStorage.setItem('mortgageCalculatorTimestamp', Date.now().toString());
      }, 500); // Debounce by 500ms
      
      return () => clearTimeout(timeoutId);
    }
  }, [formData, currentStep, hasLoadedSavedData]);

  // Resume saved calculation
  const handleResume = () => {
    const savedData = localStorage.getItem('mortgageCalculatorData');
    const savedStep = localStorage.getItem('mortgageCalculatorStep');
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        if (savedStep) {
          setCurrentStep(parseInt(savedStep));
        }
      } catch (e) {
        console.error('Error resuming saved data:', e);
      }
    }
    setShowResumePrompt(false);
  };

  // Start fresh
  const handleStartFresh = () => {
    localStorage.removeItem('mortgageCalculatorData');
    localStorage.removeItem('mortgageCalculatorStep');
    localStorage.removeItem('mortgageCalculatorTimestamp');
    setShowResumePrompt(false);
    setFormData({
      propertyValue: '',
      deposit: '',
      interestRate: '',
      loanTerm: '25',
      mortgageType: 'repayment'
    });
    setCurrentStep(1);
    setErrors({});
  };

  // Validate individual field (for inline validation)
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'propertyValue':
        if (!value || value.trim() === '') {
          newErrors.propertyValue = 'Property value is required';
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          newErrors.propertyValue = 'Property value must be a positive number';
        } else if (parseFloat(value) < 10000) {
          newErrors.propertyValue = 'Property value must be at least £10,000';
        } else if (parseFloat(value) > 10000000) {
          newErrors.propertyValue = 'Property value cannot exceed £10,000,000';
        } else {
          delete newErrors.propertyValue;
        }
        break;
        
      case 'deposit':
        if (!value || value.trim() === '') {
          newErrors.deposit = 'Deposit amount is required';
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          newErrors.deposit = 'Deposit must be a positive number';
        } else if (formData.propertyValue && parseFloat(value) >= parseFloat(formData.propertyValue)) {
          newErrors.deposit = 'Deposit must be less than property value';
        } else if (formData.propertyValue && parseFloat(value) < parseFloat(formData.propertyValue) * 0.05) {
          newErrors.deposit = 'Deposit is typically at least 5% of property value';
        } else {
          delete newErrors.deposit;
        }
        break;
        
      case 'interestRate':
        if (!value || value.trim() === '') {
          newErrors.interestRate = 'Interest rate is required';
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          newErrors.interestRate = 'Interest rate must be a positive number';
        } else if (parseFloat(value) > 20) {
          newErrors.interestRate = 'Interest rate cannot exceed 20%';
        } else if (parseFloat(value) < 0.1) {
          newErrors.interestRate = 'Interest rate must be at least 0.1%';
        } else {
          delete newErrors.interestRate;
        }
        break;
        
      case 'loanTerm':
        if (!value || value.trim() === '') {
          newErrors.loanTerm = 'Loan term is required';
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          newErrors.loanTerm = 'Loan term must be a positive number';
        } else if (parseFloat(value) < 1) {
          newErrors.loanTerm = 'Loan term must be at least 1 year';
        } else if (parseFloat(value) > 50) {
          newErrors.loanTerm = 'Loan term cannot exceed 50 years';
        } else {
          delete newErrors.loanTerm;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  // Validate current step (called when clicking Next/Calculate)
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Validate property value
      if (!formData.propertyValue || formData.propertyValue.trim() === '') {
        newErrors.propertyValue = 'Property value is required';
      } else if (isNaN(formData.propertyValue) || parseFloat(formData.propertyValue) <= 0) {
        newErrors.propertyValue = 'Property value must be a positive number';
      } else if (parseFloat(formData.propertyValue) < 10000) {
        newErrors.propertyValue = 'Property value must be at least £10,000';
      } else if (parseFloat(formData.propertyValue) > 10000000) {
        newErrors.propertyValue = 'Property value cannot exceed £10,000,000';
      }
      
      // Validate deposit
      if (!formData.deposit || formData.deposit.trim() === '') {
        newErrors.deposit = 'Deposit amount is required';
      } else if (isNaN(formData.deposit) || parseFloat(formData.deposit) <= 0) {
        newErrors.deposit = 'Deposit must be a positive number';
      } else if (formData.propertyValue && parseFloat(formData.deposit) >= parseFloat(formData.propertyValue)) {
        newErrors.deposit = 'Deposit must be less than property value';
      } else if (formData.propertyValue && parseFloat(formData.deposit) < parseFloat(formData.propertyValue) * 0.05) {
        newErrors.deposit = 'Deposit is typically at least 5% of property value';
      }
    }
    
    if (step === 2) {
      // Validate interest rate
      if (!formData.interestRate || formData.interestRate.trim() === '') {
        newErrors.interestRate = 'Interest rate is required';
      } else if (isNaN(formData.interestRate) || parseFloat(formData.interestRate) <= 0) {
        newErrors.interestRate = 'Interest rate must be a positive number';
      } else if (parseFloat(formData.interestRate) > 20) {
        newErrors.interestRate = 'Interest rate cannot exceed 20%';
      } else if (parseFloat(formData.interestRate) < 0.1) {
        newErrors.interestRate = 'Interest rate must be at least 0.1%';
      }
      
      // Validate loan term
      if (!formData.loanTerm || formData.loanTerm.trim() === '') {
        newErrors.loanTerm = 'Loan term is required';
      } else if (isNaN(formData.loanTerm) || parseFloat(formData.loanTerm) <= 0) {
        newErrors.loanTerm = 'Loan term must be a positive number';
      } else if (parseFloat(formData.loanTerm) < 1) {
        newErrors.loanTerm = 'Loan term must be at least 1 year';
      } else if (parseFloat(formData.loanTerm) > 50) {
        newErrors.loanTerm = 'Loan term cannot exceed 50 years';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Validate field on blur (when user leaves the field)
    // We'll trigger validation on blur, not on every keystroke
  };

  // Handle field blur for inline validation
  const handleFieldBlur = (name, value) => {
    validateField(name, value);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        calculateMortgage();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateMortgage = () => {
    const propertyValue = parseFloat(formData.propertyValue);
    const deposit = parseFloat(formData.deposit);
    const interestRate = parseFloat(formData.interestRate) / 100;
    const loanTerm = parseInt(formData.loanTerm);

    const loanAmount = propertyValue - deposit;
    const monthlyRate = interestRate / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment;
    if (formData.mortgageType === 'repayment') {
      // Repayment mortgage calculation
      if (monthlyRate === 0) {
        monthlyPayment = loanAmount / numberOfPayments;
      } else {
        monthlyPayment = loanAmount * 
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      }
    } else {
      // Interest-only mortgage
      monthlyPayment = loanAmount * monthlyRate;
    }

    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - loanAmount;

    setResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      numberOfPayments
    });
    setCurrentStep(4);
  };

  const handleReset = () => {
    setFormData({
      propertyValue: '',
      deposit: '',
      interestRate: '',
      loanTerm: '25',
      mortgageType: 'repayment'
    });
    setResults(null);
    setCurrentStep(1);
    setErrors({});
    localStorage.removeItem('mortgageCalculatorData');
    localStorage.removeItem('mortgageCalculatorStep');
    localStorage.removeItem('mortgageCalculatorTimestamp');
  };

  const steps = [
    { number: 1, label: 'Property Details' },
    { number: 2, label: 'Loan Details' },
    { number: 3, label: 'Mortgage Type' },
    { number: 4, label: 'Results' }
  ];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape key to close tooltips/help sections
      if (e.key === 'Escape') {
        // Focus management can be added here if needed
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="calculator-container">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Resume Prompt */}
      {showResumePrompt && (
        <div className="resume-prompt" role="alertdialog" aria-labelledby="resume-title" aria-describedby="resume-description">
          <h3 id="resume-title">Resume Your Calculation?</h3>
          <p id="resume-description">
            We found a previous calculation in progress. Would you like to resume where you left off?
          </p>
          <div className="resume-actions">
            <button className="btn btn-primary" onClick={handleResume}>
              Resume
            </button>
            <button className="btn btn-secondary" onClick={handleStartFresh}>
              Start Fresh
            </button>
          </div>
        </div>
      )}
      
      <main id="main-content" role="main">
        <div className="calculator-header">
          <h1>Mortgage Calculator</h1>
          <p>Calculate your monthly mortgage payments in just a few simple steps</p>
        </div>

      {/* Progress Indicator */}
      <nav className="progress-container" aria-label="Progress">
        <div className="progress-bar" role="list">
          {steps.map((step) => (
            <div key={step.number} className="progress-step" role="listitem">
              <div
                className={`step-circle ${
                  currentStep > step.number
                    ? 'completed'
                    : currentStep === step.number
                    ? 'active'
                    : ''
                }`}
                aria-current={currentStep === step.number ? 'step' : undefined}
                aria-label={`Step ${step.number}: ${step.label}${currentStep > step.number ? ' - completed' : currentStep === step.number ? ' - current' : ''}`}
              >
                {currentStep > step.number ? <span aria-hidden="true">✓</span> : <span aria-hidden="true">{step.number}</span>}
              </div>
              <div className="step-label">{step.label}</div>
            </div>
          ))}
        </div>
      </nav>

      {/* Step 1: Property Details */}
      <div 
        className={`form-step ${currentStep === 1 ? 'active' : ''}`}
        role="region"
        aria-labelledby="step1-title"
        aria-hidden={currentStep !== 1}
      >
        <h2 className="step-title" id="step1-title">Property Details</h2>
        <p className="step-description">
          Enter the property value and your deposit amount to get started.
        </p>

        <div className="help-section">
          <h3>💡 Need Help?</h3>
          <p>The property value is the total price of the property you want to buy.</p>
          <p>Your deposit is the amount you can pay upfront. Typically, this is 10-20% of the property value.</p>
        </div>

        <InputField
          label="Property Value"
          name="propertyValue"
          type="number"
          value={formData.propertyValue}
          onChange={handleInputChange}
          onBlur={handleFieldBlur}
          placeholder="e.g., 250000"
          required
          error={errors.propertyValue}
          tooltip="The total purchase price of the property you want to buy."
          prefix="£"
        />

        <InputField
          label="Deposit Amount"
          name="deposit"
          type="number"
          value={formData.deposit}
          onChange={handleInputChange}
          onBlur={handleFieldBlur}
          placeholder="e.g., 50000"
          required
          error={errors.deposit}
          tooltip="The amount you can pay upfront. This reduces the amount you need to borrow."
          prefix="£"
        />
      </div>

      {/* Step 2: Loan Details */}
      <div 
        className={`form-step ${currentStep === 2 ? 'active' : ''}`}
        role="region"
        aria-labelledby="step2-title"
        aria-hidden={currentStep !== 2}
      >
        <h2 className="step-title" id="step2-title">Loan Details</h2>
        <p className="step-description">
          Enter the interest rate and loan term for your mortgage.
        </p>

        <div className="help-section">
          <h3>💡 Need Help?</h3>
          <p>Interest rate is the percentage you will pay annually on your loan. Current rates are typically between 3-6%.</p>
          <p>Loan term is how long you will take to repay the mortgage. Common terms are 25-30 years.</p>
        </div>

        <InputField
          label="Annual Interest Rate"
          name="interestRate"
          type="number"
          value={formData.interestRate}
          onChange={handleInputChange}
          onBlur={handleFieldBlur}
          placeholder="e.g., 4.5"
          required
          error={errors.interestRate}
          tooltip="The annual interest rate percentage. This is usually between 0% and 20%."
          suffix="%"
          step="0.1"
          min="0"
          max="20"
        />

        <InputField
          label="Loan Term"
          name="loanTerm"
          type="number"
          value={formData.loanTerm}
          onChange={handleInputChange}
          onBlur={handleFieldBlur}
          placeholder="e.g., 25"
          required
          error={errors.loanTerm}
          tooltip="The number of years you will take to repay the mortgage. Most mortgages are between 15-35 years."
          suffix="years"
          min="1"
          max="50"
        />
      </div>

      {/* Step 3: Mortgage Type */}
      <div 
        className={`form-step ${currentStep === 3 ? 'active' : ''}`}
        role="region"
        aria-labelledby="step3-title"
        aria-hidden={currentStep !== 3}
      >
        <h2 className="step-title" id="step3-title">Mortgage Type</h2>
        <p className="step-description">
          Choose the type of mortgage that suits your needs.
        </p>

        <div className="help-section">
          <h3>💡 Need Help?</h3>
          <p><strong>Repayment Mortgage:</strong> You pay back both the loan amount and interest. Your debt reduces over time.</p>
          <p><strong>Interest-Only Mortgage:</strong> You only pay the interest each month. The original loan amount remains unchanged.</p>
        </div>

        <div className="form-group">
          <label htmlFor="mortgageType">
            Mortgage Type
            <span className="required-indicator">*</span>
            <div className="tooltip-container">
              <span className="tooltip-icon" aria-label="More information">?</span>
              <div className="tooltip-content" role="tooltip">
                Choose repayment to pay off both loan and interest, or interest-only to pay only interest each month.
              </div>
            </div>
          </label>
          <select
            id="mortgageType"
            name="mortgageType"
            value={formData.mortgageType}
            onChange={(e) => handleInputChange('mortgageType', e.target.value)}
            className={errors.mortgageType ? 'error' : ''}
            aria-describedby={errors.mortgageType ? 'mortgageType-error' : 'mortgageType-hint'}
            aria-invalid={errors.mortgageType ? 'true' : 'false'}
            aria-required="true"
          >
            <option value="repayment">Repayment Mortgage</option>
            <option value="interest-only">Interest-Only Mortgage</option>
          </select>
          <p className="input-hint" id="mortgageType-hint">
            {formData.mortgageType === 'repayment' 
              ? "You'll pay back the loan amount plus interest over the term."
              : "You'll pay only interest each month. The loan amount stays the same."}
          </p>
          {errors.mortgageType && (
            <div id="mortgageType-error" className="error-message" role="alert">
              <span className="error-icon">⚠</span>
              {errors.mortgageType}
            </div>
          )}
        </div>
      </div>

      {/* Step 4: Results */}
      {currentStep === 4 && results && (
        <ResultsDisplay
          results={results}
          formData={formData}
          onReset={handleReset}
          onRecalculate={() => setCurrentStep(1)}
        />
      )}

      {/* Navigation Buttons */}
      {currentStep < 4 && (
        <div className="button-group">
          <button
            className="btn btn-secondary"
            onClick={handleBack}
            disabled={currentStep === 1}
            aria-label={currentStep === 1 ? 'Cannot go back, this is the first step' : 'Go back to previous step'}
          >
            Back
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            aria-label={currentStep === 3 ? 'Calculate mortgage payment' : 'Go to next step'}
          >
            {currentStep === 3 ? 'Calculate' : 'Next'}
          </button>
        </div>
      )}
      </main>
    </div>
  );
};

export default MortgageCalculator;

