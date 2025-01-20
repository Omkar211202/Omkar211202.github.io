---
title: Business Analytics 1
date:
  - 2024-12-12
tags:
  - MBA02
---

## Types of Analytics:

- Prescriptive analytics: what should we do??
- predictive analytics: what could happen??
- descriptive analytics: what has happened??

Target variable:
The variable to be predicted is called target variable (dependent on independent).

Types of scales
- Nominal scale: categorical(no rank for the data) Gender.
- Ordinal scale: rank ordered (no fixed units of measurement).(beauty etc.) like, dislike etc.
- Interval: continuous data.(can have breaks between) can have negative
- Ratio: bounded data with upper and lower limits. (heights of  humans)
- Likert scale: 

![[Pasted image 20241219134246.png]]

- observations are placed in this table.
- variables/dimensions: supplier, order no, item no etc.

---

## CRISP DM model:

- Business understanding (parameter like churn status(customers), attrition(HR)).
- data understanding (understand the target var)
- data preparation (removing NAN'S etc.)
- modeling (machine learning models)
- evaluation 
- deployment

---

## RStudio basics:

1. How to change appearance:
- go to  Tools - global options - Appearance and change - apply.
## Basics

- put # for commenting in R.
- `<-` may be used as an assignment operator to a var, `=` and `->` will also suffice the same.
- `class()` may used to determine the datatype of the variable.

```R
print("God is Great") # how to print a string in R
ls() # Will list out all objects or variables created in memory.
sample(x=1:4,size=4) # random function
args(round) # will tell you the arguements the function will take.
library(ggplot2) # how to use a package in R
```

```R
# Some basic operations in R
5*6        # Multipliation
1000/25    # Division
sqrt(42)   # Square root
5%%6       # modulo operator
```

```R
# Assigning a variable in R
x=42
x

# sum function
sum(2,3,4)

# Repeats the value of an input
rep(576,3)
rep("Mdelighted",3)

# Fstring in R
library(glue)
x=10
glue("the mtcars dataset has {x} rows.")  ## a library in R called Glue

```

## Vectors in R:

```R
##Assigning a vector using C
z=c(10,5,3)
z

# Joining vectors:
c(a,b)

# A vector may be passed as an input in another vector.
pk=c(z,0.55,z)
pk
rep(pk,3)

# Sequences in R.
s=sequence(9,5,-0.5)
s

# some sort of listing and accessing all values in it.
learn=c("you","me","R")
learn
learn[2]
learn[1]

learn[4]="Python"
learn

learn[3]=learn[4]
learn[3]

# some operations with vector.
vector=c(1,2,3)
vector

vector+vector
vector+1
vector/2

# summing two vectors of same len.(element wise operation)
a+b

# Poker winnings from Monday to Friday

poker_vector <- c(140, -50, 20, -120, 240)

names(roulette_vector) <- c("Monday", "Tuesday", "Wednesday", "Thursday", "Friday")

```


## Matrix:

```R
# creating a matrix (data, rows, col)
x=matrix(1:8,4,2,byrow=TRUE) # puts data in row order
x

```R
colnames(matrix) <- region

rownames(matrix) <- titles

# creating matrix using cbind
cbind(c(1,2,3),c(4,5,6))

x=matrix(1:16,ncol=4)
x

# accessing elements, rows and col in a matrix.
s[2]
s[,2]
s[2,]
s[1,2]

# This will give the diagonal of the matrix
dim(m)

# Transpose of the matrix
t(m)

# Diagonal elements of the matrix
diag(m)

# Summary of the matrix
summary(m)

plot(m)

```


```R
# handling missing values
# summing elements in a vector by removing missing val.
m=c(1,2,3,NA,4)
sum(m,na.rm=TRUE)

```


### Functions in R

```R
cyl_vol=function(radius=1,height)
{radius^2*pi*height}

cyl_vol(height=10)

```

### If statements.
```R
x=5
if (x<10)
{
  print(paste(x,"is lesser than 10"))
}
```
### Handling datasets

```R
# using data sets in R 

 # importing a data set present in R.
data("longley")
longley

# finding the row names.
row.names(longley) 

# finding the col names.
names(longley) 

# shape of the data set
dim(longley)

# first 6 rows of the data set
head(longley) 

help("longley")

summary(longley)
str(longley)

# Accessing data from datasets and some manipulation.
data("starwars")
starwars

starwars%>% 
  count(starwars$sex)

starwars%>%
  arrange(desc(height))

```

```R
x=list(1,"a",TRUE,1+4i)
x

x=list(1,"a",he=tail(mtcars))
x

```


---

## Plotting in R:

```R
penguins
lm(penguins$bill_length_mm~species+year+species::year,data=penguins)
lm

# boxplot
p_box=ggplot(penguins,aes(x=species,y=bill_length_mm))+geom_boxplot()+labs(x="species",y="Bill_length_mm")
p_box

#Violin plot
p_violin=ggplot(penguins,aes(x=species,y=bill_length_mm))+geom_violin()+labs(x="species",y="Bill_length_mm")
p_violin

# Patching up Plots
p_box+p_violin & theme(axis.text.x = element_text(angle=45))


```

---
