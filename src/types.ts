interface Filters {
  typeOfFood: string[],
  numberOfGuests: number,
  donationMin: number,
}

interface HomeEvent {
  donationMin: number,
  endDate: string,
  id: number,
  numberOfGuests: number,
  startDate: string,
}

type PhotoURL = string;

type PhotoURLs = {
  [key: string]: PhotoURL
}

interface Home {
  id: number,
  active: boolean | undefined,
  address: string,
  events: {
    [key: string]: HomeEvent
  },
  photos: PhotoURLs,
  title: string,
  typeOfFood: string,
}

interface Booking {
  eventId: number,
  id: number,
  homeId: number,
  numberOfGuests: number,
}

interface Place {
  homeId: number,
  name: string,
  lat: number,
  lng: number,
}

export type { Filters, Home, PhotoURL, PhotoURLs, HomeEvent, Booking, Place }