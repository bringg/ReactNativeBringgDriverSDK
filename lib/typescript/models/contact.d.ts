export declare enum ContactType {
    phone = "phone",
    email = "email"
}
export declare type Contact = {
    customer_id: number | null;
    contact_type: ContactType;
    contact_value: string | null;
    sharing_allowed: boolean;
};
