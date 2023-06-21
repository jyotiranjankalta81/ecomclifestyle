import React from "react";
import "./PlainInput.css";

export function PlainTextArea ({
  name,
  label,
  type,
  onChange,
  validation,
  errors
}) {
  return (
    <label htmlFor={name} className='plain-input-wrapper'>
      <span>{label}</span>
      <textarea
        type={type ? type : "text"}
        name={name}
        onChange={onChange}
        {...validation}
        className='plain-input-textarea'
      ></textarea>
      {errors && (
        <span className='input-error'>
          {errors[name] ? errors[name].message : ""}
        </span>
      )}
    </label>
  );
}

export function OnBoardTextArea ({
  label,
  name,
  type,
  onChange,
  validation,
  errors,
  value,
  placeholder
}) {
  return (
    <label htmlFor={name} className='plain-input-wrapper'>
      <span>{label}</span>
      <textarea
        type={type ? type : "text"}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...validation}
        className='onboard-input'
      />
      {errors && (
        <span className='input-error'>
          {errors[name] ? errors[name].message : ""}
        </span>
      )}
    </label>
  );
}
