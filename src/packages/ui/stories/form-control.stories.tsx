import { FormControl } from "@/packages/ui/components/form-control";
import { TextInput } from "@/packages/ui/components/text-input";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

const config: ComponentMeta<typeof FormControl> = {
  title: "FormControl",
  component: FormControl,
};
export default config;

const Template: ComponentStory<typeof FormControl> = (args) => (
  <FormControl {...args}>
    <TextInput placeholder="Placeholder" id="custom-id" />
  </FormControl>
);

export const WithTextInput = Template.bind({});
WithTextInput.args = {
  label: "Label",
};
