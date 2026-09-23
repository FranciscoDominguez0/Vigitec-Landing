import type { NextConfig } from "next";

// Validate environment variables during build to prevent silent failures in production
if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
) {
  throw new Error(
    "❌ FATAL ERROR: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined in the environment. " +
    "The build cannot proceed because reCAPTCHA will silently fail in production. " +
    "Please ensure your .env file is loaded or the variable is passed to the Docker build."
  );
}

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
};

export default nextConfig;
