# Unsplash Testing with Playwright

A comprehensive end-to-end testing framework for Unsplash using Playwright, TypeScript, and the Page Object Model (POM) pattern. This project demonstrates best practices for UI and API testing integration.

## Features

- TypeScript-based test automation
- Page Object Model (POM) architecture
- Integrated UI and API testing
- Parallel test execution
- Environment-based configuration
- Shared test fixtures
- HTML test reports
- Cross-browser testing support

## Prerequisites

- Node.js 
- npm 
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PlaywrightFinal
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Project Structure

```
PlaywrightFinal/
├── configs/          # Environment configurations
├── constants/        # Shared constants and enums
├── core/             # Core utilities and helpers
├── data/             # Test data files
├── fixtures/         # Shared test fixtures
├── hooks/            # Test hooks and setup
├── models/           # Data models and interfaces
├── pages/            # Page Object Models
├── services/         # API services and utilities
├── tests/            # Test files
├── playwright.config.ts
└── package.json
```

## Running Tests

### Basic Test Commands

```bash
# Run all tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui

# Run tests in headed mode (visible browser)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug
```

### Running Specific Tests

```bash
# Run a specific test file
npx playwright test tests/search.spec.ts

# Run tests matching a specific name pattern
npx playwright test -g "search"

# Run tests in a specific directory
npx playwright test tests/regression/

# Run tests with specific tags
npx playwright test --grep @smoke
```

### Browser-Specific Testing

```bash
# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests in all browsers
npx playwright test --project=all
```

### Parallel Execution

```bash
# Run tests in parallel with specific number of workers
npx playwright test --workers=4

# Run tests in parallel with maximum workers
npx playwright test --workers=0

# Run tests sequentially
npx playwright test --workers=1
```

### Configuration and Environment

```bash
# Run tests with specific configuration file
npx playwright test --config=configs/staging.config.ts

# Run tests with specific environment variables
npx playwright test --env=staging

# Run tests with specific timeout
npx playwright test --timeout=60000
```

### Test Reports and Debugging

```bash
# Generate HTML report
npx playwright test --reporter=html

# Show last test report
npx playwright show-report

# Show trace viewer for failed tests
npx playwright show-trace test-results/trace.zip

# Run tests with trace enabled
npx playwright test --trace on
```

### CI/CD Integration

```bash
# Run tests in CI mode (no UI, no retries)
npx playwright test --reporter=dot

# Install browsers for CI
npx playwright install --with-deps chromium

# Run tests with specific retry count
npx playwright test --retries=2
```

### Test Development

```bash
# Run tests in watch mode
npx playwright test --watch

# Run tests with specific test file and watch mode
npx playwright test tests/<your-test-filename>.spec.ts --watch

# Run tests with specific line number
npx playwright test tests/<your-test-filename>.spec.ts:42
```

## Configuration

The project uses environment-based configuration through `playwright.config.ts`. You can create different configurations for various environments:

- Development
- Staging
- Production

### Environment Setup

1. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

2. Configure your credentials in the `.env` file:
```env
# Unsplash API Configuration
UNSPLASH_ACCOUNT_FULLNAME=your_fullname_here
UNSPLASH_ACCOUNT_EMAIL=your_email_here
UNSPLASH_ACCOUNT_PASSWORD=your_password_here
UNSPLASH_ACCESS_TOKEN=your_access_token_here

# Test Configuration
HEADLESS=true
BROWSER=chromium
TIMEOUT=30000
```

3. Add `.env` to your `.gitignore` file to prevent committing sensitive information:
```gitignore
.env
.env.local
.env.*.local
```

4. Create environment-specific files for different configurations:
```bash
# Development environment
cp .env .env.development

# Staging environment
cp .env .env.staging

# Production environment
cp .env .env.production
```

To use a specific configuration:
```bash
npx playwright test --config=configs/staging.config.ts
```

### Environment Variables Usage

In your test files, you can access environment variables using:
```typescript
import { test } from '@playwright/test';

test('example test', async ({ page }) => {
    const apiKey = process.env.UNSPLASH_API_KEY;
    const baseUrl = process.env.BASE_URL;
    // Use the variables in your test
});
```

### Security Best Practices

1. Never commit `.env` files to version control
2. Use different API keys for different environments
3. Rotate API keys regularly
4. Use environment variables for all sensitive information
5. Keep your `.env.example` file updated with all required variables (but with dummy values)

## Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## 📄 License

This project is licensed under the ISC License.
