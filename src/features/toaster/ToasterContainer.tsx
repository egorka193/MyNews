'use client';

import { Toast } from "./Toast";
import { useToaster } from "./useToaster";
import type { IToast } from "./types";
import styles from './Toaster.module.scss'

export const ToasterContainer = () => {
  const { toasts, removeToast } = useToaster();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.toasterContainer}>
      {toasts.map((toast: IToast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
