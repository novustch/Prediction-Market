# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Root-level package.json for monorepo management
- Comprehensive .gitignore file
- LICENSE file (ISC)
- CONTRIBUTING.md with contribution guidelines
- GitHub issue templates (bug report, feature request)
- GitHub pull request template
- CI/CD workflow for automated testing and building
- API configuration system for frontend
- Environment variable support for API URLs

### Changed
- Renamed `BackEnd` directory to `backend` (lowercase)
- Renamed `FrontEnd` directory to `frontend` (lowercase)
- Renamed `Prediction-Market-smartcontract` directory to `contracts`
- Updated all package.json files with consistent metadata
- Standardized README.md filenames
- Refactored hardcoded API URLs to use centralized configuration
- Updated all documentation to reflect new directory structure

### Fixed
- API URL configuration (changed from port 8080 to 9000)
- Consistent repository URLs across all package.json files

## [1.0.0] - Initial Release

### Added
- Decentralized prediction market platform on Solana
- Backend API server with Express and TypeScript
- Next.js frontend application
- Anchor smart contracts for market management
- Oracle integration with Switchboard
- Referral system
- User profile management

