export type IUnitType = "piece" | "meter" | "kilogram" | "liter";

export interface IMaterial {
  materialName: string;
  code: string;
  unit: IUnitType;
  price: number;
}
