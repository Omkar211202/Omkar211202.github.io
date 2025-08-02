---
title: 1. Machine Learning Introduction
date:
  - 2025-05-27
image: /Resources/Machine_Learning.jpg
tags:
  - ML
  - Techie
keywords: machine learning introduction, ML fundamentals beginners, supervised vs unsupervised learning, ML algorithms overview, machine learning concepts 2025, Python ML tutorial, AI basics
---

> [!NOTE] Definition
> Making the computer learn without explicitly being programmed.
>
>Well Posed learning problem that enable a computer to learn from experience E with respect to some task T and some performance measure P, if its performance measure P, if its performance on T, as measured by P improves with experience E.


## Linear Regression:

Some Definitions:
- $\Theta = Parameters$
- m= Number of rows in the training dataset.
- X = inputs or features
- Y = output
- $(X^i,Y^i)$ = training example.

$h_\Theta (X)$ = $\Sigma \Theta . X_i + \Theta_0$ , This will become the predicted variables for training data.

We have to minimize, $J(\Theta)$= $\Sigma (h(X) - \Theta)^2$ for i =0 to m.

### Gradient Descent Algorithm:
- Start with some $\Theta$
- Keep changing $\Theta$ till we reduce the $(h(X)-\Theta)^2$.
- $\Theta_j = \Theta_j - \alpha \dfrac{\delta}{\delta \Theta_j} J(\Theta)$, alpha is set as learning rate, the differentiation is partial differentiation with respect to $\Theta_j$
- Solving this using the simplification of partial differentiation and chain rule,$\Theta_j = \Theta_j - \alpha \Sigma(h(x)-y) . X_j$, the summation happens across the all m rows.
- The GDA will happen until convergence for all features.
- If $\alpha$ is to large, we will miss out minimum and too small means larger number of iterations.
