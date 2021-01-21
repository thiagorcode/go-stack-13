import React from 'react';

export default function Header({ title, children }) {
  return (
    <header>
      <h2>{title}</h2>
      <div>
        {children}
      </div>
    </header>
  )
}