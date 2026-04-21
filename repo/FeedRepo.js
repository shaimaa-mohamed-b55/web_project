import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "feed.json");



class FeedRepo {
    async getAll() {
        const data = await fs.readFile(dataPath, "utf-8");
        return JSON.parse(data);
    }

    async save(items) {
        await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    }

    async getById(id) {
        const all = await this.getAll();
        return all.find(b => b.id === id);
    }


    
// [
//     {
//         "id": "user-name Date.now()",
//         "username": "username",
//         "post": "post",
//         "createdAt":" new Date()",
//         "likes": ["firstLike","secondLike"],
//         "comments":[
//         {   "username": "username",
//             "text": "commenttext",
//             "createdAt": "Date AM"
//         }
//     ]
//     }
// ]

    async create(data) {
        const all = await this.getAll();
        const newItem = {
            id:`${data.username}_${Date.now()} `,
            username: data.username,
            post: data.post,
            createdAt: new Date().toISOString(),
            likes: [],
            comments: []

        };
        all.push(newItem);
        await this.save(all);
        return newItem;
    }



    async update(id, data) {
        const all = await this.getAll();
        const index = all.findIndex(b => b.id === id);
        if (index === -1) return null;
        all[index] = { ...all[index], ...data, id: id };
        await this.save(all);
        return all[index];
    }

    async delete(id) {
        const all = await this.getAll();
        const index = all.findIndex(b => b.id === id);
        if (index === -1) return false;
        all.splice(index, 1);
        await this.save(all);
        return true;
    }
}

export default new FeedRepo();
