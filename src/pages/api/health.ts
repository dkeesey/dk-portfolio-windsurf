/**
 * Health Check Endpoint
 *
 * Returns the health status of the application.
 * Used for:
 * - Uptime monitoring (BetterStack, UptimeRobot)
 * - Deployment verification
 * - Load balancer health checks
 *
 * GET /api/health
 * Response: { status: "ok", timestamp: "2024-01-30T12:00:00.000Z", version: "0.0.1" }
 */

import type { APIRoute } from 'astro';

export const prerender = false;

interface HealthResponse {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  version: string;
  checks?: {
    name: string;
    status: 'pass' | 'fail';
    duration_ms?: number;
    message?: string;
  }[];
}

export const GET: APIRoute = async () => {
  const startTime = Date.now();

  const response: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '0.0.1', // Could read from package.json in production
  };

  // Optional: Add dependency checks
  const checks: HealthResponse['checks'] = [];

  // Example: Check if critical env vars are set
  const envCheck = {
    name: 'environment',
    status: (
      process.env.PUBLIC_SUPABASE_URL ? 'pass' : 'fail'
    ) as 'pass' | 'fail',
    message: process.env.PUBLIC_SUPABASE_URL
      ? 'Environment configured'
      : 'Missing environment variables',
  };
  checks.push(envCheck);

  // Determine overall status
  const hasFailures = checks.some((c) => c.status === 'fail');
  if (hasFailures) {
    response.status = 'degraded';
  }

  response.checks = checks;

  const duration = Date.now() - startTime;

  return new Response(JSON.stringify({ ...response, duration_ms: duration }), {
    status: response.status === 'error' ? 503 : 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
};
