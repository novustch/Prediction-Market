# Contributing to DecentralizedPredict

Thank you for your interest in contributing to DecentralizedPredict! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Prediction-Market.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js v18+
- Anchor 0.29.0
- Solana CLI
- MongoDB
- Rust (for smart contract development)

### Setup Steps

1. Install dependencies for each package:
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   
   # Smart Contracts
   cd ../contracts
   npm install
   ```

2. Set up environment variables (see README.md)

3. Run the development servers

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public functions
- Keep functions small and focused

### Rust (Smart Contracts)

- Follow Rust naming conventions
- Use `cargo fmt` and `cargo clippy`
- Add comments for complex logic
- Write tests for new instructions

### Git Commit Messages

- Use clear, descriptive messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Reference issue numbers when applicable
- Example: `Add market filtering by status`

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md if applicable
5. Request review from maintainers

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Smart Contract Tests
```bash
cd contracts
anchor test
```

## Reporting Issues

When reporting issues, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots if applicable

## Feature Requests

For feature requests:

- Describe the feature clearly
- Explain the use case
- Consider implementation approach
- Check if similar features exist

## Questions?

Feel free to reach out:

- Open an issue for questions
- Contact: [@novustch](https://t.me/novustch)

Thank you for contributing! 🚀

