# Mortgage Calculator - Redesigned

A user-friendly mortgage calculator built with React, designed based on customer feedback analysis.

## Features

✅ **Step-by-Step Wizard** - Guides users through calculation process  
✅ **Clear Navigation** - Visual progress indicator  
✅ **Real-time Validation** - Immediate feedback on input errors  
✅ **Tooltips & Help** - Contextual help throughout  
✅ **Auto-Save** - Data persists across page refreshes  
✅ **Responsive Design** - Works on all devices  
✅ **Accessible** - WCAG AA compliant  

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd mortgage-calculator

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
mortgage-calculator/
├── src/
│   ├── components/
│   │   ├── MortgageCalculator.js    # Main calculator component
│   │   ├── InputField.js            # Reusable input with validation
│   │   ├── ResultsDisplay.js        # Results presentation
│   │   └── *.css                    # Component styles
│   ├── App.js                       # Root component
│   └── App.css                      # Global styles
├── public/                          # Static assets
└── package.json                     # Dependencies
```

## Design Principles

This calculator addresses key customer feedback:

1. **Navigation** - Clear step-by-step wizard
2. **Clarity** - Tooltips and explanations
3. **Technical** - Auto-save, validation, responsive
4. **Results** - Clear breakdown with explanations
5. **Design** - Clean, uncluttered layout

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

### Customization

- Colors: Edit color variables in `App.css`
- Steps: Modify steps array in `MortgageCalculator.js`
- Validation: Update `validateStep()` function

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Documentation

See `DESIGN_DOCUMENTATION.md` for detailed design decisions and improvements.
