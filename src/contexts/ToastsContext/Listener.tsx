import React from 'react';
import { ToastContainer } from '@kaco/uikitv2';
import useToast from 'hooks/useToast';

const ToastListener = () => {
  const { toasts, remove } = useToast();

  const handleRemove = (id: string) => remove(id);

  return <ToastContainer toasts={toasts} onRemove={handleRemove} />;
};

export default ToastListener;
