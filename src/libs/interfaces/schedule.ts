import { ObjectID } from "typeorm";

export interface Weekly {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thurseday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface DateFrequency {
  weekly?: Weekly;
}

export interface TimeFrequency {
  times: number[];
}

export interface Schedule {
  _id: ObjectID;
  name: string;
  dateFrequency: DateFrequency;
  timeFrequency: TimeFrequency;
  _version: number;
  customerId: string;
}