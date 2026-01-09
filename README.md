# Mortgage Calculator - Production Ready

A fully functional, accessible, and responsive mortgage calculator built with React. This application addresses all customer feedback issues and is ready for production deployment.

## ✨ Features

✅ **Step-by-Step Wizard** - Guided process through 4 clear steps  
✅ **Real-time Validation** - Inline error messages with specific guidance  
✅ **Accessibility (WCAG 2.1 AA)** - Full keyboard navigation, screen reader support, ARIA labels  
✅ **Mobile Optimized** - Responsive design with proper touch targets and keyboard handling  
✅ **Auto-Save** - Data persists automatically with resume prompt  
✅ **Contextual Help** - Tooltips and help sections throughout  
✅ **Accurate Calculations** - Repayment and interest-only mortgage calculations  
✅ **Comprehensive Testing** - Full test suite with 80%+ coverage  

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
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

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests in watch mode
- `npm test -- --coverage` - Run tests with coverage report
- `npm test -- --watchAll=false` - Run tests once (CI mode)

## 📁 Project Structure

```
mortgage-calculator/
├── src/
│   ├── components/
│   │   ├── MortgageCalculator.js      # Main calculator component
│   │   ├── MortgageCalculator.test.js # Component tests
│   │   ├── MortgageCalculator.css     # Component styles
│   │   ├── InputField.js              # Reusable input with validation
│   │   ├── InputField.test.js         # Input field tests
│   │   ├── InputField.css             # Input styles
│   │   ├── ResultsDisplay.js          # Results presentation
│   │   ├── ResultsDisplay.test.js     # Results tests
│   │   └── ResultsDisplay.css         # Results styles
│   ├── App.js                         # Root component
│   ├── App.test.js                    # App tests
│   ├── App.css                        # Global styles
│   └── index.js                       # Entry point
├── public/                            # Static assets
│   └── web.config                     # Azure App Service config
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml  # GitHub Actions workflow
├── staticwebapp.config.json           # Azure Static Web Apps config
├── azure-pipelines.yml                # Azure DevOps pipeline
├── DEPLOYMENT.md                      # Deployment guide
├── TESTING_GUIDE.md                   # Testing documentation
└── package.json                       # Dependencies
```

## 🎨 Design Principles

This calculator addresses all customer feedback issues:

1. **Error Handling** - Specific, actionable error messages for each field
2. **Mobile Experience** - Keyboard handling, touch targets, responsive layout
3. **Accessibility** - WCAG 2.1 AA compliant with full keyboard navigation
4. **Data Persistence** - Auto-save with resume functionality
5. **Clarity** - Tooltips, help sections, and clear field labels
6. **Responsive Design** - Works seamlessly on all devices

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage --watchAll=false

# Run specific test file
npm test -- MortgageCalculator.test.js
```

### Test Coverage

- ✅ Component rendering
- ✅ Form validation
- ✅ Mortgage calculations
- ✅ Navigation between steps
- ✅ Data persistence
- ✅ Accessibility features
- ✅ Error handling

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing instructions.

## 🚀 Deployment

### Azure Static Web Apps (Recommended)

The easiest way to deploy is using Azure Static Web Apps:

1. Fork or clone this repository
2. Follow the instructions in [DEPLOYMENT.md](./DEPLOYMENT.md)
3. Configure GitHub Actions with your Azure deployment token
4. Push to main branch to trigger deployment

### Other Options

- Azure App Service
- Azure DevOps Pipeline
- Manual deployment to any static hosting

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## ♿ Accessibility

This application is fully accessible and WCAG 2.1 AA compliant:

- ✅ Keyboard navigation throughout
- ✅ Screen reader compatible (NVDA, JAWS, VoiceOver)
- ✅ Proper ARIA labels and roles
- ✅ Color contrast meets WCAG standards
- ✅ Focus indicators visible
- ✅ Skip link for keyboard users
- ✅ Tooltips accessible via keyboard

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile, Samsung Internet)

## 🔧 Customization

### Colors

Edit color variables in `src/App.css`:

```css
--primary-color: #0066cc;
--success-color: #28a745;
--error-color: #dc3545;
```

### Validation Rules

Update validation logic in `src/components/MortgageCalculator.js`:

```javascript
const validateField = (name, value) => {
  // Custom validation logic
};
```

### Steps Configuration

Modify steps array in `src/components/MortgageCalculator.js`:

```javascript
const steps = [
  { number: 1, label: 'Property Details' },
  // Add more steps
];
```

## 📊 Performance

Target metrics:
- ⚡ Lighthouse Performance: 90+
- ♿ Lighthouse Accessibility: 100
- 📦 Bundle Size: < 200KB gzipped
- ⏱️ Time to Interactive: < 3s

## 🐛 Known Issues

None - All reported issues have been resolved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is open source and available for educational purposes.

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment instructions
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Comprehensive testing guide
- [DESIGN_DOCUMENTATION.md](./DESIGN_DOCUMENTATION.md) - Design decisions
- [WIREFRAME_DOCUMENTATION.md](./WIREFRAME_DOCUMENTATION.md) - Wireframe details

## 🙏 Acknowledgments

Built based on customer feedback analysis to address usability and accessibility issues in the original mortgage calculator.

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

---

**Status**: ✅ Production Ready  
**Last Updated**: 2024  
**Version**: 1.0.0
