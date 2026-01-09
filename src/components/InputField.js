import React, { useState, useRef, useEffect } from 'react';
import './InputField.css';

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
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
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  const tooltipTriggerRef = useRef(null);

  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(name, e.target.value);
    }
  };

  // Handle keyboard events for tooltip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showTooltip) {
        setShowTooltip(false);
        tooltipTriggerRef.current?.focus();
      }
    };

    if (showTooltip) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showTooltip]);

  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        tooltipTriggerRef.current &&
        !tooltipTriggerRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showTooltip]);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const tooltipId = `${name}-tooltip`;

  return (
    <div className={`form-group ${error ? 'has-error' : ''}`}>
      <label htmlFor={name}>
        {label}
        {required && <span className="required-indicator" aria-label="required">*</span>}
        {tooltip && (
          <div className="tooltip-container">
            <button
              type="button"
              ref={tooltipTriggerRef}
              className="tooltip-icon"
              aria-label={`More information about ${label}`}
              aria-describedby={showTooltip ? tooltipId : undefined}
              aria-expanded={showTooltip}
              onClick={toggleTooltip}
              onFocus={() => setShowTooltip(true)}
              onBlur={(e) => {
                // Don't close if focus moves to tooltip content
                if (!tooltipRef.current?.contains(e.relatedTarget)) {
                  setShowTooltip(false);
                }
              }}
            >
              ?
            </button>
            {showTooltip && (
              <div
                ref={tooltipRef}
                id={tooltipId}
                className="tooltip-content"
                role="tooltip"
                aria-live="polite"
              >
                {tooltip}
              </div>
            )}
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
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          step={step}
          min={min}
          max={max}
          className={`form-input ${error ? 'error' : ''} ${prefix ? 'with-prefix' : ''} ${suffix ? 'with-suffix' : ''}`}
          aria-describedby={error ? `${name}-error` : tooltip ? `${name}-tooltip` : undefined}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required ? 'true' : 'false'}
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


