export interface Day {
  closed: boolean;
  startTime: Date;
  endTime: Date;
}

export interface OpeningHours {
  id: string;
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
}
