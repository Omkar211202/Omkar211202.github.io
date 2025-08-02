---
title: Statistics for Managers with Excel.
date:
  - 2024-10-28
tags:
  - MBA01
  - MBA
image: /Resources/MBA.jpg
keywords: Excel statistics tutorial, managerial statistics Excel, data analysis Excel MBA, hypothesis testing Excel, regression analysis Excel guide, statistical functions Excel, probability distributions Excel
---
## Basic Statistics and Excel:
### Excel Formulas:

```excel
=AVERAGE(D65:D124)
=STDEV.P(B65:B124)
=VAR.S(B65:B124)
=MEDIAN(B65:B124)
=MODE(B65:B124)
=MIN(B65:B124)
=MAX(B65:B124)
=PERCENTILE.INC(B65:B124,0.9)
=SKEW(B2:B121)
=KURT(B2:B121)
```

Normal Stats formula:
$$
\begin{align*}
\tag{1}
Range &= Max -Min\\
\tag{2}
Interquartile-range &=Q_3-Q_1

\end{align*}
$$
--- 
## Discrete Distributions:
1. Poisson:
$$
		P(x)=\dfrac{e^{-\lambda}.\lambda^x}{x!}
$$
Excel: `Poisson.dist(x,mean,cummulative)`

2. Hypergeometric:

3. Binomial

--- 
## Continuous Distributions:
1. Exponential
2. Normal
3. Uniform

---
## Hypothesis Testing:
The basis is making an assumption of the population and trying to establish the truth based on sample statistics.

We assume the Null Hypothesis to be true, other words its based on the population assumption.

We try to establish our claim based on the sample observations.

The Whole idea came because of the need for sampling vs Census.

### Type of Tests:
1. Left tail
2. Right tail
3. Two tail


|        | True                                   | False                                  |
| ------ | -------------------------------------- | -------------------------------------- |
| Accept | Correct decision (1-$\alpha$)          | False negative ($\beta$) Type II error |
| Reject | False positive ($\alpha$) Type 1 error | Correct decision ($1-\beta$)           |
###  What's $\alpha$ & $\beta$ ??





### Types of Hypothesis Testing
1. Z- test:
	 - used when popn standard dev is known
	 - when sample size > 30.

2.  t- test:
	 - standard deviation of popn is not known
	 - sample size is less to apply Z-test.
	 - popn must be normally dist.

3. f- test:
	 - for comparing more than two groups.

4. Chi-Square:
	 - Used for categorical data as against continuous data.

### Chi-square:
### Sample Var VS Popn Var.
$$
\chi^2 = \dfrac{(n-1)S^2}{\sigma^2}
$$

Comparison of variance of one sample against popn variance.
```excel
=CHISQ.INV(0.025,14) //gives the left tail critical value
=CHISQ.INV.RT(0.025,14) //gives the right tail critical value


```
given a 5% level of significance, we take 2.5% level of confidence on both sides and find the critical values on both sides.

After finding, finding the critical values, find the lower and upper limits of the popn variances.
Square root variances and find the standard deviation.

H0: Assume popn var to be true.
find the $\chi^2$  stat assuming $\sigma^2$ to be based on Null hypothesis.
compare $\chi^2$ stat with the critical values on both sides.

No Excel shortcuts.
### Multiple Variances:
$$
\chi^2=\Sigma[\dfrac{(f_0-f_e)^2}{f_e}]
$$
first find the expected observations for each of the sample.
find the $\chi^2$  by using the above formula.
find the $\chi^2$ stat on both sides using the `chisq.inv` and `chisq.inv.rt` functions in excel

H0: all sample variances are same.

see if the  $\chi^2$  stat is lying in between the critical chisq stats.
accept the null hypothesis if the above happens.

---

### Z-test:










---

### T- test:
### Popn variances unknown
1. Popn variances is equal.
2. Popn variances is unequal.
-  if unequal variances:
$$
t_{stat}=\dfrac{(\bar X_1-\bar X_2)-(\mu_1-\mu_2)}{\sqrt(\dfrac{S_1^2}{n_1}+\dfrac{S_2^2}{n_2})}
$$
- if equal variances:
$$
t_{stat}=\dfrac{(\bar X_1-\bar X_2)-(\mu_1-\mu_2)}{\sqrt(\dfrac{S_p^2}{n_1}+\dfrac{S_p^2}{n_2})}
$$
where $$S_P^2=\dfrac{(n_1-1)S^2_1+(n_2-1)S^2_2}{(n_1-1)+(n_2-1)}$$$S^2_P$ is the pooled variance.
---
### F-test:
$$
F_{stat}=\dfrac{S_1^2}{S_1^2}
$$
H0: variances are equal.    Separate variance test. 
H1: Variances are unequal. Pooled variance test.

---
### ANOVA:









---
## Linear Regression
In life, we can be given situations where, we have a set of data, consisting of independent and dependent variables. We have to use them and construct a mechanism such that we should be able to input any variable into it and find the output.

Independent Variables: 
These variables are not affected in the equation by other variables. The changes in the independent variables affect the dependent variable.

Example: Price of house (dependent) may affected by factors like no of rooms, location, date of construction etc. (Independent)

If a dependent variable is affected by only one variable: it may be fitted into the following model or equation:
$$
y_p=mx+c
$$
else it will be fit into equations like:
$$
y_p=\beta_0+\beta_1.X_1+\beta_2.X_2
$$
which will lie in an n dimensional space.

### Working on Excel:
In excel under the tab, data find data analysis and click on regression.
Input the data to get the results.

It  may be observed  that it gives you summary with plots etc.

### Aspects of analysis:

The summary gives coefficients to the analysis, like $\beta1$ etc. along with intercept. 
You can construct the equations like the above using this.

$R^2$ is called the coefficient of determination, this tells us how much of change in independent variable is affected by change in dependent variables.

Adjusted $R^2$ will tell us about choosing variables to be added into our model.
If addition of another variable improves the adjusted $R^2$ , that means that the variable is important for our process.

Residues are the differences of the predicted values with the original values given.

$t-stat$ will tell value of the thresholds wrt hypothesis testing. They may be used to determine whether a var is useful in the process or not.

F_Significance_level will tell us how strong the model, if minimal, very close to zero, our test is very strong.

$$
y_p=\beta_0+\beta_1.X_1+\beta_2.X_2
$$
Use this equation to find values for the other inputs.

---


