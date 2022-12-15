import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Textarea } from "@/packages/ui/components/textarea";

const config: ComponentMeta<typeof Textarea> = {
	title: "Textarea",
	component: Textarea,
	args: {
		variant: "solid",
		resizable: false,
		bordered: false,
		hasError: false,
	},
};

export default config;

const Template: ComponentStory<typeof Textarea> = (args) => (
	<Textarea {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
	placeholder: "Placeholder",
};
