# Mortgage Calculator Design Sketches & Wireframes

## Design Process Overview

This document shows the design evolution from initial sketches to the final digital wireframe, demonstrating how customer feedback was addressed through design improvements.

---

## 1. Initial Design Concepts (Paper Sketches)

### Concept 1: Step-by-Step Wizard Layout

**Layout Structure:**
```
┌─────────────────────────────────────────┐
│        Mortgage Calculator              │
│  Calculate your monthly payments        │
├─────────────────────────────────────────┤
│                                         │
│  [●]──[○]──[○]──[○]                    │
│  Step 1  Step 2  Step 3  Step 4        │
│                                         │
├─────────────────────────────────────────┤
│  Step 1: Property Details              │
│                                         │
│  Property Value*  [£_________] [?]     │
│  Hint: Total purchase price            │
│                                         │
│  Deposit Amount*  [£_________] [?]     │
│  Hint: Amount you can pay upfront      │
│                                         │
│  [Help: Property value is the total...] │
│                                         │
│  [Back]              [Next →]          │
└─────────────────────────────────────────┘
```

**Design Principles Applied:**
- ✅ **Clear Progress Indicator**: Visual steps at top
- ✅ **One Step at a Time**: Progressive disclosure
- ✅ **Help Text**: Tooltips and hints visible
- ✅ **Clear Labels**: Required fields marked with *

---

### Concept 2: Improved Navigation Flow

**Key Features:**
1. **Visual Progress Bar**: Shows completion status
2. **Step Labels**: Clear naming for each step
3. **Help Sections**: Contextual help on each step
4. **Navigation Buttons**: Always visible

**Layout Sketch:**
```
Step 1: Property Details
┌──────────────────────────────────────┐
│ Property Value*    [£250,000] [?]   │
│ ⚠️ Please enter a valid property value│
└──────────────────────────────────────┘

Step 2: Loan Details  
┌──────────────────────────────────────┐
│ Interest Rate*     [4.5] %  [?]     │
│ Loan Term*         [25] years [?]   │
└──────────────────────────────────────┘

Step 3: Mortgage Type
┌──────────────────────────────────────┐
│ Mortgage Type*    [Repayment ▼] [?] │
│ ● Repayment                          │
│ ○ Interest-Only                      │
│ Hint: You'll pay back both loan...   │
└──────────────────────────────────────┘
```

---

## 2. Visual Hierarchy Design

### Information Priority:

```
Priority 1 (Largest): Monthly Payment Result
┌──────────────────────┐
│ £1,109.00/month      │  ← 36px font, blue, bold
└──────────────────────┘

Priority 2 (Medium): Step Titles
┌──────────────────────┐
│ Property Details     │  ← 24px font, dark
└──────────────────────┘

Priority 3 (Small): Labels & Hints
┌──────────────────────┐
│ Property Value*      │  ← 14px font, medium
│ Hint: Total price... │  ← 12px font, gray
└──────────────────────┘
```

---

## 3. Mobile-First Responsive Design

### Desktop Layout (>768px):
```
┌────────────────────────────────────────────┐
│          [Progress Steps]                  │
├────────────────────────────────────────────┤
│  [Form Fields - 2 columns]                │
│  Property Value    │  Deposit              │
│  [Input]           │  [Input]              │
│                    │                       │
│  [Help Section - Full Width]              │
│                    │                       │
│  [Back]  [Next]                           │
└────────────────────────────────────────────┘
```

### Mobile Layout (<768px):
```
┌──────────────────┐
│  [Progress Steps]│
│  Vertical Stack  │
├──────────────────┤
│  Property Value* │
│  [Input]         │
│                  │
│  Deposit*        │
│  [Input]         │
│                  │
│  [Help Section]  │
│                  │
│  [Back]          │
│  [Next]          │
└──────────────────┘
```

---

## 4. Color Scheme & Visual Design

### Color Palette:

```
Primary Blue:    #0066cc  (Headers, buttons, active states)
Success Green:   #28a745  (Completed steps)
Error Red:       #dc3545  (Errors, warnings)
Background:      #f5f5f5  (Page background)
Card White:      #ffffff  (Content cards)
Text Dark:       #333333  (Primary text)
Text Medium:     #666666  (Secondary text)
Text Light:      #999999  (Hints, placeholders)
Border:          #e0e0e0  (Dividers, borders)
```

### Typography:

```
Headings:    Segoe UI, 24-28px, Bold
Body:        Segoe UI, 14-16px, Regular
Small Text:  Segoe UI, 12px, Regular
```

---

## 5. Component Structure

### Component Hierarchy:

```
MortgageCalculator
├── CalculatorHeader
│   ├── Title
│   └── Description
├── ProgressIndicator
│   ├── StepCircle (4 instances)
│   └── StepLabel (4 instances)
├── FormSteps
│   ├── Step1: PropertyDetails
│   │   ├── HelpSection
│   │   ├── InputField (Property Value)
│   │   └── InputField (Deposit)
│   ├── Step2: LoanDetails
│   │   ├── HelpSection
│   │   ├── InputField (Interest Rate)
│   │   └── InputField (Loan Term)
│   ├── Step3: MortgageType
│   │   ├── HelpSection
│   │   └── SelectField (Mortgage Type)
│   └── Step4: Results
│       └── ResultsDisplay
│           ├── ResultsSummary
│           ├── ResultsBreakdown
│           └── ResultsActions
└── NavigationButtons
    ├── Back Button
    └── Next/Calculate Button
```

---

## 6. Interactive Elements Design

### Input Field Design:

```
┌─────────────────────────────────────┐
│ Property Value*  [?]                │
│ ┌─────────────────────────────────┐ │
│ │ £│250000                        │ │
│ └─────────────────────────────────┘ │
│ Hint: The total purchase price...   │
│                                      │
│ ⚠️ Error: Please enter a valid value│
└─────────────────────────────────────┘
```

### Button States:

```
Normal State:     [Blue background, white text]
Hover State:      [Darker blue, slight lift]
Active State:     [Pressed effect]
Disabled State:   [Gray, cursor: not-allowed]
```

### Tooltip Design:

```
Input Field
    ↓
[?] Icon (hover)
    ↓
┌─────────────────────────────┐
│ The total purchase price    │
│ of the property you want    │
│ to buy.                     │
└─────────────────────────────┘
```

---

## 7. Results Display Design

### Results Layout:

```
┌────────────────────────────────────────┐
│ Your Mortgage Calculation Results      │
├────────────────────────────────────────┤
│                                        │
│ Your Monthly Payment                   │
│ ┌──────────────────────────────────┐  │
│ │          £1,109.00               │  │
│ │        per month                 │  │
│ └──────────────────────────────────┘  │
│                                        │
│ This is what you will pay each month  │
│ for your repayment mortgage over 25   │
│ years.                                │
│                                        │
├────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐           │
│  │Loan Amt  │ │Monthly   │           │
│  │£200,000  │ │£1,109    │           │
│  └──────────┘ └──────────┘           │
│  ┌──────────┐ ┌──────────┐           │
│  │Interest  │ │Total     │           │
│  │£132,700  │ │£332,700  │           │
│  └──────────┘ └──────────┘           │
│                                        │
│  [Calculate Again] [Start Over]       │
└────────────────────────────────────────┘
```

---

## 8. Addressing Customer Feedback in Design

### Navigation Issues (FB001, FB005, FB009, FB012) ✅

**Design Solution:**
- ✅ **Progress Indicator**: Visual steps showing current position
- ✅ **Step-by-Step Wizard**: One step at a time, clear flow
- ✅ **Visible Labels**: All fields clearly labeled
- ✅ **Help Sections**: Contextual help on each step

### Technical Issues (FB003, FB006, FB010, FB013) ✅

**Design Solution:**
- ✅ **Auto-save**: Visual indicator (data persists)
- ✅ **Validation**: Inline error messages
- ✅ **Responsive Design**: Mobile-optimized layout
- ✅ **Touch Targets**: Minimum 44x44px buttons

### Clarity Issues (FB002, FB007, FB014) ✅

**Design Solution:**
- ✅ **Tooltips**: Help icons next to fields
- ✅ **Help Sections**: Explanation boxes
- ✅ **Placeholders**: Example values in inputs
- ✅ **Hints**: Dynamic hints based on selection

### Results Issues (FB004, FB011, FB015) ✅

**Design Solution:**
- ✅ **Prominent Payment**: Large, highlighted monthly payment
- ✅ **Breakdown Cards**: Clear sections for each metric
- ✅ **Explanations**: Each result explained
- ✅ **Visual Hierarchy**: Important info emphasized

### Design Issues (FB008) ✅

**Design Solution:**
- ✅ **Progressive Disclosure**: Only one step shown
- ✅ **Whitespace**: Plenty of breathing room
- ✅ **Grouping**: Related fields grouped
- ✅ **Clean Layout**: Minimal clutter

---

## 9. Accessibility Design Considerations

### Keyboard Navigation:
- ✅ Tab order: Logical flow through form
- ✅ Focus indicators: Clear outline on focus
- ✅ Skip links: Jump to main content
- ✅ ARIA labels: Screen reader support

### Screen Reader Support:
- ✅ Semantic HTML: Proper heading hierarchy
- ✅ ARIA attributes: Labels, descriptions
- ✅ Error announcements: Live regions
- ✅ Status updates: Progress announced

### Visual Accessibility:
- ✅ Color contrast: WCAG AA compliant (4.5:1)
- ✅ Font sizes: Minimum 16px on mobile
- ✅ Focus indicators: 2px outline, high contrast
- ✅ Error colors: Not color-only (icons + text)

---

## 10. Mobile Optimization

### Mobile-Specific Design:

**Touch Targets:**
- Buttons: Minimum 44x44px
- Input fields: Minimum 44px height
- Tooltip icons: 40x40px touch area

**Keyboard Handling:**
- Auto-scroll: Input fields into view
- Font size: 16px (prevents iOS zoom)
- Input types: Appropriate keyboards (number, tel)

**Layout Adaptation:**
- Single column: Stacked on mobile
- Reduced spacing: Tighter margins
- Sticky buttons: Navigation always accessible

---

## Design Rationale

### Why Step-by-Step Wizard?

**Problem**: Users found the original form overwhelming (FB001, FB008)

**Solution**: Break into 4 manageable steps
- **Step 1**: Property details (2 fields)
- **Step 2**: Loan details (2 fields)
- **Step 3**: Mortgage type (1 field)
- **Step 4**: Results

**Benefit**: Users focus on one thing at a time, reducing cognitive load

---

### Why Progress Indicator?

**Problem**: Users didn't know where they were in the process (FB001, FB012)

**Solution**: Visual progress bar with:
- Current step highlighted (blue)
- Completed steps shown (green checkmark)
- Step labels clearly displayed

**Benefit**: Users always know their position and progress

---

### Why Tooltips & Help Sections?

**Problem**: Users found terminology confusing (FB002, FB007, FB014)

**Solution**: 
- Tooltips on hover/focus
- Help sections on each step
- Dynamic hints based on selections

**Benefit**: Contextual help available without leaving the form

---

### Why Inline Validation?

**Problem**: Users got vague error messages (FB003)

**Solution**: 
- Real-time validation
- Field-specific error messages
- Visual indicators (red border, error icon)

**Benefit**: Users know exactly what's wrong and how to fix it

---

### Why Prominent Results Display?

**Problem**: Results were hard to understand (FB004, FB011, FB015)

**Solution**:
- Large monthly payment display (36px font)
- Clear breakdown cards
- Explanations for each metric

**Benefit**: Users immediately understand their results

---

## Design Evolution

### Original Concept → Final Design

**Original**: Single form with all fields visible
**Problem**: Overwhelming, confusing (FB008)

**Iteration 1**: Grouped fields in sections
**Problem**: Still too much at once

**Iteration 2**: Collapsible sections
**Problem**: Users didn't know what to expand

**Final**: Step-by-step wizard with progress
**Solution**: ✅ Clear, guided flow

---

## Design Specifications

### Spacing:

```
Container Padding: 30px (desktop), 20px (mobile)
Section Margin: 25px between sections
Field Spacing: 25px between fields
Button Spacing: 10px between buttons
```

### Borders & Shadows:

```
Card Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
Border Radius: 12px (containers), 6px (inputs)
Border Width: 2px (inputs), 1px (dividers)
```

### Transitions:

```
Button Hover: 0.3s ease
Input Focus: 0.3s ease
Step Change: 0.3s fade-in
```

---

This design addresses all major customer feedback issues while maintaining simplicity, clarity, and accessibility.


