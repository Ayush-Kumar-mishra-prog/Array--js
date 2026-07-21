'use strict';

import { CircuitBreaker, CircuitState } from '../src/services/CircuitBreaker.js';
import { GatewayHealthMetrics } from '../src/services/GatewayHealthMetrics.js';

describe('CircuitBreaker', () => {
  test('starts CLOSED and allows requests', () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, timeoutSeconds: 1 });
    expect(cb.allowRequest('razorpay', 'card').allowed).toBe(true);
    expect(cb.getState('razorpay', 'card').state).toBe(CircuitState.CLOSED);
  });

  test('opens after consecutive failures', () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, timeoutSeconds: 30 });
    cb.recordFailure('stripe', 'card');
    cb.recordFailure('stripe', 'card');
    expect(cb.getState('stripe', 'card').state).toBe(CircuitState.CLOSED);
    cb.recordFailure('stripe', 'card');
    expect(cb.getState('stripe', 'card').state).toBe(CircuitState.OPEN);
    expect(cb.allowRequest('stripe', 'card').allowed).toBe(false);
  });

  test('transitions OPEN → HALF_OPEN after timeout, success closes', async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, timeoutSeconds: 0 });
    cb.recordFailure('payu', 'card');
    expect(cb.getState('payu', 'card').state).toBe(CircuitState.OPEN);
    const half = cb.allowRequest('payu', 'card');
    expect(half.state).toBe(CircuitState.HALF_OPEN);
    expect(half.allowed).toBe(true);
    cb.recordSuccess('payu', 'card');
    expect(cb.getState('payu', 'card').state).toBe(CircuitState.CLOSED);
  });

  test('HALF_OPEN failure re-opens circuit', () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, timeoutSeconds: 0 });
    cb.recordFailure('upi', 'upi');
    cb.allowRequest('upi', 'upi');
    cb.recordFailure('upi', 'upi');
    expect(cb.getState('upi', 'upi').state).toBe(CircuitState.OPEN);
  });
});

describe('GatewayHealthMetrics scoring inputs', () => {
  test('tracks success rate in sliding window', () => {
    const m = new GatewayHealthMetrics({ windowSize: 10 });
    for (let i = 0; i < 8; i++) m.record('razorpay', 'card', true, 100);
    for (let i = 0; i < 2; i++) m.record('razorpay', 'card', false, 500);
    expect(m.getSuccessRate('razorpay', 'card')).toBeCloseTo(0.8, 5);
    expect(m.getP95Latency('razorpay', 'card')).toBeGreaterThanOrEqual(100);
  });

  test('seed creates baseline samples', () => {
    const m = new GatewayHealthMetrics({ windowSize: 100 });
    m.seed('stripe', 'card', { successRate: 1, p95LatencyMs: 150, samples: 20 });
    expect(m.getSuccessRate('stripe', 'card')).toBe(1);
    expect(m.getMetrics('stripe', 'card').sample_size).toBe(20);
  });
});