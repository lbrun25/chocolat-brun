'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PasswordInput({ id, value, onChange, className = '', ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <input
        type={visible ? 'text' : 'password'}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 pr-12 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors ${className}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-chocolate-dark/60 hover:text-chocolate-dark focus:outline-none focus:ring-2 focus:ring-chocolate-dark/30 rounded"
        tabIndex={-1}
        aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
      >
        {visible ? (
          <EyeOff className="w-5 h-5" aria-hidden="true" />
        ) : (
          <Eye className="w-5 h-5" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
