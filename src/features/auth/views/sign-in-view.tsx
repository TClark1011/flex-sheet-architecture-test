import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormControl, TextInput } from "$ui";
import { zNonEmptyString } from "@/utils/utility-schemas";
import { signIn, signOut, useSession } from "next-auth/react";
import { externalAuthProviders } from "@/features/auth/constants/external-auth-providers";
import { ExternalAuthButton } from "@/features/auth/components/ExternalAuthButton";
import { useCallbackUrl } from "@/hooks/use-callback-url";
import { RootLayout } from "@/components/layouts/root-layout";

const signInFormSchema = z.object({
  email: zNonEmptyString().email(),
});

export const SignInView: FC = () => {
  const { data: session } = useSession();
  const callbackUrl = useCallbackUrl();
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof signInFormSchema>
  >({
    resolver: zodResolver(signInFormSchema),
  });

  return (
    <RootLayout className="flex items-center justify-center">
      <div className="w-full max-w-[400px] rounded-lg bg-base-200 p-8 shadow-lg">
        {session && (
          <div>
            <div>You are already sign in!</div>
            <Button className="w-full" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        )}
        {!session && (
          <>
            <form
              onSubmit={handleSubmit(async ({ email }) => {
                const result = await signIn("email", {
                  email,
                  callbackUrl,
                });
                if (!result) {
                  throw new Error("No Response");
                }
                if (result.error) {
                  throw new Error(result.error);
                }
              })}
            >
              <h1 className="mb-2 text-2xl font-bold">Sign In</h1>
              <FormControl
                label="Email"
                errorMessage={formState.errors.email?.message}
                className="mb-8"
              >
                <TextInput {...register("email")} placeholder="Enter Email" />
              </FormControl>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  colorScheme="primary"
                  isLoading={formState.isSubmitting}
                  className="w-full"
                >
                  Submit
                </Button>
              </div>
            </form>
            <div className="divider">OR</div>
            <div className="vstack-2">
              {externalAuthProviders.map((provider) => (
                <ExternalAuthButton key={provider.name} provider={provider} />
              ))}
            </div>
          </>
        )}
      </div>
    </RootLayout>
  );
};
