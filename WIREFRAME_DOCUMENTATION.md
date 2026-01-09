# Mortgage Calculator - Digital Wireframe Documentation

## Overview

This document describes the digital wireframe implemented in React, showing how the sketches were translated into functional components.

---

## Wireframe Structure

### Component Architecture

```
App
└── MortgageCalculator
    ├── CalculatorHeader
    ├── ProgressIndicator
    ├── FormSteps (Conditional)
    │   ├── Step1: PropertyDetails
    │   ├── Step2: LoanDetails
    │   ├── Step3: MortgageType
    │   └── Step4: Results
    └── NavigationButtons (Conditional)
```

---

## Step 1: Property Details Wireframe

### Visual Layout:

```
┌────────────────────────────────────────────────────────┐
│         Mortgage Calculator                            │
│  Calculate your monthly mortgage payments in just a    │
│  few simple steps                                      │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [●1]──────[○2]──────[○3]──────[○4]                  │
│  Property  Loan      Mortgage  Results                │
│  Details   Details   Type                             │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Property Details                                      │
│  Enter the property value and your deposit amount     │
│  to get started.                                       │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 💡 Need Help?                                    │ │
│  │ The property value is the total price of the    │ │
│  │ property you want to buy.                        │ │
│  │ Your deposit is the amount you can pay upfront.  │ │
│  │ Typically, this is 10-20% of the property value. │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Property Value*  [?]                                  │
│  ┌──────────────────────────────────────────────────┐ │
│  │ £│250000                        [Tooltip: Total │ │
│  │                                   purchase price] │ │
│  └──────────────────────────────────────────────────┘ │
│  Hint: e.g., 250000                                    │
│                                                        │
│  Deposit Amount*  [?]                                  │
│  ┌──────────────────────────────────────────────────┐ │
│  │ £│50000                          [Tooltip: Amount│ │
│  │                                   upfront]        │ │
│  └──────────────────────────────────────────────────┘ │
│  Hint: e.g., 50000                                     │
│                                                        │
│  ──────────────────────────────────────────────────────│
│                                                        │
│  [Disabled: Back]              [Next →]                │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Component Breakdown:

- **CalculatorHeader**: Title and description
- **ProgressIndicator**: 4-step progress bar (Step 1 active)
- **HelpSection**: Contextual help box
- **InputField** (x2): Property Value and Deposit with tooltips
- **NavigationButtons**: Back (disabled) and Next (enabled)

---

## Step 2: Loan Details Wireframe

### Visual Layout:

```
┌────────────────────────────────────────────────────────┐
│         Mortgage Calculator                            │
│  Calculate your monthly mortgage payments in just a    │
│  few simple steps                                      │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [✓1]──────[●2]──────[○3]──────[○4]                  │
│  Property  Loan      Mortgage  Results                │
│  Details   Details   Type                             │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Loan Details                                          │
│  Enter the interest rate and loan term for your       │
│  mortgage.                                             │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 💡 Need Help?                                    │ │
│  │ Interest rate is the percentage you will pay     │ │
│  │ annually on your loan. Current rates are         │ │
│  │ typically between 3-6%.                           │ │
│  │ Loan term is how long you will take to repay the │ │
│  │ mortgage. Common terms are 25-30 years.          │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Annual Interest Rate*  [?]                            │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 4.5│%                           [Tooltip: Annual │ │
│  │                                   percentage]     │ │
│  └──────────────────────────────────────────────────┘ │
│  Hint: e.g., 4.5                                       │
│                                                        │
│  Loan Term*  [?]                                       │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 25│years                        [Tooltip: Number │ │
│  │                                   of years]       │ │
│  └──────────────────────────────────────────────────┘ │
│  Hint: e.g., 25                                        │
│                                                        │
│  ──────────────────────────────────────────────────────│
│                                                        │
│  [← Back]              [Next →]                        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Component Breakdown:

- **ProgressIndicator**: Step 1 completed (green), Step 2 active (blue)
- **HelpSection**: Contextual help for loan details
- **InputField** (x2): Interest Rate and Loan Term with tooltips
- **NavigationButtons**: Both Back and Next enabled

---

## Step 3: Mortgage Type Wireframe

### Visual Layout:

```
┌────────────────────────────────────────────────────────┐
│         Mortgage Calculator                            │
│  Calculate your monthly mortgage payments in just a    │
│  few simple steps                                      │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [✓1]──────[✓2]──────[●3]──────[○4]                  │
│  Property  Loan      Mortgage  Results                │
│  Details   Details   Type                             │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Mortgage Type                                         │
│  Choose the type of mortgage that suits your needs.   │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 💡 Need Help?                                    │ │
│  │ Repayment Mortgage: You pay back both the loan  │ │
│  │ amount and interest. Your debt reduces over time.│ │
│  │ Interest-Only Mortgage: You only pay the        │ │
│  │ interest each month. The original loan amount   │ │
│  │ remains unchanged.                               │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Mortgage Type*  [?]                                   │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Repayment Mortgage                      ▼        │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Options:                                              │
│  ● Repayment Mortgage                                  │
│  ○ Interest-Only Mortgage                              │
│                                                        │
│  Hint: You will pay back the loan amount plus interest│
│  over the term.                                        │
│                                                        │
│  ──────────────────────────────────────────────────────│
│                                                        │
│  [← Back]              [Calculate]                     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Component Breakdown:

- **ProgressIndicator**: Steps 1-2 completed, Step 3 active
- **HelpSection**: Detailed explanation of mortgage types
- **SelectField**: Dropdown with mortgage type options
- **DynamicHint**: Updates based on selection
- **NavigationButtons**: Back and Calculate (replaces Next)

---

## Step 4: Results Display Wireframe

### Visual Layout:

```
┌────────────────────────────────────────────────────────┐
│         Mortgage Calculator                            │
│  Calculate your monthly mortgage payments in just a    │
│  few simple steps                                      │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [✓1]──────[✓2]──────[✓3]──────[●4]                  │
│  Property  Loan      Mortgage  Results                │
│  Details   Details   Type                             │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Your Mortgage Calculation Results                     │
│  Here is a breakdown of your monthly payments and     │
│  total costs.                                          │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │                                                  │ │
│  │          Your Monthly Payment                   │ │
│  │                                                  │ │
│  │              £1,109.00                          │ │
│  │                                                  │ │
│  │     per month                                   │ │
│  │                                                  │ │
│  │ This is what you will pay each month for your   │ │
│  │ repayment mortgage over 25 years.               │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌────────────┐ ┌────────────┐                       │
│  │Loan Amount │ │Monthly     │                       │
│  │            │ │Payment     │                       │
│  │£200,000.00 │ │£1,109.00   │                       │
│  │            │ │            │                       │
│  │The amount  │ │What you    │                       │
│  │you are     │ │will pay    │                       │
│  │borrowing   │ │each month  │                       │
│  └────────────┘ └────────────┘                       │
│                                                        │
│  ┌────────────┐ ┌────────────┐                       │
│  │Total       │ │Total       │                       │
│  │Interest    │ │Amount      │                       │
│  │            │ │            │                       │
│  │£132,700.00 │ │£332,700.00 │                       │
│  │            │ │            │                       │
│  │Total       │ │Total       │                       │
│  │interest    │ │amount you  │                       │
│  │paid over   │ │will pay    │                       │
│  │25 years    │ │back        │                       │
│  └────────────┘ └────────────┘                       │
│                                                        │
│  ──────────────────────────────────────────────────────│
│                                                        │
│  [Calculate Again]     [Start Over]                    │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Disclaimer: These calculations are estimates     │ │
│  │ only. Actual rates and payments may vary...      │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Component Breakdown:

- **ProgressIndicator**: All steps completed, Results active
- **ResultsSummary**: Large monthly payment display
- **ResultsBreakdown**: 4 cards with key metrics
- **ResultsActions**: Calculate Again and Start Over buttons
- **Disclaimer**: Legal notice

---

## Mobile Wireframe

### Mobile Layout (<768px):

```
┌──────────────────┐
│  Mortgage Calc   │
│  Calculator      │
├──────────────────┤
│                  │
│  [1] Property    │
│      Details     │
│  [2] Loan        │
│      Details     │
│  [3] Mortgage    │
│      Type        │
│  [4] Results     │
│                  │
├──────────────────┤
│                  │
│  Property Details│
│                  │
│  [Help Section]  │
│                  │
│  Property Value* │
│  [£250000      ] │
│                  │
│  Deposit*        │
│  [£50000       ] │
│                  │
│  [Back]          │
│  [Next →]        │
│                  │
└──────────────────┘
```

**Mobile Adaptations**:
- Single column layout
- Stacked progress indicator
- Full-width buttons
- Larger touch targets (44px minimum)
- Adjusted spacing

---

## Interactive Elements

### Input Field States:

**Default State**:
```
┌──────────────────────┐
│ Property Value*  [?] │
│ ┌──────────────────┐ │
│ │ £│               │ │
│ └──────────────────┘ │
└──────────────────────┘
```

**Focus State**:
```
┌──────────────────────┐
│ Property Value*  [?] │
│ ┌──────────────────┐ │
│ │ £│250000         │ │ ← Blue border, shadow
│ └──────────────────┘ │
│ Hint: e.g., 250000   │
└──────────────────────┘
```

**Error State**:
```
┌──────────────────────┐
│ Property Value*  [?] │
│ ┌──────────────────┐ │
│ │ £│abc            │ │ ← Red border
│ └──────────────────┘ │
│ ⚠️ Please enter a    │
│ valid property value │ ← Red error message
└──────────────────────┘
```

**Tooltip on Hover**:
```
┌──────────────────────┐
│ Property Value*  [?] │
│ ┌──────────────────┐ │
│ │ £│250000         │ │
│ └──────────────────┘ │
│                      │
│ ┌──────────────────┐ │
│ │The total purchase│ │ ← Tooltip appears
│ │price of the      │ │
│ │property you want │ │
│ │to buy.           │ │
│ └──────────────────┘ │
└──────────────────────┘
```

---

## Button States

### Primary Button (Next/Calculate):

**Default**:
```
┌─────────────────┐
│   Next →        │ ← Blue background, white text
└─────────────────┘
```

**Hover**:
```
┌─────────────────┐
│   Next →        │ ← Darker blue, slight lift
└─────────────────┘
```

**Active**:
```
┌─────────────────┐
│   Next →        │ ← Pressed effect
└─────────────────┘
```

**Disabled**:
```
┌─────────────────┐
│   Back          │ ← Gray, cursor: not-allowed
└─────────────────┘
```

---

## Progress Indicator States

### Step States:

**Pending** (Not yet reached):
```
[○] 1
Property Details
```
- Gray circle, gray text

**Active** (Current step):
```
[●] 2
Loan Details
```
- Blue circle, blue text, bold

**Completed** (Finished step):
```
[✓] 1
Property Details
```
- Green circle with checkmark, green text

---

## Responsive Breakpoints

### Desktop (>768px):
- 2-column layout option
- Side-by-side buttons
- Horizontal progress bar
- Larger padding (30px)

### Tablet (768px - 1024px):
- Single column layout
- Side-by-side buttons
- Horizontal progress bar
- Medium padding (20px)

### Mobile (<768px):
- Single column layout
- Stacked buttons (full width)
- Vertical progress indicator
- Reduced padding (15px)
- Larger touch targets

---

## Implementation Details

### Component Files:

1. **MortgageCalculator.js**
   - Main component with wizard logic
   - State management (useState)
   - Auto-save (localStorage)
   - Validation logic

2. **InputField.js**
   - Reusable input component
   - Tooltip integration
   - Error display
   - Prefix/suffix support

3. **ResultsDisplay.js**
   - Results presentation
   - Currency formatting
   - Breakdown cards
   - Action buttons

### Styling Files:

1. **App.css**
   - Global styles
   - Layout styles
   - Component styles
   - Responsive breakpoints

2. **InputField.css**
   - Input-specific styles
   - Error states
   - Prefix/suffix styles

3. **ResultsDisplay.css**
   - Results-specific styles
   - Card layouts
   - Warning boxes

---

## Technical Specifications

### Colors:
- Primary: `#0066cc` (Lloyds blue)
- Success: `#28a745` (Green)
- Error: `#dc3545` (Red)
- Background: `#f5f5f5` (Light gray)
- Text: `#333333` (Dark gray)

### Typography:
- Font Family: Segoe UI, system fonts
- Headings: 24-28px, bold
- Body: 14-16px, regular
- Small: 12px, regular

### Spacing:
- Container: 30px padding (desktop), 20px (mobile)
- Sections: 25px margin
- Fields: 25px margin
- Buttons: 10px gap

### Animations:
- Step transitions: 0.3s fade-in
- Button hover: 0.3s ease
- Input focus: 0.3s ease

---

## How This Addresses Customer Feedback

### Navigation (FB001, FB005, FB009, FB012) ✅
- **Wireframe Feature**: Step-by-step wizard with progress indicator
- **Implementation**: Visual progress bar, clear step labels, back/next buttons

### Technical Issues (FB003, FB006, FB010, FB013) ✅
- **Wireframe Feature**: Auto-save, validation, responsive design
- **Implementation**: localStorage persistence, inline validation, mobile-optimized

### Clarity (FB002, FB007, FB014) ✅
- **Wireframe Feature**: Tooltips, help sections, clear labels
- **Implementation**: Help icons, contextual help boxes, dynamic hints

### Results (FB004, FB011, FB015) ✅
- **Wireframe Feature**: Prominent results, clear breakdown, explanations
- **Implementation**: Large payment display, breakdown cards, result explanations

### Design (FB008) ✅
- **Wireframe Feature**: Clean layout, progressive disclosure, whitespace
- **Implementation**: One step at a time, minimal clutter, organized sections

---

**This wireframe demonstrates a complete transformation from the original confusing interface to a clear, guided, user-friendly calculator.**


