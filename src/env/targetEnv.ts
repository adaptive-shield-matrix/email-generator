import { serverPortBun } from "@/server/serverPortBun"
import { serverPortWrangler } from "@/server/serverPortWrangler"

export type TargetEnv = keyof typeof targetEnv

export const targetEnv = {
  localhostBun: "http://localhost:" + serverPortBun,
  localhostWorker: "http://localhost:" + serverPortWrangler,
  productionWorker: "https://email-generator-worker.postmaschine.com",
} as const
