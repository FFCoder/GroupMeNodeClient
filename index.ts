import { GroupMeConfig, 
        GroupMeCreateGroup, 
        GroupMeGroup, 
        GroupMeGroupResponse_Single, 
        GroupMeGroupResponse_Multiple, 
        GroupMeMessage, 
        GroupMeMessageResponse_Multiple 
    } from "./objects/GroupMeInterfaces";
import fetch from "node-fetch";

function _buildUrl(baseURL: string, endPoint: string, accessToken:string): string{
    return `${baseURL}${endPoint}?token=${accessToken}`;
}

class GroupMe{
    apiKey: string;
    baseUrl: string = "https://api.groupme.com/v3";

    constructor(config: GroupMeConfig) {
        this.apiKey = config.apiKey;

    }

    async GetGroups():Promise<GroupMeGroup[]>
    {
        let full_url: string = _buildUrl(this.baseUrl, "/groups", this.apiKey);
        let res = await fetch(full_url)
        const data: GroupMeGroupResponse_Multiple = await res.json();
        if (res.ok){
            try {
                const Groups: GroupMeGroup[] = data.response;
                return Groups;
            } catch (error) {
                return Promise.reject(error)
            }
        }
        return Promise.reject(new Error("Unable to Get Groups"))
    }
    async CreateGroup(group: GroupMeCreateGroup): Promise<GroupMeGroup> {
        let full_url: string = _buildUrl(this.baseUrl, "/groups", this.apiKey);
        const res = await fetch(full_url, {
            method: "POST",
            body: JSON.stringify(group),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        });
        if (!res.ok){
            let error = await res.json();
            return Promise.reject(`Failed to Create Group: ${error.meta.errors}`)
        }
        let g: GroupMeGroupResponse_Single= await res.json();
        return g.response;
    }

    async DeleteGroup(groupId: number): Promise<boolean> {
        let full_url = _buildUrl(this.baseUrl, `/groups/${groupId}/destroy`, this.apiKey)
        const res = await fetch(full_url, {
            method: "POST"
        });
        return res.ok;
    }

    async GetMessagesByGroupId(group_id: Number): Promise<GroupMeMessage[]> {
        let full_url = _buildUrl(this.baseUrl, `/groups/${group_id}/messages`, this.apiKey)
        const res = await fetch(full_url);
        let fullResp: GroupMeMessageResponse_Multiple = await res.json();
        return fullResp.response.messages;
    }

    async GetMessages(group: GroupMeGroup): Promise<GroupMeMessage[]> {
        return await this.GetMessagesByGroupId(parseInt(group.id));
    }
}
