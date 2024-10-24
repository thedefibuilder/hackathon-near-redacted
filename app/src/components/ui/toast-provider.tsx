// src/components/ui/toast-provider.tsx
"use client";

import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

type ToastProps = {
  title?: string;
  description: string;
  type?: "foreground" | "background";
  duration?: number;
};

type ToastContextType = {
  toast: (props: ToastProps) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined,
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<
    Array<ToastProps & { id: string }>
  >([]);

  const toast = React.useCallback(
    ({
      title,
      description,
      type = "foreground",
      duration = 5000,
    }: ToastProps) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [
        ...prev,
        { id, title, description, type, duration },
      ]);
    },
    [],
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <Toast.Provider duration={5000}>
        {children}
        {toasts.map(({ id, title, description, type, duration }) => (
          <Toast.Root
            key={id}
            type={type}
            duration={duration}
            className="fixed bottom-4 right-4 min-w-[300px] rounded-lg bg-white p-4 shadow-lg"
            onOpenChange={(open) => {
              if (!open) removeToast(id);
            }}
          >
            {title && (
              <Toast.Title className="mb-1 font-semibold text-gray-900">
                {title}
              </Toast.Title>
            )}
            <Toast.Description className="text-gray-700">
              {description}
            </Toast.Description>
            <Toast.Close className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
              ×
            </Toast.Close>
          </Toast.Root>
        ))}
        <Toast.Viewport />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
