import * as icons from "../icons";
import { SvgIcon } from "@mui/material";

export enum EIcons {
  tomato = "TomatoIcon",
}

interface IIconProps {
  type: EIcons;
}

const Icon = ({ type }: IIconProps) => {

  return (
    <SvgIcon component={icons[type]} />
  )

}

export default Icon;
