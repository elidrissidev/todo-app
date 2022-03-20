import React from 'react'

import './Checkbox.css'
import classNames from '@/utils/classNames'

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

export function Checkbox(props: CheckboxProps) {
  return (
    <div
      className={classNames(
        'CheckboxWrapper',
        props.disabled ? 'CheckboxWrapper--disabled' : undefined,
        props.checked || props.defaultChecked
          ? 'CheckboxWrapper--checked'
          : undefined
      )}
    >
      <input type="checkbox" className="Checkbox" {...props} />
    </div>
  )
}
