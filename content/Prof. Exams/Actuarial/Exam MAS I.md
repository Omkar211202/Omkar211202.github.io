---
title: MAS I
tags:
  - MAS-1
  - Actuarial
date:
  - 2025-11-27
image: /Resources/Root.jpg
---
Mathematical Actuarial Statistics, also known as [MAS I](https://www.casact.org/exam/exam-mas-i-modern-actuarial-statistics-i) is the third actuarial Exam on the CAS Actuarial pathway. This exam covers a wide range of of topics and is broadly divided into three parts.

(Skip to the last for how to approach the exam, if you know the broad topics tested in the exam)

## Probability Models:

   - This section covers topics like `Probability Distributions`, like Beta, Pareto, Gamma, Weibull, and dives deep into exponential distributions and its properties. There is also an inclusion of mixtures of different distributions in this section.
   - The Greedy algorithms are very interesting and awesome to  understand.
   - The primary focus in this section is: `Poisson Process` , `Markov Chains` and `Reliability Theory`.
- [Poisson Process](https://www.geeksforgeeks.org/maths/poisson-processes/) tries to model the frequency and occurrence of events. There is an emphasis on thinning, Super positioning and order of process. Compound Poisson Process can be used to model the Amount of claims based on frequency and severity of the claims.
- [Markov Chains](https://en.wikipedia.org/wiki/Markov_chain) deals with changes of events from one state to another. This topic consists of absorbing states, long-term probabilities, time spent in transient states, classification of states into classes, recurrence, transient, aperiodic etc.
- [Reliability Theory](https://www.sciencedirect.com/topics/computer-science/reliability-theory) deals with systems and their functioning. Since, formulas pertaining to reliability function can get lengthy, approximation can be made using other methods using MPS and MCS.
- This section of probability modelling also consists of Policy Limits and Deductibles, Simulations and Conditional Tail expectations (trying to understand the large size claims).
- Life Contingencies is also very interesting topic that is used to design pensions and benefits, and also used widely in Life Insurance. The math with mortality tables and the formulas are beautifully constructed and have a similarity with financial mathematics.

## Statistics:

- The initial part of this section is to arrive with estimates for parameters of distributions with  method of moments and maximum likelihood.
- The next section deals with touchstones to understand Estimators: Bias, Consistency, Variance, Sufficiency etc.
  The [Cramer Rao Unbiased Variance](https://en.wikipedia.org/wiki/Cram%C3%A9r%E2%80%93Rao_bound) and [MVUE](https://en.wikipedia.org/wiki/Cram%C3%A9r%E2%80%93Rao_bound) are very important concepts in this section.
- The further sections deals with hypothesis testing for means, proportions and variances, having different tests performed for different scenarios.
- The section post testing of hypothesis is the Goodness of fit, trying to confirm whether a sample is likely to follow a distribution. In this section, we have Chi-Square goodness of fit, Kolmogorov Smirnov, Test of independence, and likelihood ratio test.
  - The further section confidence intervals has the most formulas, easy if understood.
  - The last section is order statistics, trying to find out the probability of something being minimum etc, based on first principles and some formulas.

## Extended Linear Models:

- The Linear models are often used in modelling in various industries.
- This section is the most vast section and talks about supervised learning predominantly, introducing some bit of unsupervised as well.
- The [Bias Variance Tradeoff] is very interesting concept, should be kept in mind, while building models.
- Linear Models  is very simple and stand on few assumptions, which must be kept in mind.
- The MLR is an extension of SLR, but has more predictors than one.
- ANOVA is useful when the variables are categorical in nature.
- There is a section that basically talks about some violations and issues that come up while building a model, like multi-collinearity, leverage and outliers and high dimensionality for example.
- Since, it important to know the number of predictor and which to included, different methods are used to figure out this, this is done through subset selection, Best subset, forward, backward and hybrid subset selection.
- There are Selection Criterion that can be used to evaluate these models like Mallow's CP, AIC and BIC.
- There are also different way to train the models, using different validation techniques like Validation set approach, K-Fold and LOOCV method.
- A slight variations to linear models can be used to get better results like Ridge and Linear Regression. New variables that capture the influence of the predictors also may be used to reduce the number of variables like PCA and partial least square also may be used.
- The last section of this part: GLM, Poisson links, Binomial Links and GAM are the most important for the exam, will talk about them here. (A Bit Complicated).


## How to approach this exam:

- The following are advisory and based on my experience, please be open to how you like to study, the way you do.
- This exam will look scary if you look at the vast syllabus it has. The best thing to know is that as you read more, the more you will know.
- Try to practice about 1000-1500 ( in total) questions based on the weightage of the topics in the exam.
- The exam will not have too difficult sums to solve but will test the concepts thoroughly.
- Beware that theoretical questions are also asked in the exams, especially form the last unit.
- Read the portion about 3-4 four times if possible.
- The best thing to do is to make a copy of notes that will help you to remember the topics and their intricacies when you glance through them:
  
  PS: [This is my COPY](https://drive.google.com/file/d/1eGflp3zU4A1jhrgc3dc40St-m6nYWWPq/view?usp=drive_link)


