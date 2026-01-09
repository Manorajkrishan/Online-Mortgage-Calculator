# Azure Deployment Guide

This document provides instructions for deploying the Mortgage Calculator application to Azure.

## Prerequisites

1. Azure account with active subscription
2. Azure CLI installed and configured
3. Node.js 18.x or higher
4. Git configured

## Deployment Options

### Option 1: Azure Static Web Apps (Recommended)

Azure Static Web Apps is the recommended hosting solution for this React application.

#### Step 1: Create Azure Static Web App

```bash
# Login to Azure
az login

# Create a resource group (if it doesn't exist)
az group create --name mortgage-calculator-rg --location eastus

# Create Static Web App
az staticwebapp create \
  --name mortgage-calculator-app \
  --resource-group mortgage-calculator-rg \
  --location eastus2 \
  --sku Free
```

#### Step 2: Get Deployment Token

```bash
# Get the deployment token
az staticwebapp secrets list \
  --name mortgage-calculator-app \
  --resource-group mortgage-calculator-rg \
  --query "properties.apiKey" \
  --output tsv
```

#### Step 3: Configure GitHub Actions

1. Copy the deployment token
2. Go to your GitHub repository
3. Navigate to Settings > Secrets > Actions
4. Add a new secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Paste the deployment token as the value
6. The GitHub Actions workflow (`.github/workflows/azure-static-web-apps.yml`) will automatically deploy on push to main/master

#### Step 4: Deploy Manually

```bash
# Build the application
npm run build

# Deploy using Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli
swa deploy ./build --deployment-token <YOUR_DEPLOYMENT_TOKEN>
```

### Option 2: Azure App Service

For App Service deployment, use the following steps:

#### Step 1: Create App Service

```bash
# Create App Service Plan
az appservice plan create \
  --name mortgage-calculator-plan \
  --resource-group mortgage-calculator-rg \
  --sku B1 \
  --is-linux

# Create Web App
az webapp create \
  --resource-group mortgage-calculator-rg \
  --plan mortgage-calculator-plan \
  --name mortgage-calculator-app \
  --runtime "NODE:18-lts"
```

#### Step 2: Configure Deployment

```bash
# Enable local Git deployment
az webapp deployment source config-local-git \
  --name mortgage-calculator-app \
  --resource-group mortgage-calculator-rg

# Get deployment URL
az webapp deployment source show \
  --name mortgage-calculator-app \
  --resource-group mortgage-calculator-rg \
  --query url \
  --output tsv
```

#### Step 3: Deploy

```bash
# Build the application
npm run build

# Add Azure remote
git remote add azure <DEPLOYMENT_URL>

# Deploy
git push azure main
```

### Option 3: Azure DevOps Pipeline

If using Azure DevOps, configure the pipeline:

1. Navigate to Azure DevOps project
2. Go to Pipelines > New Pipeline
3. Select your repository
4. Use the `azure-pipelines.yml` file
5. Add the `AZURE_STATIC_WEB_APPS_API_TOKEN` variable in pipeline settings
6. Run the pipeline

## Environment Configuration

### Environment Variables

No environment variables are required for the basic deployment. However, if you need to configure:

1. **Azure Static Web Apps**: Add in Azure Portal under Configuration > Application Settings
2. **Azure App Service**: Add in Azure Portal under Configuration > Application Settings

### Build Configuration

The application uses the following build configuration:

- **Build command**: `npm run build`
- **Output directory**: `build`
- **Node version**: 18.x

## Testing Deployment

After deployment, verify:

1. ✅ Application loads at the deployed URL
2. ✅ All routes work correctly (SPA routing)
3. ✅ Calculator functionality works
4. ✅ Mobile responsiveness is maintained
5. ✅ Accessibility features work
6. ✅ LocalStorage persistence works

### Manual Testing Checklist

- [ ] Property value input accepts numbers
- [ ] Deposit validation works correctly
- [ ] Interest rate validation (0-20%)
- [ ] Loan term validation (1-50 years)
- [ ] Mortgage calculation is accurate
- [ ] Results display correctly
- [ ] Navigation between steps works
- [ ] Mobile view is responsive
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Auto-save functionality
- [ ] Resume prompt appears when data exists

## Continuous Deployment

### GitHub Actions

The application automatically deploys when:

- Code is pushed to `main` or `master` branch
- Pull requests are opened/updated (preview deployments)

### Azure DevOps

The pipeline automatically:

1. Builds the application
2. Runs tests
3. Publishes test coverage
4. Deploys to Azure on successful build

## Monitoring and Logging

### Application Insights (Optional)

To add Application Insights:

```bash
# Install Application Insights
az extension add --name application-insights

# Create Application Insights resource
az monitor app-insights component create \
  --app mortgage-calculator-insights \
  --location eastus \
  --resource-group mortgage-calculator-rg
```

## Troubleshooting

### Build Failures

1. Check Node.js version (should be 18.x)
2. Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
3. Check build logs in Azure Portal

### Deployment Issues

1. Verify deployment token is correct
2. Check GitHub Actions logs (if using GitHub)
3. Verify build artifacts are in `build` directory
4. Check Azure Portal deployment logs

### Routing Issues

- Ensure `staticwebapp.config.json` is in root directory
- Verify `web.config` is in `public` directory (for App Service)
- Check that all routes rewrite to `/index.html`

## Rollback

To rollback to a previous deployment:

```bash
# List deployments
az staticwebapp deployment list \
  --name mortgage-calculator-app \
  --resource-group mortgage-calculator-rg

# Rollback to specific deployment
az staticwebapp deployment delete \
  --name mortgage-calculator-app \
  --resource-group mortgage-calculator-rg \
  --deployment-id <DEPLOYMENT_ID>
```

## Cost Estimation

### Azure Static Web Apps (Free Tier)
- **Cost**: Free
- **Storage**: 100 MB
- **Bandwidth**: 100 GB/month
- **Build minutes**: 100 minutes/month

### Azure App Service (Basic Tier)
- **Cost**: ~$13/month (B1 - Linux)
- **Storage**: 10 GB
- **Bandwidth**: Included
- **Compute**: 1.75 GB RAM, 1 CPU core

## Security Considerations

1. ✅ HTTPS is enabled by default
2. ✅ Content Security Policy (CSP) can be added in headers
3. ✅ Environment variables are encrypted
4. ✅ No sensitive data stored in client-side code

## Additional Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
