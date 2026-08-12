---
slug: transformers-attention-is-all-you-need
title: "Attention Is All You Need: What the Transformer Actually Does"
authors: sawravroy
date: 2025-01-08
tags: [engineering, machine-learning, deep-learning, transformers, ai]
description: >
  A ground-up explanation of the Transformer architecture — what attention
  mechanisms are, why they replaced recurrent networks, and what this
  architecture gets right that previous approaches didn't.
image: /img/blog/transformer.png
keywords: [transformer, attention mechanism, BERT, GPT, machine learning, neural networks]
---

import SocialShare from '@site/src/components/SocialShare';

The Transformer architecture, introduced in Vaswani et al.'s 2017 paper
*"Attention Is All You Need,"* has become the foundational architecture
of modern AI. GPT, BERT, and virtually all large language models are
Transformers or direct descendants of them.

This essay explains what the architecture actually does, from first principles.

<!-- truncate -->

<SocialShare title="Attention Is All You Need: What the Transformer Actually Does" />

## The Problem With Recurrence

Before Transformers, sequence modelling relied on Recurrent Neural Networks
(RNNs) and their variants (LSTMs, GRUs). The idea is intuitive: process a
sequence one token at a time, maintaining a hidden state that summarises
everything seen so far.

RNNs have two structural problems that limited their effectiveness:

**Sequential computation.** Each step depends on the previous step's hidden
state. This means you cannot parallelise across the sequence — you must compute
step 1 before step 2, step 2 before step 3, and so on. For long sequences,
this is very slow.

**Information bottleneck.** The entire history of a sequence must be compressed
into a fixed-size hidden state vector. For long sequences, information from
early tokens is inevitably lost or distorted.

LSTM gating mechanisms mitigated the second problem but did not solve it, and
did nothing for the first.

## Attention: The Key Idea

The core idea of the Transformer is to replace recurrence with **attention**:
a mechanism that allows every position in a sequence to directly attend to every
other position, in parallel.

Formally, attention computes a weighted average of values, where the weights
are determined by the compatibility between a query and a set of keys:

```
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V
```

Where:
- **Q** (queries) — what this position is looking for
- **K** (keys) — what each position offers
- **V** (values) — the actual content to aggregate

The dot product `QK^T` measures compatibility between each query-key pair.
Dividing by `sqrt(d_k)` stabilises gradients when the dimension is large.
The softmax converts these scores into a probability distribution.
Finally, we take a weighted sum of the values.

The result: every position can, in one operation, aggregate information from
every other position. No bottleneck. Fully parallelisable.

## Multi-Head Attention

A single attention operation captures one type of relationship between tokens.
In practice, the Transformer uses **multi-head attention**: it runs several
attention operations in parallel, each with its own learned Q, K, V
projections, and concatenates the results.

```python
def multi_head_attention(Q, K, V, h, d_model):
    """
    h  : number of attention heads
    d_k: dimension per head = d_model // h
    """
    d_k = d_model // h
    outputs = []
    for i in range(h):
        # Each head has its own learned weight matrices
        Q_i = Q @ W_Q[i]   # shape: (seq_len, d_k)
        K_i = K @ W_K[i]
        V_i = V @ W_V[i]
        outputs.append(attention(Q_i, K_i, V_i))
    # Concatenate and project back
    return concat(outputs) @ W_O
```

This allows different heads to capture different types of relationships
simultaneously — one head might track syntactic dependencies, another
coreference, another semantic similarity.

## Positional Encoding

Attention is permutation-equivariant: it treats every position the same.
This is a problem because word order matters. "The dog bit the man" and
"The man bit the dog" have identical tokens in different orders.

The original Transformer adds **positional encodings** to the token embeddings —
fixed sinusoidal vectors that give each position a unique fingerprint:

```
PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
```

Later models (like BERT) use learned positional embeddings instead. The newest
models use **rotary positional embeddings** (RoPE), which encode position
relative to the distance between tokens rather than absolute position — this
generalises better to sequence lengths longer than those seen during training.

## The Full Architecture

The Transformer encoder stacks identical layers, each containing:

1. **Multi-head self-attention** — each token attends to all tokens.
2. **Layer normalisation**
3. **Feed-forward network** — two linear layers with a non-linearity between.
4. **Another layer normalisation**

Residual connections wrap each sub-layer: `output = LayerNorm(x + Sublayer(x))`.

For sequence-to-sequence tasks (translation, summarisation), a decoder stack
is added. The decoder adds a third sub-layer: **cross-attention**, which attends
to the encoder's output. Decoder self-attention uses a causal mask to prevent
attending to future tokens.

## Why This Works So Well

Three properties make the Transformer architecture unusually powerful:

**Expressiveness.** With enough layers and heads, Transformers can represent
nearly arbitrary functions over sequences. The attention mechanism is general
enough to capture any pairwise relationship.

**Parallelism.** Because attention is computed in one matrix operation,
Transformers scale very efficiently to modern GPU/TPU hardware. This is
what makes it practical to train models with billions of parameters.

**Transfer learning.** The structure of the Transformer is well-suited to
pre-training on large corpora and fine-tuning on small task-specific datasets.
The representations learned during pre-training generalise remarkably well.

## What the Paper Got Right

Looking back, the key insight in "Attention Is All You Need" wasn't just
the attention mechanism — variants of attention had existed before. It was
the decision to *remove* recurrence entirely.

Recurrence felt essential because sequences are ordered and causal. The
Transformer's bet was that attention alone, with positional encodings, was
sufficient to capture the structure of language — and that removing recurrence
would unlock parallelism that would make training at scale feasible.

That bet paid off in a way that even the original authors probably didn't
fully anticipate. The architecture they designed to improve machine translation
became the foundation for GPT-3, GPT-4, BERT, T5, and the current generation
of AI systems reshaping the industry.

---

*The original paper by Vaswani et al. is readable and worth working through.
Jay Alammar's illustrated guides to Transformers and BERT are the best
visual explanations I've encountered. Andrej Karpathy's "nanoGPT" is an
excellent exercise in implementing the architecture from scratch.*
