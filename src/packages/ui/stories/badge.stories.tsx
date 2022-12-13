import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Badge } from "@/packages/ui/components/badge";
import { iconArgType } from "@/packages/ui/internal/story-helpers";

const config: ComponentMeta<typeof Badge> = {
  title: "Badge",
  component: Badge,
  args: {
    variant: "solid",
    size: "md",
  },
  argTypes: {
    icon: iconArgType,
  },
};

export default config;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  children: "Badge",
};
