import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import type { WithSession } from "@/types/utility-types";
import type { GetServerSideProps } from "next";
import type { Session } from "next-auth";
import { unstable_getServerSession } from "next-auth";

export const simpleProtectedGetServerSideProps: GetServerSideProps<
  WithSession
> = async (context) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      authSession: session,
    },
  };
};

export const createProtectedGetServerSideProps =
  <OtherProps extends Record<string, any>>(
    getOtherProps: (session: Session) => Promise<OtherProps> | OtherProps
  ): GetServerSideProps<WithSession> =>
  async (context) => {
    const authSession = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (!authSession) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    const otherProps = await getOtherProps(authSession);

    return {
      props: {
        authSession,
        ...otherProps,
      },
    };
  };
