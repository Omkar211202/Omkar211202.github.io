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

Among Regression algorithms, we can fit a line, a quadratic, log or even an exponential curve to predict the targets based on data. 

---
## Linear Regression:

- In this regression, a linear equation is fit to  predict the target variable, this line is also known as the line of best fit line, minimizing the mean square error as compared to any other lines that may be fit.
- Hence, the function or hypothesis is called Linear Regression model.

Mathematics in Linear Regression:
- Let the best line fit be $y=mx+c$, where m is the slope and c is the constant; $\hat{y}$ be the predicted value given by the algorithm.
- The best fit line may be found using the method of least squares.

let the function be $y=wx+b$,
The cost function or the loss function that is: : $J(w,b)=\Sigma \dfrac{(y-\hat{y})^2}{2m}$ has to be minimized, where m is the number of observations in the training data set.

the model will assume some random values of w and b, and will recursively:
$temp_w=w-\alpha \dfrac{\partial{J}}{\partial{w}}$,
$temp_b=b-\alpha \dfrac{\partial{J}}{\partial{b}}$
$w=temp_w$
$b=temp_b$
$\alpha$ is known as the learning rate, more on it in the later section. 

> [!DANGER] Methodical Error.
> The parameters must be updated sequentially, meaning it will be intitial value of w that will be fed in the iteration of temp_b and both w and b will be update post the differentiation.

Cost of a model is the sum of all losses of training examples.

Reference 1: Python function to compute cost 
Reference 2: For creating good visualization diagrams.

---
## Gradient Descent algorithm:
- This algorithm updates parameters as mentioned in the below reference, the below is a brief overview of its working.

[[Gradient_Descent_Algorithm.excalidraw]]

- For each w,b (parameters of the line), we get a new line.
- Each unique line has a representation on the quadratic curve plotting the error function.
- Thus, the aim is to find the line that has loss of zero, or minimizes the error.
- Case 1: We are to the left of the minima: $w-\alpha \dfrac{\partial{J}}{\partial{w}}$, will be increase, as the slope of J wrt to W is negative, and alpha is positive, resulting in an increase in W, moving W to right.
- Case 2: We are to the right of the minima: $w-\alpha \dfrac{\partial{J}}{\partial{w}}$, will be decrease, as the slope of J wrt to W is positive, and alpha is positive, resulting in a decrease in W, moving W to left.

- Local Minima: The gradient descent will arrive at the local minimum based on the parameters initialized at the beginning. Thus, we may not always get the global minimum, unless its a convex bowl shaped loss function.
- Batch gradient descent: The Gradient Descent Algorithm is applied on the entire batch of training data, hence called Gradient Descent Algorithm.

Reference 3:Code for computing gradient 
Reference 4:Code for implementation of gradient descent algorithm: 

---
## Learning Rate:
$\alpha$ is called the learning rate, the smaller $\alpha$ , more small steps the algorithm take to converge.
If $\alpha$ is large, there may be a case for non-convergence or divergence. So, choosing the right alpha is mandatory to cut down on number of iterations and ensuring convergence.

[[learning_rate.excalidraw]]

- if cost is increasing post some iterations or oscillates, then learning rate is larger.

---
## Cost VS Iterations of GDA:
- We might see that the Cost decreases fast in the first few iterations but will decrease slowly in the later iterations.

---
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

Reference 5:Vector operation with NumPy

---
## Normal Equation:
- works only for Linear Regression
- solve for w,b without iterations
- does not for other any other models of ML.
---
## Feature Scaling:
- let the price of the house be: $p = w_1X_1+W_2X_2$ +b, lets say that the x1 is the square feet and x2 is the number of bathrooms.
- We know that the the square feet may be ranging from 500-4500 Sqft, but the number of bathrooms may be in a minimal range: 1-6.
- So, choosing a smaller parameter is advised for the larger square feet and a larger parameter for the smaller variable is  advised.
- A small change in parameter of square feet variable will likely cause more change in the cost function given the larger values.
- Thus, the contour curves will be shallow.
- Feature scaling thus brings all the variables to a standard scale, making it more easier for the convergence to happen.
- Methods of scaling: divide with the MAX, mean normalization, Standard Normalization.
- will help the gradient descent to run faster.
---
## Convergence:
- see if the error is reducing with increasing iterations.
- if there is increase in the error in the process, the learning rate is chosen high.
- declare convergence if $\epsilon$ < 0.003.
---
## Feature Engineering.
- some times it becomes important for us to make new features from the existing data to make the prediction more accurate.
- lets say we have to predict the price of a land and we are given the length and breadth of the land.
- It does not make any sense for us to give the length and breadth of the land as features for this model, hence we must give the area, which is obtained by $length * breadth$.
- This process of modifying existing features to get more insightful features or information is called feature engineering.

---
## Polynomial Regression:

- featuring scale is a must for polynomial regression.

---
Reference 6: Linear Regression using Scikit-Learn and Gradient Descent Technique

We need not write code exclusively each time, we want to use Linear Regression, there is already a pre-built library called Sci-kit learn to do the same.

---
## Classification:
- When we have a target variable that is discrete(Finite and non continuous), we have a classification problem.
- If there are only 2 classes in the target variable, it becomes a binary classification problem.
- we have a function say, $f_{w,b}(x)= wx+b$, to fit the following, and there exists a point which acts a benchmark for classification, say 0.5, if the x<0.5, it may be the negative class and more than 0.5 becomes a positive class.
---
## Logistic Regression:
- most used classification model, its a S-shaped curve that is fit,  $g(z)= \dfrac{1}{1+e^{-z}}$, the z obtained here is, z=$wx+b$.
- thus for very large values of z, we have $e^{-z}$ will tend to zero, so the g(z) = 1.
- for z=0,$e^{-z}$ will be come 1, to make g(z)=0.5
- for negative z, $e^{-z}$ will become large, making g(z) tend to zero.
- Decision Boundary: This is the line that is the boundary that separates the classes, obtained by getting the point where z =0, so that $g(z) = 0.5$
- if z<0, $g(z)<0.5$ and $g(z)>0.5$, if z>0.
  
- Reference 7: Code snippets of sigmoid function
---
## Cost Function for Logistic Regression:
- Cost function of logistic Regression is 

![[Pasted image 20250712115034.png]]

- You may ask a question why the mean square error is not used as the error function?? This is because this function will not generate a convex curve and will lead to multiple local minima, hindering the process to find the least error point.
- The above loss function will help us to find a global minimum for the logistic loss function.
- A simplified version of the above function is $l=-y^i.(log(f) - (1-y^i) log(1-f)$, which will aid the process of gradient descent.

---
## Gradient Descent for Logistic Regression
- The gradient descent algorithm will be same the linear regression, but the loss function are different.
  
  Reference 7: Sigmoid function implementation
  Reference 8: Implementation of Scikit Learn Logistic Regression

---
## Overfitting
- Overfitting is a problem where the algorithm fits the curve to very precise terms such that error will be zero, thus loosing the generality of the model and looking at the trend.
- Under fitting is a problem where the algorithm does not fit the curve to match the targets.
- To prevent overfitting, the following techniques may be used:
1.  Use of more training data
2. Regularization setting the weights as minimal as possible to ensure general trend is observed and no weird fitting is done.
3. selecting only few features to fit the model.
---
## Regularization
- Regularization is process to ensure that weights of the model are set as minimal as possible, to ensure the curve is smooth and not abnormal.
- This is done by adding another term to the cost function, $\dfrac{\lambda}{2m}\Sigma W_j^2$
- $L=min[(J(w,b)+\dfrac{\lambda}{2m}\Sigma W_j^2]$, this on differentiation will ensure that the $w_j$ are very reduced, there by not leading to overfitting.
- if $\lambda$ is set to zero, we will left with the old loss function, which will lead to overfitting.
- if $\lambda$ is set to a very large number, the $w_j$ will tend to become a very small number, close to zero, making y=b, underfitting the model.
  
  Reference 9 & 10: implementation of Regularized linear and logistic regression models.

---

## References:

1. Code to compute cost:
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

2. code for visualizations of loss functions.

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

3. Computing the gradient using differentiation

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

4. Building the algorithm using Gradient Descent to fit a straight line;

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

5. Some Vector operations using NumPy:

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

6. Using Standardscaler from Scikit learn for feature Learning

```python
X_train, y_train = load_house_data()
X_features = ['size(sqft)','bedrooms','floors','age']

scaler = StandardScaler()
X_norm = scaler.fit_transform(X_train)
print(f"Peak to Peak range by column in Raw        X:{np.ptp(X_train,axis=0)}")   
print(f"Peak to Peak range by column in Normalized X:{np.ptp(X_norm,axis=0)}")

sgdr = SGDRegressor(max_iter=1000)
sgdr.fit(X_norm, y_train)
print(sgdr)
print(f"number of iterations completed: {sgdr.n_iter_}, number of weight updates: {sgdr.t_}")

b_norm = sgdr.intercept_
w_norm = sgdr.coef_
print(f"model parameters:                   w: {w_norm}, b:{b_norm}")
print( "model parameters from previous lab: w: [110.56 -21.27 -32.71 -37.97], b: 363.16")

# make a prediction using sgdr.predict()
y_pred_sgd = sgdr.predict(X_norm)
# make a prediction using w,b. 
y_pred = np.dot(X_norm, w_norm) + b_norm  
print(f"prediction using np.dot() and sgdr.predict match: {(y_pred == y_pred_sgd).all()}")

print(f"Prediction on training set:\n{y_pred[:4]}" )
print(f"Target values \n{y_train[:4]}")

# plot predictions and targets vs original features    
fig,ax=plt.subplots(1,4,figsize=(12,3),sharey=True)
for i in range(len(ax)):
    ax[i].scatter(X_train[:,i],y_train, label = 'target')
    ax[i].set_xlabel(X_features[i])
    ax[i].scatter(X_train[:,i],y_pred,color=dlc["dlorange"], label = 'predict')
ax[0].set_ylabel("Price"); ax[0].legend();
fig.suptitle("target versus prediction using z-score normalized model")
plt.show()

```

7. Sigmoid function implementation
```python
# Sigmoid function and implementation
def sigmoid(z):
    """
    Compute the sigmoid of z

    Args:
        z (ndarray): A scalar, numpy array of any size.

    Returns:
        g (ndarray): sigmoid(z), with the same shape as z
         
    """

    g = 1/(1+np.exp(-z))
   
    return g
```

8. Logistic cost implementation
```python
# Logistic Loss function in python
def compute_cost_logistic(X, y, w, b):
    """
    Computes cost

    Args:
      X (ndarray (m,n)): Data, m examples with n features
      y (ndarray (m,)) : target values
      w (ndarray (n,)) : model parameters  
      b (scalar)       : model parameter
      
    Returns:
      cost (scalar): cost
    """

    m = X.shape[0]
    cost = 0.0
    for i in range(m):
        z_i = np.dot(X[i],w) + b
        f_wb_i = sigmoid(z_i)
        cost +=  -y[i]*np.log(f_wb_i) - (1-y[i])*np.log(1-f_wb_i)
             
    cost = cost / m
    return cost
```

9. implementation using sci-kit learn:
```python
from sklearn.linear_model import LogisticRegression

lr_model = LogisticRegression()
lr_model.fit(X, y)
y_pred = lr_model.predict(X)
print("Accuracy on training set:", lr_model.score(X, y))

```

8. Regularized Linear Regression:
```python
def compute_gradient_linear_reg(X, y, w, b, lambda_): 
    """
    Computes the gradient for linear regression 
    Args:
      X (ndarray (m,n): Data, m examples with n features
      y (ndarray (m,)): target values
      w (ndarray (n,)): model parameters  
      b (scalar)      : model parameter
      lambda_ (scalar): Controls amount of regularization
      
    Returns:
      dj_dw (ndarray (n,)): The gradient of the cost w.r.t. the parameters w. 
      dj_db (scalar):       The gradient of the cost w.r.t. the parameter b. 
    """
    m,n = X.shape           #(number of examples, number of features)
    dj_dw = np.zeros((n,))
    dj_db = 0.

    for i in range(m):                             
        err = (np.dot(X[i], w) + b) - y[i]                 
        for j in range(n):                         
            dj_dw[j] = dj_dw[j] + err * X[i, j]               
        dj_db = dj_db + err                        
    dj_dw = dj_dw / m                                
    dj_db = dj_db / m   
    
    for j in range(n):
        dj_dw[j] = dj_dw[j] + (lambda_/m) * w[j]

    return dj_db, dj_dw
```

10. Regularized Logistic Regression:
```python
def compute_gradient_logistic_reg(X, y, w, b, lambda_): 
    """
    Computes the gradient for linear regression 
 
    Args:
      X (ndarray (m,n): Data, m examples with n features
      y (ndarray (m,)): target values
      w (ndarray (n,)): model parameters  
      b (scalar)      : model parameter
      lambda_ (scalar): Controls amount of regularization
    Returns
      dj_dw (ndarray Shape (n,)): The gradient of the cost w.r.t. the parameters w. 
      dj_db (scalar)            : The gradient of the cost w.r.t. the parameter b. 
    """
    m,n = X.shape
    dj_dw = np.zeros((n,))                            #(n,)
    dj_db = 0.0                                       #scalar

    for i in range(m):
        f_wb_i = sigmoid(np.dot(X[i],w) + b)          #(n,)(n,)=scalar
        err_i  = f_wb_i  - y[i]                       #scalar
        for j in range(n):
            dj_dw[j] = dj_dw[j] + err_i * X[i,j]      #scalar
        dj_db = dj_db + err_i
    dj_dw = dj_dw/m                                   #(n,)
    dj_db = dj_db/m                                   #scalar

    for j in range(n):
        dj_dw[j] = dj_dw[j] + (lambda_/m) * w[j]

    return dj_db, dj_dw  

```

