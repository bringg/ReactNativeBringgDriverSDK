import { TaskInventory } from './task_inventory';
import { TaskNote } from './task_note';
import { Waypoint } from './waypoint';
export declare enum TaskStatus {
    free = 0,
    assigned = 1,
    onTheWay = 2,
    checkedIn = 3,
    checkedOut = 4,
    accepted = 6,
    cancelled = 7
}
export declare type Task = {
    id: number;
    external_id: string | null;
    user_id: number | null;
    linked_task_id: number | null;
    status: TaskStatus;
    title: string | null;
    priority: number | null;
    asap?: boolean;
    started_time: Date | null;
    scheduled_at: Date | null;
    active_way_point_id: number | null;
    extras: {
        [key: string]: any;
    };
    task_configuration_id: number | null;
    tag_id: number | null;
    task_type_id: number | null;
    group_uuid: string | null;
    group_leader_id: number | null;
    way_points: Waypoint[];
    task_inventories: TaskInventory[] | null;
    action_data: {
        [key: string]: any;
    };
    task_notes: TaskNote[] | null;
};
export declare function taskFromJSONString(jsonString: string | null): Task | null;
export declare function taskFromJSONObject(jsonObject: {
    [key: string]: any;
}): Task;
