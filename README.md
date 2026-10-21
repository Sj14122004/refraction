# Installation and Project Structure

## 1. Installation and Setup

### Prerequisites

- Node.js
- pnpm
- Git

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Initialize Git Submodules

```bash
git submodule update --init --recursive
```

### Step 4: Start the Development Server

```bash
pnpm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

### Step 5: Build for Production

```bash
pnpm run build
```

### Step 6: Run Linting

```bash
pnpm run lint
```

## 2. Folder Structure and Description

### `src/`
Contains the application's main source code.

### `src/shipping-bills/`
Contains the Shipping Bill feature and its related functionality.

### `src/shipping-bills/components/`
Contains reusable UI components for the Shipping Bill feature.

### `src/shipping-bills/hooks/`
Contains custom React hooks for managing form state, field arrays, selections, and reusable form logic.

### `src/shipping-bills/shared/`
Contains shared TypeScript types, constants, UI components, and party-selection components used across the feature.

### `src/shipping-bills/services/`
Contains service-layer logic for retrieving, saving, and managing Shipping Bill data.

### `src/shipping-bills/validation/`
Contains form validation schemas and related validation logic.

### `src/shipping-bills/models/`
Contains TypeScript types, interfaces, and data models used by the application.

### `src/shipping-bills/data/`
Contains data-related utilities and mock storage functionality.

### `src/shipping-bills/error-handling/`
Contains error-handling and form-validation utilities.

## 3. Additional Files

- `package.json` — Defines project dependencies and available scripts.
- `pnpm-lock.yaml` — Records dependency versions for consistent installations.
- `.gitmodules` — Defines the Git submodules used by the project.
- `README.md` — Documents installation, setup, and project architecture.
