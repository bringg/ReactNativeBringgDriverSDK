export enum ContactType {
  phone = 'phone',
  email = 'email',
}

export type Contact = {
  customer_id: number | null;
  contact_type: ContactType;
  contact_value: string | null;
  sharing_allowed: boolean;
};
