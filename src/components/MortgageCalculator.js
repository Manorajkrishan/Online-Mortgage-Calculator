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

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('mortgageCalculatorData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mortgageCalculatorData', JSON.stringify(formData));
  }, [formData]);

  // Validate current step
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.propertyValue || formData.propertyValue <= 0) {
        newErrors.propertyValue = 'Please enter a valid property value';
      }
      if (!formData.deposit || formData.deposit <= 0) {
        newErrors.deposit = 'Please enter a valid deposit amount';
      }
      if (parseFloat(formData.deposit) >= parseFloat(formData.propertyValue)) {
        newErrors.deposit = 'Deposit must be less than property value';
      }
    }
    
    if (step === 2) {
      if (!formData.interestRate || formData.interestRate <= 0 || formData.interestRate > 20) {
        newErrors.interestRate = 'Please enter an interest rate between 0% and 20%';
      }
      if (!formData.loanTerm || formData.loanTerm <= 0) {
        newErrors.loanTerm = 'Please enter a valid loan term';
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
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
  };

  const steps = [
    { number: 1, label: 'Property Details' },
    { number: 2, label: 'Loan Details' },
    { number: 3, label: 'Mortgage Type' },
    { number: 4, label: 'Results' }
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h1>Mortgage Calculator</h1>
        <p>Calculate your monthly mortgage payments in just a few simple steps</p>
      </div>

      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-bar">
          {steps.map((step) => (
            <div key={step.number} className="progress-step">
              <div
                className={`step-circle ${
                  currentStep > step.number
                    ? 'completed'
                    : currentStep === step.number
                    ? 'active'
                    : ''
                }`}
              >
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <div className="step-label">{step.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Property Details */}
      <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
        <h2 className="step-title">Property Details</h2>
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
          placeholder="e.g., 50000"
          required
          error={errors.deposit}
          tooltip="The amount you can pay upfront. This reduces the amount you need to borrow."
          prefix="£"
        />
      </div>

      {/* Step 2: Loan Details */}
      <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
        <h2 className="step-title">Loan Details</h2>
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
      <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
        <h2 className="step-title">Mortgage Type</h2>
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
          >
            <option value="repayment">Repayment Mortgage</option>
            <option value="interest-only">Interest-Only Mortgage</option>
          </select>
          <p className="input-hint">
            {formData.mortgageType === 'repayment' 
              ? "You'll pay back the loan amount plus interest over the term."
              : "You'll pay only interest each month. The loan amount stays the same."}
          </p>
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
          >
            Back
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
          >
            {currentStep === 3 ? 'Calculate' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;

