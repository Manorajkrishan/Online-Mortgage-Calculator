# Mortgage Calculator - Focus Group Presentation

## Presentation Overview

This presentation highlights the redesigned mortgage calculator, focusing on how it addresses customer feedback and improves user experience.

---

## Part 1: Introduction & Context

### The Problem

We analyzed **15 customer feedback entries** and identified key issues:
- **Navigation difficulties** (4 mentions - 27%)
- **Technical problems** (4 mentions - 27%)
- **Clarity issues** (3 mentions - 20%)
- **Results presentation** (3 mentions - 20%)
- **Design problems** (1 mention - 7%)

**Average Customer Rating**: 2.33/5.0 (indicating significant dissatisfaction)

### Our Goal

Transform the mortgage calculator into a **user-friendly, intuitive tool** that:
- ✅ Guides users clearly through the process
- ✅ Provides helpful context and explanations
- ✅ Works reliably on all devices
- ✅ Presents results in an understandable way

---

## Part 2: Design Improvements

### Improvement 1: Step-by-Step Wizard

**Problem Addressed**: Users found navigation confusing and overwhelming (FB001, FB008, FB012)

**Our Solution**:
- **4 clear steps**: Property Details → Loan Details → Mortgage Type → Results
- **Visual progress indicator**: Shows where you are in the process
- **One step at a time**: Reduces cognitive load

**Key Features**:
- Progress bar with active/completed states
- Clear step labels
- Easy navigation (Back/Next buttons)

**Benefit**: Users always know where they are and what comes next.

---

### Improvement 2: Enhanced Input Fields

**Problem Addressed**: Users didn't understand what information was required (FB001, FB014)

**Our Solution**:
- **Clear labels** with required field indicators (*)
- **Tooltips** on every field (hover the ? icon)
- **Help sections** on each step with explanations
- **Real-time validation** with specific error messages
- **Input hints** with example values

**Key Features**:
- Tooltips explain each field
- Help boxes provide context
- Placeholder text shows format (e.g., "250000")
- Inline validation prevents errors

**Benefit**: Users understand what to enter and why.

---

### Improvement 3: Better Error Handling

**Problem Addressed**: Vague "Invalid input" errors didn't help users (FB003)

**Our Solution**:
- **Field-specific errors**: Shows exactly which field has a problem
- **Clear error messages**: Explains what's wrong (e.g., "Interest rate must be between 0% and 20%")
- **Visual indicators**: Red border, error icon, warning message
- **Real-time validation**: Checks as user types

**Key Features**:
- Errors appear next to the problematic field
- Messages are specific and actionable
- Errors clear automatically when fixed
- No page freezing or crashes

**Benefit**: Users can fix errors quickly without frustration.

---

### Improvement 4: Improved Results Display

**Problem Addressed**: Results were hard to understand (FB004, FB011, FB015)

**Our Solution**:
- **Prominent monthly payment**: Large, highlighted display
- **Clear breakdown**: All key figures shown
- **Explanations**: Each result explained in plain language
- **Visual organization**: Cards for each metric

**Key Features**:
- Monthly payment prominently displayed (£1,109.00)
- Breakdown cards: Loan Amount, Monthly Payment, Total Interest, Total Amount
- Explanations for each result
- Warning for interest-only mortgages

**Benefit**: Users understand their results and what they mean.

---

### Improvement 5: Mobile Optimization

**Problem Addressed**: Poor mobile experience (FB002, FB006, FB008, FB015)

**Our Solution**:
- **Responsive layout**: Adapts to all screen sizes
- **Touch-friendly**: Large buttons (minimum 44x44px)
- **Keyboard handling**: Auto-scrolls inputs into view
- **Font sizing**: Prevents iOS zoom (16px minimum)
- **Single column**: Stacked layout on mobile

**Key Features**:
- Works on smartphones, tablets, desktops
- Touch-optimized controls
- Proper keyboard handling
- No layout breaks on different orientations

**Benefit**: Users get a great experience on any device.

---

### Improvement 6: Auto-Save Functionality

**Problem Addressed**: Data loss on page refresh (FB009, FB013)

**Our Solution**:
- **Automatic saving**: Data saved as user types
- **Recovery**: Data persists across page refreshes
- **No user action needed**: Happens automatically

**Key Features**:
- Saves to browser localStorage
- Restores data when returning to page
- Works offline

**Benefit**: Users never lose their work.

---

### Improvement 7: Clear Terminology

**Problem Addressed**: Confusing mortgage terms (FB002, FB006, FB007)

**Our Solution**:
- **Help sections**: Explain terms in plain language
- **Dynamic hints**: Change based on user selections
- **Examples**: Show what each term means
- **Visual aids**: Icons and formatting help understanding

**Key Features**:
- "Repayment vs Interest-Only" clearly explained
- Examples for each field
- Contextual help throughout

**Benefit**: Users understand mortgage terminology.

---

## Part 3: Key Features Demonstration

### Feature Walkthrough:

**Step 1: Property Details**
- Two simple fields: Property Value and Deposit
- Help section explains what each means
- Tooltips provide additional context
- Validation ensures valid inputs

**Step 2: Loan Details**
- Interest Rate and Loan Term fields
- Help section provides typical ranges
- Clear formatting (%, years)
- Validation for realistic values

**Step 3: Mortgage Type**
- Dropdown selection
- Help section explains difference
- Dynamic hint updates based on selection
- Clear visual feedback

**Step 4: Results**
- Large, clear monthly payment
- Complete breakdown of costs
- Explanations for each metric
- Options to recalculate or start over

---

## Part 4: How This Addresses Customer Feedback

### Before → After Comparison

| Customer Issue | Before | After |
|----------------|--------|-------|
| **Navigation** | Confusing, can't find fields | Step-by-step wizard with progress |
| **Error Messages** | "Invalid input" - vague | Specific field errors with guidance |
| **Mobile** | Broken, buttons unresponsive | Fully responsive, touch-optimized |
| **Data Loss** | Lost on refresh | Auto-saved automatically |
| **Terminology** | Confusing jargon | Tooltips and help sections |
| **Results** | Hard to understand | Clear breakdown with explanations |
| **Layout** | Cluttered, overwhelming | Clean, one step at a time |

---

## Part 5: Design Principles Applied

### ✅ Simplicity
- **One step at a time**: Progressive disclosure
- **Clear labels**: No jargon
- **Minimal design**: Only essential elements

### ✅ Clarity
- **Tooltips**: Help available instantly
- **Help sections**: Contextual explanations
- **Plain language**: No technical terms without explanation

### ✅ Consistency
- **Visual design**: Consistent colors and fonts
- **Button styles**: Same throughout
- **Navigation**: Always in same place

### ✅ Feedback
- **Real-time validation**: Immediate error messages
- **Progress indicator**: Shows completion
- **Visual states**: Active, completed, disabled

### ✅ Accessibility
- **Keyboard navigation**: Full support
- **Screen reader**: ARIA labels
- **Color contrast**: WCAG AA compliant
- **Touch targets**: Minimum 44x44px

---

## Part 6: Technical Implementation

### Technology Stack:
- **React**: Component-based UI
- **CSS**: Custom styling
- **LocalStorage**: Auto-save functionality
- **Responsive Design**: Mobile-first approach

### Features Implemented:
- ✅ Step-by-step wizard
- ✅ Progress indicator
- ✅ Input validation
- ✅ Auto-save
- ✅ Responsive layout
- ✅ Accessibility features
- ✅ Error handling
- ✅ Tooltips and help

---

## Part 7: Questions for Focus Group

### During Testing, Please Consider:

1. **Navigation**:
   - Is the step-by-step flow clear?
   - Do you know where you are in the process?
   - Can you easily go back and change information?

2. **Clarity**:
   - Do you understand what each field means?
   - Are the tooltips helpful?
   - Do the help sections clarify terminology?

3. **Usability**:
   - Is it easy to enter information?
   - Are the error messages clear?
   - Can you complete the calculation easily?

4. **Results**:
   - Do you understand the results?
   - Is the monthly payment clear?
   - Do you know what each figure means?

5. **Mobile**:
   - Does it work well on your device?
   - Are buttons easy to tap?
   - Is text readable?

6. **Overall**:
   - What do you like most?
   - What would you change?
   - Would you use this tool?

---

## Part 8: Next Steps After Feedback

### We Will:
1. **Review your feedback**: Analyze all comments and suggestions
2. **Prioritize changes**: Focus on most important improvements
3. **Refine the design**: Make adjustments based on feedback
4. **Test again**: Validate improvements with users

### Your Feedback Matters:
- Help us understand how you use the tool
- Identify any remaining issues
- Suggest improvements we might have missed
- Validate that our solutions work in practice

---

## Thank You!

Your participation in this focus group is invaluable. Your feedback will help us create a mortgage calculator that truly meets your needs.

**Let's test the calculator together and gather your thoughts!**

---

## Testing Scenarios

### Scenario 1: First-Time Buyer
**Task**: Calculate monthly payment for £250,000 property with £50,000 deposit, 4.5% interest, 25-year term, repayment mortgage.

**What to Observe**:
- Is the process clear?
- Do you understand the terminology?
- Can you complete it without help?

### Scenario 2: Mobile User
**Task**: Complete the calculation on your mobile device.

**What to Observe**:
- Does it work smoothly?
- Are fields easy to fill?
- Is the layout readable?

### Scenario 3: Error Handling
**Task**: Try entering invalid data (e.g., deposit larger than property value).

**What to Observe**:
- Are error messages helpful?
- Do you know how to fix the error?
- Is it frustrating or helpful?

---

**Ready to test! Let's begin the focus group session.**


