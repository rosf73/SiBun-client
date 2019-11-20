import { useState } from 'react';

export const useInput = (initialValue) => {
  const [ value, setValue ] = useState(initialValue);
  const onChangeText = (text) => {
    setValue(text);
  }
  return { value, onChangeText };
};

export const useNumInput = (initialValue) => {
  const [ value, setValue ] = useState(initialValue*1);
  const onChangeText = (text) => {
    text *= 1;
    setValue(text);
  }
  return { value, onChangeText };
}