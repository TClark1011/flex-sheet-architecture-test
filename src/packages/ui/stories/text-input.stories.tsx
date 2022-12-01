import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextInput } from "@/packages/ui/text-input";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "TextInput",
  component: TextInput,
  // argTypes: {
  //   placeholder: {
  //     control: "text",
  //   },
  // },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TextInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  placeholder: "Placeholder",
};
