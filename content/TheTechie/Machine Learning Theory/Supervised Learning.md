---
title: Supervised ML
tags:
  - Techie
  - ML
date:
  - 2025-06-13
image: /Resources/Machine_Learning.jpg
---

## Definition:

- The process or an algorithm that learns from inputs(features) to predict an output(target variable).
- Supervised learning is a set of machine learning algorithms where we have both the target variable which is to predicted, given a set of inputs.
 - Below are few examples of SL applications in real life:

| Input             | Output           | application         |
| ----------------- | ---------------- | ------------------- |
| Email             | Spam or not      | spam filters        |
| audio             | transcript       | speech recognition  |
| english           | spanish          | machine translation |
| image, radar info | self-driving car | online advertising  |
| image of phone    | defect           | visual inspection.  |
| Square feet       | Price            | House prices        |

There are two types of supervised learning:
- Regression: output is continuous numbers or infinite in number
- Classification: output is discrete of finite

The learning algorithm converts the input into output,  and this function is also called the hypothesis.

Among Regression algorithms, we can fit a line, a quadratic, log or even an exponential curve to predict the targets based on data. Let's dive into each of them:

## Linear Regression:

- In this regression, a linear equation is fit to  predict the target variable, this line is also known as the line of best fit line, minimizing the mean square error as compared to any other lines that may be fit.
- Hence, the function or hypothesis is called Linear Regression model.

Mathematics in Linear Regression:
- Let the best line fit be $y=mx+c$, where m is the slope and c is the constant; $\hat{y}$ be the predicted value given by the algorithm.
- The best fit line may be found using the method of least squares.

Algorithm working: (Gradient Descent Working) [^1]

let the function be $y=wx+b$,
The cost function or the loss function that is: : $J(w,b)=\Sigma \dfrac{(y-\hat{y})^2}{2m}$ has to be minimized, where m is the number of observations in the training data set.

the model will assume some random values of w and b, and will recursively:
$temp_w=w-\alpha \dfrac{\partial{J}}{\partial{w}}$,
$temp_b=b-\alpha \dfrac{\partial{J}}{\partial{b}}$
$w=temp_w$
$b=temp_b$
$\alpha$ is known as the learning rate, more on it in the later section. [^2]

> [!DANGER] Methodical Error.
> The parameters must be updated sequentially, meaning it will be intitial value of w that will be fed in the iteration of temp_b and both w and b will be update post the differentiation.

The below is the coding aspect of cost function
```python
def compute_cost(x, y, w, b): 
    """
    Computes the cost function for linear regression.
    
    Args:
      x (ndarray (m,)): Data, m examples 
      y (ndarray (m,)): target values
      w,b (scalar)    : model parameters  
    
    Returns
        total_cost (float): The cost of using w,b as the parameters for linear regression
               to fit the data points in x and y
    """
    # number of training examples
    m = x.shape[0] 
    
    cost_sum = 0 
    for i in range(m): 
        f_wb = w * x[i] + b   
        cost = (f_wb - y[i]) ** 2  
        cost_sum = cost_sum + cost  
    total_cost = (1 / (2 * m)) * cost_sum  

    return total_cost
```

For creating good visualization diagrams:
```python
import numpy as np
%matplotlib widget
import matplotlib.pyplot as plt
from lab_utils_uni import plt_intuition, plt_stationary, plt_update_onclick, soup_bowl
```

```python
plt_intuition(x_train,y_train) # this creates a simple plot to visualise dynamic loss function for linear model.
fig, ax, dyn_items = plt_stationary(x_train, y_train)
updater = plt_update_onclick(fig, ax, x_train, y_train, dyn_items) # will create updater that will dynamically help to make contours.
soup_bowl() # will create a soup bowl or a convex surface to work with.

```

## Gradient Descent algorithm:

[^1]: The above was a Gradient Descent Algorithm.
- This algorithm updates parameters as mentioned in the reference, the below is a brief overview of its working.

[[Gradient_Descent_Algorithm.excalidraw]]

- For each w,b (parameters of the line), we get a new line.
- Each unique line has a representation on the quadratic curve plotting the error function.
- Thus, the aim is to find the line that has loss of zero, or minimizes the error.
- Case 1: We are to the left of the minima: $w-\alpha \dfrac{\partial{J}}{\partial{w}}$, will be increase, as the slope of J wrt to W is negative, and alpha is positive, resulting in an increase in W, moving W to right.
- Case 2: We are to the right of the minima: $w-\alpha \dfrac{\partial{J}}{\partial{w}}$, will be decrease, as the slope of J wrt to W is positive, and alpha is positive, resulting in a decrease in W, moving W to left.

- Local Minima: The gradient descent will arrive at the local minimum based on the parameters initialized at the beginning. Thus, we may not always get the global minimum, unless its a convex bowl shaped loss function.
- Batch gradient descent: The Gradient Descent Algorithm is applied on the entire batch of training data, hence called Gradient Descent Algorithm.

```python
# Implementation of Differentiation:
def compute_gradient(x, y, w, b): 
    """
    Computes the gradient for linear regression 
    Args:
      x (ndarray (m,)): Data, m examples 
      y (ndarray (m,)): target values
      w,b (scalar)    : model parameters  
    Returns
      dj_dw (scalar): The gradient of the cost w.r.t. the parameters w
      dj_db (scalar): The gradient of the cost w.r.t. the parameter b     
     """
    
    # Number of training examples
    m = x.shape[0]    
    dj_dw = 0
    dj_db = 0
    
    for i in range(m):  
        f_wb = w * x[i] + b 
        dj_dw_i = (f_wb - y[i]) * x[i] 
        dj_db_i = f_wb - y[i] 
        dj_db += dj_db_i
        dj_dw += dj_dw_i 
    dj_dw = dj_dw / m 
    dj_db = dj_db / m 
        
    return dj_dw, dj_db
```

```python
# implementation of the algorithm
def gradient_descent(x, y, w_in, b_in, alpha, num_iters, cost_function, gradient_function): 
    """
    Performs gradient descent to fit w,b. Updates w,b by taking 
    num_iters gradient steps with learning rate alpha
    
    Args:
      x (ndarray (m,))  : Data, m examples 
      y (ndarray (m,))  : target values
      w_in,b_in (scalar): initial values of model parameters  
      alpha (float):     Learning rate
      num_iters (int):   number of iterations to run gradient descent
      cost_function:     function to call to produce cost
      gradient_function: function to call to produce gradient
      
    Returns:
      w (scalar): Updated value of parameter after running gradient descent
      b (scalar): Updated value of parameter after running gradient descent
      J_history (List): History of cost values
      p_history (list): History of parameters [w,b] 
      """
    
    # An array to store cost J and w's at each iteration primarily for graphing later
    J_history = []
    p_history = []
    b = b_in
    w = w_in
    
    for i in range(num_iters):
        # Calculate the gradient and update the parameters using gradient_function
        dj_dw, dj_db = gradient_function(x, y, w , b)     

        # Update Parameters using equation (3) above
        b = b - alpha * dj_db                            
        w = w - alpha * dj_dw                            

        # Save cost J at each iteration
        if i<100000:      # prevent resource exhaustion 
            J_history.append( cost_function(x, y, w , b))
            p_history.append([w,b])
        # Print cost every at intervals 10 times or as many iterations if < 10
        if i% math.ceil(num_iters/10) == 0:
            print(f"Iteration {i:4}: Cost {J_history[-1]:0.2e} ",
                  f"dj_dw: {dj_dw: 0.3e}, dj_db: {dj_db: 0.3e}  ",
                  f"w: {w: 0.3e}, b:{b: 0.5e}")
 
    return w, b, J_history, p_history #return w and J,w history for graphing
```
## Learning Rate:
[^2]: 
$\alpha$ is called the learning rate, the smaller $\alpha$ , more small steps the algorithm take to converge.
If $\alpha$ is large, there may be a case for non-convergence or divergence. So, choosing the right alpha is mandatory to cut down on number of iterations and ensuring convergence.

[[learning_rate.excalidraw]]

- if cost is increasing post some iterations or oscillates, then learning rate is larger.
## Cost VS Iterations of GDA:
- We might see that the Cost decreases fast in the first few iterations but will decrease slowly in the later iterations.

## Regression with multiple Input Variables:

lets say we have n variables to talk about a problem of fitting the model or the target variable.
Then, $f_{w,b}= w_1.X_1+w_2.X_2+w_3.X_3+w_4.X_4$, $\vec{w}={w_1,w_2,w_3,w_4}$ symbolizes the slope vector and b is the constant.

## Vectorization:
- for computing the output, we will have to $\Sigma W_j + b$, this can do by manually writing code (very tiresome) manually to multiply and add or use a for loop, which is also a tough task for the computer.
- Thus, Vectorization, that is the dot product is used, $f_{w,b}= \hat{w}.\hat{x}+b$, may be used and is efficient.

```python
f = np.dot(w,x)+b
```
 - Both the W, D are initiated as NumPy arrays and the calculations on them are done using vectors, saving the time and computer power for calculation.


 ```python
# NumPy routines which allocate memory and fill arrays with value
a = np.zeros(4);                print(f"np.zeros(4) :   a = {a}, a shape = {a.shape}, a data type = {a.dtype}")
a = np.zeros((4,));             print(f"np.zeros(4,) :  a = {a}, a shape = {a.shape}, a data type = {a.dtype}")
a = np.random.random_sample(4); print(f"np.random.random_sample(4): a = {a}, a shape = {a.shape}, a data type = {a.dtype}")
```

```python
# single vector operations:
a = np.array([1,2,3,4])
print(f"a             : {a}")
# negate elements of a
b = -a 
print(f"b = -a        : {b}")

# sum all elements of a, returns a scalar
b = np.sum(a) 
print(f"b = np.sum(a) : {b}")

b = np.mean(a)
print(f"b = np.mean(a): {b}")

b = a**2
print(f"b = a**2      : {b}")
```

```python
# Vector Vector operations.
a = np.array([ 1, 2, 3, 4])
b = np.array([-1,-2, 3, 4])
print(f"Binary operators work element wise: {a + b}")

# Vector Scalar multiplication
a = np.array([1, 2, 3, 4])

# multiply a by a scalar
b = 5 * a 
print(f"b = 5 * a : {b}")

a = np.array([1, 2, 3, 4])
b = np.array([-1, 4, 3, 2])
c = np.dot(a, b)

# Time can be captured between operations using 
Time_start=time.time()
#operations insert here
Time_stop=time.time()

# Delete due to huge space
del(a)
del(b)
```

```python
# Creating matrices using Reshape, creating a matrix of 3 rows and 2 columns.
a = np.arange(6).reshape(3, 2)
```

```python
# Slicing a matrix
#vector 2-D slicing operations
a = np.arange(20).reshape(-1, 10)
print(f"a = \n{a}")

#access 5 consecutive elements (start:stop:step)
print("a[0, 2:7:1] = ", a[0, 2:7:1], ",  a[0, 2:7:1].shape =", a[0, 2:7:1].shape, "a 1-D array")

#access 5 consecutive elements (start:stop:step) in two rows
print("a[:, 2:7:1] = \n", a[:, 2:7:1], ",  a[:, 2:7:1].shape =", a[:, 2:7:1].shape, "a 2-D array")

# access all elements
print("a[:,:] = \n", a[:,:], ",  a[:,:].shape =", a[:,:].shape)

# access all elements in one row (very common usage)
print("a[1,:] = ", a[1,:], ",  a[1,:].shape =", a[1,:].shape, "a 1-D array")
# same as
print("a[1]   = ", a[1],   ",  a[1].shape   =", a[1].shape, "a 1-D array")

```

## Normal Equation:

- works only for Linear Regression
- solve for w,b without iterations
- does not for other any other models of ML.

## Feature Scaling:
- let the price of the house be: $p = w_1X_1+W_2X_2$ +b, lets say that the x1 is the square feet and x2 is the number of bathrooms.
- We know that the the square feet may be ranging from 500-4500 Sqft, but the number of bathrooms may be in a minimal range: 1-6.
- So, choosing a smaller advised for the larger square feet and a larger parameter for the smaller variable is  advised.
- A small change in parameter of square feet variable will likely cause more change in the cost function given the larger values.
- Thus, the contour curves will be shallow.
- Feature scaling thus brings all the variables to a standard scale, making it more easier for the convergence to happen.
- Methods of scaling: divide with the MAX, mean normalization, Standard Normalization.
- will help the gradient descent to run faster.

## Convergence:
- see if the error is reducing with increasing iterations.
- if there is increase in the error in the process, the learning rate is chosen high.
- declare convergence if $\epsilon$ < 0.003.

## Feature Engineering.
- some times


## Polynomial Regression:

- featuring scale is a must for polynomial regression.
