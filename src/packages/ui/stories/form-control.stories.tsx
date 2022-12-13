import { FormControl } from "@/packages/ui/components/form-control";
import { TextInput } from "@/packages/ui/components/text-input";
import { Textarea } from "@/packages/ui/components/textarea";
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

const TextareaTemplate: ComponentStory<typeof FormControl> = (args) => (
  <FormControl {...args}>
    <Textarea placeholder="Placeholder" id="custom-textarea-id" />
  </FormControl>
);

export const WithTextarea = TextareaTemplate.bind({});
WithTextarea.args = {
  label: "Label",
};
