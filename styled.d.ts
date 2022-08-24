import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            dark: string
            white: string
            primary: string
            secondary: string
            point: string
            highlight: string
            borderColor: string
            shadowColor: string
        }
    }
}