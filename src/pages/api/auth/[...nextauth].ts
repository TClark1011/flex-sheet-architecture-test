import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "@/env/server.mjs";
import { prisma } from "@/server/db/client";

type EmailProviderServerConfig = {
	host: string;
	port: number;
	auth: {
		user: string;
		pass: string;
	};
};
// This typing is valid, but just is for some reason not
// supplied/used by the actual `EmailProvider` parameter
// within next-auth

export const authOptions: NextAuthOptions = {
	// Include user.id on session
	session: {
		strategy: "jwt",
	},
	callbacks: {
		session: async ({ session, token }) => {
			if (session.user) {
				session.user.id = token.sub ?? session.user.id;
			}

			return session;
		},
	},
	adapter: PrismaAdapter(prisma),
	// pages: {
	// 	signIn: "/sign-in",
	// },
	providers: [
		DiscordProvider({
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
			authorization: {
				params: {
					scope: "identify",
				},
			},
		}),
		EmailProvider({
			server: {
				host: env.EMAIL_SMTP_ENDPOINT,
				port: 587,
				auth: {
					user: env.EMAIL_SMTP_USERNAME,
					pass: env.EMAIL_SMTP_PASSWORD,
				},
			} satisfies EmailProviderServerConfig,
			from: env.EMAIL_FROM,
		}),
	],
};

export default NextAuth(authOptions);
