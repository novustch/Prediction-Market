import { FC } from "react";
import { IconName, Icons } from "./Icons";

interface Props {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
}

const Icon: FC<Props> = ({ name, size, className, color }) => {
  const SvgIcon = Icons[name];
  return SvgIcon ? (
    <SvgIcon size={size} className={className} color={color} />
  ) : null;
};

export default Icon;
