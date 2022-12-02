import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormControl, TextInput } from "$ui";
import { zNonEmptyString } from "@/utils/utility-schemas";
import { signIn } from "next-auth/react";

const signInFormSchema = z.object({
  email: zNonEmptyString().email(),
});

export const SignInView: FC = () => {
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof signInFormSchema>
  >({
    resolver: zodResolver(signInFormSchema),
  });

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <form
        className="w-full max-w-[400px] rounded-lg bg-base-200 p-8 shadow-lg"
        onSubmit={handleSubmit(async ({ email }) => {
          const result = await signIn("email", { email, redirect: false });
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
          className="mb-2"
        >
          <TextInput {...register("email")} placeholder="Enter Email" />
        </FormControl>
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="link"
            colorScheme="primary"
            isLoading={formState.isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
};
