
export interface NewLoan {
  id: string;
  amount: number;
  interestRate: string;
  periodicity: string;
  utilizationDate: Date;
  firstPaymentDate: Date;
  maturityDate: Date;
}


