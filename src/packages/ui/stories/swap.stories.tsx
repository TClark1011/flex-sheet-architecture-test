import React from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Swap } from "@/packages/ui/components/swap";

const config: ComponentMeta<typeof Swap> = {
  title: "Swap",
  component: Swap,
};
export default config;

const Template: ComponentStory<typeof Swap> = (args) => <Swap {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  on: <div>✅</div>,
  off: <div>❌</div>,
};
