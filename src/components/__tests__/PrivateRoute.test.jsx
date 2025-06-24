// src/components/__tests__/PrivateRoute.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { describe, it, expect, afterEach, vi } from 'vitest';

vi.mock('jwt-decode', () => ({
  default: () => ({ exp: Math.floor(Date.now() / 1000) + 60 }),
}));

describe('PrivateRoute', () => {
  afterEach(() => {
    localStorage.clear();
  });

  const renderWithRouter = (ui) =>
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/admin/login" element={<div>Login Page</div>} />
          <Route path="/protected" element={<PrivateRoute>{ui}</PrivateRoute>} />
        </Routes>
      </MemoryRouter>
    );

  it('redirects when no token is present', () => {
    renderWithRouter(<div>Secret</div>);
    expect(screen.queryByText('Secret')).toBeNull();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders children with valid token', () => {
    localStorage.setItem('token', 'valid-token');
    renderWithRouter(<div>Secret</div>);
    expect(screen.getByText('Secret')).toBeInTheDocument();
  });
});
