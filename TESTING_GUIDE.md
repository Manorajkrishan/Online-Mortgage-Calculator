# Testing Guide

This document provides comprehensive testing instructions for the Mortgage Calculator application.

## Table of Contents

1. [Running Tests](#running-tests)
2. [Test Coverage](#test-coverage)
3. [Manual Testing](#manual-testing)
4. [Accessibility Testing](#accessibility-testing)
5. [Performance Testing](#performance-testing)
6. [Browser Testing](#browser-testing)
7. [Mobile Testing](#mobile-testing)

## Running Tests

### Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run tests once (CI mode)
npm test -- --watchAll=false
```

### Test Files

- `src/App.test.js` - App component tests
- `src/components/MortgageCalculator.test.js` - Main calculator component tests
- `src/components/InputField.test.js` - Input field component tests
- `src/components/ResultsDisplay.test.js` - Results display component tests

## Test Coverage

Target coverage: **80%+**

### Current Coverage Areas

✅ Component rendering
✅ Form validation
✅ Navigation between steps
✅ Mortgage calculations
✅ Error handling
✅ Data persistence
✅ Accessibility features

### Running Coverage Report

```bash
npm test -- --coverage --watchAll=false
```

Coverage report will be generated in `coverage/lcov-report/index.html`

## Manual Testing

### Functional Testing Checklist

#### Step 1: Property Details

- [ ] Property value field accepts numeric input
- [ ] Property value field shows error for empty value
- [ ] Property value field shows error for negative values
- [ ] Property value field shows error for values < £10,000
- [ ] Property value field shows error for values > £10,000,000
- [ ] Deposit field accepts numeric input
- [ ] Deposit field shows error for empty value
- [ ] Deposit field shows error if deposit >= property value
- [ ] Deposit field shows warning if deposit < 5% of property value
- [ ] Next button is enabled with valid inputs
- [ ] Tooltip displays on hover/focus

#### Step 2: Loan Details

- [ ] Interest rate field accepts decimal input
- [ ] Interest rate field shows error for empty value
- [ ] Interest rate field shows error for values > 20%
- [ ] Interest rate field shows error for values < 0.1%
- [ ] Loan term field accepts numeric input
- [ ] Loan term field shows error for empty value
- [ ] Loan term field shows error for values < 1 year
- [ ] Loan term field shows error for values > 50 years
- [ ] Next button navigates to step 3
- [ ] Back button navigates to step 1

#### Step 3: Mortgage Type

- [ ] Mortgage type dropdown displays both options
- [ ] Default selection is "Repayment Mortgage"
- [ ] Hint text updates based on selection
- [ ] Calculate button is enabled
- [ ] Back button navigates to step 2

#### Step 4: Results

- [ ] Monthly payment is displayed prominently
- [ ] Loan amount is calculated correctly (property value - deposit)
- [ ] Total interest is calculated correctly
- [ ] Total amount is calculated correctly
- [ ] All values are formatted as currency (£)
- [ ] Interest-only warning appears for interest-only mortgages
- [ ] Disclaimer is displayed
- [ ] Calculate Again button works
- [ ] Start Over button clears all data

### Validation Testing

Test invalid inputs:

1. **Empty fields**: All required fields should show specific error messages
2. **Negative numbers**: Should show "must be a positive number" error
3. **Non-numeric input**: Should be prevented by input type="number"
4. **Boundary values**: Test minimum and maximum values
5. **Decimal precision**: Interest rate should accept decimals (e.g., 4.5%)

### Calculation Testing

Test with known values:

**Test Case 1: Standard Repayment Mortgage**
- Property Value: £250,000
- Deposit: £50,000
- Interest Rate: 4.5%
- Loan Term: 25 years
- Expected Monthly Payment: ~£1,109.00

**Test Case 2: Interest-Only Mortgage**
- Property Value: £250,000
- Deposit: £50,000
- Interest Rate: 4.5%
- Loan Term: 25 years
- Expected Monthly Payment: ~£750.00 (interest only)

**Test Case 3: High Interest Rate**
- Property Value: £500,000
- Deposit: £100,000
- Interest Rate: 15%
- Loan Term: 30 years
- Expected Monthly Payment: ~£5,066.00

## Accessibility Testing

### Keyboard Navigation

- [ ] Tab key moves through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Escape closes tooltips
- [ ] Skip link is visible when focused
- [ ] Focus indicators are visible
- [ ] All functionality is accessible via keyboard

### Screen Reader Testing

Test with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)

Check:
- [ ] All form fields have proper labels
- [ ] Error messages are announced
- [ ] Progress indicator states are announced
- [ ] Tooltips are accessible
- [ ] Results are read correctly

### ARIA Attributes

Verify:
- [ ] `aria-label` attributes on buttons
- [ ] `aria-required` on required fields
- [ ] `aria-invalid` on error states
- [ ] `aria-describedby` linking fields to errors/hints
- [ ] `aria-expanded` on tooltips
- [ ] `role` attributes where needed

### Color Contrast

- [ ] Text meets WCAG AA contrast ratio (4.5:1)
- [ ] Interactive elements meet 3:1 contrast
- [ ] Error messages have sufficient contrast
- [ ] Tooltips are readable

### Tools

Use accessibility testing tools:

```bash
# Install axe-core
npm install --save-dev @axe-core/react

# Run Lighthouse audit (Chrome DevTools)
# Navigate to Lighthouse tab > Accessibility audit
```

## Performance Testing

### Lighthouse Scores

Target scores:
- Performance: 90+
- Accessibility: 100
- Best Practices: 90+
- SEO: 90+

### Load Testing

- [ ] Initial page load < 2 seconds
- [ ] Time to interactive < 3 seconds
- [ ] First contentful paint < 1.5 seconds
- [ ] No layout shift (CLS < 0.1)

### Bundle Size

Check build size:
```bash
npm run build
# Check build/static/js/*.js file sizes
```

Target: < 200KB gzipped

## Browser Testing

### Desktop Browsers

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers

Test on:
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Samsung Internet

### Browser Features to Test

- [ ] LocalStorage support
- [ ] Number input behavior
- [ ] CSS Grid/Flexbox support
- [ ] Responsive breakpoints
- [ ] Touch event handling

## Mobile Testing

### Device Testing

Test on actual devices:
- [ ] iPhone (various sizes)
- [ ] Android phones (various sizes)
- [ ] iPad
- [ ] Android tablets

### Mobile-Specific Tests

- [ ] Keyboard doesn't cover input fields
- [ ] Input fields don't zoom on focus (iOS)
- [ ] Touch targets are at least 44x44px
- [ ] Text is readable without zooming
- [ ] Layout works in portrait and landscape
- [ ] Buttons are easily tappable
- [ ] Tooltips are accessible on mobile
- [ ] Form submission works on mobile

### Responsive Breakpoints

Test at:
- [ ] 320px (small mobile)
- [ ] 375px (iPhone)
- [ ] 768px (tablet)
- [ ] 1024px (desktop)
- [ ] 1920px (large desktop)

## Data Persistence Testing

### Auto-Save

- [ ] Data is saved as user types
- [ ] Data persists after page refresh
- [ ] Resume prompt appears when returning
- [ ] Old data (>7 days) is cleared
- [ ] Clear/Start Over removes saved data

### LocalStorage

Check browser console:
```javascript
localStorage.getItem('mortgageCalculatorData')
localStorage.getItem('mortgageCalculatorStep')
localStorage.getItem('mortgageCalculatorTimestamp')
```

## Error Handling Testing

Test error scenarios:

1. **Network errors**: Offline mode (Service Worker not implemented yet)
2. **Invalid calculations**: Edge cases (zero interest rate, etc.)
3. **Browser limitations**: localStorage disabled
4. **Validation errors**: All field validation scenarios

## Regression Testing

After each change, verify:

1. ✅ All existing tests pass
2. ✅ No console errors
3. ✅ No TypeScript/ESLint warnings
4. ✅ Build completes successfully
5. ✅ Manual test checklist passes

## Continuous Integration

Tests run automatically on:

- **Push to main/master**: Full test suite
- **Pull requests**: Full test suite with coverage
- **Pre-commit hooks** (optional): Quick validation

## Reporting Issues

When reporting test failures:

1. Include browser/OS information
2. Include steps to reproduce
3. Include expected vs actual behavior
4. Include screenshots if visual
5. Include console errors if any

## Additional Resources

- [React Testing Library Documentation](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
