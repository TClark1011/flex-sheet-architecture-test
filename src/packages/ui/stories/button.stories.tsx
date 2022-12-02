import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "@/packages/ui/components/button";
import { IconPlus } from "@tabler/icons";

const config: ComponentMeta<typeof Button> = {
  title: "Button",
  component: Button,
  args: {
    variant: "solid",
    size: "md",
  },
};

export default config;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  children: "Button",
};

IconPlus.displayName = "IconPlus"; // Make sure icon component name displays correctly in storybook docs

export const LeftIcon = Template.bind({});
LeftIcon.args = {
  children: "Button",
  leftIcon: <IconPlus />,
};

export const RightIcon = Template.bind({});
RightIcon.args = {
  children: "Button",
  rightIcon: <IconPlus />,
};

export const IconButton = Template.bind({});
IconButton.args = {
  children: <IconPlus />,
  shape: "square",
};
