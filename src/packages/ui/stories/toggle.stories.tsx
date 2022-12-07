import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Toggle } from "@/packages/ui/components/toggle";

const config: ComponentMeta<typeof Toggle> = {
  title: "Toggle",
  component: Toggle,
};

export default config;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
