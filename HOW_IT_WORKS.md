# How the Mortgage Calculator Works

## Architecture: Frontend-Only (No Backend)

This mortgage calculator is a **client-side application** - all calculations happen in your web browser using JavaScript. There is **no backend server** - everything runs in React.

## Where the Calculation Happens

The calculation logic is in the `calculateMortgage()` function in:
**File**: `src/components/MortgageCalculator.js` (lines 96-132)

### Calculation Flow

```
User Input (Form Data)
    ↓
validateStep() - Validates input
    ↓
calculateMortgage() - Performs calculation
    ↓
Results displayed in ResultsDisplay component
```

## The Mortgage Calculation Formula

### For Repayment Mortgages:

The calculator uses the standard amortization formula:

```
Monthly Payment = Loan Amount × (Monthly Rate × (1 + Monthly Rate)^n) / ((1 + Monthly Rate)^n - 1)

Where:
- Loan Amount = Property Value - Deposit
- Monthly Rate = Annual Interest Rate / 12
- n = Number of payments (Loan Term × 12)
```

### For Interest-Only Mortgages:

```
Monthly Payment = Loan Amount × Monthly Rate

Where:
- Loan Amount = Property Value - Deposit
- Monthly Rate = Annual Interest Rate / 12
```

## Code Location

### Main Calculation Function

```javascript
// Location: src/components/MortgageCalculator.js (lines 96-132)

const calculateMortgage = () => {
  // Step 1: Get input values
  const propertyValue = parseFloat(formData.propertyValue);
  const deposit = parseFloat(formData.deposit);
  const interestRate = parseFloat(formData.interestRate) / 100;
  const loanTerm = parseInt(formData.loanTerm);

  // Step 2: Calculate loan amount
  const loanAmount = propertyValue - deposit;
  const monthlyRate = interestRate / 12;
  const numberOfPayments = loanTerm * 12;

  // Step 3: Calculate monthly payment
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

  // Step 4: Calculate totals
  const totalAmount = monthlyPayment * numberOfPayments;
  const totalInterest = totalAmount - loanAmount;

  // Step 5: Store results
  setResults({
    monthlyPayment: monthlyPayment.toFixed(2),
    loanAmount: loanAmount.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    numberOfPayments
  });
  setCurrentStep(4);
};
```

## Why No Backend?

This is a **static calculation** - it doesn't need:
- Database access
- Server-side processing
- Real-time data
- User authentication
- Data persistence across users

All calculations use:
- Standard mathematical formulas
- User-provided input only
- Client-side JavaScript

**Benefits:**
- ✅ Fast (no network requests)
- ✅ Works offline
- ✅ No server costs
- ✅ Privacy (data stays in browser)
- ✅ Simple deployment

## Data Flow

```
┌─────────────────────────────────────┐
│  User Input (Form Fields)           │
│  - Property Value                   │
│  - Deposit                          │
│  - Interest Rate                    │
│  - Loan Term                        │
│  - Mortgage Type                    │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  React State (useState)             │
│  - formData object                  │
│  - Auto-saved to localStorage       │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  Validation (validateStep)          │
│  - Checks input validity            │
│  - Shows error messages             │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  Calculation (calculateMortgage)    │
│  - Runs in browser                  │
│  - JavaScript math operations       │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  Results Display                    │
│  - Monthly Payment                  │
│  - Loan Amount                      │
│  - Total Interest                   │
│  - Total Amount                     │
└─────────────────────────────────────┘
```

## Where to Find the Code

### Calculation Logic
- **File**: `src/components/MortgageCalculator.js`
- **Function**: `calculateMortgage()` (lines 96-132)
- **Called**: When user clicks "Calculate" button (line 85)

### Input Validation
- **File**: `src/components/MortgageCalculator.js`
- **Function**: `validateStep()` (lines 37-63)
- **Called**: Before moving to next step (line 81)

### Results Display
- **File**: `src/components/ResultsDisplay.js`
- **Component**: `ResultsDisplay`
- **Props**: Receives results object from calculation

### Form Inputs
- **File**: `src/components/InputField.js`
- **Component**: `InputField`
- **Used**: For all form inputs with validation

## Adding a Backend (Optional)

If you wanted to add a backend in the future, you could:

1. **Create a Node.js/Express API**:
   - Move calculation to server
   - Store calculations in database
   - Track user history

2. **Benefits of Backend**:
   - Save calculation history
   - Store user preferences
   - Analytics and tracking
   - More complex calculations
   - Integration with other services

3. **For This Project**:
   - No backend needed - calculations are simple
   - All data is user-provided
   - Works perfectly client-side

## Example Calculation

### Input:
- Property Value: £250,000
- Deposit: £50,000
- Interest Rate: 4.5%
- Loan Term: 25 years
- Type: Repayment

### Calculation Steps:

1. **Loan Amount**: £250,000 - £50,000 = £200,000

2. **Monthly Rate**: 4.5% / 12 = 0.375%

3. **Number of Payments**: 25 × 12 = 300

4. **Monthly Payment Formula**:
   ```
   Payment = 200,000 × (0.00375 × (1.00375)^300) / ((1.00375)^300 - 1)
   Payment = 200,000 × (0.00375 × 3.089) / (3.089 - 1)
   Payment = 200,000 × 0.01159 / 2.089
   Payment = 200,000 × 0.005545
   Payment = £1,109.00/month
   ```

5. **Total Amount**: £1,109 × 300 = £332,700

6. **Total Interest**: £332,700 - £200,000 = £132,700

All of this happens **instantly in your browser** - no server needed!

---

**Summary**: This is a pure frontend application. All calculations happen in JavaScript on the client-side. No backend is required because we're just doing mathematical calculations with user input.


