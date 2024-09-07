import dayjs from "dayjs";
import { Post } from "./dummy-data";
import { useNavigate } from "react-router-dom";

interface PostMetaProps {
  post: Post;
}

export default function PostMeta({ post }: PostMetaProps) {
  const navigate = useNavigate();

  const gotoTutorProfile = () => {
    navigate(`/tutor`);
  };

  return (
    <div className="flex justify-between text-gray-500">
      <p className="cursor-pointer" onClick={gotoTutorProfile}>
        @{post.tutor.user.username}
      </p>
      <div className="flex gap-x-4">
        <p>{dayjs().diff(post.date, "day")}d ago</p>
        <p>{post.views} views</p>
      </div>
    </div>
  );
}
