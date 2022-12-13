import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextInput } from "@/packages/ui/components/text-input";

const config: ComponentMeta<typeof TextInput> = {
	title: "TextInput",
	component: TextInput,
	args: {
		disabled: false,
	},
};
export default config;

const Template: ComponentStory<typeof TextInput> = (args) => (
	<TextInput {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
	placeholder: "Placeholder",
};
