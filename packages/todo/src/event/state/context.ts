import { createContext } from 'react';

export const EventContext = createContext<IEvent>({
  id: '',
  status: '',
  receivedDt: '',
});

export interface IEvent {
  id: string;
  status: string;
  receivedDt: string;
}
