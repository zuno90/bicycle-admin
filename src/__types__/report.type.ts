export interface IReport {
  revenue: IReportGeneral;
  customer: IReportGeneral;
  order: IReportGeneral;
}
export interface IReportGeneral {
  value: number;
  status: "increase" | "decrease" | "fixed";
  percent: number;
}
