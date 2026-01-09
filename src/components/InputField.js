import React from 'react';
import './InputField.css';

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  tooltip,
  prefix,
  suffix,
  step,
  min,
  max,
  ...props
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  return (
    <div className={`form-group ${error ? 'has-error' : ''}`}>
      <label htmlFor={name}>
        {label}
        {required && <span className="required-indicator">*</span>}
        {tooltip && (
          <div className="tooltip-container">
            <span className="tooltip-icon" aria-label={`More information about ${label}`}>?</span>
            <div className="tooltip-content" role="tooltip">
              {tooltip}
            </div>
          </div>
        )}
      </label>
      <div className="input-wrapper">
        {prefix && <span className="input-prefix">{prefix}</span>}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          step={step}
          min={min}
          max={max}
          className={`form-input ${error ? 'error' : ''} ${prefix ? 'with-prefix' : ''} ${suffix ? 'with-suffix' : ''}`}
          aria-describedby={error ? `${name}-error` : tooltip ? `${name}-tooltip` : undefined}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>
      {error && (
        <div id={`${name}-error`} className="error-message" role="alert">
          <span className="error-icon">⚠</span>
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;

