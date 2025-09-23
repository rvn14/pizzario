import { create } from "zustand";

type FormValues = {
  email: string;
  fullName: string;
  street1: string;
  street2?: string;
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
    street1: "",
    street2: "",
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
