export declare enum TaskNoteType {
    note = "TaskNote",
    signature = "Signature",
    photo = "TaskPhoto",
    html = "HtmlTaskNote",
    form = "Form",
    formattedTaskNote = "FormattedTaskNote"
}
export declare type TaskNote = {
    id: number;
    way_point_id: number;
    task_inventory_id: number | null;
    form_group_uuid: string | null;
    note: string | {
        [key: string]: string;
    } | null;
    type: TaskNoteType;
    medium_url: string | null;
    thumbnail_url: string | null;
    url: string | null;
    created_at: Date;
    updated_at: Date | null;
};
export declare function taskNoteFromJSONObject(jsonObject: {
    [key: string]: any;
}): TaskNote;
