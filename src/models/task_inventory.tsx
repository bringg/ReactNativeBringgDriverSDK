export type TaskInventory = {
  // Ids
  id: number;
  inventory_id: number | number;
  way_point_id: number | number;
  external_id: string | number;
  parent_task_inventory_id: number | number;

  // Quantities and pricing
  price: number | number;
  original_quantity: number | number;
  quantity: number | number;
  rejected_quantity: number | number;

  // Inventory info
  name: string | null;
  note: string | null;
  scan_string: string | null;
  pending: boolean;
  image: string | null;

  // Dimensions
  width: number | null;
  height: number | null;
  length: number | null;
};
