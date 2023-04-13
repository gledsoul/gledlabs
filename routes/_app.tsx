// Copyright 2022 the Deno authors. All rights reserved. MIT license.
/** @jsxImportSource https://esm.sh/react@18.2.0 */

import type { ReactNode } from "react";
import { forwardProps, useData } from "aleph/react";
import { Header } from "layout/Header.tsx";
import { Footer } from "layout/Footer.tsx";
import { getUserByToken, type User } from "utils/db.ts";
import { NotificationProvider } from "base/Notification.tsx";
import { ok } from "utils/api.ts";

export const data = {
  async get(_: Request, ctx: Context) {
    const token = ctx.cookies.get("token");
    const user = token ? await getUserByToken(token) : undefined;
    return ok({
      clientId: Deno.env.get("CLIENT_ID"),
      redirectUri: Deno.env.get("REDIRECT_URI"),
      user,
    });
  },
};

export default function App({ children }: { children?: ReactNode }) {
  const { data: { clientId, redirectUri, user }, reload: reloadUser } = useData<
    { clientId: string; redirectUri: string; user: User | undefined }
  >();

  const signin = () => {
    google.accounts.oauth2.initCodeClient({
      client_id: clientId,
      scope: "email profile openid https://www.googleapis.com/auth/calendar",
      redirect_uri: redirectUri,
      ux_mode: "redirect",
      state: Math.random().toString(36).slice(2),
    }).requestCode();
  };

  return (
    
  );
}
