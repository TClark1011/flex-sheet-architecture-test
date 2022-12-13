import { D } from "@mobily/ts-belt";
import type { ArgType } from "@storybook/addons";
import {
	IconPlus,
	IconSearch,
	IconX,
	IconMinus,
	IconInfoCircle,
} from "@tabler/icons";

const icons = D.map(
	{ IconPlus, IconSearch, IconX, IconMinus, IconInfoCircle },
	(IconComponent) => IconComponent({})
);

export const iconArgType: ArgType = {
	options: Object.keys(icons),
	mapping: icons,
	control: {
		type: "select",
		labels: {
			IconInfoCircle: "Info Circle",
			IconMinus: "Minus",
			IconPlus: "Plus",
			IconSearch: "Search",
			IconX: "X",
		} satisfies Record<keyof typeof icons, string>,
	},
};

export const hiddenArgType = {
	table: {
		disable: true,
	},
};
