import fetch from "node-fetch";
function _buildUrl(baseURL, endPoint, accessToken) {
    return `${baseURL}${endPoint}?token=${accessToken}`;
}
class GroupMe {
    apiKey;
    baseUrl = "https://api.groupme.com/v3";
    constructor(config) {
        this.apiKey = config.apiKey;
    }
    async GetGroups() {
        let full_url = _buildUrl(this.baseUrl, "/groups", this.apiKey);
        let res = await fetch(full_url);
        const data = await res.json();
        if (res.ok) {
            try {
                const Groups = data.response;
                return Groups;
            }
            catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(new Error("Unable to Get Groups"));
    }
    async CreateGroup(group) {
        let full_url = _buildUrl(this.baseUrl, "/groups", this.apiKey);
        const res = await fetch(full_url, {
            method: "POST",
            body: JSON.stringify(group),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if (!res.ok) {
            let error = await res.json();
            return Promise.reject(`Failed to Create Group: ${error.meta.errors}`);
        }
        let g = await res.json();
        return g.response;
    }
    async DeleteGroup(groupId) {
        let full_url = _buildUrl(this.baseUrl, `/groups/${groupId}/destroy`, this.apiKey);
        const res = await fetch(full_url, {
            method: "POST"
        });
        return res.ok;
    }
    async GetMessagesByGroupId(group_id) {
        let full_url = _buildUrl(this.baseUrl, `/groups/${group_id}/messages`, this.apiKey);
        const res = await fetch(full_url);
        let fullResp = await res.json();
        return fullResp.response.messages;
    }
    async GetMessages(group) {
        return await this.GetMessagesByGroupId(parseInt(group.id));
    }
}
