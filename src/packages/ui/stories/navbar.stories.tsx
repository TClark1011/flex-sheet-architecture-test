import { Navbar } from "@/packages/ui/components/navbar";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

const config: ComponentMeta<typeof Navbar> = {
  title: "Navbar",
  component: Navbar,
  decorators: [
    (Story, context) => {
      const bodyPadding = window.getComputedStyle(document.body).padding;
      return (
        <div style={{ margin: `calc(${bodyPadding} * -1)` }}>
          {/* Counter the padding on `body` with negative margin */}
          <Story {...context} />
        </div>
      );
    },
  ],
};
export default config;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  startContent: <div>Hi</div>,
  colorScheme: "primary",
};

export const StartAndEndContent = Template.bind({});
StartAndEndContent.args = {
  startContent: <div>Start</div>,
  endContent: <div>End</div>,
  colorScheme: "secondary",
};

export const Full = Template.bind({});
Full.args = {
  startContent: <div>Start</div>,
  centerContent: <div>Center</div>,
  endContent: <div>End</div>,
  colorScheme: "accent",
};
