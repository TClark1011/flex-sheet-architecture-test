import React, { useState } from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Modal, ModalActions } from "@/packages/ui/components/modal";
import { Button } from "@/packages/ui/components/button";
import { hiddenArgType } from "@/packages/ui/internal/story-helpers";

const config: ComponentMeta<typeof Modal> = {
  title: "Modal",
  component: Modal,
  args: {
    noBackdrop: false,
    responsive: true,
    hideCloseButton: false,
    noCloseOnOverlayClick: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose: () => {},
  },
  argTypes: {
    isOpen: hiddenArgType,
    onClose: hiddenArgType,
  },
};

export default config;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal!</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  children: "Modal",
};

export const WithActions = Template.bind({});
WithActions.args = {
  children: (
    <>
      Modal
      <ModalActions>
        <Button>Hi</Button>
        <Button>Do Something</Button>
      </ModalActions>
    </>
  ),
};
