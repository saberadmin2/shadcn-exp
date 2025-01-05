// components/ui/input.js
import React from 'react';

export function Input({ type = "text", ...props }) {
  return <input type={type} {...props} className="border p-2 rounded" />;
}
