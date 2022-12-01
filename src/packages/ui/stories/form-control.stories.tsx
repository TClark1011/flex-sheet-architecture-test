import { FormControl } from "@/packages/ui/form-control";
import { TextInput } from "@/packages/ui/text-input";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "FormControl",
  component: FormControl,
} as ComponentMeta<typeof FormControl>;

const Template: ComponentStory<typeof FormControl> = (args) => (
  <FormControl {...args}>
    <TextInput placeholder="Placeholder" id="custom-id" />
  </FormControl>
);

export const WithTextInput = Template.bind({});
WithTextInput.args = {
  label: "Label",
};
