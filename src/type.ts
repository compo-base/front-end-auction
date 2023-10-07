export interface EventItem {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  petsAllowed: boolean;
  organizer: OrganizerItem | string;
}

export interface OrganizerItem {
  id: number;
  name: string;
  address: string;
  description: string;
}
