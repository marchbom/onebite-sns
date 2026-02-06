import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type OpenState = {
  isOpen: true;
  title: string;
  description: string;
  onPositive?: () => void;
  onNegative?: () => void;
};

type CloseState = {
  isOpen: false;
};
type State = CloseState | OpenState;

const inititalState = {
  isOpen: false,
} as State;

const useAlertModalStore = create(
  devtools(
    combine(inititalState, (set) => ({
      actions: {
        open: (params: Omit<OpenState, "isOpen">) => {
          set({ ...params, isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "AlertModalStore" },
  ),
);

export const useOpenAlertModal = () => {
  const open = useAlertModalStore((store) => store.actions.open);
  return open;
};

// ?? as 단언문을 붙여도 안붙여도 똑같은데
export const useAlertModal = () => {
  const store = useAlertModalStore();
  return store as typeof store & State;
};
