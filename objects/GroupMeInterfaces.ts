export interface GroupMeConfig {
    apiKey: string;
}

export interface GroupMeGroup {
        id: string;
        name: string;
        type: string;
        description: string;
        image_url: string;
        creator_user_id: string;
        created_at: number;
        updated_at: number;
        members: Array<GroupMeMember>;
        share_url?: string;
        requires_approval: boolean;
}
export interface GroupMeGroupResponse_Single {
    meta?: object;
    response: GroupMeGroup;
}

export interface GroupMeGroupResponse_Multiple {
    meta?: object;
    response: GroupMeGroup[];
}

export interface GroupMeMember {
    user_id: string;
    nickname: string;
    muted: boolean;
    image_url: string;
}

export interface GroupMeCreateGroup{
    name: string;
    share?: boolean;
    image_url?: string;
    description?: string;
}

export interface GroupMeMessage {
    id: string;
    source_guid: string;
    created_at: number;
    user_id: string;
    group_id: string;
    name: string;
    avatar_url: string;
    text: string;
    system: boolean;
    favorited_by?: string[];
    attachments?: object[];
}

export interface GroupMeMessageResponse_Multiple {
    meta?: object;
    response: {
        count: number;
        messages: GroupMeMessage[];
    };
}