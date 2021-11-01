// o d significa que ta sobreescrevendo

declare module "*.svg" { //qualquer module que seja .svg
    import React from "react" //vai importar react
    import { SvgProps } from "react-native-svg" //importa o SvgProps de react-native-svg
    const content: React.FC<SvgProps> //isso daqui eh um FC <functional content>, e o tipo eh SvgProps
    export default content;
}