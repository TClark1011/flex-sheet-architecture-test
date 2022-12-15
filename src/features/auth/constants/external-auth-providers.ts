import type { TablerIcon } from "@tabler/icons";
import { IconBrandDiscord } from "@tabler/icons";
import type { BuiltInProviderType } from "next-auth/providers";

type ProviderColorPalette = {
	background: string;
	text: string;
};

export type ExternalAuthProviderData = {
	name: BuiltInProviderType;
	colors: ProviderColorPalette;
	icon: TablerIcon;
	displayName: string;
};

export const externalAuthProviders: ExternalAuthProviderData[] = [
	{
		name: "discord",
		colors: {
			background: "#5462EB",
			text: "#FFFFFF",
		},
		icon: IconBrandDiscord,
		displayName: "Discord",
	},
];
