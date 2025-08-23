---
title: Business Analytics
date:
  - 2024-12-12
tags:
  - MBA02
  - MBA
image: /Resources/MBA.jpg
keywords: business government society, corporate social responsibility, public private partnership, business ethics governance, societal impact management, government policy business, stakeholder management
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

---

## CRISP DM model:

- 6 phases of the model include: Business understanding, Data understanding, Data preparation, modeling, evaluation, Deployment.


---

## RStudio 

1. How to change appearance:
- go to  Tools - global options - Appearance and change - apply.
### Basics

- put # for commenting in R.
- `<-` may be used as an assignment operator to a var, `=` and `->` will also suffice the same.
- `class()` may used to determine the datatype of the variable.

```r
print("God is Great") # how to print a string in R
ls() # Will list out all objects or variables created in memory.
sample(x=1:4,size=4) # random function
args(round) # will tell you the arguements the function will take.
library(ggplot2) # how to use a package in R
?CrossTable # to know about some function or data in RBase.
```

```r
# Some basic operations in R
5*6        # Multipliation
1000/25    # Division
sqrt(42)   # Square root
5%%6       # modulo operator
```

```r
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

### Vectors in R:

```r
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

# creating an array of numbers:
index=1:20

# Poker winnings from Monday to Friday

poker_vector <- c(140, -50, 20, -120, 240)

names(roulette_vector) <- c("Monday", "Tuesday", "Wednesday", "Thursday", "Friday")

```


### Other Functions in R:
```r
lapply(),sapply(),unlist()

```
### Lists:

List is heterogeneous collection of datatypes. It can have strings, numbers, etc.

```r
my_list=list(
  string="One Hundred",
  number=5,
  words=c("dog","cat","fish")
)

# accessingg lists
my_list[[1]]
my_list[[3]][3]



```

---

### Loops in R:

```r
x=0
while (x<1000)
{
x=x+17
}
x

x=0
for(i in 1:5)
{
  print(1:i)
}

counter=1
repeat{print(counter)
if (counter==9){
  break
}
counter=counter+1
}


```




---


### Amortization of Loan:

```r
month=0
balance=300000
payment=1600
interest=0.05
total_paid=0

monthlymultiplier=(1+interest)^(1/12)

while(balance>0){
  month=month+1
  interest_bal=balance*((1+interest)^(1/12)-1)
  balance=balance*monthlymultiplier-payment
  print(paste("Month:",month,"Balance:",balance,"|interest",interest_bal))
}
```

---

### Handling Days in R
```r
today=Sys.Date()
day=weekdays(today)
day
today
```


### Matrix:

```r
# creating a matrix (data, rows, col)
x=matrix(1:8,4,2,byrow=TRUE) # puts data in row order, by default it gives column order
x

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


```r
# handling missing values
# summing elements in a vector by removing missing val.
m=c(1,2,3,NA,4)
sum(m,na.rm=TRUE)

```


### Functions in R

```r
cyl_vol=function(radius=1,height)
{radius^2*pi*height}

cyl_vol(height=10)

roll=function(){
  die=1:6
  dice=sample(die,size=2,replace=TRUE)
  sum(dice)
}

# Calling the function
roll()

```

### If statements.
```r
x=5
if (x<10)
{
  print(paste(x,"is lesser than 10"))
}


```



---
### Handling datasets

- First thing to do given a dataset: EDA, exploratory data analysis.
- This includes:
```r
head(df)  # First 6 rows by default
tail(df)  # last 6 rows by default
names(df) # column names
str(df)   # type of data for each of the cols
dim(df)   # Rows * Cols in the dset
summary(df) # gives mean,median,mode,Q3,Q1 for numerical cols.
```



```r
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

```r
x=list(1,"a",TRUE,1+4i)
x

x=list(1,"a",he=tail(mtcars))
x

```


---

### Dataframe:

```r
avg=c(3.4, 2.8, 4.2, 5.8, 11.4, 12.6, 14.6, 13.9, 13.7, 9.2, 4.3, 3.1, 2.3, 0.5, 0.8, 6.7, 13.5, 13.6, 16.2, 13.8, 11.6, 8.0, 6.6, 3.9, 1.7, 4.6, 4.0, 9.1, 8.8, 13.2, 15.4, 15.8, 11.6, 7.8, 3.6, 4.8)

df= data.frame(Year = rep(2018:2020,each=12),Month=rep(month.name,3),avg)
df= tibble(Year = rep(2018:2020,each=12),Month=rep(month.name,3),avg)
df

df[3,"avg"]
df[3,]
df[,"avg"]

```

---

### Data Processing in R:

```r
df=data.frame(Products=c("A","B","C","D","E"),
              Price=c(612,447,NA,374,831))
df

df$Price[is.na(df$Price)]= mean(df$Price,na.rm=TRUE) # lengthy process
impute(df$Price,mean) # using imputation.

grump=data.frame(sleep_data=c(7.59, 7.91, 5.14, 7.71, 6.68, 5.99),
                      baby_sleep=c(NA, 11.66, 7.92, 9.61, 9.75, 5.04),
                      mom.grump=c(56, 60, 82, 55, NA, 72),
                      day=c(1,2,3,4,5,6))


cor(grump) # This will find correlation
cor(grump,use = "pairwise.complete.obs")
cor(grump)
cor(grump,use = "complete.obs")

my_data2=gather(my_data,
                key="arrest_attribute",
                value="arrest_estimate",-state)
my_data2

```

```r

hist(df$colname,col='green')
boxplot(df)

ggplot(df,aes(x=carat,y=price,colour=clarity))+geom_smooth()
ggplot(df,aes(x=carat,y=price,colour=cut))+geom_point()+facet_wrap(~clarity)




```


### Plotting in R:

```r
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

### Cross Tabulation In R:

- We will want to sort our datasets into sub datasets, to solve some problems, like you may want to find out all those people who are from northern India, and see what is there average age etc.
- That's when we can use Cross Tabs in R.

---

## Machine Learning in R:
### Confusion Matrix:


|                 | Predicted Positive | Predicted Negative |
| --------------- | ------------------ | ------------------ |
| Actual Positive | True Positive (1)  | False Negative (2) |
| Actual Negative | False Positive (3) | True Negative  (4) |


- accuracy: $\dfrac{TP+TN}{Total}$ , among all the predictions, how many are true. $\dfrac{(1+4)}{(1+2+3+4)}$

- Precision: $\dfrac{TP}{TP+FP}$, , among all the predicted positive, how many are really correct. $\dfrac{(1)}{(1+3)}$


- Recall: $\dfrac{TP}{TP+FN}$, among the actually positive, how many are predicted correctly. $\dfrac{(1)}{(1+2)}$


- F1-Score: $\dfrac{2.Precision.Recall}{Precision+Recall}$

---


### Linear Regression in R:

```r
lm(result~var1+var2+var3,data=df) # to find result, using var 1,2,3 from data df
lm(result~.-var1,data=df) # to find result from all var in df, except var 1
lm(result~.,data=df) # to find result using all var in df

predict(model) # will give the intercept and coefficient for each of the following.

# Metrics of Evalutaion:
library(Metrics)
# Root mean square error
Root_mean_square_error=rmse(df$result,predict(model))
# r_squared error
summary(model)$r.squared

AIC(model)
BIC(model)

```


Classification using GLM in R:

```r
set.seed(123)
trainindex = createDataPartition(diabetes_confusion$Outcome,p=0.7,list=FALSE)
traindata = diabetes_confusion[trainindex,]
testdata = diabetes_confusion[-trainindex,]
logic_reg = glm(Outcome~Age+BMI+BloodPressure+Glucose,
                family = binomial(link = "logit"),data=traindata)
logic_reg

predicted_prob = predict(logic_reg,newdata = testdata,type = "response")
predicted_prob

predicted_class = ifelse(predicted_prob>0.5,1,0)
predicted_class
conf_matrix = confusionMatrix(as.factor(predicted_class),
                              as.factor(testdata$Outcome))
conf_matrix
```

```pyt
```