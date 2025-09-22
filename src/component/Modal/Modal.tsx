import { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  primary?: { label: string; onClick: () => void };
  secondary?: { label: string; onClick: () => void };
}

export default function Modal({ 
  open, 
  title, 
  onClose, 
  children, 
  primary, 
  secondary 
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFocusRef = useRef<HTMLButtonElement | null>(null);

  // Trap focus & close on ESC
  useEffect(() => {
    if (!open) return;

    const root = dialogRef.current!;
    const prevActive = document.activeElement as HTMLElement | null;

    // focus first interactive
    window.setTimeout(() => firstFocusRef.current?.focus(), 0);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const focusables = root.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); (last as HTMLElement).focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); (first as HTMLElement).focus(); }
      }
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      prevActive?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
      >
        <h2 id="modal-title" className={styles.title}>
          {title}
        </h2>

        <div className={styles.body}>
          {children}
        </div>

        <div className={styles.actions}>
          {primary && (
            <button
              ref={!secondary ? firstFocusRef : undefined}
              className={styles.primary}
              onClick={primary.onClick}
            >
              {primary.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
