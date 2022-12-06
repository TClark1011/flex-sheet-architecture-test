import type { ExternalAuthProviderData } from "@/features/auth/constants/external-auth-providers";
import { useCallbackUrl } from "@/hooks/useCallbackUrl";
import { Button } from "@/packages/ui";
import cx from "classnames";
import { signIn } from "next-auth/react";
import type { FC } from "react";

export type ExternalAuthButtonProps = {
  provider: ExternalAuthProviderData;
  className?: string;
};

export const ExternalAuthButton: FC<ExternalAuthButtonProps> = ({
  provider: { icon: Icon, name, colors, displayName },
  className,
}) => {
  const callbackUrl = useCallbackUrl();
  return (
    <Button
      style={{ background: colors.background, color: colors.text }}
      className={cx("relative flex items-center justify-center", className)}
      onClick={() => signIn(name, { callbackUrl })}
    >
      <div className="absolute left-4 w-8">
        <Icon />
      </div>
      <div>Sign In With {displayName}</div>
    </Button>
  );
};
