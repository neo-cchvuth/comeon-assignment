import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';

type InputProps = {
  placeholder: string;
  name?: string;
  icon?: string;
  initialState?: string;
  type?: string;
  required?: boolean;
};

export type InputHandle = {
  getValue: () => string;
};

function Input({ placeholder, name, icon, initialState = '', type = 'text', required = true }: InputProps, ref: ForwardedRef<InputHandle>) {
  const [data, setData] = useState(initialState);

  useImperativeHandle(ref, () => ({
    getValue(): string {
      return data;
    },
  }));

  return (
    <div className={`field ${required ? 'required' : ''}`}>
      <div className="ui icon input">
        <input type={type} name={name} placeholder={placeholder} required={required} onChange={(e) => setData(e.target.value)} />
        <i className={`icon ${icon ?? ''}`}></i>
      </div>
    </div>
  );
}

const InputWithRef = forwardRef<InputHandle, InputProps>(Input);

export default InputWithRef;
