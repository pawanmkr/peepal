import { Icon } from "./Icon";

export const InfoItem: React.FC<{ icon: string; text: React.ReactNode }> = ({
  icon,
  text,
}) => (
  <div className="flex items-center space-x-2">
    <Icon path={icon} />
    <span>{text}</span>
  </div>
);
