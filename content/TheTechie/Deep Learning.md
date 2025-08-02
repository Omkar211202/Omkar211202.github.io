---
title: Deep Learning.
date:
  - 2024-11-20
tags:
  - DS
  - Techie
image: /Resources/tech.jpg
keywords: deep learning tutorial, advanced neural networks, CNN deep learning, LSTM sequence modeling, deep learning frameworks, AI image recognition, deep learning projects
---
## Intro:

- feature learning.
- inspired by neurons.
- pytorch may be used to deep learning.


Tensor:
- multi-dimensional in nature.
- building blocks for deep learning
- Below is some code to learn and understand tensors.

```python
import torch

## Creting a tensor from a list
lst=[[1,2,3],[4,5,6]]
tensor=torch.tensor(lst)

## Creating a tensore from a numpy array.
np_array=np.array(array)
np_tensor=torch.from_numpy(np_array)

## attribute:
tensor.shape ## tells us the dimensionality
tensor.dtype ## tells us the datatype of the elements in the tensor.
tensor.device ## on which device tensor is loaded GPU or CPU

## Tensor Operations.
a+b ##(additions if a and b are compatible)
a*c ## (element wise multiplication)
```


## Creating our first neural network:

Neural Network will have a set of inputs, that will interact with other to give an output

```python
import torch.nn as nn

input_tensor = torch.tensor([[0.3471,0.45747,-0.2356]])

## Building the first layer.
linear_layer = nn.Linear(in_features=3,out_feature=2)
output = linear_layer(input_tensor) ## weights and biases are set by default

```


$y_0=X.W_0+b_0$ , input is multiplied with some weights to and biases, to give the output.

- Networks with only linear layers are called fully connected.


### Multilayer-Neural Network:
```python
model = nn.Sequential(
   nn.Linear(10,18),
   nn.Linear(18,20),  
   nn.Linear(20,5)
)
## The output of the prior layer becomes the input for the next layer.

## if input ahs 10 elements in it,
output_tensor = model(input_tensor)

```

###  Activation Functions:
- helps to add non-linearity to the learning.
- use activation function to add non-linearity to the network.
- Sigmoid is an example of an activation function.

```python
model= nn.Sequential(
   nn.Linear(6,4), ## first layer
   nn.Linear(4,1), ## Second layer,
   nn.Sigmoid() ## Sigmoid is fed the in input of 1
)
```

- using sigmoid as the last step in network of linear layer is equal to using logistic regression.(used for binary classification)
- SoftMax: can be used for multi-class classification.

```python

input_tensor= torch.tensor(
   [[4.3,6.1,2.3]]
)

porbability=nn.softmax(dim=-1)
output_tensor=probabilities(input_tensor)
 ## indicates that softmax is applied to the input tensor's last dimension.
```

```excel
Range("C5").Select
Selection.FillDown
```
