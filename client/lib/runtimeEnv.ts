const viteEnv = ((import.meta as ImportMeta & {
  env?: Record<string, string | undefined>;
}).env ?? {}) as Record<string, string | undefined>;

export function getPublicEnv(key: string) {
  const processEnv =
    typeof process !== "undefined" ? process.env?.[key] : undefined;

  return viteEnv[key] ?? processEnv ?? "";
}
