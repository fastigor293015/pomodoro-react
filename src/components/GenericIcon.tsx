import * as icons from "../icons";
import { IIconProps } from "../icons/IIconProps";

export enum EIcons {
  tomato = "TomatoIcon",
  smilingTomato = "SmilingTomatoIcon",
  target = "TargetIcon",
  clock = "ClockIcon",
  stop = "StopIcon",
}

interface IGenericIconProps extends IIconProps {
  type: EIcons;
}

export const GenericIcon = ({ type, width, height }: IGenericIconProps) => {
  const Icon = icons[type];

  return (
    <Icon width={width} height={height} />
  )

}
