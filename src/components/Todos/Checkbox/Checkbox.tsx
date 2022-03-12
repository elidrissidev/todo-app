import React from 'react'
import './Checkbox.css'

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

export function Checkbox(props: CheckboxProps) {
  return <input type="checkbox" className="Checkbox" {...props} />
}
