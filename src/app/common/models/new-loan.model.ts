import {Periodicity} from "../enums/periodicity.enum";

export interface NewLoan {
  id: string;
  amount: number;
  interestRate: string;
  periodicity: Periodicity;
  utilizationDate: Date;
  firstPaymentDate: Date;
  maturityDate: Date;
}

