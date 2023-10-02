import { CSSProperties } from "react";
import { Image, StyleProp, ViewStyle } from "react-native";

export interface AppProps { }
export interface PreviewProps {
  
 }
export interface PreviewDataProps {
  image: Image;
  headingText: String;
  bodyText: String;
}
export interface AuthTextInputProps {
  placeholder?: String,
  UserIcon?: boolean,
  PasswordIcon?: boolean,
  EmailIcon?: boolean,
  style?: ViewStyle,
  onChangeText?: (text: string) => void;
  CountryCode?: string,
  CountryPress?: () => void;
}