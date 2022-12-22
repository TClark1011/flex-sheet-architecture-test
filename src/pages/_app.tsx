import "reflect-metadata";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { Comfortaa, Inter } from "@next/font/google";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { toastConfig } from "@/constants/toast-config";

/* eslint-disable @typescript-eslint/no-unused-vars */
const comfortaa = Comfortaa();
const inter = Inter();
// For fonts to be loaded into NextJS they need to be assigned
// to variables, event if we don't actually use those variables
// anywhere
/* eslint-disable @typescript-eslint/no-unused-vars */

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
			<Toaster {...toastConfig} />
		</SessionProvider>
	);
};

export default trpc.withTRPC(MyApp);
