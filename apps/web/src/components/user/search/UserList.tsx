import { User } from "apps/web/src/api/user";
import { UserCard } from "./UserCard";

export const UserList: React.FC<{ users: User[] }> = ({ users }) => (
    <div>
        {users.map((User) => (
            <UserCard key={User.id} user={User} />
        ))}
    </div>
);
