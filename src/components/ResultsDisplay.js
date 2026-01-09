import React from 'react';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results, formData, onReset, onRecalculate }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const loanAmount = parseFloat(results.loanAmount);
  const monthlyPayment = parseFloat(results.monthlyPayment);
  const totalInterest = parseFloat(results.totalInterest);

  return (
    <div className="form-step active">
      <h2 className="step-title">Your Mortgage Calculation Results</h2>
      <p className="step-description">
        Here is a breakdown of your monthly payments and total costs.
      </p>

      <div className="results-container">
        <div className="results-summary">
          <div className="result-label-small">Your Monthly Payment</div>
          <div className="monthly-payment">{formatCurrency(monthlyPayment)}</div>
          <div className="result-description">
            This is what you will pay each month for your{' '}
            {formData.mortgageType === 'repayment' ? 'repayment' : 'interest-only'} mortgage
            over {formData.loanTerm} years.
          </div>
        </div>

        <div className="results-breakdown">
          <div className="result-item">
            <div className="result-item-label">Loan Amount</div>
            <div className="result-item-value">{formatCurrency(loanAmount)}</div>
            <div className="result-item-explanation">
              The amount you are borrowing (property value minus deposit)
            </div>
          </div>

          <div className="result-item">
            <div className="result-item-label">Monthly Payment</div>
            <div className="result-item-value">{formatCurrency(monthlyPayment)}</div>
            <div className="result-item-explanation">
              What you will pay each month
            </div>
          </div>

          <div className="result-item">
            <div className="result-item-label">Total Interest</div>
            <div className="result-item-value">{formatCurrency(totalInterest)}</div>
            <div className="result-item-explanation">
              Total interest paid over {formData.loanTerm} years
            </div>
          </div>

          <div className="result-item">
            <div className="result-item-label">Total Amount</div>
            <div className="result-item-value">{formatCurrency(parseFloat(results.totalAmount))}</div>
            <div className="result-item-explanation">
              Total amount you will pay back (loan + interest)
            </div>
          </div>
        </div>

        {formData.mortgageType === 'interest-only' && (
          <div className="interest-only-warning">
            <h3>⚠️ Important: Interest-Only Mortgage</h3>
            <p>
              With an interest-only mortgage, you are only paying the interest each month. 
              The original loan amount of {formatCurrency(loanAmount)} remains unchanged 
              and will need to be repaid at the end of the term. Make sure you have a plan 
              to repay this amount.
            </p>
          </div>
        )}

        <div className="results-actions">
          <button className="btn btn-primary" onClick={onRecalculate}>
            Calculate Again
          </button>
          <button className="btn btn-secondary" onClick={onReset}>
            Start Over
          </button>
        </div>

        <div className="disclaimer">
          <p>
            <strong>Disclaimer:</strong> These calculations are estimates only. Actual rates and 
            payments may vary. Please consult with a mortgage advisor for accurate, personalised 
            information based on your specific circumstances.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;

