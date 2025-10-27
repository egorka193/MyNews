'use client'

import type { IToast } from "./types";
import { useEffect, useRef } from "react";
import styles from './Toaster.module.scss';
import Success from "@/shared/ui/icons/Success";
import Close from "@/shared/ui/icons/Close";
import Error from "@/shared/ui/icons/Error";

type ToasterProps = {
  toast: IToast;
  onClose: () => void;
};

export const Toast = ({ toast, onClose }: ToasterProps) => {
  const { message, type = "success", duration } = toast;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (duration) {
      timerRef.current = setTimeout(onClose, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, onClose]);

  return (
    <div className={styles.toast}>
      <div className={styles.toastIcon}>
        {type === "error" && <Error />}
        {type === "success" && <Success />}
      </div>
      <div className={styles.toastMessage}>{message}</div>
      <button
        className={styles.toastCloseBtn}
        onClick={onClose}
        aria-label="Закрыть"
      >
        <Close />
      </button>
    </div>
  );
};
