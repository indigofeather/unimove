export * from "./lightTheme";

// Re-export theme types from both chains
import type {
    DynamicTheme as SuiDynamicTheme,
    Theme as SuiTheme,
    ThemeVars as SuiThemeVars
} from "@mysten/dapp-kit";
import type {
    DynamicTheme as IotaDynamicTheme,
    Theme as IotaTheme,
    ThemeVars as IotaThemeVars
} from "@iota/dapp-kit";

export type { SuiTheme, SuiThemeVars, SuiDynamicTheme };
export type { IotaTheme, IotaThemeVars, IotaDynamicTheme };

// Universal theme types
export type UniversalTheme = {
    sui: SuiTheme;
    iota: IotaTheme;
};

export type UniversalThemeVars = {
    sui: SuiThemeVars;
    iota: IotaThemeVars;
};

export type UniversalDynamicTheme = {
    sui: SuiDynamicTheme;
    iota: IotaDynamicTheme;
};