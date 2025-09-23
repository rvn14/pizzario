import { create } from "zustand";

type FormValues = {
  email: string;
  fullName: string;
  address: string;
  street?: string;
  city: string;
  province?: string;
  zip: string;
  paymentMethod: "cod" | "online";
  cardNumber?: string;
  expiration?: string;
  cvc?: string;
  billingSame?: boolean;
};

type FormStore = {
  formValues: FormValues;
  setFormValues: (values: FormValues) => void;
};

export const useFormStore = create<FormStore>((set) => ({
  formValues: {
    email: "",
    fullName: "",
    address: "",
    street: "",
    city: "",
    province: "",
    zip: "",
    paymentMethod: "cod",
    cardNumber: "",
    expiration: "",
    cvc: "",
    billingSame: true,
  },
  setFormValues: (formValues) => set({ formValues }),
}));
