export type CarSchema = {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: "Sedan" | "SUV" | "Truck" | "Coupe" | "Convertible";
  description: string;
  quantity: number;
  inStock?: boolean;
};

export type TUpdateInfo = {
  brand?: string | undefined;
  model?: string | undefined;
  year?: number | undefined;
  price?: number | undefined;
  category?: "Sedan" | "SUV" | "Truck" | "Coupe" | "Convertible" | undefined;
  description?: string | undefined;
  quantity?: number | undefined;
  inStock?: boolean | undefined;
};
