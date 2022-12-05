import type { ExternalAuthProviderData } from "@/features/auth/constants/external-auth-providers";
import { Button } from "@/packages/ui";
import cx from "classnames";
import { signIn } from "next-auth/react";

export type ExternalAuthButtonProps = {
  provider: ExternalAuthProviderData;
  className?: string;
};

export const ExternalAuthButton = ({
  provider: { icon: Icon, name, colors, displayName },
  className,
}: ExternalAuthButtonProps) => (
  <Button
    style={{ background: colors.background, color: colors.text }}
    className={cx("relative flex items-center justify-center", className)}
    onClick={() => signIn(name)}
  >
    <div className="absolute left-4 w-8">
      <Icon />
    </div>
    <div>Sign In With {displayName}</div>
  </Button>
);
