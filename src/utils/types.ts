export interface CategoryData {
  name: string;
  color: string;
  icon: string;
}

export interface RecordData {
  id: string;
  date: Date;
  type: string;
  category: string;
  amount: number;
  description: string;
}

export interface RouteMetaData {
  icon: string;
  title: string;
  value: string;
  color: string;
  type: string;
}
