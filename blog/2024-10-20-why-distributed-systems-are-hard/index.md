---
slug: why-distributed-systems-are-hard
title: Why Distributed Systems Are Hard (And What To Do About It)
authors: sawravroy
date: 2024-10-20
tags: [engineering, distributed-systems, software-architecture, reliability]
description: >
  Fallacies, failure modes, and the fundamental insight that distributed
  systems are hard not because engineers are careless, but because the
  problems are genuinely hard.
image: /img/blog/distributed-systems.png
keywords: [distributed systems, CAP theorem, consistency, availability, microservices]
---

import SocialShare from '@site/src/components/SocialShare';

Every engineer who has worked on a distributed system has a story. Usually
it involves a pager, the middle of the night, and a failure mode that seemed
impossible given the design of the system.

This essay is about why that keeps happening.

<!-- truncate -->

<SocialShare title="Why Distributed Systems Are Hard (And What To Do About It)" />

## The Eight Fallacies

In 1994, Peter Deutsch (with later additions from James Gosling) catalogued
the *Eight Fallacies of Distributed Computing* — the false assumptions that
engineers implicitly rely on when designing distributed systems:

1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.
5. Topology doesn't change.
6. There is one administrator.
7. Transport cost is zero.
8. The network is homogeneous.

Each fallacy sounds obvious when stated. But production systems violate these
assumptions constantly, and most bugs in distributed software can be traced
back to implicit reliance on one or more of them.

The network *is* unreliable. TCP gives you a reliable byte stream only within
a session. It cannot tell you whether the remote side processed your request
before the connection dropped. It cannot distinguish "server crashed after
processing" from "server crashed before processing." This is the essence of
what makes distributed systems hard.

## The Real Problem: Partial Failure

The hardest thing about distributed systems is not performance. It is **partial
failure**.

In a single-process program, failure is binary: the process either runs or it
doesn't. In a distributed system, any component can fail independently, and
the remaining components must decide how to behave without knowing the precise
state of the failed one.

Consider a simple example: you send a payment request to a payment service.
The service processes the payment and is about to send back a success response
— and then the network drops. Did the payment go through? You don't know. If
you retry, you might charge the customer twice. If you don't retry, the
customer thinks the payment failed.

This is not an edge case. It is the normal situation in any system running at
scale.

## CAP Theorem and What It Actually Means

Eric Brewer's CAP Theorem (formalized by Gilbert and Lynch in 2002) states that
a distributed data store cannot simultaneously provide all three of:

- **Consistency** — every read receives the most recent write.
- **Availability** — every request receives a response (not an error).
- **Partition tolerance** — the system continues operating despite network
  partitions.

The usual gloss is "pick two." But this is somewhat misleading. Network
partitions are not optional — they happen. So the real tradeoff is between
consistency and availability *during a partition*.

The more actionable framing comes from the PACELC model: even without a
partition, you must trade off **latency** against **consistency**. Strongly
consistent systems are slower because they require coordination. Eventually
consistent systems are faster but require application code that handles
stale reads.

Neither is universally better. The right choice depends on what your
application actually needs.

## The Consistency Spectrum

Most engineers think of consistency as binary: either the system is consistent
or it isn't. In practice, there is a rich spectrum:

| Level | Description |
|---|---|
| **Linearizability** | Every operation appears atomic at a single point in real time. Strongest; most expensive. |
| **Sequential consistency** | All operations happen in some global order, but not necessarily real-time order. |
| **Causal consistency** | Operations causally related to each other are seen in the right order. |
| **Eventual consistency** | All replicas converge to the same value eventually, with no other guarantees. |

For most applications, linearizability is more than you need and too expensive
to be practical at global scale. Causal consistency is often the sweet spot:
it prevents the most confusing anomalies while being achievable with lower
coordination overhead.

## What To Do About It

A few principles that have served me well:

**Make operations idempotent wherever possible.** If re-sending a request
produces the same result as sending it once, the at-least-once retry strategy
becomes safe. Idempotency keys (a unique request ID that the server stores and
deduplicates on) are the standard mechanism.

**Design for the failure path, not just the happy path.** Draw sequence
diagrams that include what happens when each component fails. If you can't
describe the failure behavior, you haven't designed it.

**Be explicit about consistency requirements per operation.** Don't choose a
consistency model for your whole system. Different operations have different
requirements. A user profile read can tolerate a second of staleness. A
financial transaction cannot.

**Use timeouts and circuit breakers aggressively.** Slow failures (a
dependency that responds in 30 seconds instead of 30 milliseconds) are often
more dangerous than fast failures (immediate error). A slow dependency with no
timeout will exhaust your thread pool or connection pool, causing cascading
failure.

**Embrace observability.** Distributed systems fail in ways you cannot
anticipate. The only defense is making the system's internal state visible
enough that you can reason about failures after the fact. Structured logging,
distributed tracing, and good metrics are not nice-to-haves — they are
essential safety equipment.

## The Honest Summary

Distributed systems are hard because the problems they face — partial failure,
network unreliability, the need for coordination — are genuinely hard. There
are no silver bullets.

What experienced distributed systems engineers have is not magic, but something
more useful: a clear-eyed understanding of the failure modes, a set of proven
patterns for dealing with them, and the discipline to make tradeoffs explicit
rather than leaving them implicit.

The goal is not to eliminate failure — it is to fail gracefully, predictably,
and in ways you can recover from.

---

*Recommended reading: Martin Kleppmann's* Designing Data-Intensive Applications
*is the most practical deep treatment of these topics I have encountered.
Lamport's original papers on distributed clocks and consensus are also worth
reading, even decades on.*
