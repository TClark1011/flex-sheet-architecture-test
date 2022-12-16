import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "@/env/server.mjs";
import { prisma } from "@/server/db/client";

const emailServerUrl = `smtp://${env.EMAIL_SMTP_USERNAME}:${env.EMAIL_SMTP_PASSWORD}@${env.EMAIL_SMTP_ENDPOINT}:587`;

console.log("([...nextauth]) emailServerUrl: ", emailServerUrl);

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
			server: emailServerUrl,
			from: env.EMAIL_FROM,
		}),
	],
};

export default NextAuth(authOptions);
