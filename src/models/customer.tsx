export type Customer = {
  // Ids
  id: number;

  // Location
  address: string | null;
  address_second_line: string | null;
  lng: number | null;
  lat: number | null;

  // Customer data
  image: string | null;
  email: string | null;
  phone: string | null;
  name: string | null;
  allow_sending_sms: boolean;
};
